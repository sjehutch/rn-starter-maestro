## 🤖 Codex Usage

All Codex prompts must start with:

> Before generating any code, read and strictly follow CODEX_GUIDELINES.md.  
> Before finalizing output, validate against CODEX_CHECKLIST.md.

These files are authoritative and non-negotiable.

You are working in an existing Expo + React Native + TypeScript repo.

1) Create a new root-level markdown file named: CODEX_CHECKLIST.md

2) This file is a “pre-flight checklist” that Codex MUST follow before it outputs any code changes.
It must be short, strict, and easy to scan. Use checkboxes. No fluff.

3) The file must contain these sections IN THIS ORDER:

================================================================================
## When you’re unsure
================================================================================
- Choose the simplest approach.
- Prefer fewer files.
- Leave a short comment explaining the tradeoff.

================================================================================
## Codex-only rules (humans can ignore)
================================================================================
- Do not introduce abstractions unless they remove real duplication.
- Do not split files unless it improves human discoverability.
- Prefer explicit code over “magic” helpers.
- Add short comments where intent is not obvious.
- If a rule conflicts with simplicity, favor simplicity and leave a comment.

================================================================================
## Pre-flight checklist (must pass before generating code)
================================================================================
Include ALL of the following checklist items (wording can be tightened but meaning must stay):

Architecture & Simplicity
- [ ] I chose the simplest working solution (no cleverness).
- [ ] I did not add new layers/abstractions unless they removed real duplication.
- [ ] I did not create extra files “just to be consistent”.
- [ ] File placement matches the repo rules (src/app, src/features, src/components, src/shared).

TypeScript Safety
- [ ] No `any` used. If unknown data exists, I used `unknown` + narrowing.
- [ ] All async calls have error handling (try/catch or Query error states).
- [ ] No unsafe non-null assertions (`!`) unless explained with a comment.
- [ ] Types reflect reality (no lying types).

Naming & Readability
- [ ] Names are human-readable and boring (no abbreviations).
- [ ] Booleans start with is/has/can/should.
- [ ] Functions/variables describe intent, not implementation.
- [ ] If something is non-obvious, I added a small comment.

UI / UX (HIG-friendly)
- [ ] Touch targets are reasonable and consistent.
- [ ] Loading, empty, and error states exist for async screens.
- [ ] I avoided UI work on the main thread that could cause jank.
- [ ] Keyboard behavior is handled for forms:
      - dismiss on outside tap
      - focused input remains visible

Accessibility & Testability (Maestro-ready)
- [ ] All tappable controls have accessibilityRole + accessibilityLabel.
- [ ] All reusable Buttons forward `testID`.
- [ ] Screens include stable test anchors for key actions.
- [ ] Tests prefer id selectors over visible text when possible.

Error Handling & Logging
- [ ] Programmer mistakes throw errors (or fail fast).
- [ ] User/network failures are shown in UI (not swallowed).
- [ ] I used the shared logger instead of console.* (unless explicitly allowed).

Performance
- [ ] I avoided unnecessary re-renders (no giant inline objects in props unless harmless).
- [ ] Long lists use FlatList (not ScrollView) when appropriate.
- [ ] Images are sized reasonably and not causing layout thrash.

Documentation
- [ ] If I made a tradeoff, I left a short comment explaining why.
- [ ] If behavior differs on iOS vs Android, I documented it.

================================================================================
## Output format rules for Codex
================================================================================
- Before writing code, briefly state which checklist items are most relevant.
- If any checkbox cannot be satisfied, STOP and explain why (and propose the simplest alternative).
- Keep diffs minimal.

================================================================================
## Maestro UI Testing (Android-first)
================================================================================
- [ ] Do not break existing Maestro tests.
- [ ] Prefer Android-stable selectors (testID + accessibilityLabel).
- [ ] Avoid relying on visible text when a stable id is available.
- [ ] Do not depend on Expo Go–specific behavior.
- [ ] iOS Maestro support is best-effort:
      - avoid iOS-only hacks
      - do not block changes on iOS flakiness
- [ ] If a UI element must be hard to test, add a comment explaining why.

4) Do not change any existing files other than adding CODEX_CHECKLIST.md.

Codex: If you violate any rule above, explain why before producing code.