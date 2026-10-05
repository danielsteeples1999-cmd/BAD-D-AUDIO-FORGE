#!/usr/bin/env node
const fs = require("fs");
const cp = require("child_process");
const path = require("path");
const fixture = "fixtures/tone-440hz-10s.wav";

function runSelfTest(dependencies = {}) {
  const fileSystem = dependencies.fs || fs;
  const childProcess = dependencies.childProcess || cp;
  const writeOutput = dependencies.writeOutput || console.log;
  const writeError = dependencies.writeError || console.error;
  let primaryFailed = false;

  try {
    if (fileSystem.existsSync(fixture)) fileSystem.unlinkSync(fixture);

    const gen = childProcess.spawnSync(process.execPath, ["tools/generate-fixture.cjs", fixture], {
      encoding: "utf8"
    });
    if (gen.status !== 0) throw new Error(gen.stderr);

    const probe = childProcess.spawnSync(process.execPath, ["tools/audio-probe.cjs", fixture], {
      encoding: "utf8"
    });
    if (probe.status !== 0) throw new Error(probe.stderr);

    const result = JSON.parse(probe.stdout);
    if (result.status !== "PROVEN" || result.bytes <= 44) {
      throw new Error("probe assertion failed");
    }
  } catch (error) {
    primaryFailed = true;
    throw error;
  } finally {
    try {
      if (fileSystem.existsSync(fixture)) fileSystem.unlinkSync(fixture);
    } catch (cleanupError) {
      if (!primaryFailed) throw cleanupError;

      const cleanupDetails = cleanupError && cleanupError.stack
        ? cleanupError.stack
        : String(cleanupError);
      try {
        writeError(`Audio Forge self-test cleanup failed: ${cleanupDetails}`);
      } catch {
        // A diagnostic write must not replace the original self-test failure.
      }
    }
  }

  writeOutput(JSON.stringify({
    status: "PROVEN",
    test: "AUDIO-FORGE-SELF-001",
    checks: ["fixture generation", "WAV file existence", "container probe", "sha256 measurement", "cleanup"]
  }, null, 2));
}

if (require.main === module) runSelfTest();

module.exports = { runSelfTest };
