# MUSIC INTELLIGENCE JOB PACK — MI-001 TO MI-010

Status: PROPOSED / QUEUED — definitions created; no job has been executed or verified.
Owner: Open contribution. Every worker must record their real agent/person identity.
Canonical home: BAD-D AUDIO FORGE. This pack extends the existing experiment queue; it does not create a second scheduler, song database, or evidence store.

## Mission

Improve BAD-D's ability to hear, describe, understand, assess, and improve music using repeatable tests and reusable evidence. Measure task performance; do not claim consciousness, taste, or human-level musical intellect from a score.

## Shared operating rules

- Follow `CLAUDE_NOW.md` and `EXPERIMENT_PRIORITY_QUEUE.md` first.
- Respect the existing P0/P1 audio-engineering work. These MI jobs are P2 and must not displace the active real-audio proof, attack/recovery, timing, or regression work.
- Use only supplied or explicitly authorised audio fixtures. If audio is unavailable, mark the audio-dependent part BLOCKED; do not pretend to have listened or invent BPM, key, lyrics, vocal traits, or timestamps.
- Preserve originals. Analyse and recommend; never rewrite, remix, overwrite, publish, or promote a song unless separately authorised.
- Separate machine measurements, model interpretation, and human listening. A numerical feature is not proof of perception.
- Blind the worker to reference answers where practical. Keep reference labels hidden until the response is committed.
- Every result records: job ID, worker identity, reviewer identity, date, fixture/song ID and version fingerprint, input provenance, method/tool versions, observations, measured results, confidence, unknowns, evidence links, disagreements, decision, reusable lesson, and next action.
- Use status terms: CLAIMED / IN_PROGRESS / BLOCKED / FAILED / OBSERVED / VERIFIED / ACCEPTED. A job is not VERIFIED merely because a report exists.
- Independent reviewer must challenge evidence. Record disagreements rather than averaging them away.
- Persist evidence in the existing Audio Forge evidence/results location discovered by the worker. Link it from the job result and the Music Brain index if that index is already connected. Do not create a parallel archive.
- Claude and other workers must retrieve the stored result by job ID before claiming prior learning. A file existing is not proof that retrieval works; test retrieval and record it.

## Standard result contract

Each completed job produces:
1. `RESULT.md`: question, worker/reviewer, fixture/version, method, observations, evidence, confidence, limitations, verdict, reusable lesson, next job.
2. Machine-readable result (JSON or existing project format): stable IDs, numeric fields, units, confidence, provenance, and evidence paths. Reuse an existing schema if present; do not invent a competing schema.
3. Regression/reference fixture or blinded answer key only when lawful and available; never commit copyrighted audio or private source material without permission.
4. Retrieval check: a second worker/Claude session locates and correctly summarises the stored lesson using the job ID.

## Job ladder

### MI-001 — Musical Listening Accuracy Benchmark
Priority: P2 / foundation. Status: QUEUED.
Question: Can BAD-D accurately describe what is actually audible, without filling gaps with guesses?
Inputs: A small, authorised, diverse set of complete tracks or excerpts; reference annotations from at least one independent human listener.
Work: Record audible instruments/sources, vocal presence and delivery, broad structure, salient events, and uncertainty. Timestamp claims where possible. Separate directly audible facts from interpretation.
Score: Accuracy of independently checkable observations; unsupported-claim rate; abstention quality; timestamp error.
Acceptance: At least 20 scored claims across at least 5 fixtures; independent reference; all claims traceable to evidence; unsupported claims explicitly counted; reviewer reproduces scoring.
Output lesson: What BAD-D reliably hears, misses, and should abstain from.

### MI-002 — Rhythm, BPM and Groove Comprehension
Priority: P2. Depends on MI-001 and available audio measurement path. Status: QUEUED.
Question: Can BAD-D distinguish tempo, pulse, subdivision, swing/feel, syncopation, and perceived groove?
Work: Compare estimates with trusted measurement/reference annotations; test half-time/double-time ambiguity, tempo changes, syncopation, and intentionally loose timing. Do not equate BPM with groove.
Score: BPM error, beat/downbeat error, ambiguity handling, groove-description agreement.
Acceptance: At least 10 varied fixtures; units and reference method stated; half/double-time cases explicitly tested; uncertainty reported.

### MI-003 — Melody and Harmony Comprehension
Priority: P2. Depends on MI-001 and a verified audio analysis path. Status: QUEUED.
Question: Can BAD-D describe melodic movement and harmonic behaviour without inventing exact notes or chords?
Work: Identify tonal centre/key only when evidence supports it; describe contour, repetition, tension, harmonic change, and uncertainty. Compare exact note/chord claims only against a reliable reference.
Score: Reference agreement for checkable claims, false-specificity rate, contour/harmonic explanation quality.
Acceptance: At least 8 fixtures spanning clear and ambiguous harmony; exact-note claims separately scored from broad descriptions.

### MI-004 — Hook Recognition and Memorability
Priority: P2. Depends on MI-001. Status: QUEUED.
Question: Can BAD-D locate the hook and explain why it is recognisable or memorable?
Work: Identify candidate hooks, recurrence, placement, melodic/rhythmic/lyrical identity, contrast, and listener recall evidence. Do not assume loudest or most repeated section is the hook.
Score: Human-reference hook-location agreement, timestamp accuracy, recall/recognition agreement where listener data exists, explanation usefulness.
Acceptance: At least 10 tracks with independently annotated candidate hooks; include songs where hook is subtle, delayed, or not a conventional chorus. No listener study means memorability claims remain INFERRED.

### MI-005 — Lyric-to-Melody Compatibility
Priority: P2. Depends on MI-001 and authorised lyric/audio pairing. Status: QUEUED.
Question: Do words, syllables, stress, phrasing, melody, and delivery work together?
Work: Align supplied lyrics to audible phrasing; inspect natural word stress, syllable density, breath/phrase length, vowel sustain, consonant collisions, rhyme placement, and emotional/delivery fit. Preserve original wording.
Score: Alignment accuracy, stress mismatch detection, phrase-fit agreement, evidence-backed issue precision.
Acceptance: At least 8 lyric/audio pairs; quote only supplied lyrics; timestamp or bar/phrase references for each major claim; no unverified lyric transcription.

### MI-006 — Vocal Performance and Phrasing Assessment
Priority: P2. Depends on MI-001. Status: QUEUED.
Question: Can BAD-D assess vocal execution separately from voice identity, genre, and production effects?
Work: Assess pitch/timing where measurable, articulation, phrasing, dynamics, breath, tone, emotional delivery, diction, and intentional imperfection. Distinguish performance from processing and style stereotypes.
Score: Agreement with independent listeners on defined dimensions; measurable pitch/timing error only where reliable; false attribution rate.
Acceptance: At least 8 varied vocal fixtures; separate observation from interpretation; no demographic or identity inference.

### MI-007 — Arrangement and Dynamics Comprehension
Priority: P2. Depends on MI-001. Status: QUEUED.
Question: Can BAD-D explain how layers, sections, density, contrast, and energy evolve?
Work: Map section changes, entrances/exits, transitions, build/drop, repetition/variation, space, and dynamic arc. Distinguish arrangement from loudness/mastering.
Score: Section-boundary accuracy, event detection precision/recall, explanation agreement.
Acceptance: At least 8 tracks; annotated timeline; include sparse, dense, static, and evolving arrangements.

### MI-008 — Production and Mix Assessment
Priority: P2. Depends on MI-001 and reliable playback/measurement. Status: QUEUED.
Question: Can BAD-D identify production/mix issues without confusing preference with technical fault?
Work: Assess balance, masking, stereo, dynamics, distortion/clipping, noise, low/high-frequency balance, vocal placement, and translation limitations. Separate measurable faults, likely issues, and aesthetic choices.
Score: Reproducible measurement agreement where applicable; independent reviewer agreement; false-positive rate for alleged faults.
Acceptance: At least 8 fixtures including clean, intentionally distorted, dense, and deliberately unconventional mixes; each claim labelled TECHNICAL / AESTHETIC / UNKNOWN.

### MI-009 — Consistent Song-Rating Calibration
Priority: P2. Depends on MI-001 to MI-008 pilot evidence. Status: QUEUED.
Question: Can BAD-D apply a stable, transparent rubric and explain why a score changes?
Default pilot rubric (weights sum to 100):
- Songwriting and originality: 20
- Hook and memorability: 20
- Composition: 15
- Vocal performance: 15
- Arrangement and dynamics: 10
- Production and mix: 10
- Emotional impact: 10
Work: Rate a blinded set, repeat ratings after a delay, compare with independent human ratings, expose uncertainty, and test whether score shifts are justified by evidence. Do not treat human consensus as universal truth.
Score: Repeatability, inter-rater agreement, calibration/error against the defined reference, evidence coverage, and uncertainty quality.
Acceptance: At least 10 fixtures, two independent ratings per fixture, one repeat pass; report category and total scores; show disagreement and avoid false precision. Change rubric only through a versioned proposal.

### MI-010 — Evidence-Backed Improvement and Retest
Priority: P2 / capstone. Depends on MI-001 to MI-009 pilot results. Status: QUEUED.
Question: Can BAD-D recommend a bounded change that improves a target without damaging the song's identity?
Work: Select the weakest high-impact issue supported by evidence; define one measurable target; propose the smallest change; preserve original lyrics, voice identity, core genre, and arrangement unless explicitly authorised otherwise. Compare original and revised versions blind where possible.
Score: Target improvement, collateral regression, identity preservation, reviewer agreement, and whether the change was actually tested.
Acceptance: At least 5 before/after pairs; each has a predeclared target and unchanged control dimensions; independent blind comparison; report wins, losses, and inconclusive cases. A prompt or recommendation alone is NOT a successful improvement.
Output lesson: Which bounded interventions reliably help which musical problems.

## Capability scorecard

Report these as separate evidence-based scores, not a single inflated "intelligence" number:
- Listening accuracy /100
- Rhythm and timing comprehension /100
- Melody/harmony comprehension /100
- Hook comprehension /100
- Lyric/melody fit /100
- Vocal assessment reliability /100
- Arrangement comprehension /100
- Production assessment reliability /100
- Rating calibration /100
- Improvement success /100
- Evidence retrieval success /100

For every score publish sample size, fixture coverage, reference method, date, uncertainty, and last verified job. If there is no adequate test set, report UNKNOWN rather than 0 or an invented percentage.

## Execution order and dependencies

MI-001 -> MI-002, MI-003, MI-004, MI-006, MI-007, MI-008 -> MI-005 -> MI-009 -> MI-010.
Jobs may be split into independent fixture batches, but do not duplicate the same fixture work. The existing AUDIO-FORGE P0/P1 queue remains ahead of this P2 ladder. Start MI-001 when the existing priority queue permits it and authorised fixtures are available.

## Completion rule

A job advances to VERIFIED only after its acceptance criteria are met and an independent reviewer signs the evidence. It advances to ACCEPTED only after the result is indexed and a separate worker/Claude retrieval check succeeds. Until then it remains QUEUED, IN_PROGRESS, BLOCKED, or FAILED as appropriate.
