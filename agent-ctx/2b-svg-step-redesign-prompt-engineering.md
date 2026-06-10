# Task 2b: Step-Based SVG Redesign for topic-prompt-engineering.ts

## Summary
Redesigned all 5 SVG diagrams in `/home/z/my-project/src/data/topic-prompt-engineering.ts` with step-based approach (Шаг 1, Шаг 2, Шаг 3), replacing previous metaphor-based diagrams.

## Diagrams Replaced

1. **Zero-shot Prompting** → 3 steps (Системный промпт, Пользовательский запрос, Ответ LLM)
2. **Few-shot Prompting** → 5 steps (Пример 1-3, Новый запрос, In-Context Learning)
3. **Chain of Thought** → 5 steps (Вопрос, Разбиваем, Вычисляем, Складываем, Финальный ответ)
4. **ReAct** → 5 steps (Thought, Action, Observation, Repeat, Final Answer)
5. **Structured Output** → 4 steps (Определить схему, Системный промпт, Пример формата, Валидация)

## Key Technical Decisions
- Colors are semantically meaningful per step type (primary for core, secondary for I/O, accent for results, warning for cycles)
- Final step uses higher opacity (0.12 bg, 0.25 circle) to visually distinguish as conclusion
- All step titles include "Шаг N:" prefix
- Thin connector lines between numbered circles (stroke-width 1.5, opacity 0.3)
- No arrows, no directional indicators in any SVG

## Challenges
- Initial regex approach failed because `slug: 'few-shot'[\s\S]*?svgContent:` matched wrong svgContent due to furtherReading slug references
- Fixed with position-based replacement (finding slug positions, then replacing SVG within each subtopic)
- Required two replacement passes for CoT and Structured Output that weren't matched initially
