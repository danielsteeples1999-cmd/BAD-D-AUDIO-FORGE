# BAD-D // AUDIO FORGE

Standalone specialist laboratory for real music and DJ/audio engineering experiments.

Music brain: listen, analyse, transition, tune, compare, validate.

Capabilities:
- real audio fixture experiments
- signal and continuity measurement
- BPM/key/phrase/timing validation
- transition experiments
- perceptual-vs-numerical testing
- failure/recovery attacks
- regression evidence
- resource and long-run testing
- explicit future Auto-DJ adapter validation

Never modify private BAD-D production. Never treat simulation as production evidence.

## Local quick start

The scripts use Node.js built-ins; no npm dependencies are declared. Run the same self-test used by CI (Node.js 20):

```sh
npm run self-test
```

The self-test generates a synthetic 10-second, 48 kHz stereo PCM16 tone and checks that the container-level probe reports a non-empty file. The probe reports byte count and SHA-256; it does not decode PCM or establish playback or listening evidence.

To run fixture generation and probing separately:

```sh
npm run fixture
npm run probe -- fixtures/tone-440hz-10s.wav
```

The fixture command writes `fixtures/tone-440hz-10s.wav`; remove the generated file when you are done if you do not want to keep it.

Start with CLAUDE_NOW.md, then EXPERIMENT_PRIORITY_QUEUE.md, then only files required for the active experiment.

First milestone: AUDIO-AUTODJ-001.
