# Task 2c: Step-Based SVG Redesign for topic-context-engineering.ts

## Summary
Redesigned all 4 SVG diagrams in `/home/z/my-project/src/data/topic-context-engineering.ts` with step-based approach (Шаг 1, Шаг 2, Шаг 3).

## What was done
- Replaced all 4 `svgContent` strings with new step-based visualizations
- Each diagram uses "Шаг N" numbered cards with circle + title + description
- Vertical layout with thin connecting lines between steps
- Bottom insight bar with key takeaway
- No arrows, no directional indicators in any SVG
- All non-SVG content preserved unchanged

## Diagrams
1. **Конвейер управления контекстом** (5 steps, 600×450) - primary/secondary colors
2. **Иерархия памяти LLM** (4 steps, 600×400) - accent/secondary colors
3. **Конвейер сжатия контекста** (5 steps, 600×450) - warning/secondary/primary colors
4. **Map-Reduce суммаризация** (5 steps, 600×450) - warning/primary/accent/secondary colors

## Verification
- Lint: no errors in topic-context-engineering.ts
- Dev server: compiling successfully
- No arrows or directional indicators in SVGs
- All step content matches task specification
