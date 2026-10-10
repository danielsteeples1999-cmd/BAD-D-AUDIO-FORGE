const test = require("node:test");
const assert = require("node:assert/strict");
const { runSelfTest } = require("./self-test.cjs");

const fixture = "fixtures/tone-440hz-10s.wav";

function createFixtureFs({ initiallyExists = false, unlinkErrors = [] } = {}) {
  let exists = initiallyExists;
  const unlinkCalls = [];

  return {
    unlinkCalls,
    fs: {
      existsSync(candidate) {
        assert.equal(candidate, fixture);
        return exists;
      },
      unlinkSync(candidate) {
        assert.equal(candidate, fixture);
        unlinkCalls.push(candidate);
        if (unlinkErrors.length > 0) throw unlinkErrors.shift();
        exists = false;
      }
    },
    markExists() {
      exists = true;
    }
  };
}

test("a failed stale-fixture unlink is protected and final cleanup still runs", () => {
  const staleUnlinkError = new Error("stale fixture unlink failed");
  const fixtureState = createFixtureFs({
    initiallyExists: true,
    unlinkErrors: [staleUnlinkError]
  });
  let spawnCalled = false;

  assert.throws(() => runSelfTest({
    fs: fixtureState.fs,
    childProcess: {
      spawnSync() {
        spawnCalled = true;
        throw new Error("generation should not run after stale unlink fails");
      }
    },
    writeOutput() {
      assert.fail("self-test must not report success");
    },
    writeError() {
      assert.fail("successful retry cleanup should not report a cleanup error");
    }
  }), error => error === staleUnlinkError);

  assert.equal(spawnCalled, false);
  assert.deepEqual(fixtureState.unlinkCalls, [fixture, fixture]);
});

test("a final unlink failure is reported without masking a probe error", () => {
  const probeError = new Error("probe execution failed");
  const finalUnlinkError = new Error("final fixture unlink failed");
  const fixtureState = createFixtureFs({ unlinkErrors: [finalUnlinkError] });
  const cleanupReports = [];
  let spawnCalls = 0;

  assert.throws(() => runSelfTest({
    fs: fixtureState.fs,
    childProcess: {
      spawnSync(_executable, args) {
        spawnCalls += 1;
        if (args[0] === "tools/generate-fixture.cjs") {
          fixtureState.markExists();
          return { status: 0, stderr: "", stdout: "" };
        }
        if (args[0] === "tools/audio-probe.cjs") throw probeError;
        throw new Error(`unexpected child process: ${args[0]}`);
      }
    },
    writeOutput() {
      assert.fail("self-test must not report success");
    },
    writeError(message) {
      cleanupReports.push(message);
    }
  }), error => error === probeError);

  assert.equal(spawnCalls, 2);
  assert.deepEqual(fixtureState.unlinkCalls, [fixture]);
  assert.equal(cleanupReports.length, 1);
  assert.match(cleanupReports[0], /Audio Forge self-test cleanup failed/);
  assert.match(cleanupReports[0], /final fixture unlink failed/);
});

test("a cleanup-only failure fails the self-test instead of printing success", () => {
  const cleanupError = new Error("cleanup-only unlink failed");
  const fixtureState = createFixtureFs({ unlinkErrors: [cleanupError] });
  let outputWritten = false;

  assert.throws(() => runSelfTest({
    fs: fixtureState.fs,
    childProcess: {
      spawnSync(_executable, args) {
        if (args[0] === "tools/generate-fixture.cjs") {
          fixtureState.markExists();
          return { status: 0, stderr: "", stdout: "" };
        }
        if (args[0] === "tools/audio-probe.cjs") {
          return {
            status: 0,
            stderr: "",
            stdout: JSON.stringify({ status: "PROVEN", bytes: 45 })
          };
        }
        throw new Error(`unexpected child process: ${args[0]}`);
      }
    },
    writeOutput() {
      outputWritten = true;
    },
    writeError() {
      assert.fail("cleanup-only failure has no prior error to report alongside");
    }
  }), error => error === cleanupError);

  assert.equal(outputWritten, false);
});
