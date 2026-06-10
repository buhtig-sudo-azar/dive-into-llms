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
        svgContent: `<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="600" height="450" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="14" font-weight="bold">Конвейер управления контекстом</text>

  <!-- Шаг 1: Сбор источников -->
  <rect x="30" y="48" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="75" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="80" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="70" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 1: Сбор источников</text>
  <text x="80" y="88" fill="var(--muted-foreground)" font-size="10">Системный промпт + RAG документы + История диалога + Запрос пользователя</text>
  <line x1="55" y1="103" x2="55" y2="118" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 2: Приоритизация -->
  <rect x="30" y="118" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="145" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="150" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="140" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 2: Приоритизация</text>
  <text x="80" y="158" fill="var(--muted-foreground)" font-size="10">Ранжирование по релевантности к текущему запросу</text>
  <line x1="55" y1="173" x2="55" y2="188" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 3: Сжатие -->
  <rect x="30" y="188" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="215" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="220" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="210" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 3: Сжатие</text>
  <text x="80" y="228" fill="var(--muted-foreground)" font-size="10">Удаление нерелевантного, суммаризация длинных фрагментов</text>
  <line x1="55" y1="243" x2="55" y2="258" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 4: Форматирование -->
  <rect x="30" y="258" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="285" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="290" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="280" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 4: Форматирование</text>
  <text x="80" y="298" fill="var(--muted-foreground)" font-size="10">Структурирование: важное в начало и конец (Lost in the Middle)</text>
  <line x1="55" y1="313" x2="55" y2="328" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 5: Оптимизированный контекст -->
  <rect x="30" y="328" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="355" r="14" fill="oklch(0.75 0.15 75)" opacity="0.25"/>
  <text x="55" y="360" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">5</text>
  <text x="80" y="350" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 5: Оптимизированный контекст</text>
  <text x="80" y="368" fill="var(--muted-foreground)" font-size="10">Релевантный + Достаточный + Лаконичный</text>

  <!-- Bottom insight bar -->
  <rect x="30" y="400" width="540" height="32" rx="6" fill="var(--muted)" opacity="0.4" stroke="var(--border)" stroke-width="1"/>
  <text x="300" y="421" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Важное — в начало и конец. Менее важное — в середину или удалить</text>
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
        svgContent: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="600" height="400" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="14" font-weight="bold">Иерархия памяти LLM</text>

  <!-- Шаг 1: Рабочая память -->
  <rect x="30" y="48" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="75" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="80" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="70" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 1: Рабочая память</text>
  <text x="80" y="88" fill="var(--muted-foreground)" font-size="10">Контекстное окно: мгновенный доступ, ограничена размером</text>
  <line x1="55" y1="103" x2="55" y2="118" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 2: Краткосрочная память -->
  <rect x="30" y="118" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="145" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="150" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="140" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 2: Краткосрочная память</text>
  <text x="80" y="158" fill="var(--muted-foreground)" font-size="10">История сессии: последние N сообщений, хранится в БД</text>
  <line x1="55" y1="173" x2="55" y2="188" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 3: Долгосрочная память -->
  <rect x="30" y="188" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="215" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="220" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="210" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 3: Долгосрочная память</text>
  <text x="80" y="228" fill="var(--muted-foreground)" font-size="10">Векторная БД: безграничная, извлечение через RAG</text>
  <line x1="55" y1="243" x2="55" y2="258" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 4: Типы памяти -->
  <rect x="30" y="258" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="285" r="14" fill="oklch(0.75 0.15 75)" opacity="0.25"/>
  <text x="55" y="290" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="280" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 4: Типы памяти</text>
  <text x="80" y="298" fill="var(--muted-foreground)" font-size="10">Episodic (события) + Semantic (факты) + Procedural (навыки)</text>

  <!-- Bottom insight bar -->
  <rect x="30" y="332" width="540" height="32" rx="6" fill="var(--muted)" opacity="0.4" stroke="var(--border)" stroke-width="1"/>
  <text x="300" y="353" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Каждая вложена в предыдущую: рабочая ⊂ краткосрочная ⊂ долгосрочная</text>
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
        svgContent: `<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="600" height="450" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="14" font-weight="bold">Конвейер сжатия контекста</text>

  <!-- Шаг 1: Полный контекст -->
  <rect x="30" y="48" width="540" height="55" rx="8" fill="oklch(0.577 0.245 27)" opacity="0.08" stroke="oklch(0.577 0.245 27)" stroke-width="1.5"/>
  <circle cx="55" cy="75" r="14" fill="oklch(0.577 0.245 27)" opacity="0.2"/>
  <text x="55" y="80" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="70" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 1: Полный контекст</text>
  <text x="80" y="88" fill="var(--muted-foreground)" font-size="10">8000 токенов: все сообщения, документы, промпты</text>
  <line x1="55" y1="103" x2="55" y2="118" stroke="oklch(0.577 0.245 27)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 2: Оценка важности -->
  <rect x="30" y="118" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="145" r="14" fill="oklch(0.75 0.15 75)" opacity="0.2"/>
  <text x="55" y="150" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="140" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 2: Оценка важности</text>
  <text x="80" y="158" fill="var(--muted-foreground)" font-size="10">Каждому фрагменту присваивается оценка значимости</text>
  <line x1="55" y1="173" x2="55" y2="188" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 3: Компрессия -->
  <rect x="30" y="188" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="215" r="14" fill="oklch(0.75 0.15 75)" opacity="0.2"/>
  <text x="55" y="220" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="210" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 3: Компрессия</text>
  <text x="80" y="228" fill="var(--muted-foreground)" font-size="10">Удаление маловажных фрагментов, суммаризация длинных</text>
  <line x1="55" y1="243" x2="55" y2="258" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 4: Валидация -->
  <rect x="30" y="258" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="285" r="14" fill="oklch(0.75 0.15 75)" opacity="0.2"/>
  <text x="55" y="290" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="280" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 4: Валидация</text>
  <text x="80" y="298" fill="var(--muted-foreground)" font-size="10">Проверка, что критические факты сохранены</text>
  <line x1="55" y1="313" x2="55" y2="328" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 5: Сжатый контекст -->
  <rect x="30" y="328" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.1" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="355" r="14" fill="oklch(0.55 0.15 165)" opacity="0.25"/>
  <text x="55" y="360" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">5</text>
  <text x="80" y="350" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 5: Сжатый контекст</text>
  <text x="80" y="368" fill="var(--muted-foreground)" font-size="10">3000 токенов, качество 95%+</text>

  <!-- Bottom insight bar -->
  <rect x="30" y="400" width="540" height="32" rx="6" fill="var(--muted)" opacity="0.4" stroke="var(--border)" stroke-width="1"/>
  <text x="300" y="421" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Методы: Truncation | Distillation | Selective Context | LLMLingua</text>
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
        svgContent: `<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="600" height="450" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="14" font-weight="bold">Map-Reduce суммаризация</text>

  <!-- Шаг 1: Длинный текст -->
  <rect x="30" y="48" width="540" height="55" rx="8" fill="oklch(0.577 0.245 27)" opacity="0.08" stroke="oklch(0.577 0.245 27)" stroke-width="1.5"/>
  <circle cx="55" cy="75" r="14" fill="oklch(0.577 0.245 27)" opacity="0.2"/>
  <text x="55" y="80" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="70" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 1: Длинный текст</text>
  <text x="80" y="88" fill="var(--muted-foreground)" font-size="10">Исходный документ слишком длинный для одного запроса</text>
  <line x1="55" y1="103" x2="55" y2="118" stroke="oklch(0.577 0.245 27)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 2: Разбивка на части -->
  <rect x="30" y="118" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="145" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="150" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="140" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 2: Разбивка на части</text>
  <text x="80" y="158" fill="var(--muted-foreground)" font-size="10">Текст делится на чанки по размеру контекстного окна</text>
  <line x1="55" y1="173" x2="55" y2="188" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 3: Map -->
  <rect x="30" y="188" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="215" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="220" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="210" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 3: Map</text>
  <text x="80" y="228" fill="var(--muted-foreground)" font-size="10">Каждый чанк суммаризируется отдельно и независимо</text>
  <line x1="55" y1="243" x2="55" y2="258" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 4: Reduce -->
  <rect x="30" y="258" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="285" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="290" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="280" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 4: Reduce</text>
  <text x="80" y="298" fill="var(--muted-foreground)" font-size="10">Все частичные сводки объединяются в финальную суммаризацию</text>
  <line x1="55" y1="313" x2="55" y2="328" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>

  <!-- Шаг 5: Итоговая сводка -->
  <rect x="30" y="328" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="355" r="14" fill="oklch(0.75 0.15 75)" opacity="0.25"/>
  <text x="55" y="360" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">5</text>
  <text x="80" y="350" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 5: Итоговая сводка</text>
  <text x="80" y="368" fill="var(--muted-foreground)" font-size="10">Краткое изложение всего документа</text>

  <!-- Bottom insight bar -->
  <rect x="30" y="400" width="540" height="32" rx="6" fill="var(--muted)" opacity="0.4" stroke="var(--border)" stroke-width="1"/>
  <text x="300" y="421" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Map-Reduce позволяет суммаризировать документы любой длины</text>
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