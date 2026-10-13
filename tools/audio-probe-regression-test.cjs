#!/usr/bin/env node
const fs = require("node:fs");
const cp = require("node:child_process");
const os = require("node:os");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const probe = path.join(projectRoot, "tools", "audio-probe.cjs");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audio-probe-regression-"));

function expectProbe(pathname, expectedExit, expectedStatus, expectedReason) {
  const result = cp.spawnSync(process.execPath, [probe, pathname], {
    cwd: projectRoot,
    encoding: "utf8"
  });
  if (result.error) throw result.error;
  if (result.status !== expectedExit) {
    throw new Error(`expected exit ${expectedExit}, got ${result.status}: ${result.stderr}`);
  }
  const report = JSON.parse(result.stderr);
  if (report.status !== expectedStatus || report.reason !== expectedReason) {
    throw new Error(`unexpected probe report: ${JSON.stringify(report)}`);
  }
}

try {
  const textPath = path.join(tempDir, "not-audio.txt");
  fs.writeFileSync(textPath, "not audio input", "utf8");
  if (fs.statSync(textPath).size !== 15) throw new Error("text regression fixture must be 15 bytes");
  expectProbe(textPath, 4, "BLOCKED", "unsupported_container");

  const truncatedWavePath = path.join(tempDir, "truncated.wav");
  const truncatedWave = Buffer.alloc(12);
  truncatedWave.write("RIFF", 0, "ascii");
  truncatedWave.writeUInt32LE(64, 4);
  truncatedWave.write("WAVE", 8, "ascii");
  fs.writeFileSync(truncatedWavePath, truncatedWave);
  expectProbe(truncatedWavePath, 1, "FAILED", "truncated_riff_container");

  console.log(JSON.stringify({
    status: "PROVEN",
    test: "AUDIO-PROBE-CONTAINER-001",
    checks: ["15-byte plain-text input is blocked", "truncated RIFF/WAVE input fails closed"]
  }, null, 2));
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
