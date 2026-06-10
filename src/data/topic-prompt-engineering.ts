import { TopicCategory } from '@/types';

export const promptEngineering: TopicCategory = {
  slug: 'prompt-engineering',
  title: 'Prompt Engineering',
  description: 'Техники составления эффективных запросов к LLM: от zero-shot до структурированного вывода',
  iconName: 'MessageSquare',
  subtopics: [
    {
      slug: 'zero-shot',
      title: 'Zero-shot Prompting',
      categorySlug: 'prompt-engineering',
      introduction: {
        what: 'Zero-shot prompting — это техника обращения к LLM без предоставления примеров того, что ожидается в ответ. Модель опирается исключительно на свои знания, полученные при обучении, и на инструкции в самом промпте. Это самый простой и быстрый способ взаимодействия с языковой моделью.',
        why: 'Zero-shot нужен потому, что большинство повседневных задач не требуют примеров — модель уже «знает», как отвечать на вопросы, переводить текст или писать письма. Это экономит токены контекстного окна и упрощает интеграцию LLM в приложения без подготовки обучающих данных.',
        where: 'Zero-shot используется повсеместно: чат-боты, голосовые ассистенты, генерация текста, классификация, перевод, ответы на вопросы. Большинство повседневных запросов к ChatGPT или Claude — это zero-shot.',
        problem: 'Zero-shot решает проблему быстрого старта: вам не нужно готовить примеры или обучать модель. Достаточно чётко сформулировать задачу, и модель справится, опираясь на свои обширные знания. Это демократизирует доступ к AI-возможностям.',
      },
      theory: {
        terms: [
          { term: 'Промпт', definition: 'Текстовый запрос, отправляемый модели. Содержит инструкцию, контекст и/или вопрос. Качество промпта напрямую влияет на качество ответа.' },
          { term: 'Системный промпт', definition: 'Скрытая инструкция, задающая поведение модели во всём диалоге. Определяет роль, тон, формат и ограничения.' },
          { term: 'Instruction Following', definition: 'Способность модели следовать инструкциям в промпте. Улучшается при instruction-tuning — дообучении на парах «инструкция → ответ».' },
          { term: 'Prompt Template', definition: 'Повторно используемая структура промпта с плейсхолдерами для переменных. Упрощает стандартизацию запросов в приложениях.' },
          { term: 'Temperature', definition: 'Параметр генерации, контролирующий разнообразие ответов. При zero-shot часто ставят низкую температуру для предсказуемости.' },
        ],
        principles: 'Zero-shot работает благодаря тому, что современные LLM обучены на триллионах текстов, включающих разнообразные инструкции и ответы. Модели прошли instruction-tuning — дообучение на парах «инструкция → правильный ответ», что позволяет им понимать задачи без примеров. Ключевой принцип — чем точнее и конкретнее инструкция, тем лучше результат. Неоднозначные промпты приводят к неожиданным ответам, потому что модель интерпретирует их по-своему.',
        architecture: 'При zero-shot запросе модель обрабатывает промпт через Transformer-слои, формируя внутреннее представление задачи. Attention-механизм выделяет ключевые слова инструкции, определяя ожидаемый формат и содержание ответа. Затем авторегрессионно генерируется ответ, наиболее вероятный с учётом контекста промпта. Системный промпт (если задан) объединяется с пользовательским, создавая общий контекст для генерации.',
        connections: 'Zero-shot — основа для всех других техник: few-shot добавляет примеры поверх zero-shot, Chain of Thought добавляет рассуждения, а Structured Output уточняет формат. Zero-shot также связан с Context Engineering — оптимизация контекста улучшает zero-shot результаты.',
      },
      diagram: {
        type: 'flowchart',
        title: 'Zero-shot запрос к LLM',
        svgContent: `<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <!-- Background -->
  <rect x="0" y="0" width="600" height="340" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Zero-shot Prompting</text>
  <text x="300" y="44" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Модель отвечает без примеров, опираясь только на инструкцию</text>

  <!-- Step 1 -->
  <rect x="30" y="58" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="85" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="90" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="80" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 1: Системный промпт</text>
  <text x="80" y="98" fill="var(--muted-foreground)" font-size="10">Задаёт роль и формат: «Ты эксперт по Python»</text>

  <!-- Connector 1-2 -->
  <line x1="55" y1="113" x2="55" y2="128" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 2 -->
  <rect x="30" y="128" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="155" r="14" fill="oklch(0.75 0.15 75)" opacity="0.2"/>
  <text x="55" y="160" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="150" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 2: Пользовательский запрос</text>
  <text x="80" y="168" fill="var(--muted-foreground)" font-size="10">Вопрос без примеров: «Объясни декораторы»</text>

  <!-- Connector 2-3 -->
  <line x1="55" y1="183" x2="55" y2="198" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 3 -->
  <rect x="30" y="198" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="225" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="230" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="220" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 3: Ответ LLM</text>
  <text x="80" y="238" fill="var(--muted-foreground)" font-size="10">Модель отвечает, опираясь на знания из обучения</text>

  <!-- Bottom insight bar -->
  <rect x="30" y="275" width="540" height="45" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="300" y="295" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Без примеров — модель просто ЗНАЕТ из опыта обучения</text>
  <text x="300" y="311" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Инструкция должна быть точной!</text>
</svg>`,
      },
      practicalExamples: [
        {
          title: 'Простой zero-shot запрос',
          description: 'Базовый пример zero-shot промпта для классификации тональности текста.',
          code: `const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'Ты — анализатор тональности. Отвечай только: позитивная, негативная или нейтральная.' },
    { role: 'user', content: 'Этот продукт превзошёл все мои ожидания!' }
  ],
  temperature: 0,
});`,
          language: 'typescript',
        },
        {
          title: 'Zero-shot с форматированием',
          description: 'Zero-shot с явным указанием формата ответа в промпте.',
          code: `const prompt = \`Проанализируй следующий текст и выдели:
- Главная тема: ...
- Ключевые аргументы: ...
- Вывод: ...

Текст: "Искусственный интеллект меняет рынок труда. 
Одни профессии исчезают, другие появляются. 
Важно адаптироваться и учиться новым навыкам."\`;

// Модель структурирует ответ без примеров
// потому что инструкция чётко задаёт формат`,
          language: 'typescript',
        },
      ],
      sandboxes: [
        {
          type: 'prompt-playground',
          title: 'Попробуйте Zero-shot',
          description: 'Напишите промпт без примеров и посмотрите, как модель справится. Попробуйте сделать инструкцию максимально точной.',
          defaultPrompt: 'Переведи следующий текст на формальный японский язык: "Привет, как дела?"',
          defaultSystem: 'Ты профессиональный переводчик. Переводи точно, сохраняя смысл и тон оригинала.',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Неопределённые инструкции',
          explanation: 'Промпты вроде «Расскажи что-нибудь интересное» дают непредсказуемые результаты, потому что модель не понимает, что именно вы хотите.',
          correctApproach: 'Будьте конкретны: «Расскажи 3 факта о квантовых компьютерах, которые удивят студента-физика. Каждый факт — 2-3 предложения.»',
        },
        {
          mistake: 'Не задавать системный промпт',
          explanation: 'Без системного промпта модель не знает свою роль и может ответить в любом стиле и формате.',
          correctApproach: 'Всегда задавайте системный промпт: определите роль, тон, формат ответа и ограничения. Это самое мощное средство управления zero-shot.',
        },
      ],
      furtherReading: [
        { topic: 'Few-shot Prompting', slug: 'few-shot', categorySlug: 'prompt-engineering' },
        { topic: 'Chain of Thought', slug: 'cot', categorySlug: 'prompt-engineering' },
        { topic: 'Structured Output', slug: 'structured-output', categorySlug: 'prompt-engineering' },
      ],
    },
    {
      slug: 'few-shot',
      title: 'Few-shot Prompting',
      categorySlug: 'prompt-engineering',
      introduction: {
        what: 'Few-shot prompting — это техника, при которой в промпт включаются несколько примеров входных и выходных данных, чтобы показать модели ожидаемый формат и стиль ответа. Модель «обучается» на лету, подстраиваясь под паттерн примеров без изменения весов.',
        why: 'Few-shot нужен, когда zero-shot не даёт нужного результата: задача нестандартная, нужен специфический формат, или модель не понимает инструкцию словами. Примеры нагляднее слов — модель быстрее «понимает», что от неё хотят, видя конкретные пары «вопрос → ответ».',
        where: 'Few-shot используется при классификации текстов с нестандартными категориями, извлечении структурированных данных, генерации в определённом стиле, переводе со специфической терминологией и в задачах, где важен точный формат вывода.',
        problem: 'Few-shot решает проблему недостаточной спецификации задачи. Одной инструкции часто не хватает для сложных или нестандартных задач. Примеры позволяют модели «увидеть» ожидаемый результат и воспроизвести паттерн на новых данных.',
      },
      theory: {
        terms: [
          { term: 'In-context Learning', definition: 'Способность модели обучаться на примерах внутри промпта без изменения весов. Ключевое свойство больших LLM, emerging при масштабировании.' },
          { term: 'Example Selection', definition: 'Процесс выбора наиболее репрезентативных примеров для few-shot. Качество примеров влияет на результат больше, чем их количество.' },
          { term: 'K-shot', definition: 'Количество примеров в промпте. 1-shot = один пример, 5-shot = пять примеров. Больше не всегда лучше — важна релевантность.' },
          { term: 'Label Format', definition: 'Формат ответа в примерах. Модель воспроизводит формат, который видит в примерах, включая знаки препинания и структуру.' },
        ],
        principles: 'Few-shot работает благодаря механизму in-context learning: attention-слои модели сопоставляют новый запрос с примерами в промпте, извлекая паттерн преобразования. Качество few-shot критически зависит от выбора примеров: они должны быть репрезентативными, разнообразными и согласованными по формату. Обычно 3-5 примеров достаточно — больше примеров не улучшает результат пропорционально, но расходует контекстное окно.',
        architecture: 'При few-shot промпт содержит последовательность пар «вход → выход», за которыми следует новый вход без ответа. Модель обрабатывает все примеры через Transformer, и attention-механизм вычисляет связи между новым запросом и примерами. Внутренние представления примеров направляют генерацию: модель воспроизводит обнаруженный паттерн. Это не обучение в традиционном смысле — веса не меняются, но активации адаптируются к контексту.',
        connections: 'Few-shot развивает zero-shot, добавляя примеры. Chain of Thought — это специфический вид few-shot, где примеры содержат рассуждения. Structured Output использует few-shot для демонстрации формата JSON/XML.',
      },
      diagram: {
        type: 'flowchart',
        title: 'Few-shot Prompting',
        svgContent: `<svg viewBox="0 0 600 510" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <!-- Background -->
  <rect x="0" y="0" width="600" height="510" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Few-shot Prompting</text>
  <text x="300" y="44" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Показываем паттерн через примеры, модель подстраивается</text>

  <!-- Step 1 -->
  <rect x="30" y="58" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="85" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="90" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="80" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 1: Пример 1</text>
  <text x="80" y="98" fill="var(--muted-foreground)" font-size="10">«отлично» — позитивная (показываем формат)</text>

  <!-- Connector 1-2 -->
  <line x1="55" y1="113" x2="55" y2="128" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 2 -->
  <rect x="30" y="128" width="540" height="55" rx="8" fill="oklch(0.577 0.245 27)" opacity="0.08" stroke="oklch(0.577 0.245 27)" stroke-width="1.5"/>
  <circle cx="55" cy="155" r="14" fill="oklch(0.577 0.245 27)" opacity="0.2"/>
  <text x="55" y="160" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="150" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 2: Пример 2</text>
  <text x="80" y="168" fill="var(--muted-foreground)" font-size="10">«ужасно» — негативная (закрепляем паттерн)</text>

  <!-- Connector 2-3 -->
  <line x1="55" y1="183" x2="55" y2="198" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 3 -->
  <rect x="30" y="198" width="540" height="55" rx="8" fill="oklch(0.6 0.06 90)" opacity="0.08" stroke="oklch(0.6 0.06 90)" stroke-width="1.5"/>
  <circle cx="55" cy="225" r="14" fill="oklch(0.6 0.06 90)" opacity="0.2"/>
  <text x="55" y="230" text-anchor="middle" fill="oklch(0.6 0.06 90)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="220" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 3: Пример 3</text>
  <text x="80" y="238" fill="var(--muted-foreground)" font-size="10">«нормально» — нейтральная (показываем все классы)</text>

  <!-- Connector 3-4 -->
  <line x1="55" y1="253" x2="55" y2="268" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 4 -->
  <rect x="30" y="268" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="295" r="14" fill="oklch(0.75 0.15 75)" opacity="0.2"/>
  <text x="55" y="300" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="290" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 4: Новый запрос</text>
  <text x="80" y="308" fill="var(--muted-foreground)" font-size="10">«превосходно» — ??? (модель применяет паттерн)</text>

  <!-- Connector 4-5 -->
  <line x1="55" y1="323" x2="55" y2="338" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 5 -->
  <rect x="30" y="338" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="365" r="14" fill="oklch(0.55 0.15 165)" opacity="0.25"/>
  <text x="55" y="370" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">5</text>
  <text x="80" y="360" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 5: In-Context Learning</text>
  <text x="80" y="378" fill="var(--muted-foreground)" font-size="10">Модель «обучается» на примерах в промпте без изменения весов</text>

  <!-- Bottom insight bar -->
  <rect x="30" y="415" width="540" height="45" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="300" y="435" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">3-5 примеров достаточно</text>
  <text x="300" y="451" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Качество примеров важнее количества!</text>
</svg>`,
      },
      practicalExamples: [
        {
          title: 'Few-shot классификация',
          description: 'Классификация отзывов с нестандартными категориями через примеры.',
          code: `const messages = [
  { role: 'system', content: 'Классифицируй отзыв.' },
  { role: 'user', content: 'Доставка быстрая, но товар не соответствует описанию → качество' },
  { role: 'assistant', content: 'качество' },
  { role: 'user', content: 'Курьер был груб, посылка помята → логистика' },
  { role: 'assistant', content: 'логистика' },
  { role: 'user', content: 'Цена выше, чем у конкурентов → ценообразование' },
  { role: 'assistant', content: 'ценообразование' },
  { role: 'user', content: 'Не работает кнопка на пульте → качество' },
];`,
          language: 'typescript',
        },
      ],
      sandboxes: [
        {
          type: 'prompt-playground',
          title: 'Попробуйте Few-shot',
          description: 'Добавьте 2-3 примера в промпт и посмотрите, как модель подстроится под паттерн. Сравните с zero-shot.',
          defaultPrompt: 'Классифицируй отзыв: "Ужасное качество, курьер опоздал на 2 часа"',
          defaultSystem: 'Классифицируй отзыв в одну из категорий: качество, логистика, сервис, цена.\n\nПримеры:\nОтзыв: "Телефон сломался через неделю" → качество\nОтзыв: "Доставка за 2 часа, отлично!" → логистика\nОтзыв: "Цена завышена, но товар хороший" → цена',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Слишком много примеров',
          explanation: '10+ примеров расходуют контекстное окно и могут запутать модель из-за противоречивых паттернов. Больше — не лучше.',
          correctApproach: 'Используйте 3-5 максимально репрезентативных примеров. Каждый пример должен демонстрировать разный аспект задачи.',
        },
        {
          mistake: 'Несогласованный формат примеров',
          explanation: 'Если примеры имеют разный формат (один с двоеточием, другой без), модель запутается и выдаст непредсказуемый результат.',
          correctApproach: 'Строго соблюдайте один формат во всех примерах: одинаковая пунктуация, структура, длина ответов.',
        },
      ],
      furtherReading: [
        { topic: 'Zero-shot Prompting', slug: 'zero-shot', categorySlug: 'prompt-engineering' },
        { topic: 'Chain of Thought', slug: 'cot', categorySlug: 'prompt-engineering' },
        { topic: 'Structured Output', slug: 'structured-output', categorySlug: 'prompt-engineering' },
      ],
    },
    {
      slug: 'cot',
      title: 'Chain of Thought',
      categorySlug: 'prompt-engineering',
      introduction: {
        what: 'Chain of Thought (CoT) — это техника промптинга, при которой модель поэтапно рассуждает перед тем как дать финальный ответ. Вместо прямого ответа модель сначала разбивает задачу на шаги, рассуждает о каждом и только потом приходит к выводу. Это радикально улучшает результаты на задачах, требующих логики и вычислений.',
        why: 'CoT нужен потому, что LLM склонны давать интуитивные, но неверные ответы на сложные вопросы. Пошаговое рассуждение заставляет модель «думать вслух», что снижает вероятность ошибок. Исследования показывают улучшение на 40%+ на математических и логических задачах.',
        where: 'CoT применяется в математике, программировании, логических задачах, многошаговом планировании, анализе данных, юридическом анализе и медицинских диагнозах — везде, где важна обоснованность ответа.',
        problem: 'CoT решает проблему «быстрых интуитивных ответов» LLM. Без рассуждений модель часто даёт первый пришедший на ум (но неверный) ответ. CoT замедляет генерацию, но критически повышает точность.',
      },
      theory: {
        terms: [
          { term: 'Zero-shot CoT', definition: 'Вариант CoT без примеров рассуждений — достаточно добавить фразу «Давай рассуждать пошагово» в конец промпта.' },
          { term: 'Self-Consistency', definition: 'Техника, при которой модель генерирует несколько цепочек рассуждений и выбирает наиболее частый ответ.' },
          { term: 'Tree of Thoughts', definition: 'Расширение CoT, где модель исследует несколько ветвей рассуждений и выбирает оптимальную.' },
          { term: 'Scratchpad', definition: 'Промежуточная область для вычислений и рассуждений модели. Аналог черновика для человека.' },
        ],
        principles: 'Chain of Thought работает за счёт того, что каждый шаг рассуждения создаёт промежуточный контекст, который модель использует для следующего шага. Это аналогично тому, как человек решает задачу на черновике: промежуточные вычисления снижают когнитивную нагрузку. Модель буквально «видит» свои предыдущие рассуждения в контексте и может исправить ошибки на ранних этапах.',
        architecture: 'При CoT промпте модель генерирует промежуточные токены рассуждения перед финальным ответом. Каждый сгенерированный токен становится частью контекста для последующих. Attention-механизм может ссылаться на ранние шаги рассуждения при генерации поздних. Это создаёт «цепочку» логических зависимостей: шаг 1 → шаг 2 → ... → финальный ответ.',
        connections: 'CoT — основа для ReAct (рассуждения + действия), используется в AI Agents для планирования, связан с Context Engineering (рассуждения занимают контекст) и Structured Output (форматирование шагов).',
      },
      diagram: {
        type: 'flowchart',
        title: 'Chain of Thought vs прямой ответ',
        svgContent: `<svg viewBox="0 0 600 510" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <!-- Background -->
  <rect x="0" y="0" width="600" height="510" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Chain of Thought</text>
  <text x="300" y="44" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Пошаговые рассуждения снижают ошибки на сложных задачах</text>

  <!-- Step 1 -->
  <rect x="30" y="58" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="85" r="14" fill="oklch(0.75 0.15 75)" opacity="0.2"/>
  <text x="55" y="90" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="80" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 1: Вопрос</text>
  <text x="80" y="98" fill="var(--muted-foreground)" font-size="10">Сколько будет 17 x 24?</text>

  <!-- Connector 1-2 -->
  <line x1="55" y1="113" x2="55" y2="128" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 2 -->
  <rect x="30" y="128" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="155" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="160" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="150" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 2: Разбиваем</text>
  <text x="80" y="168" fill="var(--muted-foreground)" font-size="10">17 x 20 = 340</text>

  <!-- Connector 2-3 -->
  <line x1="55" y1="183" x2="55" y2="198" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 3 -->
  <rect x="30" y="198" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="225" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="230" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="220" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 3: Вычисляем</text>
  <text x="80" y="238" fill="var(--muted-foreground)" font-size="10">17 x 4 = 68</text>

  <!-- Connector 3-4 -->
  <line x1="55" y1="253" x2="55" y2="268" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 4 -->
  <rect x="30" y="268" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="295" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="300" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="290" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 4: Складываем</text>
  <text x="80" y="308" fill="var(--muted-foreground)" font-size="10">340 + 68 = 408</text>

  <!-- Connector 4-5 -->
  <line x1="55" y1="323" x2="55" y2="338" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 5 -->
  <rect x="30" y="338" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="365" r="14" fill="oklch(0.55 0.15 165)" opacity="0.25"/>
  <text x="55" y="370" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">5</text>
  <text x="80" y="360" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 5: Финальный ответ</text>
  <text x="80" y="378" fill="var(--muted-foreground)" font-size="10">408 (проверено пошагово)</text>

  <!-- Bottom insight bar -->
  <rect x="30" y="415" width="540" height="45" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="300" y="435" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Пошаговые рассуждения снижают ошибки на 40%+</text>
  <text x="300" y="451" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">на логических задачах</text>
</svg>`,
      },
      practicalExamples: [
        {
          title: 'Zero-shot CoT',
          description: 'Самый простой способ активировать пошаговое рассуждение — добавить одну фразу.',
          code: `const prompt = "В магазине было 23 яблока. Утром купили 7, " +
  "днём вернули 3, а вечером купили ещё 12. " +
  "Сколько яблок осталось? Давай рассуждать пошагово.";

// Модель сгенерирует:
// 1. Начальное количество: 23 яблока
// 2. Утром купили 7: 23 - 7 = 16
// 3. Днём вернули 3: 16 + 3 = 19  
// 4. Вечером купили 12: 19 - 12 = 7
// Ответ: 7 яблок`,
          language: 'typescript',
        },
      ],
      sandboxes: [
        {
          type: 'prompt-playground',
          title: 'Попробуйте Chain of Thought',
          description: 'Добавьте фразу "Давай рассуждать пошагово" в конец промпта и сравните качество ответа с прямым вопросом.',
          defaultPrompt: 'В магазине было 23 яблока. Утром купили 7, днём вернули 3, а вечером купили ещё 12. Сколько яблок осталось? Давай рассуждать пошагово.',
          defaultSystem: 'Ты математик. Рассуждай пошагово, показывая каждый этап вычислений.',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Использовать CoT для простых задач',
          explanation: 'CoT увеличивает расход токенов и время ответа. Для простых вопросов (перевод, факты) пошаговое рассуждение не нужно и только замедляет работу.',
          correctApproach: 'Применяйте CoT только для задач, требующих логики, вычислений или многошагового анализа. Для простых запросов используйте zero-shot.',
        },
      ],
      furtherReading: [
        { topic: 'Zero-shot Prompting', slug: 'zero-shot', categorySlug: 'prompt-engineering' },
        { topic: 'ReAct', slug: 'react', categorySlug: 'prompt-engineering' },
        { topic: 'AI Agents — Agent Loop', slug: 'agent-loop', categorySlug: 'ai-agents' },
      ],
    },
    {
      slug: 'react',
      title: 'ReAct',
      categorySlug: 'prompt-engineering',
      introduction: {
        what: 'ReAct (Reasoning + Acting) — это парадигма, объединяющая рассуждения (Chain of Thought) с выполнением действий (Tool Use). Модель чередует шаги «думать» и «действовать»: она рассуждает о задаче, решает какое действие предпринять, выполняет его через инструмент, наблюдает результат и продолжает цикл.',
        why: 'ReAct нужен потому, что чистое рассуждение (CoT) ограничено знаниями модели, а чистое действие без рассуждения приводит к хаотичному использованию инструментов. ReAct объединяет сильные стороны обоих подходов: модель рассуждает, что делать, делает это и корректирует план на основе результатов.',
        where: 'ReAct применяется в AI-агентах, вопросно-ответных системах с доступом к инструментам, автономных ассистентах, аналитических системах и любом сценарии, где LLM должен взаимодействовать с внешним миром.',
        problem: 'ReAct решает проблему «галлюцинаций при рассуждении»: когда модель CoT рассуждает о фактах, которых не знает, она может ошибаться. ReAct позволяет модели проверять свои гипотезы через реальные действия — запросы к API, поиск, вычисления.',
      },
      theory: {
        terms: [
          { term: 'Thought', definition: 'Шаг рассуждения модели в цикле ReAct. Модель анализирует текущее состояние и решает, что делать дальше.' },
          { term: 'Action', definition: 'Действие, которое модель выполняет через доступные инструменты: поиск, API-запрос, вычисление и т.д.' },
          { term: 'Observation', definition: 'Результат действия, который модель получает и использует для следующего шага рассуждения.' },
          { term: 'Tool Definition', definition: 'Описание доступного инструмента: имя, описание, параметры. Модель выбирает инструмент на основе этого описания.' },
        ],
        principles: 'ReAct следует простому циклу: Thought → Action → Observation → Thought → ... → Final Answer. На каждом шаге модель явно формулирует свои рассуждения, выбирает действие, получает результат и интегрирует его в дальнейший анализ. Этот цикл продолжается, пока модель не соберёт достаточно информации для финального ответа. Ключевое преимущество — модель может исправлять ошибки: если наблюдение не соответствует ожиданиям, она корректирует план.',
        architecture: 'ReAct реализуется через структурированный промпт, определяющий доступные инструменты и формат взаимодействия. Каждый цикл генерирует три типа токенов: Thought (рассуждение), Action (вызов инструмента) и Observation (результат). Observation обычно вставляется системой, а не генерируется моделью. Промпт включает описание инструментов и примеры цикла ReAct. Современные реализации используют function calling API вместо текстового формата.',
        connections: 'ReAct — фундамент для AI Agents (агентный цикл), тесно связан с MCP (протокол подключения инструментов), использует CoT для рассуждений и Structured Output для вызова инструментов.',
      },
      diagram: {
        type: 'flowchart',
        title: 'Цикл ReAct',
        svgContent: `<svg viewBox="0 0 600 510" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <!-- Background -->
  <rect x="0" y="0" width="600" height="510" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">ReAct: Reasoning + Acting</text>
  <text x="300" y="44" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Рассуждения и действия в цикле до финального ответа</text>

  <!-- Step 1 -->
  <rect x="30" y="58" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="85" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="90" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="80" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 1: Thought</text>
  <text x="80" y="98" fill="var(--muted-foreground)" font-size="10">Модель рассуждает: «Мне нужно найти информацию о...»</text>

  <!-- Connector 1-2 -->
  <line x1="55" y1="113" x2="55" y2="128" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 2 -->
  <rect x="30" y="128" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="155" r="14" fill="oklch(0.75 0.15 75)" opacity="0.2"/>
  <text x="55" y="160" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="150" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 2: Action</text>
  <text x="80" y="168" fill="var(--muted-foreground)" font-size="10">Модель вызывает инструмент: search(«информация»)</text>

  <!-- Connector 2-3 -->
  <line x1="55" y1="183" x2="55" y2="198" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 3 -->
  <rect x="30" y="198" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="225" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="230" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="220" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 3: Observation</text>
  <text x="80" y="238" fill="var(--muted-foreground)" font-size="10">Получает результат от инструмента</text>

  <!-- Connector 3-4 -->
  <line x1="55" y1="253" x2="55" y2="268" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 4 -->
  <rect x="30" y="268" width="540" height="55" rx="8" fill="oklch(0.577 0.245 27)" opacity="0.08" stroke="oklch(0.577 0.245 27)" stroke-width="1.5"/>
  <circle cx="55" cy="295" r="14" fill="oklch(0.577 0.245 27)" opacity="0.2"/>
  <text x="55" y="300" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="290" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 4: Repeat</text>
  <text x="80" y="308" fill="var(--muted-foreground)" font-size="10">Возвращаемся к Шагу 1 с новыми данными</text>

  <!-- Connector 4-5 -->
  <line x1="55" y1="323" x2="55" y2="338" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 5 -->
  <rect x="30" y="338" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="365" r="14" fill="oklch(0.55 0.15 165)" opacity="0.25"/>
  <text x="55" y="370" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">5</text>
  <text x="80" y="360" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 5: Final Answer</text>
  <text x="80" y="378" fill="var(--muted-foreground)" font-size="10">Формулирует итоговый ответ</text>

  <!-- Bottom insight bar -->
  <rect x="30" y="415" width="540" height="45" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1"/>
  <text x="300" y="435" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">ReAct = рассуждения + действия в цикле</text>
  <text x="300" y="451" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Модель проверяет гипотезы через реальные действия</text>
</svg>`,
      },
      practicalExamples: [
        {
          title: 'ReAct агент с поиском',
          description: 'Пример реализации простого ReAct-агента с доступом к поиску.',
          code: `const tools = [{
  name: 'search',
  description: 'Поиск информации в интернете',
  parameters: { query: 'string' }
}];

// Цикл ReAct
async function reactAgent(question: string) {
  const messages = [{ role: 'user', content: question }];
  
  while (true) {
    const response = await callLLM(messages, tools);
    
    if (response.type === 'final_answer') {
      return response.content; // Финальный ответ
    }
    
    if (response.type === 'action') {
      // Выполняем действие
      const observation = await executeTool(response.tool, response.args);
      // Добавляем результат в контекст
      messages.push({ role: 'assistant', content: response.thought });
      messages.push({ role: 'user', content: \`Observation: \${observation}\` });
    }
  }
}`,
          language: 'typescript',
        },
      ],
      sandboxes: [
        {
          type: 'system-prompt',
          title: 'Как системный промпт меняет поведение',
          description: 'Попробуйте разные роли для модели и увидите, как радикально меняется стиль и содержание ответа при одном и том же вопросе.',
          defaultPrompt: 'Расскажи о себе.',
          defaultSystem: 'Ты полезный ассистент.',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Бесконечный цикл действий',
          explanation: 'Модель может зациклиться, повторяя одни и те же действия без прогресса к финальному ответу.',
          correctApproach: 'Установите лимит итераций (5-10) и добавьте механизм принудительного завершения. Также помогите модели, явно прося «сделай вывод из имеющихся данных».',
        },
      ],
      furtherReading: [
        { topic: 'Chain of Thought', slug: 'cot', categorySlug: 'prompt-engineering' },
        { topic: 'Agent Loop', slug: 'agent-loop', categorySlug: 'ai-agents' },
        { topic: 'MCP Tools', slug: 'mcp-tools', categorySlug: 'mcp' },
      ],
    },
    {
      slug: 'structured-output',
      title: 'Structured Output',
      categorySlug: 'prompt-engineering',
      introduction: {
        what: 'Structured Output — это техника получения ответа от LLM в строго определённом формате: JSON, XML, таблица или другая структурированная форма. Вместо свободного текста модель генерирует данные, которые можно парсить программно без дополнительной обработки.',
        why: 'Structured Output критически важен для интеграции LLM в приложения: API, базы данных, UI-компоненты требуют данных в определённом формате. Свободный текст требует парсинга, который ненадёжен. Структурированный вывод гарантирует, что результат можно использовать напрямую.',
        where: 'Structured Output используется везде, где LLM интегрируется в программные системы: извлечение данных из текста, генерация конфигураций, создание API-ответов, заполнение форм, классификация с множеством категорий, генерация SQL-запросов.',
        problem: 'Structured Output решает проблему ненадёжности свободного текста: модель может добавить лишние слова, забыть поле или изменить формат. Structured Output гарантирует консистентность, что необходимо для программной обработки результатов.',
      },
      theory: {
        terms: [
          { term: 'JSON Mode', definition: 'Режим API, гарантирующий, что ответ модели будет валидным JSON.' },
          { term: 'Function Calling', definition: 'Механизм, при котором модель генерирует структурированный вызов функции с параметрами.' },
          { term: 'JSON Schema', definition: 'Спецификация формата JSON-ответа: определяет поля, типы, обязательность и допустимые значения.' },
          { term: 'Pydantic Model', definition: 'Python-класс для валидации данных, часто используемый для описания ожидаемой структуры ответа LLM.' },
        ],
        principles: 'Structured Output работает двумя путями: на уровне промпта (инструкция + примеры формата) и на уровне API (JSON Mode, Function Calling). Промпт-подход гибче, но менее надёжен. API-подход гарантирует валидный формат, но ограничивает доступные модели. Лучший результат — комбинация обоих: чёткий промпт с примером + JSON Mode API.',
        architecture: 'При использовании Function Calling модель получает описание функций (имя, параметры, типы) и вместо генерации текстового ответа выбирает функцию и форматирует аргументы в JSON. JSON Mode работает иначе: модель генерирует текст как обычно, но логит-биас принуждает к генерации только валидных JSON-токенов.',
        connections: 'Structured Output — ключевой компонент для RAG (структурированные запросы), AI Agents (вызов инструментов), MCP (формат взаимодействия) и Production AI (надёжная интеграция).',
      },
      diagram: {
        type: 'flowchart',
        title: 'Structured Output',
        svgContent: `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <!-- Background -->
  <rect x="0" y="0" width="600" height="430" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Structured Output</text>
  <text x="300" y="44" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Получение ответа LLM в строго определённом формате</text>

  <!-- Step 1 -->
  <rect x="30" y="58" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="85" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="90" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="80" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 1: Определить схему</text>
  <text x="80" y="98" fill="var(--muted-foreground)" font-size="10">JSON Schema или формат ответа</text>

  <!-- Connector 1-2 -->
  <line x1="55" y1="113" x2="55" y2="128" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 2 -->
  <rect x="30" y="128" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="155" r="14" fill="oklch(0.75 0.15 75)" opacity="0.2"/>
  <text x="55" y="160" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="150" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 2: Системный промпт</text>
  <text x="80" y="168" fill="var(--muted-foreground)" font-size="10">Инструкция с требуемым форматом</text>

  <!-- Connector 2-3 -->
  <line x1="55" y1="183" x2="55" y2="198" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 3 -->
  <rect x="30" y="198" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="225" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="230" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="220" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 3: Пример формата</text>
  <text x="80" y="238" fill="var(--muted-foreground)" font-size="10">Показываем ожидаемую структуру JSON</text>

  <!-- Connector 3-4 -->
  <line x1="55" y1="253" x2="55" y2="268" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>

  <!-- Step 4 -->
  <rect x="30" y="268" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="295" r="14" fill="oklch(0.55 0.15 165)" opacity="0.25"/>
  <text x="55" y="300" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="290" fill="var(--foreground)" font-size="12" font-weight="bold">Шаг 4: Валидация</text>
  <text x="80" y="308" fill="var(--muted-foreground)" font-size="10">Проверяем, что ответ соответствует схеме</text>

  <!-- Bottom insight bar -->
  <rect x="30" y="345" width="540" height="45" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="300" y="365" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Строгий формат = надёжный парсинг в приложениях</text>
  <text x="300" y="381" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Лучший результат: промпт + JSON Mode / Function Calling</text>
</svg>`,
      },
      practicalExamples: [
        {
          title: 'Structured Output с JSON Schema',
          description: 'Использование OpenAI Function Calling для структурированного извлечения данных.',
          code: `const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'user', content: 'Иван, 30 лет, работает программистом в Яндексе' }
  ],
  functions: [{
    name: 'extract_person',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        company: { type: 'string' },
        role: { type: 'string' }
      },
      required: ['name', 'age']
    }
  }],
  function_call: { name: 'extract_person' }
});

// Гарантированно валидный JSON
const person = JSON.parse(response.choices[0].message.function_call.arguments);
// { name: "Иван", age: 30, company: "Яндекс", role: "программист" }`,
          language: 'typescript',
        },
      ],
      sandboxes: [
        {
          type: 'temperature',
          title: 'Температура и структурированный вывод',
          description: 'Попробуйте генерацию при разной температуре. Для структурированных данных нужна низкая температура (0.0-0.2), для творческих задач — высокая.',
          defaultPrompt: 'Напиши краткое описание продукта: беспроводные наушники с шумоподавлением',
          defaultTemperature: 0.3,
        },
      ],
      commonMistakes: [
        {
          mistake: 'Не указывать «только JSON» в промпте',
          explanation: 'Без явного указания модель может добавить поясняющий текст до или после JSON, что ломает парсер.',
          correctApproach: 'Всегда добавляйте в промпт: «Ответь ТОЛЬКО валидным JSON, без дополнительного текста». Используйте JSON Mode API для гарантии.',
        },
      ],
      furtherReading: [
        { topic: 'Few-shot Prompting', slug: 'few-shot', categorySlug: 'prompt-engineering' },
        { topic: 'MCP Tools', slug: 'mcp-tools', categorySlug: 'mcp' },
        { topic: 'AI Agents — Tool Use', slug: 'tool-use', categorySlug: 'ai-agents' },
      ],
    },
  ],
};
