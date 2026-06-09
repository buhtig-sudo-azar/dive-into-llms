import { TopicCategory } from '@/types';

export const contextEngineering: TopicCategory = {
  slug: 'context-engineering',
  title: 'Context Engineering',
  description: 'Управление контекстом LLM: память, сжатие, суммаризация и оптимизация контекстного окна',
  iconName: 'Layers',
  subtopics: [
    {
      slug: 'context',
      title: 'Управление контекстом',
      categorySlug: 'context-engineering',
      introduction: {
        what: 'Управление контекстом — это практика оптимизации информации, которую LLM получает в рамках одного запроса. Контекст включает системный промпт, историю диалога, внешние данные и пользовательский запрос. Цель — дать модели ровно ту информацию, которая нужна для качественного ответа, не перегружая и не обедняя контекст.',
        why: 'Управление контекстом критически важно, потому что контекстное окно ограничено, а качество ответа напрямую зависит от качества контекста. Слишком много информации — модель теряется в шуме. Слишком мало — модель не имеет нужных данных для точного ответа.',
        where: 'Управление контекстом применяется в чат-ботах с длинной историей, RAG-системах, мультиагентных системах, системах с доступом к инструментам и любом приложении, где LLM работает с большими объёмами данных.',
        problem: 'Управление контекстом решает проблему «информационного шума» — когда модель получает слишком много нерелевантной информации и не может выделить важное. Это также решает проблему «утечки контекста» — когда старые или нерелевантные данные влияют на текущий ответ.',
      },
      theory: {
        terms: [
          { term: 'Context Window', definition: 'Максимальный объём токенов, доступный в одном запросе. Включает вход и выход модели.' },
          { term: 'Context Priority', definition: 'Ранжирование информации по важности для текущего запроса. Наиболее релевантные данные размещаются ближе к началу или концу контекста.' },
          { term: 'Context Overflow', definition: 'Ситуация превышения лимита контекстного окна, требующая обрезки или сжатия данных.' },
          { term: 'Lost in the Middle', definition: 'Феномен, при котором модель хуже усваивает информацию в середине длинного контекста по сравнению с началом и концом.' },
        ],
        principles: 'Эффективное управление контекстом строится на трёх принципах: релевантность (только нужная информация), достаточность (всё необходимое для ответа) и лаконичность (минимум токенов). Исследования показывают, что модель лучше усваивает информацию в начале и конце контекста (эффект «Lost in the Middle»), поэтому критически важные данные следует размещать на этих позициях. Релевантные документы из RAG лучше ставить в начало, а чёткую инструкцию — в конец.',
        architecture: 'Система управления контекстом обычно включает: приоритизатор (определяет, что важно), компрессор (сжимает или удаляет неважное), форматер (структурирует контекст) и монитор (отслеживает заполненность окна). В RAG-системах приоритизатор работает на основе векторного сходства, в чат-ботах — на основе давности и релевантности сообщений.',
        connections: 'Управление контекстом — центральная тема для RAG (выборка релевантных фрагментов), Prompt Engineering (оптимизация инструкций), Memory (хранение истории) и AI Agents (управление состоянием агента).',
      },
      diagram: {
        type: 'architecture',
        title: 'Конвейер управления контекстом',
        svgContent: `<svg viewBox="0 0 600 460" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="600" height="460" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="14" font-weight="bold">Фильтр-кофе: Управление контекстом</text>

  <!-- Coffee ingredient sacks at top -->
  <rect x="28" y="44" width="118" height="44" rx="7" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.2"/>
  <text x="87" y="62" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">Системный промпт</text>
  <ellipse cx="58" cy="80" rx="5" ry="3" transform="rotate(-20,58,80)" fill="oklch(0.4 0.08 90)" opacity="0.5"/>
  <ellipse cx="87" cy="82" rx="4" ry="2.5" transform="rotate(15,87,82)" fill="oklch(0.4 0.08 90)" opacity="0.45"/>
  <ellipse cx="116" cy="79" rx="5" ry="3" transform="rotate(-8,116,79)" fill="oklch(0.4 0.08 90)" opacity="0.5"/>

  <rect x="156" y="44" width="118" height="44" rx="7" fill="oklch(0.55 0.15 165)" opacity="0.22" stroke="oklch(0.55 0.15 165)" stroke-width="1.2"/>
  <text x="215" y="62" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">RAG документы</text>
  <ellipse cx="186" cy="80" rx="5" ry="3" transform="rotate(-25,186,80)" fill="oklch(0.45 0.1 120)" opacity="0.5"/>
  <ellipse cx="215" cy="82" rx="4" ry="2.5" transform="rotate(10,215,82)" fill="oklch(0.45 0.1 120)" opacity="0.45"/>
  <ellipse cx="244" cy="79" rx="5" ry="3" transform="rotate(-12,244,79)" fill="oklch(0.45 0.1 120)" opacity="0.5"/>

  <rect x="284" y="44" width="118" height="44" rx="7" fill="oklch(0.55 0.15 165)" opacity="0.28" stroke="oklch(0.55 0.15 165)" stroke-width="1.2"/>
  <text x="343" y="62" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">История диалога</text>
  <ellipse cx="314" cy="80" rx="5" ry="3" transform="rotate(-18,314,80)" fill="oklch(0.5 0.08 140)" opacity="0.5"/>
  <ellipse cx="343" cy="82" rx="4" ry="2.5" transform="rotate(18,343,82)" fill="oklch(0.5 0.08 140)" opacity="0.45"/>
  <ellipse cx="372" cy="79" rx="5" ry="3" transform="rotate(-5,372,79)" fill="oklch(0.5 0.08 140)" opacity="0.5"/>

  <rect x="412" y="44" width="160" height="44" rx="7" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.2"/>
  <text x="492" y="62" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">Запрос пользователя</text>
  <ellipse cx="442" cy="80" rx="5" ry="3" transform="rotate(-20,442,80)" fill="oklch(0.65 0.12 55)" opacity="0.5"/>
  <ellipse cx="472" cy="82" rx="4" ry="2.5" transform="rotate(12,472,82)" fill="oklch(0.65 0.12 55)" opacity="0.45"/>
  <ellipse cx="502" cy="79" rx="5" ry="3" transform="rotate(-8,502,79)" fill="oklch(0.65 0.12 55)" opacity="0.5"/>
  <ellipse cx="530" cy="81" rx="4" ry="2.5" transform="rotate(5,530,81)" fill="oklch(0.65 0.12 55)" opacity="0.45"/>

  <!-- Coffee grounds falling -->
  <circle cx="87" cy="100" r="2" fill="oklch(0.4 0.08 90)" opacity="0.3"/>
  <circle cx="130" cy="106" r="1.5" fill="oklch(0.4 0.08 90)" opacity="0.22"/>
  <circle cx="215" cy="100" r="2" fill="oklch(0.45 0.1 120)" opacity="0.3"/>
  <circle cx="258" cy="106" r="1.5" fill="oklch(0.45 0.1 120)" opacity="0.22"/>
  <circle cx="343" cy="100" r="2" fill="oklch(0.5 0.08 140)" opacity="0.3"/>
  <circle cx="386" cy="106" r="1.5" fill="oklch(0.5 0.08 140)" opacity="0.22"/>
  <circle cx="492" cy="100" r="2" fill="oklch(0.65 0.12 55)" opacity="0.3"/>
  <circle cx="458" cy="106" r="1.5" fill="oklch(0.65 0.12 55)" opacity="0.22"/>

  <!-- Pour-over stand -->
  <line x1="178" y1="120" x2="178" y2="280" stroke="oklch(0.55 0.15 165)" stroke-width="1.8" opacity="0.25"/>
  <line x1="422" y1="120" x2="422" y2="280" stroke="oklch(0.55 0.15 165)" stroke-width="1.8" opacity="0.25"/>
  <line x1="168" y1="280" x2="432" y2="280" stroke="oklch(0.55 0.15 165)" stroke-width="1.8" opacity="0.25"/>

  <!-- V60 dripper body -->
  <path d="M178,120 L300,238 L422,120" fill="oklch(0.55 0.15 165)" opacity="0.06" stroke="oklch(0.55 0.15 165)" stroke-width="2"/>
  <!-- Dripper rim ellipse -->
  <ellipse cx="300" cy="120" rx="122" ry="11" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" stroke-opacity="0.5"/>
  <!-- Dripper inner ridges -->
  <line x1="208" y1="148" x2="392" y2="148" stroke="oklch(0.55 0.15 165)" stroke-width="0.6" opacity="0.15"/>
  <line x1="228" y1="172" x2="372" y2="172" stroke="oklch(0.55 0.15 165)" stroke-width="0.6" opacity="0.15"/>
  <line x1="248" y1="196" x2="352" y2="196" stroke="oklch(0.55 0.15 165)" stroke-width="0.6" opacity="0.15"/>

  <!-- Filter text inside dripper -->
  <text x="300" y="152" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Приоритизация</text>
  <text x="300" y="172" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">+ Сжатие</text>
  <text x="300" y="192" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">+ Форматирование</text>

  <!-- Drip drops from filter -->
  <ellipse cx="298" cy="248" rx="2" ry="5" fill="oklch(0.45 0.1 75)" opacity="0.45"/>
  <ellipse cx="302" cy="264" rx="1.5" ry="4" fill="oklch(0.45 0.1 75)" opacity="0.35"/>
  <ellipse cx="300" cy="278" rx="2" ry="4" fill="oklch(0.45 0.1 75)" opacity="0.25"/>

  <!-- Coffee cup body -->
  <path d="M200,300 L212,390 C212,406 388,406 388,390 L400,300 Z" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="2" stroke-opacity="0.6"/>
  <!-- Cup rim -->
  <ellipse cx="300" cy="300" rx="100" ry="12" fill="oklch(0.75 0.15 75)" opacity="0.05" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" stroke-opacity="0.5"/>
  <!-- Coffee liquid inside -->
  <path d="M207,312 L215,385 C215,398 385,398 385,385 L393,312 Z" fill="oklch(0.35 0.08 75)" opacity="0.12"/>
  <!-- Cup handle -->
  <path d="M400,322 C432,322 436,372 400,376" fill="none" stroke="oklch(0.75 0.15 75)" stroke-width="3.5" stroke-opacity="0.4"/>
  <!-- Cup saucer -->
  <ellipse cx="300" cy="406" rx="118" ry="14" fill="oklch(0.75 0.15 75)" opacity="0.04" stroke="oklch(0.75 0.15 75)" stroke-width="1" stroke-opacity="0.25"/>

  <!-- Cup label -->
  <text x="300" y="350" text-anchor="middle" fill="var(--foreground)" font-size="13" font-weight="bold">Оптимизированный</text>
  <text x="300" y="370" text-anchor="middle" fill="var(--foreground)" font-size="13" font-weight="bold">контекст</text>

  <!-- Quality badge on saucer -->
  <text x="300" y="442" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="10" font-weight="600">Релевантный + Достаточный + Лаконичный</text>

  <!-- Steam wisps -->
  <path d="M265,292 C262,274 270,266 267,248" fill="none" stroke="var(--muted-foreground)" stroke-width="1.5" opacity="0.28" stroke-linecap="round"/>
  <path d="M300,288 C297,270 305,262 302,244" fill="none" stroke="var(--muted-foreground)" stroke-width="1.5" opacity="0.22" stroke-linecap="round"/>
  <path d="M335,292 C332,274 340,266 337,248" fill="none" stroke="var(--muted-foreground)" stroke-width="1.5" opacity="0.28" stroke-linecap="round"/>
</svg>`,
      },
      practicalExamples: [
        {
          title: 'Приоритизация контекста',
          description: 'Пример организации контекста с учётом эффекта «Lost in the Middle».',
          code: `function buildOptimalContext(system: string, docs: string[], 
                     history: Message[], query: string): Message[] {
  return [
    // 1. Системный промпт (начало — хорошо запоминается)
    { role: 'system', content: system },
    // 2. RAG документы (начало — высокий приоритет)
    ...docs.map(d => ({ role: 'user' as const, content: \`[Контекст] \${d}\` })),
    // 3. История (середина — наименее важное)
    ...history.slice(-6),
    // 4. Текущий запрос (конец — хорошо запоминается)
    { role: 'user', content: query }
  ];
}`,
          language: 'typescript',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Класть всю информацию без приоритизации',
          explanation: 'Загрузка всего контекста без сортировки приводит к тому, что важные данные теряются среди шума, особенно в середине контекста.',
          correctApproach: 'Ранжируйте информацию по релевантности. Самое важное — в начало и конец. Менее важное — в середину или удалите.',
        },
      ],
      sandboxes: [
        {
          type: 'temperature',
          title: 'Температура и контекст',
          description: 'Посмотрите, как температура влияет на качество ответа при работе с контекстом. Низкая температура — точные ответы из контекста, высокая — более творческие.',
          defaultPrompt: 'Объясни простыми словами, что такое контекстное окно LLM',
          defaultTemperature: 0.5,
        },
      ],
      furtherReading: [
        { topic: 'Память в LLM', slug: 'memory', categorySlug: 'context-engineering' },
        { topic: 'Сжатие контекста', slug: 'compression', categorySlug: 'context-engineering' },
        { topic: 'RAG — Retrieval', slug: 'retrieval', categorySlug: 'rag' },
      ],
    },
    {
      slug: 'memory',
      title: 'Память в LLM',
      categorySlug: 'context-engineering',
      introduction: {
        what: 'Память в контексте LLM — это механизмы хранения и извлечения информации между запросами. Поскольку LLM не имеет встроенной долговременной памяти (каждый запрос независим), память реализуется внешними системами: от простого сохранения истории диалога до сложных векторных хранилищ с RAG.',
        why: 'Память нужна, потому что без неё каждый диалог с LLM начинается с нуля. Это неприемлемо для ассистентов, которые должны помнить предпочтения пользователя, контекст прошлых разговоров и накопленные знания. Память превращает LLM из одноразового инструмента в персонализированного ассистента.',
        where: 'Память используется в чат-ботах с продолжительными диалогами, персональных ассистентах, образовательных системах (запоминание прогресса), системах поддержки клиентов (история обращений) и AI-агентах (накопление опыта).',
        problem: 'Память решает проблему «амнезии» LLM: без внешнего хранилища модель не может ссылаться на прошлые взаимодействия. Это делает невозможным создание по-настоящему полезных ассистентов, которые знают своего пользователя.',
      },
      theory: {
        terms: [
          { term: 'Short-term Memory', definition: 'Контекст текущего диалога, хранящийся в контекстном окне.' },
          { term: 'Long-term Memory', definition: 'Внешнее хранилище (БД, векторная БД), сохраняющее информацию между сессиями.' },
          { term: 'Episodic Memory', definition: 'Память о конкретных событиях и взаимодействиях.' },
          { term: 'Semantic Memory', definition: 'Обобщённые знания и факты, извлечённые из взаимодействий.' },
        ],
        principles: 'Память LLM строится по иерархии: рабочая память (контекстное окно) → краткосрочная (история сессии) → долгосрочная (векторная БД). Эффективные системы памяти комбинируют оба уровня: важная информация немедленно доступна в контексте, а остальное извлекается по запросу через RAG.',
        architecture: 'Типичная система памяти включает: хранилище (векторная БД + реляционная БД), индексатор (преобразует взаимодействия в embeddings), извлекатель (находит релевантные воспоминания), и интегратор (вставляет воспоминания в контекст).',
        connections: 'Память тесно связана с RAG (извлечение из векторных БД), Compression (сжатие старых воспоминаний), Summarization (суммаризация истории) и AI Agents (агенты с состоянием).',
      },
      diagram: {
        type: 'architecture',
        title: 'Иерархия памяти LLM',
        svgContent: `<svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="600" height="420" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="14" font-weight="bold">Матрёшка памяти: Иерархия памяти LLM</text>

  <!-- Doll 1: Долгосрочная (largest, back) -->
  <path d="M25,335 C25,275 18,215 50,170 C62,150 65,115 110,78 C155,115 158,150 170,170 C202,215 195,275 195,335 Z"
        fill="oklch(0.55 0.15 165)" fill-opacity="0.1" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <path d="M65,153 C80,170 140,170 155,153" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="3" opacity="0.4"/>
  <circle cx="97" cy="103" r="3" fill="var(--foreground)" opacity="0.4"/>
  <circle cx="123" cy="103" r="3" fill="var(--foreground)" opacity="0.4"/>
  <path d="M100,115 C110,121 120,121 130,115" fill="none" stroke="var(--foreground)" stroke-width="1.5" opacity="0.3"/>
  <circle cx="110" cy="218" r="20" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="1.5" opacity="0.25"/>
  <circle cx="110" cy="218" r="8" fill="oklch(0.65 0.2 350)" opacity="0.15"/>
  <circle cx="75" cy="258" r="10" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="1" opacity="0.18"/>
  <circle cx="145" cy="258" r="10" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="1" opacity="0.18"/>
  <circle cx="110" cy="285" r="5" fill="oklch(0.65 0.2 350)" opacity="0.12"/>
  <text x="110" y="186" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Долгосрочная</text>
  <text x="110" y="200" text-anchor="middle" fill="var(--foreground)" font-size="9">(векторная БД)</text>
  <text x="110" y="312" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5">Безграничная, извлечение через RAG</text>

  <!-- Doll 2: Краткосрочная (medium) -->
  <path d="M235,335 C235,285 228,240 255,202 C265,186 268,158 300,128 C332,158 335,186 345,202 C372,240 365,285 365,335 Z"
        fill="oklch(0.55 0.15 165)" fill-opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <path d="M265,192 C278,206 322,206 335,192" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="2.5" opacity="0.45"/>
  <circle cx="290" cy="150" r="2.5" fill="var(--foreground)" opacity="0.4"/>
  <circle cx="310" cy="150" r="2.5" fill="var(--foreground)" opacity="0.4"/>
  <path d="M293,161 C300,166 307,166 314,161" fill="none" stroke="var(--foreground)" stroke-width="1.2" opacity="0.3"/>
  <circle cx="300" cy="248" r="14" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="1.2" opacity="0.3"/>
  <circle cx="300" cy="248" r="5" fill="oklch(0.65 0.2 350)" opacity="0.2"/>
  <circle cx="278" cy="275" r="8" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="0.8" opacity="0.2"/>
  <circle cx="322" cy="275" r="8" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="0.8" opacity="0.2"/>
  <text x="300" y="222" text-anchor="middle" fill="var(--foreground)" font-size="9" font-weight="bold">Краткосрочная</text>
  <text x="300" y="235" text-anchor="middle" fill="var(--foreground)" font-size="8">(история сессии)</text>
  <text x="300" y="312" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5">Последние N сообщений, БД сессии</text>

  <!-- Doll 3: Рабочая память (smallest, front) -->
  <path d="M445,335 C445,298 440,268 458,242 C466,230 470,212 490,192 C510,212 514,230 522,242 C540,268 535,298 535,335 Z"
        fill="oklch(0.55 0.15 165)" fill-opacity="0.32" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <path d="M470,233 C478,243 502,243 510,233" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="2" opacity="0.5"/>
  <circle cx="483" cy="210" r="2" fill="var(--foreground)" opacity="0.4"/>
  <circle cx="497" cy="210" r="2" fill="var(--foreground)" opacity="0.4"/>
  <path d="M486,218 C490,222 494,222 498,218" fill="none" stroke="var(--foreground)" stroke-width="1" opacity="0.3"/>
  <circle cx="490" cy="272" r="9" fill="none" stroke="oklch(0.65 0.2 350)" stroke-width="1" opacity="0.35"/>
  <circle cx="490" cy="272" r="3.5" fill="oklch(0.65 0.2 350)" opacity="0.22"/>
  <text x="490" y="252" text-anchor="middle" fill="var(--foreground)" font-size="7.5" font-weight="bold">Рабочая память</text>
  <text x="490" y="263" text-anchor="middle" fill="var(--foreground)" font-size="7">(контекст)</text>
  <text x="490" y="312" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5">Мгновенный доступ, ограничена окном</text>

  <!-- Nesting hint -->
  <text x="200" y="50" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5" font-style="italic">Каждая вложена в предыдущую</text>

  <!-- Base items: memory types -->
  <rect x="30" y="358" width="170" height="26" rx="5" fill="var(--muted)" opacity="0.4"/>
  <text x="115" y="375" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Episodic: события</text>
  <rect x="215" y="358" width="170" height="26" rx="5" fill="var(--muted)" opacity="0.4"/>
  <text x="300" y="375" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Semantic: факты</text>
  <rect x="400" y="358" width="170" height="26" rx="5" fill="var(--muted)" opacity="0.4"/>
  <text x="485" y="375" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Procedural: навыки</text>
  <text x="300" y="405" text-anchor="middle" fill="var(--muted-foreground)" font-size="8" font-style="italic">Типы памяти внутри матрёшки</text>
</svg>`,
      },
      practicalExamples: [
        {
          title: 'Система памяти чат-бота',
          description: 'Реализация простой системы памяти с краткосрочной и долгосрочной памятью.',
          code: `class ChatMemory {
  private shortTerm: Message[] = [];  // Последние сообщения
  private longTerm: VectorDB;          // Векторная БД

  async addMessage(msg: Message) {
    this.shortTerm.push(msg);
    // Сохраняем в долгосрочную память
    await this.longTerm.insert({
      text: msg.content,
      embedding: await embed(msg.content),
      timestamp: Date.now()
    });
  }

  async getRelevantContext(query: string, limit = 5) {
    const queryEmbed = await embed(query);
    // Извлекаем релевантные воспоминания
    const memories = await this.longTerm.search(queryEmbed, limit);
    return memories.map(m => m.text);
  }
}`,
          language: 'typescript',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Хранить всю историю в контексте',
          explanation: 'Сохранение всей истории диалога в контекстном окне быстро исчерпает лимит токенов и ухудшит качество ответов из-за шума.',
          correctApproach: 'Храните только последние 5-10 сообщений в контексте, а остальное архивируйте в векторную БД. Извлекайте релевантные воспоминания через RAG при необходимости.',
        },
      ],
      furtherReading: [
        { topic: 'Управление контекстом', slug: 'context', categorySlug: 'context-engineering' },
        { topic: 'Суммаризация', slug: 'summarization', categorySlug: 'context-engineering' },
        { topic: 'RAG — Embeddings', slug: 'embeddings', categorySlug: 'rag' },
      ],
    },
    {
      slug: 'compression',
      title: 'Сжатие контекста',
      categorySlug: 'context-engineering',
      introduction: {
        what: 'Сжатие контекста — это техника уменьшения объёма информации в контекстном окне без потери критически важных данных. Методы варьируются от простого удаления нерелевантных сообщений до интеллектуальной суммаризации и выбора ключевых фрагментов.',
        why: 'Сжатие необходимо, потому что контекстное окно ограничено, а объём доступной информации растёт с каждым взаимодействием. Без сжатия система быстро исчерпает лимит токенов, и модель потеряет доступ к важной информации.',
        where: 'Сжатие используется в длинных диалогах, при обработке больших документов, в RAG-системах с множеством фрагментов и в мультиагентных системах, где несколько агентов обмениваются контекстом.',
        problem: 'Сжатие решает проблему нехватки контекстного окна: как уместить больше полезной информации в ограниченное пространство. Это баланс между полнотой и лаконичностью.',
      },
      theory: {
        terms: [
          { term: 'Context Truncation', definition: 'Простое удаление старых или нерелевантных частей контекста.' },
          { term: 'Context Distillation', definition: 'Сжатие контекста через LLM: модель перефразирует длинный контекст в краткую сводку.' },
          { term: 'Selective Context', definition: 'Метод оценки важности каждого фрагмента контекста и удаления наименее значимых.' },
          { term: 'LLMLingua', definition: 'Инструмент от Microsoft для сжатия промптов путём удаления малозначимых токенов.' },
        ],
        principles: 'Сжатие контекста работает по принципу информационной ценности: каждый фрагмент оценивается по вкладу в качество ответа. Низкоинформативные фрагменты удаляются или сжимаются. Высокоинформативные сохраняются целиком.',
        architecture: 'Система сжатия включает: оценщик важности, компрессор (удаляет или сжимает маловажные части), валидатор (проверяет, что критическая информация сохранена).',
        connections: 'Сжатие связано с Summarization (частный случай сжатия), Memory (архивация старых данных), RAG (выборка наиболее релевантных фрагментов).',
      },
      diagram: {
        type: 'pipeline',
        title: 'Конвейер сжатия контекста',
        svgContent: `<svg viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="600" height="440" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="14" font-weight="bold">Сборы в поездку: Сжатие контекста</text>

  <!-- LEFT: Overstuffed open suitcase -->
  <rect x="30" y="120" width="190" height="130" rx="6" fill="oklch(0.577 0.245 27)" opacity="0.08" stroke="oklch(0.577 0.245 27)" stroke-width="1.5"/>
  <!-- Open lid (tilted back) -->
  <path d="M30,120 L40,68 L230,68 L220,120" fill="oklch(0.577 0.245 27)" opacity="0.05" stroke="oklch(0.577 0.245 27)" stroke-width="1.5"/>
  <!-- Handle on lid -->
  <path d="M100,68 C100,52 170,52 170,68" fill="none" stroke="oklch(0.577 0.245 27)" stroke-width="2.5" opacity="0.3"/>
  <!-- Items overflowing from suitcase -->
  <rect x="45" y="100" width="55" height="28" rx="3" fill="oklch(0.55 0.15 165)" opacity="0.18"/>
  <rect x="50" y="88" width="48" height="22" rx="3" fill="oklch(0.55 0.15 165)" opacity="0.12" transform="rotate(5,74,99)"/>
  <rect x="110" y="92" width="42" height="52" rx="2" fill="oklch(0.75 0.15 75)" opacity="0.18"/>
  <rect x="115" y="86" width="36" height="46" rx="2" fill="oklch(0.75 0.15 75)" opacity="0.12" transform="rotate(-3,133,109)"/>
  <rect x="155" y="98" width="50" height="24" rx="3" fill="oklch(0.55 0.15 165)" opacity="0.15"/>
  <!-- Items spilling above suitcase -->
  <rect x="65" y="62" width="40" height="18" rx="2" fill="oklch(0.55 0.15 165)" opacity="0.1" transform="rotate(8,85,71)"/>
  <rect x="135" y="58" width="32" height="16" rx="2" fill="oklch(0.75 0.15 75)" opacity="0.1" transform="rotate(-6,151,66)"/>
  <!-- "Cannot close" wavy zipper line -->
  <path d="M35,122 Q55,114 75,122 Q95,130 115,122 Q135,114 155,122 Q175,130 195,122 Q215,114 220,122" fill="none" stroke="oklch(0.577 0.245 27)" stroke-width="1.8" opacity="0.35" stroke-linecap="round"/>
  <!-- Suitcase wheels -->
  <circle cx="55" cy="253" r="5" fill="oklch(0.577 0.245 27)" opacity="0.2"/>
  <circle cx="195" cy="253" r="5" fill="oklch(0.577 0.245 27)" opacity="0.2"/>
  <!-- Label -->
  <text x="125" y="278" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Полный контекст</text>
  <text x="125" y="296" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="10" font-weight="bold">8000 токенов</text>
  <text x="125" y="312" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="8">Не закрывается!</text>

  <!-- CENTER: Processing steps -->
  <!-- Step 1: Оценка важности (checklist) -->
  <rect x="255" y="100" width="90" height="55" rx="7" fill="oklch(0.75 0.15 75)" opacity="0.12" stroke="oklch(0.75 0.15 75)" stroke-width="1.2"/>
  <text x="300" y="118" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">Оценка</text>
  <text x="300" y="131" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">важности</text>
  <!-- Checklist items -->
  <rect x="268" y="138" width="8" height="8" rx="1" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="1" opacity="0.4"/>
  <rect x="280" y="138" width="8" height="8" rx="1" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="1" opacity="0.4"/>
  <rect x="292" y="138" width="8" height="8" rx="1" fill="none" stroke="oklch(0.577 0.245 27)" stroke-width="1" opacity="0.4"/>
  <line x1="268" y1="142" x2="276" y2="142" stroke="oklch(0.55 0.15 165)" stroke-width="1" opacity="0.3"/>
  <line x1="280" y1="142" x2="288" y2="142" stroke="oklch(0.55 0.15 165)" stroke-width="1" opacity="0.3"/>
  <line x1="292" y1="142" x2="300" y2="142" stroke="oklch(0.577 0.245 27)" stroke-width="1" opacity="0.3"/>

  <!-- Step 2: Компрессия + Валидация (vacuum bag) -->
  <rect x="255" y="170" width="90" height="55" rx="7" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.2"/>
  <text x="300" y="188" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">Компрессия</text>
  <text x="300" y="201" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">+ Валидация</text>
  <!-- Compression lines (getting narrower = compression) -->
  <line x1="265" y1="212" x2="335" y2="212" stroke="oklch(0.55 0.15 165)" stroke-width="1" opacity="0.3"/>
  <line x1="275" y1="217" x2="325" y2="217" stroke="oklch(0.55 0.15 165)" stroke-width="1" opacity="0.3"/>

  <!-- RIGHT: Neatly packed closed suitcase -->
  <rect x="375" y="120" width="190" height="130" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <!-- Handle on top -->
  <path d="M445,120 C445,100 505,100 505,120" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="2.5" opacity="0.4"/>
  <!-- Center divider line -->
  <line x1="375" y1="185" x2="565" y2="185" stroke="oklch(0.55 0.15 165)" stroke-width="0.8" opacity="0.2"/>
  <!-- Clasps/locks -->
  <rect x="455" y="178" width="30" height="10" rx="2" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="0.8"/>
  <!-- Neatly packed items inside (barely visible through outline) -->
  <rect x="390" y="135" width="52" height="28" rx="2" fill="oklch(0.55 0.15 165)" opacity="0.08"/>
  <rect x="450" y="135" width="38" height="28" rx="2" fill="oklch(0.75 0.15 75)" opacity="0.08"/>
  <rect x="390" y="195" width="75" height="22" rx="2" fill="oklch(0.55 0.15 165)" opacity="0.06"/>
  <rect x="475" y="195" width="55" height="22" rx="2" fill="oklch(0.75 0.15 75)" opacity="0.06"/>
  <!-- Success checkmark on suitcase -->
  <circle cx="520" cy="150" r="14" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1" stroke-opacity="0.3"/>
  <path d="M512,150 L518,157 L530,143" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="2.5" opacity="0.35" stroke-linecap="round"/>
  <!-- Suitcase wheels -->
  <circle cx="400" cy="253" r="5" fill="oklch(0.55 0.15 165)" opacity="0.15"/>
  <circle cx="540" cy="253" r="5" fill="oklch(0.55 0.15 165)" opacity="0.15"/>
  <!-- Label -->
  <text x="470" y="278" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Сжатый контекст</text>
  <text x="470" y="296" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="10" font-weight="bold">3000 токенов</text>
  <text x="470" y="312" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="8">Всё на месте, качество 95%+</text>

  <!-- Bottom: Before/After comparison bar -->
  <rect x="30" y="332" width="540" height="28" rx="5" fill="oklch(0.577 0.245 27)" opacity="0.06" stroke="oklch(0.577 0.245 27)" stroke-width="1" stroke-opacity="0.3"/>
  <text x="300" y="351" text-anchor="middle" fill="var(--foreground)" font-size="9">До: 8000 токенов (полный контекст — не помещается)</text>
  <rect x="30" y="366" width="202" height="28" rx="5" fill="oklch(0.55 0.15 165)" opacity="0.06" stroke="oklch(0.55 0.15 165)" stroke-width="1" stroke-opacity="0.3"/>
  <text x="131" y="385" text-anchor="middle" fill="var(--foreground)" font-size="9">После: 3000 токенов (качество 95%+)</text>

  <!-- Methods as packing tips -->
  <rect x="30" y="406" width="540" height="24" rx="4" fill="var(--muted)" opacity="0.3"/>
  <text x="300" y="422" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Методы-советы: Truncation | Distillation | Selective Context | LLMLingua</text>
</svg>`,
      },
      practicalExamples: [
        {
          title: 'Сжатие истории диалога',
          description: 'Суммаризация старых сообщений для освобождения контекстного окна.',
          code: `async function compressHistory(messages: Message[], maxTokens: number) {
  const totalTokens = countTokens(messages);
  if (totalTokens <= maxTokens) return messages;

  // Разделяем: последние сообщения оставляем, старые сжимаем
  const recent = messages.slice(-4);
  const old = messages.slice(0, -4);

  // Суммаризируем старые сообщения
  const summary = await llm.chat({
    messages: [
      { role: 'system', content: 'Сжато изложи ключевые факты из диалога.' },
      { role: 'user', content: JSON.stringify(old) }
    ]
  });

  return [
    { role: 'system', content: \`Предыдущий контекст: \${summary}\` },
    ...recent
  ];
}`,
          language: 'typescript',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Слишком агрессивное сжатие',
          explanation: 'Если сжать контекст слишком сильно, можно потерять критически важные детали: имена, числа, конкретные факты. Модель начнёт галлюцинировать.',
          correctApproach: 'Валидируйте сжатый контекст: проверяйте, что ключевые факты сохранены. Используйте несколько уровней сжатия — от мягкого (удаление повторов) до агрессивного (суммаризация).',
        },
      ],
      furtherReading: [
        { topic: 'Суммаризация', slug: 'summarization', categorySlug: 'context-engineering' },
        { topic: 'Управление контекстом', slug: 'context', categorySlug: 'context-engineering' },
        { topic: 'Контекстное окно', slug: 'context-window', categorySlug: 'llm-basics' },
      ],
    },
    {
      slug: 'summarization',
      title: 'Суммаризация',
      categorySlug: 'context-engineering',
      introduction: {
        what: 'Суммаризация в контексте LLM — это процесс создания краткого изложения длинного текста или диалога с сохранением ключевой информации. Суммаризация бывает экстрактивной (выбор ключевых предложений) и абстрактивной (генерация нового краткого текста). LLM прекрасно справляются с абстрактивной суммаризацией.',
        why: 'Суммаризация нужна для сжатия длинных текстов и диалогов, чтобы уместить их в контекстное окно или предоставить пользователю быстрый обзор. Это ключевой инструмент для работы с большими объёмами информации в ограниченном пространстве.',
        where: 'Суммаризация используется в чат-ботах (сжатие истории диалога), RAG-системах (суммаризация длинных документов), аналитике (обзоры отчётов), новостных агрегаторах и системах управления знаниями.',
        problem: 'Суммаризация решает проблему информационной перегрузки: как из 100 страниц текста извлечь суть в 2 абзаца, не потеряв критически важные факты.',
      },
      theory: {
        terms: [
          { term: 'Extractive Summarization', definition: 'Выбор наиболее важных предложений из исходного текста без изменения.' },
          { term: 'Abstractive Summarization', definition: 'Генерация нового краткого текста, передающего смысл оригинала.' },
          { term: 'Map-Reduce Summarization', definition: 'Метод: текст разбивается на части, каждая суммаризируется отдельно, затем сводки объединяются.' },
          { term: 'Recursive Summarization', definition: 'Итеративная суммаризация: текст суммаризируется несколько раз для достижения нужного объёма.' },
        ],
        principles: 'LLM-суммаризация работает лучше всего, когда промпт чётко определяет: что важно, для кого, какой длины и в каком формате. Для очень длинных текстов используется Map-Reduce.',
        architecture: 'Архитектура зависит от длины: короткий текст — прямая суммаризация, средний — с чанками, длинный — Map-Reduce или рекурсивная суммаризация.',
        connections: 'Суммаризация — ключевой инструмент для Compression, Memory, RAG и Production AI.',
      },
      diagram: {
        type: 'pipeline',
        title: 'Map-Reduce суммаризация',
        svgContent: `<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="600" height="380" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="14" font-weight="bold">Конвейер суммаризации: Map-Reduce</text>

  <!-- Long document at top center -->
  <rect x="215" y="42" width="170" height="38" rx="5" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="66" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Длинный текст</text>
  <!-- Split lines on document -->
  <line x1="258" y1="42" x2="258" y2="80" stroke="oklch(0.55 0.15 165)" stroke-width="1" stroke-dasharray="2,2" opacity="0.2"/>
  <line x1="300" y1="42" x2="300" y2="80" stroke="oklch(0.55 0.15 165)" stroke-width="1" stroke-dasharray="2,2" opacity="0.2"/>
  <line x1="342" y1="42" x2="342" y2="80" stroke="oklch(0.55 0.15 165)" stroke-width="1" stroke-dasharray="2,2" opacity="0.2"/>
  <text x="300" y="96" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5" font-style="italic">Разбивается на части</text>

  <!-- MAP phase label -->
  <text x="300" y="116" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="10" font-weight="bold">MAP: Параллельная обработка</text>

  <!-- Conveyor belt background -->
  <rect x="20" y="122" width="560" height="72" rx="5" fill="oklch(0.55 0.15 165)" opacity="0.03" stroke="oklch(0.55 0.15 165)" stroke-width="1" stroke-dasharray="8,4" stroke-opacity="0.1"/>
  <!-- Conveyor rollers -->
  <circle cx="50" cy="199" r="7" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.1"/>
  <circle cx="50" cy="199" r="2.5" fill="oklch(0.55 0.15 165)" opacity="0.08"/>
  <circle cx="190" cy="199" r="7" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.1"/>
  <circle cx="190" cy="199" r="2.5" fill="oklch(0.55 0.15 165)" opacity="0.08"/>
  <circle cx="410" cy="199" r="7" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.1"/>
  <circle cx="410" cy="199" r="2.5" fill="oklch(0.55 0.15 165)" opacity="0.08"/>
  <circle cx="550" cy="199" r="7" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.1"/>
  <circle cx="550" cy="199" r="2.5" fill="oklch(0.55 0.15 165)" opacity="0.08"/>

  <!-- Worker Station 1 -->
  <rect x="28" y="128" width="120" height="58" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.12" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <circle cx="52" cy="146" r="8" fill="none" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.25"/>
  <circle cx="52" cy="146" r="3" fill="oklch(0.75 0.15 75)" opacity="0.15"/>
  <text x="100" y="145" text-anchor="middle" fill="var(--foreground)" font-size="9" font-weight="bold">Чанк 1</text>
  <text x="100" y="160" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="9" font-weight="bold">Sum1</text>
  <text x="88" y="180" text-anchor="middle" fill="var(--muted-foreground)" font-size="6.5">Рабочий 1</text>

  <!-- Worker Station 2 -->
  <rect x="163" y="128" width="120" height="58" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.17" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <circle cx="187" cy="146" r="8" fill="none" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.3"/>
  <circle cx="187" cy="146" r="3" fill="oklch(0.75 0.15 75)" opacity="0.18"/>
  <text x="235" y="145" text-anchor="middle" fill="var(--foreground)" font-size="9" font-weight="bold">Чанк 2</text>
  <text x="235" y="160" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="9" font-weight="bold">Sum2</text>
  <text x="223" y="180" text-anchor="middle" fill="var(--muted-foreground)" font-size="6.5">Рабочий 2</text>

  <!-- Worker Station 3 -->
  <rect x="298" y="128" width="120" height="58" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.22" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <circle cx="322" cy="146" r="8" fill="none" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.35"/>
  <circle cx="322" cy="146" r="3" fill="oklch(0.75 0.15 75)" opacity="0.2"/>
  <text x="370" y="145" text-anchor="middle" fill="var(--foreground)" font-size="9" font-weight="bold">Чанк 3</text>
  <text x="370" y="160" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="9" font-weight="bold">Sum3</text>
  <text x="358" y="180" text-anchor="middle" fill="var(--muted-foreground)" font-size="6.5">Рабочий 3</text>

  <!-- Worker Station N -->
  <rect x="433" y="128" width="120" height="58" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.27" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <circle cx="457" cy="146" r="8" fill="none" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.4"/>
  <circle cx="457" cy="146" r="3" fill="oklch(0.75 0.15 75)" opacity="0.22"/>
  <text x="505" y="145" text-anchor="middle" fill="var(--foreground)" font-size="9" font-weight="bold">Чанк N</text>
  <text x="505" y="160" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="9" font-weight="bold">SumN</text>
  <text x="493" y="180" text-anchor="middle" fill="var(--muted-foreground)" font-size="6.5">Рабочий N</text>

  <!-- REDUCE station -->
  <rect x="110" y="220" width="380" height="48" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="241" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">REDUCE: Sum1 + Sum2 + Sum3 + ... + SumN</text>
  <text x="300" y="259" text-anchor="middle" fill="var(--muted-foreground)" font-size="8">Объединение промежуточных сводок</text>

  <!-- Final output -->
  <rect x="185" y="300" width="230" height="45" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <rect x="198" y="310" width="16" height="20" rx="2" fill="oklch(0.75 0.15 75)" opacity="0.15"/>
  <line x1="201" y1="316" x2="211" y2="316" stroke="var(--muted-foreground)" stroke-width="0.7" opacity="0.3"/>
  <line x1="201" y1="321" x2="211" y2="321" stroke="var(--muted-foreground)" stroke-width="0.7" opacity="0.3"/>
  <line x1="201" y1="326" x2="208" y2="326" stroke="var(--muted-foreground)" stroke-width="0.7" opacity="0.3"/>
  <text x="310" y="328" text-anchor="middle" fill="var(--foreground)" font-size="13" font-weight="bold">Финальная сводка</text>
</svg>`,
      },
      practicalExamples: [
        {
          title: 'Map-Reduce суммаризация',
          description: 'Суммаризация длинного документа через разбиение на части.',
          code: `async function summarizeLongDoc(text: string, chunkSize = 4000) {
  // Map: суммаризируем каждый чанк
  const chunks = splitIntoChunks(text, chunkSize);
  const summaries = await Promise.all(
    chunks.map(chunk => llm.chat({
      messages: [
        { role: 'system', content: 'Сжато изложи ключевые факты.' },
        { role: 'user', content: chunk }
      ]
    }))
  );

  // Reduce: объединяем промежуточные сводки
  const final = await llm.chat({
    messages: [
      { role: 'system', content: 'Объедини сводки в одну краткую.' },
      { role: 'user', content: summaries.join('\\n\\n') }
    ]
  });

  return final;
}`,
          language: 'typescript',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Суммаризировать без указания фокуса',
          explanation: 'Без указания, что именно важно, модель может суммаризировать не те аспекты текста. Например, вместо бизнес-метрик описать технические детали.',
          correctApproach: 'Всегда указывайте в промпте суммаризации: для кого, что важно, какой объём. «Суммаризируй для руководителя, выделив ключевые метрики и решения, в 3 абзаца».',
        },
      ],
      furtherReading: [
        { topic: 'Сжатие контекста', slug: 'compression', categorySlug: 'context-engineering' },
        { topic: 'Память в LLM', slug: 'memory', categorySlug: 'context-engineering' },
        { topic: 'RAG — Chunking', slug: 'chunking', categorySlug: 'rag' },
      ],
    },
  ],
};

// Add sandboxes to subtopics that don't have them
const ctxSandboxMap: Record<string, {type:'prompt-playground'|'tokenizer'|'temperature'|'system-prompt'|'context-window-sim'|'compression-lab'|'few-shot-lab'|'mcp-server-builder'|'cost-optimizer';title:string;description:string;defaultPrompt?:string;defaultSystem?:string;defaultTemperature?:number;placeholder?:string}[]> = {
  'memory': [{type:'context-window-sim',title:'Спросите про память LLM',description:'Задайте вопрос про механизмы памяти в LLM-системах и получите ответ от AI.',defaultPrompt:'Как реализовать долгосрочную память для чат-бота?',defaultSystem:'Ты эксперт по системам памяти LLM. Объясняй краткосрочную и долгосрочную память, RAG-хранилища и паттерны.'}],
  'compression': [{type:'compression-lab',title:'Спросите про сжатие контекста',description:'Задайте вопрос про методы сжатия контекста в LLM.',defaultPrompt:'Какие методы сжатия промптов существуют?',defaultSystem:'Ты эксперт по контекстной инженерии. Помогай с методами сжатия: truncation, distillation, LLMLingua.'}],
  'summarization': [{type:'compression-lab',title:'Попробуйте суммаризацию',description:'Введите длинный текст и попросите модель создать краткую сводку. Попробуйте разные типы суммаризации.',defaultPrompt:'Суммаризируй: Искусственный интеллект трансформирует индустрии по всему миру. В здравоохранении AI помогает диагностировать болезни на ранних стадиях. В финансах — обнаруживать мошенничество в реальном времени. В образовании — персонализировать обучение для каждого ученика. Однако существуют вызовы: этика, предвзятость моделей и влияние на рынок труда.',defaultSystem:'Ты эксперт по суммаризации. Создавай краткие, точные и информативные сводки на русском языке.'}],
};

contextEngineering.subtopics.forEach(sub => {
  if (ctxSandboxMap[sub.slug]) {
    sub.sandboxes = ctxSandboxMap[sub.slug];
  }
});
