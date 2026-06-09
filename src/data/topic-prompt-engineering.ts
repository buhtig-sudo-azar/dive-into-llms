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
        svgContent: `<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <defs>
    <radialGradient id="mindGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="oklch(0.75 0.15 165)" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="oklch(0.75 0.15 165)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ballGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="oklch(0.8 0.12 200)" stop-opacity="0.5"/>
      <stop offset="60%" stop-color="oklch(0.5 0.15 200)" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="oklch(0.4 0.1 200)" stop-opacity="0.05"/>
    </radialGradient>
    <filter id="float"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>

  <!-- Background -->
  <rect x="0" y="0" width="600" height="380" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>

  <!-- Stars / sparkles -->
  <circle cx="80" cy="50" r="1.5" fill="oklch(0.85 0.1 200)" opacity="0.5"/>
  <circle cx="520" cy="65" r="1.5" fill="oklch(0.85 0.1 200)" opacity="0.5"/>
  <circle cx="450" cy="35" r="1" fill="oklch(0.85 0.1 200)" opacity="0.4"/>
  <circle cx="150" cy="30" r="1" fill="oklch(0.85 0.1 200)" opacity="0.4"/>
  <circle cx="350" cy="45" r="1.2" fill="oklch(0.85 0.1 200)" opacity="0.3"/>
  <circle cx="560" cy="100" r="1.2" fill="oklch(0.85 0.1 200)" opacity="0.3"/>

  <!-- Title -->
  <text x="300" y="32" text-anchor="middle" fill="var(--foreground)" font-size="16" font-weight="bold">Телепат (Zero-shot)</text>
  <text x="300" y="48" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Модель знает ответ без примеров — как телепат, которому нужен лишь вопрос</text>

  <!-- Telepath character - body -->
  <ellipse cx="130" cy="260" rx="45" ry="55" fill="oklch(0.35 0.08 260)" opacity="0.3"/>
  <!-- Head -->
  <circle cx="130" cy="185" r="32" fill="oklch(0.55 0.08 60)" opacity="0.25" stroke="oklch(0.55 0.08 60)" stroke-width="1"/>
  <!-- Mind glow -->
  <circle cx="130" cy="170" r="45" fill="url(#mindGlow)" opacity="0.6"/>
  <!-- Eyes -->
  <ellipse cx="122" cy="182" rx="4" ry="3" fill="oklch(0.85 0.15 165)"/>
  <ellipse cx="138" cy="182" rx="4" ry="3" fill="oklch(0.85 0.15 165)"/>
  <!-- Third eye / glowing mind -->
  <circle cx="130" cy="168" r="5" fill="oklch(0.75 0.15 165)" opacity="0.7"/>
  <circle cx="130" cy="168" r="3" fill="oklch(0.9 0.1 165)" opacity="0.9"/>

  <!-- Badge on the telepath (System Prompt) -->
  <rect x="85" y="240" width="90" height="40" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1.2"/>
  <text x="130" y="255" text-anchor="middle" fill="var(--foreground)" font-size="8" font-weight="bold">Специальность</text>
  <text x="130" y="269" text-anchor="middle" fill="oklch(0.65 0.15 165)" font-size="7.5">Эксперт по Python</text>

  <!-- Label: System Prompt -->
  <rect x="68" y="285" width="124" height="18" rx="4" fill="oklch(0.55 0.15 165)" opacity="0.12"/>
  <text x="130" y="297" text-anchor="middle" fill="oklch(0.65 0.15 165)" font-size="7.5" font-weight="bold">Системный промпт</text>

  <!-- Floating question (User Prompt) - in the air -->
  <rect x="210" y="70" width="160" height="55" rx="10" fill="oklch(0.75 0.15 75)" opacity="0.12" stroke="oklch(0.75 0.15 75)" stroke-width="1.2"/>
  <!-- Wavy float effect -->
  <text x="290" y="90" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="8" font-weight="bold">Вопрос в воздухе</text>
  <text x="290" y="105" text-anchor="middle" fill="var(--foreground)" font-size="9" font-style="italic">"Объясни декораторы"</text>
  <text x="290" y="118" text-anchor="middle" fill="var(--muted-foreground)" font-size="7">Пользовательский промпт</text>
  <!-- Sparkles around question -->
  <circle cx="215" cy="78" r="2" fill="oklch(0.75 0.15 75)" opacity="0.4"/>
  <circle cx="367" cy="95" r="1.5" fill="oklch(0.75 0.15 75)" opacity="0.3"/>

  <!-- Crystal Ball -->
  <ellipse cx="420" cy="268" rx="70" ry="14" fill="oklch(0.3 0.05 260)" opacity="0.2"/>
  <!-- Ball stand -->
  <path d="M395 260 Q420 280 445 260" fill="none" stroke="oklch(0.45 0.06 260)" stroke-width="2"/>
  <line x1="400" y1="262" x2="395" y2="272" stroke="oklch(0.45 0.06 260)" stroke-width="1.5"/>
  <line x1="440" y1="262" x2="445" y2="272" stroke="oklch(0.45 0.06 260)" stroke-width="1.5"/>
  <!-- Ball itself -->
  <circle cx="420" cy="200" r="60" fill="url(#ballGlow)" stroke="oklch(0.55 0.12 200)" stroke-width="1.5"/>
  <!-- Reflection highlight -->
  <ellipse cx="405" cy="178" rx="18" ry="10" fill="oklch(0.95 0.02 200)" opacity="0.15" transform="rotate(-20,405,178)"/>
  <!-- Answer emerging from the ball -->
  <text x="420" y="195" text-anchor="middle" fill="oklch(0.85 0.12 165)" font-size="9" font-weight="bold">Декоратор —</text>
  <text x="420" y="208" text-anchor="middle" fill="oklch(0.85 0.12 165)" font-size="9">функция-обёртка,</text>
  <text x="420" y="221" text-anchor="middle" fill="oklch(0.85 0.12 165)" font-size="9">расширяющая...</text>

  <!-- Label: Result -->
  <rect x="365" y="290" width="110" height="18" rx="4" fill="oklch(0.65 0.12 165)" opacity="0.15"/>
  <text x="420" y="302" text-anchor="middle" fill="oklch(0.65 0.12 165)" font-size="7.5" font-weight="bold">Результат из шара</text>

  <!-- LLM label on telepath -->
  <rect x="96" y="220" width="68" height="16" rx="4" fill="oklch(0.55 0.15 165)" opacity="0.35"/>
  <text x="130" y="231" text-anchor="middle" fill="oklch(0.9 0.1 165)" font-size="8" font-weight="bold">LLM</text>

  <!-- Key insight box at bottom -->
  <rect x="30" y="330" width="540" height="38" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="300" y="347" text-anchor="middle" fill="var(--foreground)" font-size="9" font-weight="bold">Без примеров — телепат просто ЗНАЕТ из опыта</text>
  <text x="300" y="361" text-anchor="middle" fill="var(--muted-foreground)" font-size="8">Системный промпт задаёт роль, пользовательский — задачу. Примеры не нужны!</text>
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
        svgContent: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <defs>
    <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="oklch(0.55 0.06 75)" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="oklch(0.55 0.06 75)" stop-opacity="0.05"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect x="0" y="0" width="600" height="400" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="16" font-weight="bold">Шпаргалка (Few-shot)</text>
  <text x="300" y="44" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Пара примеров — и модель понимает паттерн, как студент со шпаргалкой</text>

  <!-- Desk surface -->
  <rect x="20" y="55" width="560" height="340" rx="8" fill="url(#deskGrad)"/>

  <!-- Student character - simplified sitting figure -->
  <!-- Head -->
  <circle cx="85" cy="145" r="22" fill="oklch(0.55 0.08 60)" opacity="0.2" stroke="oklch(0.55 0.08 60)" stroke-width="1"/>
  <!-- Eyes looking down at cheat sheet -->
  <circle cx="79" cy="143" r="2.5" fill="var(--foreground)" opacity="0.6"/>
  <circle cx="91" cy="143" r="2.5" fill="var(--foreground)" opacity="0.6"/>
  <!-- Smile -->
  <path d="M80 151 Q85 156 90 151" fill="none" stroke="var(--foreground)" stroke-width="1" opacity="0.5"/>
  <!-- Body / hunched over desk -->
  <path d="M65 167 Q70 200 80 210 L90 210 Q100 200 105 167" fill="oklch(0.45 0.1 250)" opacity="0.2"/>
  <!-- Arms on desk -->
  <path d="M70 195 Q90 205 115 195" fill="none" stroke="oklch(0.45 0.08 60)" stroke-width="3" opacity="0.3"/>

  <!-- Brain (In-Context Learning) -->
  <ellipse cx="85" cy="130" rx="16" ry="12" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="85" y="128" text-anchor="middle" fill="oklch(0.65 0.15 165)" font-size="5.5" font-weight="bold">In-Context</text>
  <text x="85" y="136" text-anchor="middle" fill="oklch(0.65 0.15 165)" font-size="5.5" font-weight="bold">Learning</text>
  <!-- Brain sparks -->
  <circle cx="72" cy="122" r="2" fill="oklch(0.65 0.15 165)" opacity="0.5"/>
  <circle cx="98" cy="120" r="1.5" fill="oklch(0.65 0.15 165)" opacity="0.4"/>

  <!-- Cheat Sheet - folded paper with examples -->
  <rect x="145" y="70" width="200" height="145" rx="4" fill="oklch(0.95 0.02 90)" opacity="0.9" stroke="oklch(0.7 0.06 75)" stroke-width="1"/>
  <!-- Folded corner -->
  <path d="M315 70 L345 70 L345 100 Z" fill="oklch(0.85 0.04 75)" opacity="0.5"/>
  <path d="M315 70 L315 100 L345 100 Z" fill="oklch(0.9 0.03 75)" opacity="0.6"/>
  <!-- Header -->
  <text x="245" y="90" text-anchor="middle" fill="oklch(0.5 0.08 75)" font-size="10" font-weight="bold">ШПАРГАЛКА</text>
  <line x1="160" y1="96" x2="330" y2="96" stroke="oklch(0.7 0.06 75)" stroke-width="0.5" stroke-dasharray="3,2"/>

  <!-- Example 1 -->
  <rect x="155" y="104" width="180" height="26" rx="3" fill="oklch(0.55 0.15 165)" opacity="0.1"/>
  <text x="165" y="118" fill="var(--foreground)" font-size="8.5">"отлично"</text>
  <text x="245" y="118" fill="oklch(0.55 0.15 165)" font-size="9" font-weight="bold">позитивная</text>
  <circle cx="330" cy="115" r="4" fill="oklch(0.65 0.18 145)" opacity="0.5"/>

  <!-- Example 2 -->
  <rect x="155" y="134" width="180" height="26" rx="3" fill="oklch(0.577 0.245 27)" opacity="0.08"/>
  <text x="165" y="148" fill="var(--foreground)" font-size="8.5">"ужасно"</text>
  <text x="245" y="148" fill="oklch(0.577 0.245 27)" font-size="9" font-weight="bold">негативная</text>
  <circle cx="330" cy="145" r="4" fill="oklch(0.577 0.245 27)" opacity="0.5"/>

  <!-- Example 3 -->
  <rect x="155" y="164" width="180" height="26" rx="3" fill="oklch(0.6 0.06 90)" opacity="0.12"/>
  <text x="165" y="178" fill="var(--foreground)" font-size="8.5">"нормально"</text>
  <text x="245" y="178" fill="oklch(0.5 0.05 90)" font-size="9" font-weight="bold">нейтральная</text>
  <circle cx="330" cy="175" r="4" fill="oklch(0.6 0.06 90)" opacity="0.5"/>

  <!-- Pattern detected label -->
  <text x="245" y="206" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="7.5" font-style="italic">паттерн распознан!</text>

  <!-- Exam paper / question sheet -->
  <rect x="370" y="70" width="195" height="145" rx="4" fill="oklch(0.95 0.02 60)" opacity="0.9" stroke="oklch(0.7 0.08 75)" stroke-width="1"/>
  <!-- Header -->
  <text x="467" y="90" text-anchor="middle" fill="oklch(0.5 0.08 75)" font-size="10" font-weight="bold">ЭКЗАМЕН</text>
  <line x1="380" y1="96" x2="555" y2="96" stroke="oklch(0.7 0.06 75)" stroke-width="0.5" stroke-dasharray="3,2"/>

  <!-- Question on exam -->
  <text x="467" y="120" text-anchor="middle" fill="var(--muted-foreground)" font-size="8">Вопрос:</text>
  <rect x="385" y="128" width="165" height="30" rx="4" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="467" y="142" text-anchor="middle" fill="var(--foreground)" font-size="9.5" font-weight="bold">"превосходно"</text>
  <text x="467" y="154" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="9">= ???</text>

  <!-- Answer box - filled in -->
  <text x="467" y="178" text-anchor="middle" fill="var(--muted-foreground)" font-size="8">Ответ:</text>
  <rect x="410" y="184" width="115" height="22" rx="4" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.2"/>
  <text x="467" y="199" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="11" font-weight="bold">позитивная</text>

  <!-- Pencil on desk -->
  <rect x="135" y="220" width="60" height="6" rx="1" fill="oklch(0.75 0.15 75)" opacity="0.4" transform="rotate(-15,165,223)"/>
  <polygon points="133,224 127,222 127,226" fill="oklch(0.55 0.08 60)" opacity="0.4" transform="rotate(-15,165,223)"/>

  <!-- In-Context Learning brain box -->
  <rect x="30" y="260" width="540" height="52" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <!-- Brain icon -->
  <ellipse cx="60" cy="286" rx="16" ry="14" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <path d="M52 286 Q56 278 60 282 Q64 278 68 286 Q64 294 60 290 Q56 294 52 286" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="90" y="281" fill="var(--foreground)" font-size="10" font-weight="bold">In-Context Learning: Мозг подстраивается под паттерн</text>
  <text x="90" y="298" fill="var(--muted-foreground)" font-size="8.5">Модель «обучается» на примерах прямо в промпте — без изменения весов</text>

  <!-- Key insight at bottom -->
  <rect x="30" y="325" width="260" height="55" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.06" stroke="oklch(0.55 0.15 165)" stroke-width="0.8"/>
  <text x="160" y="348" text-anchor="middle" fill="var(--foreground)" font-size="9" font-weight="bold">3-5 примеров достаточно</text>
  <text x="160" y="365" text-anchor="middle" fill="var(--muted-foreground)" font-size="8">Больше примеров не значит лучше</text>

  <rect x="310" y="325" width="260" height="55" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.06" stroke="oklch(0.75 0.15 75)" stroke-width="0.8"/>
  <text x="440" y="348" text-anchor="middle" fill="var(--foreground)" font-size="9" font-weight="bold">Качество важнее количества</text>
  <text x="440" y="365" text-anchor="middle" fill="var(--muted-foreground)" font-size="8">Репрезентативные и разнообразные</text>
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
        svgContent: `<svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <defs>
    <filter id="scribble"><feGaussianBlur stdDeviation="0.3"/></filter>
  </defs>

  <!-- Background -->
  <rect x="0" y="0" width="600" height="420" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Черновик vs Ответ навскидку</text>
  <text x="300" y="44" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Рассуждения пошагово помогают модели — как черновик помогает человеку</text>

  <!-- LEFT SIDE: Quick Guess (Bad) -->
  <!-- Torn/scrap paper - messy -->
  <rect x="20" y="58" width="270" height="215" rx="4" fill="oklch(0.95 0.03 75)" opacity="0.85" stroke="oklch(0.7 0.08 75)" stroke-width="1" stroke-dasharray="4,2"/>
  <!-- Header band -->
  <rect x="20" y="58" width="270" height="28" rx="4" fill="oklch(0.577 0.245 27)" opacity="0.15"/>
  <text x="155" y="77" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="11" font-weight="bold">Ответ навскидку</text>

  <!-- Confused face - guessing quickly -->
  <circle cx="70" cy="130" r="25" fill="oklch(0.55 0.08 60)" opacity="0.15" stroke="oklch(0.55 0.08 60)" stroke-width="1"/>
  <!-- Worried eyes -->
  <ellipse cx="63" cy="126" rx="3" ry="4" fill="var(--foreground)" opacity="0.5"/>
  <ellipse cx="77" cy="126" rx="3" ry="4" fill="var(--foreground)" opacity="0.5"/>
  <!-- Worry sweat drop -->
  <ellipse cx="88" cy="118" rx="2" ry="3" fill="oklch(0.6 0.1 230)" opacity="0.5"/>
  <!-- Uncertain mouth -->
  <path d="M63 138 Q70 134 77 138" fill="none" stroke="var(--foreground)" stroke-width="1" opacity="0.5"/>
  <!-- Question marks around head -->
  <text x="45" y="108" fill="oklch(0.577 0.245 27)" font-size="10" opacity="0.6">?</text>
  <text x="92" y="112" fill="oklch(0.577 0.245 27)" font-size="8" opacity="0.4">??</text>

  <!-- The question scribbled quickly -->
  <text x="155" y="112" text-anchor="middle" fill="var(--foreground)" font-size="10">Сколько будет</text>
  <text x="155" y="128" text-anchor="middle" fill="var(--foreground)" font-size="14" font-weight="bold">17 x 24</text>
  <text x="155" y="142" text-anchor="middle" fill="var(--muted-foreground)" font-size="8">?</text>

  <!-- Quick wrong answer - crossed out messily -->
  <text x="155" y="170" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="16" font-weight="bold" opacity="0.7">"408"</text>
  <!-- Messy strikethrough -->
  <line x1="110" y1="167" x2="200" y2="173" stroke="oklch(0.577 0.245 27)" stroke-width="2.5" opacity="0.4"/>
  <!-- Wrong stamp -->
  <rect x="125" y="185" width="60" height="22" rx="3" fill="oklch(0.577 0.245 27)" opacity="0.15" stroke="oklch(0.577 0.245 27)" stroke-width="1"/>
  <text x="155" y="200" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="11" font-weight="bold">Неверно</text>

  <!-- Squiggly random scratches showing no work -->
  <path d="M40 215 Q60 210 80 218 Q100 225 120 215" fill="none" stroke="oklch(0.6 0.05 75)" stroke-width="0.8" opacity="0.3"/>
  <path d="M40 228 Q70 222 100 230 Q130 236 160 225" fill="none" stroke="oklch(0.6 0.05 75)" stroke-width="0.8" opacity="0.25"/>
  <path d="M40 241 Q55 238 80 243 Q120 248 140 240" fill="none" stroke="oklch(0.6 0.05 75)" stroke-width="0.8" opacity="0.2"/>

  <text x="155" y="260" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="7.5" font-style="italic">Без рассуждений — модель угадывает</text>

  <!-- RIGHT SIDE: Scratchpad (Good) -->
  <!-- Notebook paper with lines -->
  <rect x="310" y="58" width="270" height="215" rx="4" fill="oklch(0.95 0.02 165)" opacity="0.85" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <!-- Header band -->
  <rect x="310" y="58" width="270" height="28" rx="4" fill="oklch(0.55 0.15 165)" opacity="0.15"/>
  <text x="445" y="77" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="11" font-weight="bold">Рассуждения на черновике</text>

  <!-- Notebook lines -->
  <line x1="320" y1="100" x2="570" y2="100" stroke="oklch(0.7 0.04 165)" stroke-width="0.4" opacity="0.3"/>
  <line x1="320" y1="120" x2="570" y2="120" stroke="oklch(0.7 0.04 165)" stroke-width="0.4" opacity="0.3"/>
  <line x1="320" y1="140" x2="570" y2="140" stroke="oklch(0.7 0.04 165)" stroke-width="0.4" opacity="0.3"/>
  <line x1="320" y1="160" x2="570" y2="160" stroke="oklch(0.7 0.04 165)" stroke-width="0.4" opacity="0.3"/>
  <line x1="320" y1="180" x2="570" y2="180" stroke="oklch(0.7 0.04 165)" stroke-width="0.4" opacity="0.3"/>
  <line x1="320" y1="200" x2="570" y2="200" stroke="oklch(0.7 0.04 165)" stroke-width="0.4" opacity="0.3"/>
  <line x1="320" y1="220" x2="570" y2="220" stroke="oklch(0.7 0.04 165)" stroke-width="0.4" opacity="0.3"/>
  <!-- Margin line -->
  <line x1="345" y1="90" x2="345" y2="265" stroke="oklch(0.6 0.1 27)" stroke-width="0.8" opacity="0.2"/>

  <!-- Focused face - thinking carefully -->
  <circle cx="365" cy="112" r="10" fill="oklch(0.55 0.08 60)" opacity="0.15" stroke="oklch(0.55 0.08 60)" stroke-width="0.8"/>
  <circle cx="362" cy="110" r="1.5" fill="var(--foreground)" opacity="0.5"/>
  <circle cx="368" cy="110" r="1.5" fill="var(--foreground)" opacity="0.5"/>
  <path d="M362 116 Q365 118 368 116" fill="none" stroke="var(--foreground)" stroke-width="0.6" opacity="0.5"/>

  <!-- Step-by-step on the notepad -->
  <text x="355" y="98" fill="oklch(0.55 0.15 165)" font-size="8" font-weight="bold">Шаг 1:</text>
  <text x="395" y="98" fill="var(--foreground)" font-size="8.5">17 x 24 = ?</text>

  <text x="355" y="118" fill="oklch(0.55 0.15 165)" font-size="8" font-weight="bold">Шаг 2:</text>
  <text x="395" y="118" fill="var(--foreground)" font-size="8.5">17 x 20 = 340</text>

  <text x="355" y="138" fill="oklch(0.55 0.15 165)" font-size="8" font-weight="bold">Шаг 3:</text>
  <text x="395" y="138" fill="var(--foreground)" font-size="8.5">17 x 4 = 68</text>

  <text x="355" y="158" fill="oklch(0.55 0.15 165)" font-size="8" font-weight="bold">Шаг 4:</text>
  <text x="395" y="158" fill="var(--foreground)" font-size="8.5">340 + 68 = 408</text>

  <!-- Correct answer box -->
  <rect x="350" y="170" width="210" height="28" rx="4" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.2"/>
  <text x="455" y="189" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">Ответ: 408</text>
  <!-- Checkmark -->
  <circle cx="545" cy="184" r="10" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <path d="M539 184 L543 189 L552 179" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="2" stroke-linecap="round"/>

  <!-- Neat written lines showing work done -->
  <text x="445" y="220" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="7.5" font-style="italic">Каждый шаг проверяем</text>
  <text x="445" y="235" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="7.5" font-style="italic">и видим промежуточные результаты</text>

  <!-- Divider -->
  <line x1="300" y1="58" x2="300" y2="273" stroke="var(--border)" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- VS label -->
  <circle cx="300" cy="165" r="14" fill="var(--card)" stroke="var(--border)" stroke-width="1"/>
  <text x="300" y="169" text-anchor="middle" fill="var(--muted-foreground)" font-size="9" font-weight="bold">VS</text>

  <!-- "Почему работает" section -->
  <rect x="20" y="290" width="560" height="115" rx="8" fill="var(--muted)" opacity="0.2" stroke="var(--border)" stroke-width="0.8"/>
  <text x="300" y="312" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Почему CoT работает</text>

  <!-- Insight card 1 -->
  <rect x="35" y="322" width="170" height="72" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="0.8"/>
  <circle cx="55" cy="340" r="10" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="344" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="9" font-weight="bold">1</text>
  <text x="125" y="345" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">Промежуточный контекст</text>
  <text x="120" y="362" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5">Каждый шаг создаёт контекст</text>
  <text x="120" y="376" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5">для следующего шага</text>

  <!-- Insight card 2 -->
  <rect x="215" y="322" width="170" height="72" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="0.8"/>
  <circle cx="235" cy="340" r="10" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="235" y="344" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="9" font-weight="bold">2</text>
  <text x="305" y="345" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">Самопроверка</text>
  <text x="300" y="362" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5">Модель «видит» свои</text>
  <text x="300" y="376" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5">вычисления и исправляет ошибки</text>

  <!-- Insight card 3 -->
  <rect x="395" y="322" width="170" height="72" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="0.8"/>
  <circle cx="415" cy="340" r="10" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="415" y="344" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="9" font-weight="bold">3</text>
  <text x="485" y="345" text-anchor="middle" fill="var(--foreground)" font-size="8.5" font-weight="bold">Декомпозиция</text>
  <text x="480" y="362" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5">Сложная задача разбивается</text>
  <text x="480" y="376" text-anchor="middle" fill="var(--muted-foreground)" font-size="7.5">на простые подзадачи</text>
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
        svgContent: `<svg viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <!-- Background -->
  <rect x="0" y="0" width="600" height="440" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="28" text-anchor="middle" fill="var(--foreground)" font-size="16" font-weight="bold">Детектив (ReAct)</text>
  <text x="300" y="44" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Рассуждение + Действие + Наблюдение — как детектив на месте преступления</text>

  <!-- Cork board background -->
  <rect x="20" y="55" width="560" height="255" rx="6" fill="oklch(0.7 0.06 75)" opacity="0.1" stroke="oklch(0.65 0.08 75)" stroke-width="1.5"/>
  <!-- Cork texture dots -->
  <circle cx="50" cy="80" r="1" fill="oklch(0.6 0.06 75)" opacity="0.2"/>
  <circle cx="120" cy="95" r="0.8" fill="oklch(0.6 0.06 75)" opacity="0.15"/>
  <circle cx="200" cy="75" r="1" fill="oklch(0.6 0.06 75)" opacity="0.2"/>
  <circle cx="350" cy="85" r="0.8" fill="oklch(0.6 0.06 75)" opacity="0.15"/>
  <circle cx="480" cy="78" r="1" fill="oklch(0.6 0.06 75)" opacity="0.2"/>
  <circle cx="550" cy="95" r="0.8" fill="oklch(0.6 0.06 75)" opacity="0.15"/>
  <circle cx="90" cy="250" r="0.8" fill="oklch(0.6 0.06 75)" opacity="0.15"/>
  <circle cx="250" cy="270" r="1" fill="oklch(0.6 0.06 75)" opacity="0.2"/>
  <circle cx="400" cy="260" r="0.8" fill="oklch(0.6 0.06 75)" opacity="0.15"/>
  <circle cx="530" cy="240" r="1" fill="oklch(0.6 0.06 75)" opacity="0.2"/>

  <!-- Detective character (top-left) -->
  <!-- Hat -->
  <rect x="42" y="65" width="36" height="8" rx="2" fill="oklch(0.3 0.06 260)" opacity="0.5"/>
  <rect x="48" y="55" width="24" height="14" rx="3" fill="oklch(0.3 0.06 260)" opacity="0.5"/>
  <!-- Face -->
  <circle cx="60" cy="88" r="14" fill="oklch(0.55 0.08 60)" opacity="0.2" stroke="oklch(0.55 0.08 60)" stroke-width="0.8"/>
  <!-- Eyes -->
  <circle cx="56" cy="86" r="1.8" fill="var(--foreground)" opacity="0.5"/>
  <circle cx="64" cy="86" r="1.8" fill="var(--foreground)" opacity="0.5"/>
  <!-- Determined mouth -->
  <line x1="56" y1="93" x2="64" y2="93" stroke="var(--foreground)" stroke-width="1" opacity="0.4"/>
  <!-- Detective coat collar -->
  <path d="M48 100 L55 108 L60 102 L65 108 L72 100" fill="none" stroke="oklch(0.35 0.08 260)" stroke-width="1.5" opacity="0.4"/>
  <!-- Magnifying glass in hand -->
  <circle cx="80" cy="98" r="8" fill="none" stroke="oklch(0.5 0.06 90)" stroke-width="1.5" opacity="0.6"/>
  <line x1="86" y1="104" x2="92" y2="112" stroke="oklch(0.5 0.06 90)" stroke-width="1.5" opacity="0.6"/>

  <!-- 1. THOUGHT - Thought bubble pinned to board -->
  <rect x="100" y="68" width="185" height="60" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1.2"/>
  <!-- Pin -->
  <circle cx="110" cy="73" r="4" fill="oklch(0.577 0.245 27)" opacity="0.6"/>
  <!-- Label -->
  <rect x="108" y="80" width="60" height="14" rx="3" fill="oklch(0.55 0.15 165)" opacity="0.25"/>
  <text x="138" y="91" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="8" font-weight="bold">Thought</text>
  <!-- Content -->
  <text x="115" y="108" fill="var(--foreground)" font-size="8">"Нужно узнать погоду</text>
  <text x="115" y="120" fill="var(--foreground)" font-size="8">в Москве"</text>

  <!-- 2. ACTION - Tool card pinned to board -->
  <rect x="310" y="68" width="180" height="60" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.12" stroke="oklch(0.75 0.15 75)" stroke-width="1.2"/>
  <!-- Pin -->
  <circle cx="320" cy="73" r="4" fill="oklch(0.577 0.245 27)" opacity="0.6"/>
  <!-- Label -->
  <rect x="318" y="80" width="55" height="14" rx="3" fill="oklch(0.75 0.15 75)" opacity="0.25"/>
  <text x="345" y="91" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="8" font-weight="bold">Action</text>
  <!-- Tool icon - phone/device -->
  <rect x="322" y="100" width="12" height="18" rx="2" fill="none" stroke="oklch(0.75 0.15 75)" stroke-width="1" opacity="0.5"/>
  <circle cx="328" cy="115" r="1.5" fill="oklch(0.75 0.15 75)" opacity="0.5"/>
  <!-- Content -->
  <text x="345" y="108" fill="var(--foreground)" font-size="8">weather_api</text>
  <text x="345" y="120" fill="var(--foreground)" font-size="8.5" font-weight="bold">('Москва')</text>

  <!-- String connecting Thought to Action (red thread) -->
  <path d="M285 98 Q298 95 310 98" fill="none" stroke="oklch(0.577 0.2 27)" stroke-width="1.2" opacity="0.3" stroke-dasharray="3,2"/>

  <!-- 3. OBSERVATION - Evidence/clue card -->
  <rect x="310" y="150" width="180" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.1" stroke="oklch(0.6 0.2 280)" stroke-width="1.2"/>
  <!-- Pin -->
  <circle cx="320" cy="155" r="4" fill="oklch(0.577 0.245 27)" opacity="0.6"/>
  <!-- Label -->
  <rect x="318" y="160" width="78" height="14" rx="3" fill="oklch(0.6 0.2 280)" opacity="0.25"/>
  <text x="357" y="171" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="8" font-weight="bold">Observation</text>
  <!-- Clue icon - thermometer -->
  <rect x="322" y="178" width="5" height="16" rx="2" fill="none" stroke="oklch(0.6 0.2 280)" stroke-width="1" opacity="0.5"/>
  <circle cx="324.5" cy="196" r="3.5" fill="oklch(0.577 0.2 27)" opacity="0.3"/>
  <!-- Content -->
  <text x="342" y="188" fill="var(--foreground)" font-size="10" font-weight="bold">+5°C</text>
  <text x="342" y="200" fill="var(--muted-foreground)" font-size="7.5">Доказательство получено</text>

  <!-- String connecting Action to Observation -->
  <path d="M400 128 Q405 140 400 150" fill="none" stroke="oklch(0.577 0.2 27)" stroke-width="1.2" opacity="0.3" stroke-dasharray="3,2"/>

  <!-- REPEAT badge -->
  <rect x="115" y="150" width="120" height="35" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="0.8" stroke-dasharray="3,2"/>
  <!-- Circular repeat icon -->
  <path d="M130 165 A8 8 0 1 1 138 157" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="1.2" opacity="0.5"/>
  <polygon points="138,154 138,160 143,157" fill="oklch(0.55 0.15 165)" opacity="0.5"/>
  <text x="175" y="167" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="8" font-weight="bold">Цикл</text>
  <text x="175" y="179" text-anchor="middle" fill="var(--muted-foreground)" font-size="7">повторяется</text>

  <!-- String from Observation back to repeat area -->
  <path d="M310 177 Q280 175 235 170" fill="none" stroke="oklch(0.577 0.2 27)" stroke-width="1.2" opacity="0.3" stroke-dasharray="3,2"/>

  <!-- 4. FINAL ANSWER - Case solved! -->
  <rect x="100" y="210" width="410" height="65" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <!-- Stamp-like "CASE SOLVED" -->
  <rect x="110" y="218" width="105" height="22" rx="3" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="162" y="233" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="9" font-weight="bold">ДЕЛО РАСКРЫТО</text>
  <!-- Label -->
  <text x="115" y="252" fill="var(--foreground)" font-size="8">Final Answer:</text>
  <text x="115" y="266" fill="var(--foreground)" font-size="10" font-weight="bold">"В Москве сейчас +5°C"</text>
  <!-- Checkmark -->
  <circle cx="490" cy="245" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <path d="M482 245 L488 252 L500 238" fill="none" stroke="oklch(0.55 0.15 165)" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Pin -->
  <circle cx="110" cy="215" r="4" fill="oklch(0.577 0.245 27)" opacity="0.6"/>
  <circle cx="500" cy="215" r="4" fill="oklch(0.577 0.245 27)" opacity="0.6"/>

  <!-- String from Observation down to Final Answer -->
  <path d="M400 205 Q390 210 350 215" fill="none" stroke="oklch(0.577 0.2 27)" stroke-width="1.2" opacity="0.3" stroke-dasharray="3,2"/>
  <text x="420" y="215" fill="oklch(0.55 0.15 165)" font-size="7" font-style="italic">данных достаточно</text>

  <!-- Example walkthrough at bottom -->
  <rect x="20" y="325" width="560" height="100" rx="8" fill="var(--muted)" opacity="0.2" stroke="var(--border)" stroke-width="0.8"/>
  <text x="300" y="347" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Пример цикла ReAct</text>

  <!-- Step cards in a row -->
  <!-- Thought step -->
  <rect x="35" y="358" width="120" height="52" rx="5" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="0.8"/>
  <text x="95" y="375" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="7.5" font-weight="bold">Thought</text>
  <text x="95" y="390" text-anchor="middle" fill="var(--muted-foreground)" font-size="7">Нужно узнать</text>
  <text x="95" y="401" text-anchor="middle" fill="var(--muted-foreground)" font-size="7">погоду в Москве</text>

  <!-- Action step -->
  <rect x="170" y="358" width="130" height="52" rx="5" fill="oklch(0.75 0.15 75)" opacity="0.08" stroke="oklch(0.75 0.15 75)" stroke-width="0.8"/>
  <text x="235" y="375" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="7.5" font-weight="bold">Action</text>
  <text x="235" y="390" text-anchor="middle" fill="var(--muted-foreground)" font-size="7">weather_api</text>
  <text x="235" y="401" text-anchor="middle" fill="var(--muted-foreground)" font-size="7">('Москва')</text>

  <!-- Observation step -->
  <rect x="315" y="358" width="115" height="52" rx="5" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="0.8"/>
  <text x="372" y="375" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="7.5" font-weight="bold">Observation</text>
  <text x="372" y="393" text-anchor="middle" fill="var(--muted-foreground)" font-size="9" font-weight="bold">+5°C</text>

  <!-- Final Answer step -->
  <rect x="445" y="358" width="120" height="52" rx="5" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="505" y="375" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="7.5" font-weight="bold">Final Answer</text>
  <text x="505" y="393" text-anchor="middle" fill="var(--foreground)" font-size="7.5" font-weight="bold">В Москве +5°C</text>
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
        svgContent: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" class="w-full">
  
  <rect x="10" y="10" width="580" height="260" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Structured Output</text>
  <!-- Промпт -->
  <rect x="30" y="55" width="200" height="90" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.1" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="130" y="75" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Промпт</text>
  <text x="130" y="95" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">"Извлеки данные из текста</text>
  <text x="130" y="108" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">в формате JSON:</text>
  <text x="130" y="121" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">{name, age, role}"</text>
  <!-- Связь Промпт и Результат -->
<text x="238" y="95" fill="#6b7280" font-size="8">|</text>
  <!-- Результат (JSON) -->
  <rect x="260" y="55" width="310" height="90" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="415" y="75" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Результат (JSON)</text>
  <text x="415" y="97" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">{</text>
  <text x="415" y="110" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">"name": "Алексей",</text>
  <text x="415" y="123" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">"age": 28, "role": "инженер"</text>
  <text x="415" y="136" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">}</text>
  <!-- Три подхода -->
  <rect x="30" y="165" width="170" height="45" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="115" y="185" text-anchor="middle" fill="var(--foreground)" font-size="10">Prompt-only</text>
  <text x="115" y="200" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Гибко, но не 100%</text>
  <rect x="215" y="165" width="170" height="45" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="300" y="185" text-anchor="middle" fill="var(--foreground)" font-size="10">JSON Mode</text>
  <text x="300" y="200" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Гарантированный JSON</text>
  <rect x="400" y="165" width="170" height="45" rx="6" fill="oklch(0.6 0.2 280)" opacity="0.15" stroke="oklch(0.6 0.2 280)" stroke-width="1"/>
  <text x="485" y="185" text-anchor="middle" fill="var(--foreground)" font-size="10">Function Calling</text>
  <text x="485" y="200" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Типизированный вызов</text>
  <!-- Итог -->
  <rect x="30" y="225" width="540" height="30" rx="6" fill="var(--muted)" opacity="0.4"/>
  <text x="300" y="245" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Лучший результат = Промпт + JSON Mode / Function Calling</text>
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
