# AUDIO-FORGE-001 — Repeatable Evidence Contract

Make every audio experiment produce evidence another worker can reuse without reconstructing the original conversation.

Minimum record:
- EXPERIMENT_ID
- JOB_ID
- fixture identity and checksum when available
- source duration / format / sample rate / channels
- environment / browser / runtime
- exact command or runner
- expected result
- observed result
- evidence state
- artifact paths
- limitations
- NEXT_JOB

Rules:
1. Simulation is not real-music or listening evidence.
2. A passing numerical check proves only the measured property.
3. Preserve failed runs as evidence.
4. Reuse existing fixtures/artifacts before generating another.
5. Never modify BAD-D production from this repository.

Acceptance: another worker can reproduce the experiment from this record without needing the original chat context.