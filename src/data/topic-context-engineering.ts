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
        svgContent: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="280" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Конвейер управления контекстом</text>
  <rect x="30" y="55" width="110" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="85" y="78" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Системный</text>
  <text x="85" y="93" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">промпт</text>
  <rect x="155" y="55" width="110" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="210" y="78" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">RAG</text>
  <text x="210" y="93" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">документы</text>
  <rect x="280" y="55" width="110" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.25" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="335" y="78" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">История</text>
  <text x="335" y="93" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">диалога</text>
  <rect x="405" y="55" width="80" height="50" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="445" y="78" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Запрос</text>
  <text x="445" y="93" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">пользователя</text>
  <rect x="120" y="140" width="360" height="40" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.3" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="165" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Приоритизация + Сжатие + Форматирование</text>
  <rect x="120" y="205" width="360" height="50" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="300" y="225" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Оптимизированный контекст</text>
  <text x="300" y="245" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Релевантный + Достаточный + Лаконичный</text>
  <line x1="85" y1="105" x2="180" y2="140" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrCtx)"/>
  <line x1="210" y1="105" x2="230" y2="140" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrCtx)"/>
  <line x1="335" y1="105" x2="310" y2="140" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrCtx)"/>
  <line x1="445" y1="105" x2="410" y2="140" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrCtx)"/>
  <line x1="300" y1="180" x2="300" y2="205" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrCtx)"/>
  <defs><marker id="arrCtx" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)"/></marker></defs>
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
        svgContent: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="260" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Иерархия памяти LLM</text>
  <rect x="200" y="55" width="200" height="35" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.4" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="77" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Рабочая память (контекст)</text>
  <text x="300" y="93" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Мгновенный доступ, ограничена окном</text>
  <rect x="150" y="110" width="300" height="35" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.25" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="132" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Краткосрочная (история сессии)</text>
  <text x="300" y="148" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Последние N сообщений, БД сессии</text>
  <rect x="100" y="165" width="400" height="35" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="187" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Долгосрочная (векторная БД)</text>
  <text x="300" y="203" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Безграничная, извлечение через RAG</text>
  <rect x="30" y="220" width="180" height="35" rx="6" fill="var(--muted)" opacity="0.4"/>
  <text x="120" y="242" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Episodic: события</text>
  <rect x="220" y="220" width="160" height="35" rx="6" fill="var(--muted)" opacity="0.4"/>
  <text x="300" y="242" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Semantic: факты</text>
  <rect x="390" y="220" width="180" height="35" rx="6" fill="var(--muted)" opacity="0.4"/>
  <text x="480" y="242" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Procedural: навыки</text>
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
        svgContent: `<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="230" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Конвейер сжатия контекста</text>
  <rect x="30" y="55" width="120" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="90" y="78" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Полный</text>
  <text x="90" y="93" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">контекст</text>
  <rect x="175" y="55" width="120" height="50" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="235" y="78" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Оценка</text>
  <text x="235" y="93" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">важности</text>
  <rect x="320" y="55" width="120" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.25" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="380" y="78" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Компрессия</text>
  <text x="380" y="93" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">+ Валидация</text>
  <rect x="465" y="55" width="100" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.35" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="515" y="78" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Сжатый</text>
  <text x="515" y="93" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">контекст</text>
  <line x1="150" y1="80" x2="175" y2="80" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrCmp)"/>
  <line x1="295" y1="80" x2="320" y2="80" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrCmp)"/>
  <line x1="440" y1="80" x2="465" y2="80" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrCmp)"/>
  <rect x="30" y="125" width="540" height="35" rx="6" fill="var(--muted)" opacity="0.3"/>
  <text x="300" y="147" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Методы: Truncation | Distillation | Selective Context | LLMLingua</text>
  <rect x="30" y="175" width="260" height="50" rx="6" fill="oklch(0.577 0.245 27)" opacity="0.1" stroke="oklch(0.577 0.245 27)" stroke-width="1"/>
  <text x="160" y="197" text-anchor="middle" fill="var(--foreground)" font-size="10">До: 8000 токенов (полный)</text>
  <text x="160" y="212" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="9">Не помещается в контекст</text>
  <rect x="310" y="175" width="260" height="50" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.1" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="440" y="197" text-anchor="middle" fill="var(--foreground)" font-size="10">После: 3000 токенов (сжатый)</text>
  <text x="440" y="212" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="9">Качество сохранено на 95%+</text>
  <defs><marker id="arrCmp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)"/></marker></defs>
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
        svgContent: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="260" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Map-Reduce суммаризация</text>
  <rect x="220" y="55" width="160" height="35" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="77" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Длинный текст</text>
  <rect x="30" y="115" width="120" height="35" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="90" y="137" text-anchor="middle" fill="var(--foreground)" font-size="10">Чанк 1 → Sum1</text>
  <rect x="170" y="115" width="120" height="35" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="230" y="137" text-anchor="middle" fill="var(--foreground)" font-size="10">Чанк 2 → Sum2</text>
  <rect x="310" y="115" width="120" height="35" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.25" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="370" y="137" text-anchor="middle" fill="var(--foreground)" font-size="10">Чанк 3 → Sum3</text>
  <rect x="450" y="115" width="120" height="35" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.3" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="510" y="137" text-anchor="middle" fill="var(--foreground)" font-size="10">Чанк N → SumN</text>
  <line x1="260" y1="90" x2="90" y2="115" stroke="var(--muted-foreground)" stroke-width="1.5"/>
  <line x1="280" y1="90" x2="230" y2="115" stroke="var(--muted-foreground)" stroke-width="1.5"/>
  <line x1="320" y1="90" x2="370" y2="115" stroke="var(--muted-foreground)" stroke-width="1.5"/>
  <line x1="340" y1="90" x2="510" y2="115" stroke="var(--muted-foreground)" stroke-width="1.5"/>
  <rect x="120" y="175" width="360" height="35" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.25" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="197" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Sum1 + Sum2 + Sum3 + ... → Reduce</text>
  <line x1="90" y1="150" x2="180" y2="175" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrSum)"/>
  <line x1="230" y1="150" x2="250" y2="175" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrSum)"/>
  <line x1="370" y1="150" x2="350" y2="175" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrSum)"/>
  <line x1="510" y1="150" x2="420" y2="175" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrSum)"/>
  <rect x="180" y="230" width="240" height="30" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="300" y="250" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Финальная сводка</text>
  <line x1="300" y1="210" x2="300" y2="230" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrSum)"/>
  <defs><marker id="arrSum" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)"/></marker></defs>
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
