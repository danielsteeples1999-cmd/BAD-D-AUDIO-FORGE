#!/usr/bin/env node
const fs = require("node:fs");
const crypto = require("node:crypto");

const path = process.argv[2];
if (!path) {
  console.error("usage: node tools/audio-probe.cjs <audio-file>");
  process.exit(2);
}
if (!fs.existsSync(path)) {
  console.error(JSON.stringify({ status: "BLOCKED", reason: "fixture_missing", path }));
  process.exit(3);
}

const bytes = fs.readFileSync(path);
const reject = (status, reason, exitCode, extra = {}) => {
  console.error(JSON.stringify({ status, reason, path, bytes: bytes.length, ...extra }, null, 2));
  process.exit(exitCode);
};

if (bytes.length < 12 || bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "WAVE") {
  reject("BLOCKED", "unsupported_container", 4, { supported_containers: ["RIFF/WAVE"] });
}

const riffSize = bytes.readUInt32LE(4);
const riffEnd = riffSize + 8;
if (riffSize < 4 || riffEnd > bytes.length) {
  reject("FAILED", "truncated_riff_container", 1, { riff_bytes: riffSize });
}

let offset = 12;
let waveFormat = null;
let dataBytes = 0;
while (offset + 8 <= riffEnd) {
  const chunkId = bytes.toString("ascii", offset, offset + 4);
  const chunkSize = bytes.readUInt32LE(offset + 4);
  const chunkStart = offset + 8;
  const chunkEnd = chunkStart + chunkSize;
  const nextChunk = chunkEnd + (chunkSize & 1);

  if (chunkEnd > riffEnd || nextChunk > riffEnd) {
    reject("FAILED", "truncated_riff_chunk", 1, { chunk_id: chunkId, chunk_bytes: chunkSize });
  }

  if (chunkId === "fmt ") {
    if (chunkSize < 16) {
      reject("FAILED", "invalid_format_chunk", 1, { chunk_bytes: chunkSize });
    }
    waveFormat = {
      audio_format: bytes.readUInt16LE(chunkStart),
      channels: bytes.readUInt16LE(chunkStart + 2),
      sample_rate: bytes.readUInt32LE(chunkStart + 4),
      block_align: bytes.readUInt16LE(chunkStart + 12),
      bits_per_sample: bytes.readUInt16LE(chunkStart + 14)
    };
    if (!waveFormat.audio_format || !waveFormat.channels || !waveFormat.sample_rate || !waveFormat.block_align) {
      reject("FAILED", "invalid_format_chunk", 1);
    }
  }

  if (chunkId === "data") dataBytes += chunkSize;
  offset = nextChunk;
}

if (offset !== riffEnd) reject("FAILED", "truncated_riff_chunk_header", 1);
if (!waveFormat) reject("FAILED", "format_chunk_missing", 1);
if (dataBytes === 0) reject("FAILED", "audio_data_missing_or_empty", 1);

console.log(JSON.stringify({
  status: "PROVEN",
  path,
  container: "RIFF/WAVE",
  bytes: bytes.length,
  sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
  wave_format: waveFormat,
  data_bytes: dataBytes,
  note: "RIFF/WAVE container structure only; decoded PCM and playback claims require a decoder/runtime."
}, null, 2));
