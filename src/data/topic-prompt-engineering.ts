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
        svgContent: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <defs>
    <marker id="arrowZs" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#6b7280"/></marker>
  </defs>
  <rect x="10" y="10" width="580" height="280" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Zero-shot Prompting</text>
  <!-- Системный промпт -->
  <rect x="30" y="55" width="220" height="80" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="140" y="80" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Системный промпт</text>
  <text x="140" y="97" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">"Ты — эксперт по Python"</text>
  <text x="140" y="113" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">"Отвечай кратко и точно"</text>
  <!-- Пользовательский промпт -->
  <rect x="280" y="55" width="290" height="80" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="425" y="80" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Пользовательский промпт</text>
  <text x="425" y="97" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">"Объясни декораторы в Python"</text>
  <!-- LLM -->
  <rect x="120" y="180" width="360" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.25" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="205" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">LLM → Генерация ответа</text>
  <text x="300" y="222" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Без примеров, только инструкция</text>
  <!-- Результат -->
  <rect x="120" y="255" width="360" height="25" rx="6" fill="var(--muted)" opacity="0.5"/>
  <text x="300" y="272" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Результат: объяснение декораторов на Python</text>
  <!-- Стрелки: промпты → LLM -->
  <line x1="140" y1="135" x2="210" y2="178" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowZs)"/>
  <line x1="425" y1="135" x2="390" y2="178" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowZs)"/>
  <!-- Стрелка: LLM → Результат -->
  <line x1="300" y1="230" x2="300" y2="253" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowZs)"/>
  <!-- Подписи к стрелкам -->
  <text x="155" y="162" fill="#6b7280" font-size="8" transform="rotate(-13, 155, 162)">роль + формат</text>
  <text x="430" y="162" fill="#6b7280" font-size="8" transform="rotate(12, 430, 162)">задача</text>
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
        svgContent: `<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <defs>
    <marker id="arrowFs" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#6b7280"/></marker>
  </defs>
  <rect x="10" y="10" width="580" height="300" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Few-shot Prompting</text>
  <!-- Примеры -->
  <rect x="30" y="55" width="250" height="35" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="155" y="77" text-anchor="middle" fill="var(--foreground)" font-size="10">Пример 1: "отлично" → позитивная</text>
  <rect x="30" y="95" width="250" height="35" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="155" y="117" text-anchor="middle" fill="var(--foreground)" font-size="10">Пример 2: "ужасно" → негативная</text>
  <rect x="30" y="135" width="250" height="35" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.25" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="155" y="157" text-anchor="middle" fill="var(--foreground)" font-size="10">Пример 3: "нормально" → нейтральная</text>
  <!-- Запрос -->
  <rect x="30" y="180" width="250" height="35" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="155" y="202" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Запрос: "превосходно" → ???</text>
  <!-- In-Context Learning -->
  <rect x="310" y="90" width="260" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="440" y="113" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">In-Context Learning</text>
  <text x="440" y="132" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Модель подстраивается под паттерн</text>
  <!-- Результат -->
  <rect x="310" y="175" width="260" height="40" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="440" y="200" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Ответ: "позитивная"</text>
  <!-- Стрелки -->
  <line x1="280" y1="150" x2="308" y2="118" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowFs)"/>
  <text x="285" y="128" fill="#6b7280" font-size="8">паттерн</text>
  <line x1="440" y1="145" x2="440" y2="173" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowFs)"/>
  <text x="450" y="162" fill="#6b7280" font-size="8">вывод</text>
  <line x1="280" y1="197" x2="308" y2="197" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowFs)"/>
  <text x="282" y="192" fill="#6b7280" font-size="8">запрос</text>
  <!-- Итог -->
  <rect x="30" y="240" width="540" height="55" rx="6" fill="var(--muted)" opacity="0.4"/>
  <text x="300" y="262" text-anchor="middle" fill="var(--foreground)" font-size="10">Ключевой принцип: примеры задают паттерн, модель воспроизводит его</text>
  <text x="300" y="280" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">3-5 примеров обычно достаточно | Качество важнее количества</text>
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
        svgContent: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <defs>
    <marker id="arrowCot" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#6b7280"/></marker>
  </defs>
  <rect x="10" y="10" width="580" height="280" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Chain of Thought vs Прямой ответ</text>
  <!-- Без CoT -->
  <rect x="30" y="55" width="250" height="30" rx="6" fill="oklch(0.577 0.245 27)" opacity="0.15" stroke="oklch(0.577 0.245 27)" stroke-width="1"/>
  <text x="155" y="75" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Без CoT (часто неверно)</text>
  <rect x="50" y="95" width="100" height="28" rx="6" fill="var(--muted)" opacity="0.4"/>
  <text x="100" y="113" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Вопрос</text>
  <line x1="150" y1="109" x2="178" y2="109" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowCot)"/>
  <rect x="180" y="95" width="80" height="28" rx="6" fill="oklch(0.577 0.245 27)" opacity="0.15" stroke="oklch(0.577 0.245 27)" stroke-width="1"/>
  <text x="220" y="113" text-anchor="middle" fill="oklch(0.577 0.245 27)" font-size="10">Ответ ❌</text>
  <text x="155" y="145" fill="var(--muted-foreground)" font-size="9">"17 × 24?" → "408" (ошибка!)</text>
  <!-- С CoT -->
  <rect x="320" y="55" width="250" height="30" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="445" y="75" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">С CoT (точнее)</text>
  <rect x="335" y="95" width="70" height="28" rx="6" fill="var(--muted)" opacity="0.4"/>
  <text x="370" y="113" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Вопрос</text>
  <line x1="405" y1="109" x2="418" y2="109" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowCot)"/>
  <rect x="420" y="95" width="70" height="28" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.1" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="455" y="113" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="10">Шаги</text>
  <line x1="490" y1="109" x2="503" y2="109" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowCot)"/>
  <rect x="505" y="95" width="55" height="28" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="532" y="113" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="10">✓</text>
  <text x="445" y="140" fill="oklch(0.55 0.15 165)" font-size="9">17 × 24 → 17×20 + 17×4 → 340+68 → 408 ✓</text>
  <!-- Почему CoT -->
  <rect x="30" y="165" width="540" height="100" rx="8" fill="var(--muted)" opacity="0.3"/>
  <text x="300" y="190" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Почему CoT работает</text>
  <text x="300" y="210" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">1. Каждый шаг создаёт промежуточный контекст</text>
  <text x="300" y="228" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">2. Модель «видит» свои вычисления и может исправить ошибки</text>
  <text x="300" y="246" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">3. Разбиение сложной задачи на простые подзадачи</text>
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
        svgContent: `<svg viewBox="0 0 600 310" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <defs>
    <marker id="arrowReact" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#6b7280"/></marker>
    <marker id="arrowReactDash" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#9ca3af"/></marker>
  </defs>
  <rect x="10" y="10" width="580" height="290" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Цикл ReAct (Reasoning + Acting)</text>
  <!-- Thought -->
  <rect x="60" y="60" width="140" height="40" rx="20" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="130" y="85" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Thought</text>
  <!-- Action -->
  <rect x="240" y="60" width="140" height="40" rx="20" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="310" y="85" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Action</text>
  <!-- Observation -->
  <rect x="420" y="60" width="140" height="40" rx="20" fill="oklch(0.6 0.2 280)" opacity="0.2" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <text x="490" y="85" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Observation</text>
  <!-- Стрелки: Thought → Action → Observation -->
  <line x1="200" y1="80" x2="238" y2="80" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowReact)"/>
  <line x1="380" y1="80" x2="418" y2="80" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowReact)"/>
  <!-- Цикл: Observation → обратно к Thought -->
  <path d="M 490 100 L 490 130 L 130 130 L 130 100" fill="none" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6 3" marker-end="url(#arrowReactDash)"/>
  <text x="310" y="125" text-anchor="middle" fill="#6b7280" font-size="9">цикл повторяется</text>
  <!-- Final Answer -->
  <rect x="150" y="155" width="300" height="40" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.3" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="180" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Final Answer</text>
  <!-- Стрелка от цикла к Final Answer -->
  <line x1="130" y1="130" x2="195" y2="153" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="4 2" marker-end="url(#arrowReactDash)"/>
  <text x="140" y="148" fill="#9ca3af" font-size="8">данных достаточно</text>
  <!-- Пример -->
  <rect x="30" y="215" width="540" height="75" rx="8" fill="var(--muted)" opacity="0.3"/>
  <text x="300" y="238" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Пример цикла</text>
  <text x="300" y="256" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Thought: Нужно узнать погоду → Action: weather_api("Москва") → Observation: +5°C</text>
  <text x="300" y="274" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">Thought: Теперь знаю температуру → Final Answer: В Москве сейчас +5°C</text>
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
  <defs>
    <marker id="arrowSo" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#6b7280"/></marker>
  </defs>
  <rect x="10" y="10" width="580" height="260" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Structured Output</text>
  <!-- Промпт -->
  <rect x="30" y="55" width="200" height="90" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.1" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="130" y="75" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Промпт</text>
  <text x="130" y="95" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">"Извлеки данные из текста</text>
  <text x="130" y="108" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">в формате JSON:</text>
  <text x="130" y="121" text-anchor="middle" fill="var(--muted-foreground)" font-size="9">{name, age, role}"</text>
  <!-- Стрелка Промпт → Результат -->
  <line x1="230" y1="100" x2="258" y2="100" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowSo)"/>
  <text x="238" y="95" fill="#6b7280" font-size="8">→</text>
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
