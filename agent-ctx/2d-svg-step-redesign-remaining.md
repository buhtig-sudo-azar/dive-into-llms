# Task 2d: Step-Based SVG Redesign for topic-remaining.ts

## Summary
Redesigned ALL 17 SVG diagrams in `/home/z/my-project/src/data/topic-remaining.ts` with step-based approach (Шаг 1, Шаг 2, Шаг 3), replacing previous metaphor-based diagrams.

## What was done
- Created Python script `/home/z/my-project/replace_svgs.py` to generate and replace all 17 SVGs
- Each SVG uses consistent step-based template: numbered circles, title with "Шаг N:" prefix, description, connecting lines
- Colors cycle through 4 oklch colors (primary, secondary, accent, warning)
- Bottom insight bar on every diagram
- No arrows, no arrowheads, no directional indicators

## Files modified
- `/home/z/my-project/src/data/topic-remaining.ts` — all 17 SVG diagrams replaced

## Verification
- 17 SVGs confirmed in file via `rg -c "<svg"` = 17
- No arrows found via regex check
- "Шаг" appears 17 times (one per SVG)
- Lint passes with no errors for topic-remaining.ts
- Dev server compiling successfully

## Related tasks
- Task 2c: topic-context-engineering.ts (4 SVGs) — completed
- Task 2e: topic-mcp.ts (6 SVGs) — completed
