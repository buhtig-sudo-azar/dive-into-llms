import type { TopicCategory } from '@/types';

export const topics: TopicCategory[] = [
  {
    slug: 'llm-basics',
    title: 'Основы LLM',
    description: 'Фундаментальные концепции Large Language Models: от токенов до архитектуры Transformer',
    icon: 'Brain',
    subtopics: [
      {
        slug: 'what-is-llm',
        title: 'Что такое LLM',
        categorySlug: 'llm-basics',
        introduction: {
          what: 'Large Language Model (LLM) — это тип искусственной нейронной сети, обученной на огромных объёмах текстовых данных для понимания и генерации естественного языка. LLM использует архитектуру Transformer, которая позволяет моделировать сложные зависимости между словами в тексте и генерировать связные, осмысленные ответы на основе входного контекста.',
          why: 'LLM нужны потому, что традиционные подходы к обработке языка были узкоспециализированными и требовали ручного создания правил для каждой задачи. LLM универсальны — одна модель может переводить, резюмировать, отвечать на вопросы, писать код и решать множество других задач без дополнительного обучения.',
          where: 'LLM используются повсеместно: чат-боты и виртуальные ассистенты (ChatGPT, Claude), системы автоматической генерации кода (GitHub Copilot), инструменты для написания текстов, системы анализа документов, автоматизация поддержки клиентов, образовательные платформы и многие другие области.',
          problem: 'LLM решают проблему понимания и генерации естественного языка машинами. До появления LLM создание системы, способной вести осмысленный диалог, требовало огромных усилий по разработке правил и шаблонов. LLM позволяют получить качественную языковую модель «из коробки», адаптируемую под конкретные задачи через промптинг или тонкую настройку.'
        },
        theory: {
          terms: [
            { term: 'LLM', definition: 'Large Language Model — языковая модель с миллиардами параметров, обученная на масштабных текстовых корпусах' },
            { term: 'Параметры', definition: 'Настраиваемые веса нейронной сети, которые определяют поведение модели. Современные LLM имеют от 1 до 175+ миллиардов параметров' },
            { term: 'Pre-training', definition: 'Первый этап обучения модели на большом корпусе текста без учителя, где модель учится предсказывать следующее слово' },
            { term: 'Fine-tuning', definition: 'Дополнительное обучение модели на специфичных данных для адаптации под конкретную задачу' },
            { term: 'RLHF', definition: 'Reinforcement Learning from Human Feedback — метод обучения с подкреплением на основе обратной связи от людей' },
            { term: 'Inference', definition: 'Процесс использования обученной модели для генерации ответов на новые входные данные' },
            { term: 'Hallucination', definition: 'Генерация моделью фактически неверной информации, которую она выдаёт с уверенностью' },
          ],
          principles: 'Принцип работы LLM основан на предсказании следующего токена. Модель получает последовательность токенов на вход и вычисляет вероятностное распределение по всему словарю для следующего токена. Выбирая токены последовательно, модель генерирует текст. Этот процесс управляется температурой (temperature) — параметром, контролирующим случайность выбора: низкая температура даёт более детерминированные ответы, высокая — более творческие.\n\nАрхитектура Transformer позволяет модели учитывать контекст всех предыдущих токенов через механизм Self-Attention, который присваивает различные «веса внимания» различным позициям во входной последовательности. Это ключевой принцип — каждый сгенерированный токен зависит от всего предшествующего контекста, а не только от нескольких соседних слов.',
          architecture: 'Современные LLM строятся на архитектуре Decoder-only Transformer. Модель состоит из стопки идентичных слоёв (обычно от 12 до 96), каждый из которых содержит два подкомпонента: Multi-Head Self-Attention и Feed-Forward Network. Слои разделены нормализацией и остаточными связями. На вход модели поступают эмбеддинги токенов, сложенные с позиционными эмбеддингами. На выходе — линейный слой проецирует скрытое состояние на размер словаря, создавая логиты для каждого возможного следующего токена.\n\nКлючевая особенность архитектуры — causal mask (каузальная маска), которая запрещает модели «заглядывать вперёд» при генерации, обеспечивая авторегрессионный характер генерации текста.',
          connections: 'LLM тесно связаны с Prompt Engineering — способом управления поведением модели через входные данные. RAG (Retrieval-Augmented Generation) расширяет возможности LLM, предоставляя доступ к внешним знаниям. AI Agents используют LLM как «мозг» для принятия решений и выполнения действий. Context Engineering изучает эффективное использование контекстного окна модели.'
        },
        diagram: {
          type: 'architecture',
          title: 'Архитектура LLM: от входа к выходу',
          svgContent: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#arrowhead)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:13px;text-anchor:middle}.label{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:11px;text-anchor:middle}</style>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs>
            <rect x="10" y="20" width="120" height="45" class="box"/><text x="70" y="47" class="text">Входной текст</text>
            <rect x="10" y="95" width="120" height="45" class="box"/><text x="70" y="122" class="text">Токенизация</text>
            <rect x="10" y="170" width="120" height="45" class="box"/><text x="70" y="197" class="text">Эмбеддинги</text>
            <rect x="200" y="95" width="180" height="200" class="box" style="fill:var(--diagram-fill2,#c8e6c9);stroke-width:3"/>
            <text x="290" y="130" class="text" style="font-weight:bold;font-size:14px">Transformer</text>
            <text x="290" y="155" class="label">Self-Attention</text>
            <text x="290" y="175" class="label">Feed-Forward</text>
            <text x="290" y="195" class="label">Layer Norm</text>
            <text x="290" y="215" class="label">× N слоёв</text>
            <text x="290" y="240" class="label">(12–96 слоёв)</text>
            <rect x="450" y="95" width="130" height="45" class="box"/><text x="515" y="122" class="text">Линейный слой</text>
            <rect x="450" y="170" width="130" height="45" class="box"/><text x="515" y="197" class="text">Softmax</text>
            <rect x="450" y="245" width="130" height="45" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/>
            <text x="515" y="272" class="text">Следующий токен</text>
            <line x1="70" y1="65" x2="70" y2="95" class="arrow"/>
            <line x1="70" y1="140" x2="70" y2="170" class="arrow"/>
            <line x1="130" y1="192" x2="200" y2="192" class="arrow"/>
            <line x1="380" y1="192" x2="450" y2="117" class="arrow"/>
            <line x1="515" y1="140" x2="515" y2="170" class="arrow"/>
            <line x1="515" y1="215" x2="515" y2="245" class="arrow"/>
          </svg>`
        },
        practicalExamples: [
          {
            title: 'Простой вызов LLM через API',
            description: 'Базовый пример отправки запроса к LLM через OpenAI-совместимый API. Показывает, как модель получает промпт и генерирует ответ, возвращая наиболее вероятное продолжение текста.',
            code: `const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: 'Объясни, что такое LLM простыми словами' }
    ],
    temperature: 0.7
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`,
            language: 'typescript'
          },
          {
            title: 'Сравнение моделей по размеру',
            description: 'Различные LLM имеют разное количество параметров, что влияет на их возможности и требования к оборудованию. Модели с 7B параметров можно запустить локально, а модели с 175B+ требуют кластерных решений.',
            code: `const models = [
  { name: 'Gemma 2B',  params: '2B',  vram: '~4 GB',  quality: 'Базовый' },
  { name: 'Llama 3 8B', params: '8B',  vram: '~8 GB',  quality: 'Хороший' },
  { name: 'GPT-4',     params: '~1.8T', vram: 'Кластер', quality: 'Отличный' },
];

// Правило: больше параметров = лучше качество, но выше стоимость
models.forEach(m => console.log(\`\${m.name}: \${m.params} → \${m.quality}\`));`,
            language: 'typescript'
          },
          {
            title: 'Генерация с разной температурой',
            description: 'Параметр temperature контролирует «творческость» модели. При temperature=0 модель всегда выбирает наиболее вероятный токен, а при высоких значениях — допускает более разнообразные ответы.',
            code: `import OpenAI from 'openai';

const client = new OpenAI();

// Детерминированный ответ (факты)
const factual = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Столица Франции?' }],
  temperature: 0,  // Всегда одинаковый ответ
});

// Творческий ответ (история)
const creative = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Напиши стих про Париж' }],
  temperature: 1.2, // Более разнообразные ответы
});`,
            language: 'typescript'
          }
        ],
        commonMistakes: [
          { mistake: 'Считать, что LLM «понимает» текст как человек', explanation: 'LLM не имеет сознания или понимания в человеческом смысле. Она оперирует статистическими паттернами в данных, а не смысловым пониманием.', correctApproach: 'Рассматривайте LLM как мощную статистическую модель, которая находит паттерны. Используйте промпты для направления статистических предпочтений модели.' },
          { mistake: 'Игнорировать галлюцинации', explanation: 'Модели часто генерируют убедительно звучащую, но фактически неверную информацию, особенно в областях, где у неё мало обучающих данных.', correctApproach: 'Всегда проверяйте критически важную информацию. Используйте RAG для предоставления фактических данных. Указывайте модели признавать неуверенность.' },
          { mistake: 'Использовать одну и ту же температуру для всех задач', explanation: 'Разные задачи требуют разной степени «творчества». Фактические вопросы лучше при низкой температуре, творческие — при высокой.', correctApproach: 'Факты/код: temperature 0–0.2. Баланс: 0.5–0.7. Творчество: 0.8–1.2.' },
          { mistake: 'Не учитывать лимиты контекстного окна', explanation: 'Каждая модель имеет максимальный размер контекста. Превышение лимита приведёт к обрезке или ошибке.', correctApproach: 'Проверяйте размер контекста модели перед отправкой. Используйте summmarization для длинных текстов.' },
        ],
        furtherReading: [
          { topic: 'Как работают токены', slug: 'tokens', categorySlug: 'llm-basics' },
          { topic: 'Контекстное окно', slug: 'context-window', categorySlug: 'llm-basics' },
          { topic: 'Архитектура Transformer', slug: 'transformer', categorySlug: 'llm-basics' },
        ],
      },
      {
        slug: 'tokens',
        title: 'Как работают токены',
        categorySlug: 'llm-basics',
        introduction: {
          what: 'Токены — это базовые единицы, на которые разбивается текст перед обработкой языковой моделью. Токен может быть целым словом, частью слова или даже отдельным символом. Токенизатор преобразует текст в последовательность числовых идентификаторов, которые модель может обрабатывать математически.',
          why: 'Нейронные сети не могут напрямую работать с текстом — им нужны числа. Токенизация — это мост между человеческим языком и математическим представлением, понятным модели. Качество токенизации напрямую влияет на эффективность и качество работы модели.',
          where: 'Токенизация используется везде, где LLM обрабатывает текст: при отправке промпта, при генерации ответа, при подсчёте стоимости API-запросов (оплата идёт за токены), при оценке размера контекстного окна.',
          problem: 'Без токенизации невозможно было бы обучать языковые модели на текстовых данных. Токенизация решает проблему представления бесконечного множества возможных текстов через конечный словарь токенов, балансируя между размером словаря и способностью модели обрабатывать любые входные данные.'
        },
        theory: {
          terms: [
            { term: 'Токен', definition: 'Базовая единица текста, используемая моделью. Один токен ≈ 4 символа или 0.75 слова в английском, ≈ 1-2 символа в русском' },
            { term: 'Токенизатор', definition: 'Алгоритм, преобразующий текст в последовательность токенов и обратно. Популярные: BPE, WordPiece, SentencePiece' },
            { term: 'BPE', definition: 'Byte Pair Encoding — алгоритм токенизации, итеративно объединяющий наиболее частые пары символов в новые токены' },
            { term: 'Vocabulary', definition: 'Словарь модели — набор всех возможных токенов, которые модель знает. Обычно 30 000–100 000 токенов' },
            { term: 'Special Tokens', definition: 'Специальные токены: <|endoftext|>, <|pad|>, <|cls|> — служебные маркеры для модели' },
          ],
          principles: 'Принцип BPE-токенизации заключается в итеративном построении словаря. На начальном этапе каждый байт — отдельный токен. Затем алгоритм находит наиболее часто встречающуюся пару токенов в обучающем корпусе и объединяет её в новый токен. Этот процесс повторяется, пока словарь не достигнет заданного размера. В результате частые слова (the, and, is) становятся отдельными токенами, а редкие — разбиваются на подслова.\n\nЭто даёт важное свойство: любой текст может быть токенизирован, даже если содержит неизвестные слова. Русский текст токенизируется менее эффективно — одно русское слово может занимать 2-5 токенов, тогда как английское — 1-2.',
          architecture: 'Токенизатор работает как отдельный препроцессор перед моделью. Входной текст → нормализация (unicode) → pre-tokenization (разбиение на слова) → BPE-кодирование → маппинг в ID токенов. На выходе модели — обратный процесс: ID токенов → декодирование в текст. Токенизатор — детерминированный компонент, он не обучается вместе с моделью, а создаётся заранее на обучающем корпусе.\n\nРазные модели используют разные токенизаторы: GPT-4 использует cl100k_base (100K токенов), Llama — SentencePiece (32K), Claude — свой собственный токенизатор.',
          connections: 'Токены напрямую связаны с контекстным окном — максимальное количество токенов, которое модель может обработать за один запрос. Стоимость API-вызовов также рассчитывается в токенах. Prompt Engineering должен учитывать эффективное использование токенов.'
        },
        diagram: {
          type: 'pipeline',
          title: 'Конвейер токенизации',
          svgContent: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
            <defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#ah)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:12px;text-anchor:middle}</style>
            <marker id="ah" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs>
            <rect x="10" y="20" width="120" height="55" class="box"/><text x="70" y="45" class="text" style="font-weight:bold">Входной текст</text><text x="70" y="62" class="text" style="font-size:10px">"Hello world!"</text>
            <rect x="170" y="20" width="120" height="55" class="box"/><text x="230" y="45" class="text" style="font-weight:bold">Pre-tokenize</text><text x="230" y="62" class="text" style="font-size:10px">["Hello", " world", "!"]</text>
            <rect x="330" y="20" width="120" height="55" class="box"/><text x="390" y="45" class="text" style="font-weight:bold">BPE Encode</text><text x="390" y="62" class="text" style="font-size:10px">[9906, 1917, 0]</text>
            <rect x="490" y="20" width="100" height="55" class="box"/><text x="540" y="45" class="text" style="font-weight:bold">Вектор</text><text x="540" y="62" class="text" style="font-size:10px">→ В модель</text>
            <line x1="130" y1="47" x2="170" y2="47" class="arrow"/>
            <line x1="290" y1="47" x2="330" y2="47" class="arrow"/>
            <line x1="450" y1="47" x2="490" y2="47" class="arrow"/>
            <rect x="10" y="120" width="580" height="140" class="box" style="fill:var(--diagram-fill2,#c8e6c9)"/>
            <text x="300" y="145" class="text" style="font-weight:bold;font-size:14px">Пример: русский текст</text>
            <text x="300" y="170" class="text" style="font-size:11px">"Привет мир" → ["При", "вет", " мир"] → [5453, 2221, 1917]</text>
            <text x="300" y="195" class="text" style="font-size:11px">1 русское слово ≈ 2-5 токенов (vs 1-2 для английского)</text>
            <text x="300" y="220" class="text" style="font-size:11px">Стоимость: русский текст в 2-3 раза дороже на тех же токенах</text>
            <text x="300" y="245" class="text" style="font-size:11px">Контекст: 4K токенов ≈ 3K англ. слов ≈ 1.5K рус. слов</text>
          </svg>`
        },
        practicalExamples: [
          {
            title: 'Подсчёт токенов с tiktoken',
            description: 'Библиотека tiktoken позволяет точно подсчитать количество токенов перед отправкой запроса к API, что помогает контролировать расходы и не превышать лимиты контекстного окна.',
            code: `import tiktoken

enc = tiktoken.encoding_for_model("gpt-4")

text_ru = "Привет, как дела?"
text_en = "Hello, how are you?"

tokens_ru = enc.encode(text_ru)
tokens_en = enc.encode(text_en)

print(f"Русский: {len(tokens_ru)} токенов → {tokens_ru}")
print(f"Английский: {len(tokens_en)} токенов → {tokens_en}")
# Русский: 7 токенов, Английский: 5 токенов`,
            language: 'python'
          },
          {
            title: 'Оценка стоимости API-запроса',
            description: 'Понимание того, как токены влияют на стоимость вызова LLM API. Цена рассчитывается за 1M токенов, при этом входные и выходные токены имеют разную стоимость.',
            code: `function estimateCost(inputTokens: number, outputTokens: number) {
  const INPUT_PRICE = 2.50;   // за 1M входных токенов
  const OUTPUT_PRICE = 10.00; // за 1M выходных токенов

  const inputCost = (inputTokens / 1_000_000) * INPUT_PRICE;
  const outputCost = (outputTokens / 1_000_000) * OUTPUT_PRICE;

  return { inputCost, outputCost, total: inputCost + outputCost };
}

// Пример: промпт 1000 токенов, ответ 500 токенов
const cost = estimateCost(1000, 500);
console.log(\`Итого: $\${cost.total.toFixed(4)}\`);`,
            language: 'typescript'
          },
        ],
        commonMistakes: [
          { mistake: 'Считать, что 1 токен = 1 слово', explanation: 'В английском 1 токен ≈ 0.75 слова, а в русском 1 слово может занимать 2-5 токенов. Это влияет на оценку стоимости и лимитов.', correctApproach: 'Используйте tiktoken или аналоги для точного подсчёта. Для оценки: русское слово ≈ 2-3 токена.' },
          { mistake: 'Не учитывать токены при оценке стоимости', explanation: 'Многие забывают, что русский текст стоит в 2-3 раза дороже из-за менее эффективной токенизации.', correctApproach: 'При бюджетировании проекта закладывайте x2-3 коэффициент для русскоязычного контента.' },
          { mistake: 'Превышать лимит токенов', explanation: 'Превышение контекстного окна приводит к обрезке или ошибке. Это особенно критично для длинных документов.', correctApproach: 'Подсчитывайте токены перед отправкой. Используйте chunking для длинных документов.' },
        ],
        furtherReading: [
          { topic: 'Контекстное окно', slug: 'context-window', categorySlug: 'llm-basics' },
          { topic: 'Архитектура Transformer', slug: 'transformer', categorySlug: 'llm-basics' },
          { topic: 'Chunking в RAG', slug: 'chunking', categorySlug: 'rag' },
        ],
      },
      {
        slug: 'context-window',
        title: 'Контекстное окно',
        categorySlug: 'llm-basics',
        introduction: {
          what: 'Контекстное окно — это максимальное количество токенов, которое языковая модель может обработать за один запрос. Оно включает как входной промпт, так и генерируемый ответ. Это фундаментальное ограничение, определяющее сколько информации модель может «держать в голове» одновременно.',
          why: 'Размер контекстного окна определяет возможности модели: малое окно ограничивает сложность задач, большое позволяет анализировать документы, вести длинные диалоги и обрабатывать объёмный код. Без понимания контекстного окна невозможно эффективно использовать LLM.',
          where: 'Контекстное окно критически важно при: работе с длинными документами, ведении многоходовых диалогов, анализе кода, RAG-системах, где нужно вместить извлечённые фрагменты и промпт одновременно.',
          problem: 'Основная проблема — ограниченность контекстного окна. Даже модели со 128K токенов не могут обработать книгу целиком с сохранением полного внимания к деталям. Качество внимания снижается к концу контекста, а стоимость растёт квадратично с размером окна.'
        },
        theory: {
          terms: [
            { term: 'Context Length', definition: 'Максимальное число токенов в одном запросе (вход + выход). Варьируется от 2K до 1M+ в зависимости от модели' },
            { term: 'Context Window', definition: 'То же что Context Length — всё пространство токенов, доступное модели в одном запросе' },
            { term: 'Lost in the Middle', definition: 'Эффект, при котором модель хуже запоминает информацию из середины длинного контекста' },
            { term: 'RoPE', definition: 'Rotary Position Embedding — метод кодирования позиций токенов, позволяющий экстраполировать на более длинные контексты' },
            { term: 'Sliding Window Attention', definition: 'Механизм внимания с ограниченным окном — модель обрабатывает только ближайшие N токенов' },
          ],
          principles: 'Контекстное окно работает как «рабочая память» модели. Модель может обращаться к любому токену внутри окна, но за его пределами информация полностью теряется. Это отличает контекстное окно от «долгосрочной памяти», которая требует внешних механизмов (RAG, summarization).\n\nВажный принцип: заполнение контекстного окна не означает его эффективное использование. Исследования показывают, что модели хуже извлекают информацию из середины длинного контекста (Lost in the Middle). Оптимально — помещать ключевую информацию в начало и конец промпта.',
          architecture: 'Размер контекстного окна определяется на этапе обучения модели и связан с вычислительной сложностью Self-Attention: O(n²) по памяти и вычислениям. Для контекста в 128K токенов матрица внимания требует огромных ресурсов. Современные подходы решают это: Flash Attention оптимизирует использование памяти GPU, Grouped Query Attention (GQA) уменьшает количество голов внимания, а Sliding Window Attention ограничивает область внимания.\n\nМодели и их контекстные окна: GPT-4 Turbo — 128K, Claude 3.5 — 200K, Gemini 1.5 Pro — до 1M, Llama 3 — 8K (128K с RoPE).',
          connections: 'Контекстное окно тесно связано с Context Engineering (стратегии управления контекстом), RAG (внешнее расширение знаний), Chunking (разбиение документов) и Summarization (сжатие длинных текстов).'
        },
        diagram: {
          type: 'comparison',
          title: 'Контекстные окна различных моделей',
          svgContent: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
            <defs><style>.bar{rx:4;opacity:0.9}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:11px}.label{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:11px;text-anchor:end}</style></defs>
            <text x="20" y="30" class="label">Llama 2</text><rect x="130" y="18" width="20" height="18" class="bar" style="fill:#81c784"/><text x="158" y="30" class="text">4K</text>
            <text x="20" y="70" class="label">Llama 3</text><rect x="130" y="58" width="65" height="18" class="bar" style="fill:#66bb6a"/><text x="203" y="70" class="text">8K</text>
            <text x="20" y="110" class="label">GPT-3.5</text><rect x="130" y="98" width="130" height="18" class="bar" style="fill:#4caf50"/><text x="268" y="110" class="text">16K</text>
            <text x="20" y="150" class="label">GPT-4</text><rect x="130" y="138" width="260" height="18" class="bar" style="fill:#388e3c"/><text x="398" y="150" class="text">32K</text>
            <text x="20" y="190" class="label">GPT-4 Turbo</text><rect x="130" y="178" width="450" height="18" class="bar" style="fill:#2e7d32"/><text x="500" y="190" class="text">128K</text>
            <text x="20" y="230" class="label">Claude 3.5</text><rect x="130" y="218" width="470" height="18" class="bar" style="fill:#1b5e20"/><text x="520" y="230" class="text">200K</text>
            <text x="20" y="270" class="label">Gemini 1.5</text><rect x="130" y="258" width="450" height="18" class="bar" style="fill:#004d40"/><text x="500" y="270" class="text">1M+</text>
            <text x="300" y="295" class="text" style="text-anchor:middle;font-size:10px;opacity:0.6">Масштаб условный — Gemini 1.5 в 8 раз больше GPT-4 Turbo</text>
          </svg>`
        },
        practicalExamples: [
          {
            title: 'Стратегия размещения информации в промпте',
            description: 'С учётом эффекта «Lost in the Middle» ключевую информацию лучше размещать в начале и конце промпта, а менее важную — в середине.',
            code: `// Оптимальная структура промпта с учётом Lost in the Middle
const optimalPrompt = \`
[НАЧАЛО — ключевая роль и задача]
Ты — эксперт-аналитик. Проанализируй документ и выдели главные тезисы.

[СЕРЕДИНА — основной контент]
\${documentText}

[КОНЕЦ — повтор ключевых инструкций]
Верни результат в формате JSON с полями: summary, key_points, sentiment.
\`;

// ПЛОХО: ключевые инструкции в середине
const badPrompt = \`
Вот документ: \${documentText}
Ты эксперт-аналитик. Выдели тезисы. Формат: JSON.
\`;`,
            language: 'typescript'
          },
          {
            title: 'Расчёт доступного пространства для ответа',
            description: 'При работе с API необходимо учитывать, что ответ модели тоже занимает токены из контекстного окна. Доступное пространство = контекстное окно — входные токены.',
            code: `function calculateAvailableTokens(
  contextWindow: number,  // например 128000
  inputTokens: number,    // количество токенов промпта
  maxOutputTokens: number = 4096
) {
  const available = contextWindow - inputTokens;
  const outputLimit = Math.min(available, maxOutputTokens);

  return {
    inputTokens,
    availableSpace: available,
    outputLimit,
    utilization: ((inputTokens / contextWindow) * 100).toFixed(1) + '%'
  };
}

// Пример: промпт 50K токенов при окне 128K
const result = calculateAvailableTokens(128000, 50000);
// outputLimit: 4096, utilization: 39.1%`,
            language: 'typescript'
          },
        ],
        commonMistakes: [
          { mistake: 'Заполнять контекстное окно на 100%', explanation: 'Модель нуждается в пространстве для генерации ответа. Заполнение окна под завязку приведёт к обрезке ответа или ошибке.', correctApproach: 'Оставляйте минимум 10-20% контекстного окна для ответа модели.' },
          { mistake: 'Рассчитывать на идеальное внимание ко всему контексту', explanation: 'Эффект Lost in the Middle означает, что модель хуже запоминает информацию из середины длинного контекста.', correctApproach: 'Помещайте ключевые инструкции в начало и конец. Используйте структурирование (заголовки, нумерацию).' },
          { mistake: 'Не оптимизировать размер промпта', explanation: 'Лишние токены в промпте стоят денег и снижают качество — модель «размывается» по большому контексту.', correctApproach: 'Удаляйте избыточный текст. Используйте сжатые формулировки. Применяйте summarization для длинных контекстов.' },
        ],
        furtherReading: [
          { topic: 'Архитектура Transformer', slug: 'transformer', categorySlug: 'llm-basics' },
          { topic: 'Context Engineering', slug: 'context', categorySlug: 'context-engineering' },
          { topic: 'Chunking', slug: 'chunking', categorySlug: 'rag' },
        ],
      },
      {
        slug: 'transformer',
        title: 'Архитектура Transformer',
        categorySlug: 'llm-basics',
        introduction: {
          what: 'Transformer — это архитектура нейронной сети, основанная на механизме внимания (Attention), которая стала фундаментом для всех современных LLM. Представленная в 2017 году в статье «Attention Is All You Need», она произвела революцию в обработке естественного языка, заменив рекуррентные сети.',
          why: 'Transformer решает ключевую проблему предыдущих архитектур — параллелизацию обучения. Рекуррентные сети (RNN, LSTM) обрабатывают последовательности пошагово, что делает обучение медленным. Transformer обрабатывает все позиции одновременно через Self-Attention, что на порядки ускоряет обучение на GPU.',
          where: 'Архитектура Transformer лежит в основе всех современных LLM: GPT, Claude, Llama, Gemini, Mistral. Она также применяется в компьютерном зрении (ViT), генерации изображений, аудио и видео.',
          problem: 'До Transformer модели не могли эффективно улавливать дальние зависимости в тексте — связь между словами, разделёнными многими предложениями. RNN забывали ранний контекст. Transformer через Self-Attention позволяет каждому токену напрямую «видеть» все другие токены, решая проблему дальних зависимостей.'
        },
        theory: {
          terms: [
            { term: 'Self-Attention', definition: 'Механизм, позволяющий каждому токену взаимодействовать со всеми другими токенами последовательности через вычисление весов внимания' },
            { term: 'Multi-Head Attention', definition: 'Параллельное выполнение нескольких Self-Attention операций с разными параметрами, позволяющее улавливать различные типы связей' },
            { term: 'Q, K, V', definition: 'Query, Key, Value — три проекции входных данных, используемые для вычисления внимания. Q·K даёт веса, V даёт контент' },
            { term: 'Feed-Forward Network', definition: 'Двухслойная полносвязная сеть, применяемая к каждой позиции отдельно после слоя внимания' },
            { term: 'Positional Encoding', definition: 'Способ передачи информации о позиции токена, поскольку Self-Attention не учитывает порядок по умолчанию' },
            { term: 'Layer Normalization', definition: 'Нормализация активаций внутри слоя для стабилизации обучения' },
            { term: 'Residual Connection', definition: 'Добавление входа слоя к его выходу (skip connection) для борьбы с затуханием градиентов' },
          ],
          principles: 'Ключевой принцип Transformer — Self-Attention. Для каждой позиции вычисляются три вектора: Query (запрос), Key (ключ), Value (значение). Attention(Q,K,V) = softmax(QK^T/√d_k)V. Это позволяет модели взвешивать «важность» каждого другого токена для текущего. Веса внимания определяют, сколько информации от каждого токена должно быть учтено.\n\nMulti-Head Attention расширяет эту идею: вместо одного набора Q,K,V используются несколько «голов», каждая из которых может фокусироваться на разных аспектах связей — одна голова может отслеживать синтаксис, другая — семантику, третья — кореферентность.',
          architecture: 'Один Transformer-слой состоит из: 1) Multi-Head Self-Attention + Residual + LayerNorm, 2) Feed-Forward Network + Residual + LayerNorm. Современные LLM используют Decoder-only вариант: внимание ограничено только предыдущими токенами (causal mask). Модели содержат от 12 (малые) до 96 (GPT-4) таких слоёв.\n\nРазмерности: скрытое состояние обычно 768-12288, 12-96 голов внимания, Feed-Forward с расширением в 4 раза. Общее количество параметров = преимущественно матрицы внимания и FFN на каждом слое.',
          connections: 'Transformer — основа всего стека LLM. Prompt Engineering работает благодаря механизму внимания (инструкции «видимы» для всех генерируемых токенов). RAG эффективен, потому что модель через внимание может связывать извлечённые документы с запросом. AI Agents используют способность Transformer следовать сложным инструкциям.'
        },
        diagram: {
          type: 'architecture',
          title: 'Структура Transformer-блока',
          svgContent: `<svg viewBox="0 0 500 450" xmlns="http://www.w3.org/2000/svg">
            <defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#ah2)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:12px;text-anchor:middle}.small{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:10px;text-anchor:middle}</style>
            <marker id="ah2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs>
            <rect x="150" y="10" width="200" height="40" class="box"/><text x="250" y="35" class="text" style="font-weight:bold">Входные эмбеддинги</text>
            <rect x="150" y="70" width="200" height="40" class="box" style="fill:var(--diagram-fill2,#c8e6c9)"/><text x="250" y="95" class="text">Multi-Head Attention</text>
            <rect x="150" y="130" width="200" height="35" class="box"/><text x="250" y="152" class="small">Add & Layer Norm</text>
            <rect x="150" y="185" width="200" height="40" class="box" style="fill:var(--diagram-fill2,#c8e6c9)"/><text x="250" y="210" class="text">Feed-Forward Network</text>
            <rect x="150" y="245" width="200" height="35" class="box"/><text x="250" y="267" class="small">Add & Layer Norm</text>
            <rect x="150" y="310" width="200" height="40" class="box"/><text x="250" y="335" class="text" style="font-weight:bold">Выход блока</text>
            <line x1="250" y1="50" x2="250" y2="70" class="arrow"/>
            <line x1="250" y1="110" x2="250" y2="130" class="arrow"/>
            <line x1="250" y1="165" x2="250" y2="185" class="arrow"/>
            <line x1="250" y1="225" x2="250" y2="245" class="arrow"/>
            <line x1="250" y1="280" x2="250" y2="310" class="arrow"/>
            <text x="250" y="400" class="small" style="opacity:0.6">Этот блок повторяется N раз (12–96 слоёв)</text>
            <path d="M 360 30 L 380 30 L 380 145 L 350 145" class="arrow" style="stroke-dasharray:5,5;opacity:0.4"/>
            <path d="M 360 170 L 390 170 L 390 260 L 350 260" class="arrow" style="stroke-dasharray:5,5;opacity:0.4"/>
            <text x="410" y="100" class="small" style="text-anchor:start;opacity:0.5">Residual</text>
          </svg>`
        },
        practicalExamples: [
          {
            title: 'Визуализация весов внимания',
            description: 'Понимание того, как модель распределяет внимание между токенами, помогает оптимизировать промпты и отлаживать неожиданное поведение модели.',
            code: `# Упрощённая реализация Self-Attention
import torch
import torch.nn.functional as F

def self_attention(Q, K, V):
    """Q, K, V: [batch, seq_len, d_model]"""
    d_k = Q.size(-1)
    
    # Вычисляем веса внимания
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    
    # Causal mask: запрещаем заглядывать вперёд
    mask = torch.triu(torch.ones_like(scores), diagonal=1).bool()
    scores.masked_fill_(mask, float('-inf'))
    
    # Softmax даёт вероятности
    attention_weights = F.softmax(scores, dim=-1)
    
    # Взвешенная сумма Value
    output = torch.matmul(attention_weights, V)
    return output, attention_weights`,
            language: 'python'
          },
          {
            title: 'Влияние количества слоёв на качество',
            description: 'Количество Transformer-блоков напрямую влияет на способность модели решать сложные задачи, но увеличивает вычислительную стоимость.',
            code: `const modelComparison = [
  { name: 'Gemma 2B',  layers: 18, heads: 8,  d_model: 2048, quality: 'Базовый' },
  { name: 'Llama 3 8B', layers: 32, heads: 32, d_model: 4096, quality: 'Хороший' },
  { name: 'Llama 3 70B', layers: 80, heads: 64, d_model: 8192, quality: 'Отличный' },
  { name: 'GPT-4',     layers: '~96', heads: '~96', d_model: '~12288', quality: 'SOTA' },
];

// Правило: больше слоёв = глубже понимание, но квадратично растёт стоимость
// 2x слоёв → ~2x время инференса, ~4x память для attention`,
            language: 'typescript'
          },
        ],
        commonMistakes: [
          { mistake: 'Путать Encoder-Decoder и Decoder-only архитектуры', explanation: 'Оригинальный Transformer имел encoder и decoder. Современные LLM (GPT, Llama) используют только decoder с causal attention.', correctApproach: 'GPT-подобные модели — Decoder-only. BERT — Encoder-only. T5/BART — Encoder-Decoder. Для генерации текста нужен Decoder.' },
          { mistake: 'Считать, что внимание = понимание', explanation: 'Высокий вес внимания не всегда означает смысловую связь. Модель может «обращать внимание» на частые паттерны, а не на логику.', correctApproach: 'Интерпретируйте веса внимания осторожно. Используйте их как подсказку, а не как доказательство понимания.' },
          { mistake: 'Игнорировать позиционное кодирование', explanation: 'Без позиционной информации Transformer обрабатывает текст как «мешок слов», теряя порядок.', correctApproach: 'Понимайте, что Positional Encoding (RoPE, ALiBi) — критический компонент, влияющий на способность модели работать с длинными текстами.' },
        ],
        furtherReading: [
          { topic: 'Что такое LLM', slug: 'what-is-llm', categorySlug: 'llm-basics' },
          { topic: 'Prompt Engineering: Zero-shot', slug: 'zero-shot', categorySlug: 'prompt-engineering' },
          { topic: 'Embeddings', slug: 'embeddings', categorySlug: 'rag' },
        ],
      },
    ],
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering',
    description: 'Техники и стратегии составления эффективных промптов для управления поведением LLM',
    icon: 'MessageSquare',
    subtopics: [
      {
        slug: 'zero-shot',
        title: 'Zero-shot',
        categorySlug: 'prompt-engineering',
        introduction: {
          what: 'Zero-shot промптинг — это техника взаимодействия с LLM, при которой модель получает только инструкцию без примеров правильного выполнения задачи. Модель опирается исключительно на знания, полученные в ходе pre-training, для генерации ответа.',
          why: 'Zero-shot — самый простой и быстрый способ использования LLM. Не требует подготовки примеров, минимально расходует токены и позволяет оценить «сырые» возможности модели по данной задаче без какого-либо обучения или демонстрации.',
          where: 'Используется для простых задач: классификация текстов, ответы на фактические вопросы, перевод, резюмирование, базовый анализ тональности. Также как первый шаг перед применением более сложных техник.',
          problem: 'Zero-shot решает проблему быстрого прототипирования: нужно понять, справляется ли модель с задачей «из коробки», прежде чем тратить время на подготовку примеров или тонкую настройку.'
        },
        theory: {
          terms: [
            { term: 'Zero-shot', definition: 'Промпт без примеров выполнения задачи. Модель использует только свои предобученные знания' },
            { term: 'Instruction', definition: 'Чёткое описание того, что модель должна сделать, заданное в промпте' },
            { term: 'Task Description', definition: 'Формулировка задачи, которую должна выполнить модель' },
            { term: 'Output Format', definition: 'Указание на то, в каком виде модель должна вернуть результат' },
          ],
          principles: 'Принцип Zero-shot основан на том, что LLM во время pre-training видели миллионы примеров различных задач в обучающем корпусе. Когда вы формулируете задачу в промпте, модель «узнаёт» паттерн и генерирует ответ, аналогичный тем, что она видела в обучающих данных.\n\nКлючевой фактор успеха Zero-shot — ясность и конкретность инструкции. Чем точнее вы описываете задачу и формат ответа, тем выше вероятность получить качественный результат. Неоднозначные инструкции ведут к непредсказуемым результатам.',
          architecture: 'Zero-shot промпт имеет минимальную структуру: [Инструкция/Задача] → [Входные данные] → [Указание формата]. Отсутствие примеров означает, что модель полностью полагается на внутреннее представление задачи, сформированное при обучении. Это работает хорошо для распространённых задач (перевод, резюме), но может подводить для узкоспециализированных или нестандартных запросов.',
          connections: 'Zero-shot — основа для всех других техник промптинга. Few-shot добавляет примеры к Zero-shot. Chain of Thought добавляет пошаговое рассуждение. Если Zero-shot не работает, переходят к более сложным техникам.'
        },
        diagram: {
          type: 'flowchart',
          title: 'Zero-shot промптинг',
          svgContent: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
            <defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#ah3)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:12px;text-anchor:middle}</style>
            <marker id="ah3" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs>
            <rect x="10" y="60" width="150" height="60" class="box"/><text x="85" y="85" class="text" style="font-weight:bold">Инструкция</text><text x="85" y="105" class="text" style="font-size:10px">«Классифицируй текст»</text>
            <rect x="190" y="60" width="120" height="60" class="box"/><text x="250" y="85" class="text" style="font-weight:bold">Вход</text><text x="250" y="105" class="text" style="font-size:10px">Текст для анализа</text>
            <rect x="340" y="60" width="140" height="60" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="410" y="85" class="text" style="font-weight:bold">Результат</text><text x="410" y="105" class="text" style="font-size:10px">Ответ модели</text>
            <line x1="160" y1="90" x2="190" y2="90" class="arrow"/>
            <line x1="310" y1="90" x2="340" y2="90" class="arrow"/>
            <text x="250" y="170" class="text" style="font-size:10px;opacity:0.6">Без примеров — модель опирается только на предобученные знания</text>
          </svg>`
        },
        practicalExamples: [
          {
            title: 'Классификация тональности Zero-shot',
            description: 'Классификация эмоциональной окраски текста без предоставления примеров. Модель опирается на понимание позитивных и негативных слов из обучающих данных.',
            code: `Классифицируй тональность следующего отзыва как 
"позитивная", "негативная" или "нейтральная":

"Этот ресторан превзошёл все мои ожидания! 
Обслуживание было великолепным, а блюда — просто шедевр."

Ответ: позитивная`,
            language: 'text'
          },
          {
            title: 'Zero-shot с указанием формата',
            description: 'Добавление чёткого указания формата ответа значительно улучшает качество Zero-shot промптинга.',
            code: `Извлеки ключевую информацию из текста.
Верни результат строго в формате JSON:

Текст: "Компания X сообщила о росте выручки на 15% 
в третьем квартале, достигнув $2.3 млрд."

Формат ответа:
{
  "company": string,
  "metric": string,
  "change": string,
  "period": string,
  "value": string
}`,
            language: 'text'
          },
          {
            title: 'Сравнение Zero-shot с другими техниками',
            description: 'Zero-shot — отправная точка. Если результат неудовлетворительный, переходят к Few-shot или Chain of Thought.',
            code: `// Иерархия сложности промптинга
const techniques = [
  { name: 'Zero-shot',      complexity: 1, tokens: 'минимум', when: 'Простые, стандартные задачи' },
  { name: 'Few-shot',       complexity: 2, tokens: 'средне',  when: 'Нужен пример формата/стиля' },
  { name: 'Chain of Thought', complexity: 3, tokens: 'много', when: 'Логические, математические задачи' },
  { name: 'ReAct',          complexity: 4, tokens: 'очень много', when: 'Нужны инструменты и рассуждения' },
];

// Всегда начинайте с Zero-shot и усложняйте при необходимости`,
            language: 'typescript'
          },
        ],
        commonMistakes: [
          { mistake: 'Неясная инструкция в Zero-shot', explanation: 'Размытые формулировки типа «Проанализируй текст» без конкретизации приводят к непредсказуемым результатам.', correctApproach: 'Указывайте: что именно анализировать, в каком формате вернуть, какие критерии использовать.' },
          { mistake: 'Ожидать Zero-shot для сложных задач', explanation: 'Для задач, требующих рассуждений, математических вычислений или сложной логики, Zero-shot часто недостаточен.', correctApproach: 'Используйте Chain of Thought или Few-shot для сложных задач. Zero-shot — для простых.' },
          { mistake: 'Не указывать формат ответа', explanation: 'Без указания формата модель может вернуть ответ в неожиданном виде: длинный текст вместо JSON, эссе вместо одного слова.', correctApproach: 'Всегда явно указывайте желаемый формат: JSON, список, одно слово, число и т.д.' },
        ],
        furtherReading: [
          { topic: 'Few-shot', slug: 'few-shot', categorySlug: 'prompt-engineering' },
          { topic: 'Chain of Thought', slug: 'cot', categorySlug: 'prompt-engineering' },
          { topic: 'Structured Output', slug: 'structured-output', categorySlug: 'prompt-engineering' },
        ],
      },
      {
        slug: 'few-shot',
        title: 'Few-shot',
        categorySlug: 'prompt-engineering',
        introduction: {
          what: 'Few-shot промптинг — это техника, при которой в промпт включается несколько примеров правильного выполнения задачи перед тем, как попросить модель обработать новый вход. Примеры показывают модели желаемый формат, стиль и логику ответа без какого-либо изменения весов модели.',
          why: 'Few-shot нужен, когда Zero-shot не даёт желаемого результата: модель не понимает формат, делает ошибки в стиле или логике ответа. Несколько примеров «подсказывают» модели паттерн, которого нужно придерживаться, что значительно повышает качество.',
          where: 'Используется для задач с нестандартным форматом вывода, задач где важен стиль или тон ответа, классификации с неочевидными категориями, задач где модель склонна к галлюцинациям в Zero-shot режиме.',
          problem: 'Решает проблему недопонимания модели: когда модель «знает» как решить задачу, но не понимает, что именно от неё требуется. Примеры работают как «демонстрация» без обучения — model learns from demonstration, not from parameter updates.'
        },
        theory: {
          terms: [
            { term: 'Few-shot', definition: 'Промпт с 2-5 примерами правильного выполнения задачи перед основным запросом' },
            { term: 'One-shot', definition: 'Частный случай Few-shot с одним примером демонстрации' },
            { term: 'In-context Learning', definition: 'Способность модели учиться из контекста промпта без изменения весов' },
            { term: 'Example Selection', definition: 'Стратегия выбора наиболее информативных примеров для Few-shot промпта' },
          ],
          principles: 'Few-shot работает благодаря in-context learning — способности модели «подстраиваться» под паттерн, заданный в контексте. Модель не меняет свои веса, но паттерн примеров активирует релевантные знания, полученные при pre-training. Это работает как «прайминг» — примеры направляют статистические предпочтения модели.\n\nКоличество примеров: 1-2 (one/zero-shot) для простых задач, 3-5 для сложных. Слишком много примеров расходует контекстное окно и может запутать модель. Примеры должны быть репрезентативными и разнообразными.',
          architecture: 'Структура Few-shot промпта: [Системная инструкция] → [Пример 1: Вход → Выход] → [Пример 2: Вход → Выход] → [Пример N: Вход → Выход] → [Новый Вход → ?]. Модель обрабатывает примеры как часть контекста и генерирует ответ для нового входа, следуя выявленному паттерну. Важен порядок примеров — модель склонна больше «подражать» последним примерам.',
          connections: 'Few-shot развивает Zero-shot, добавляя демонстрации. Chain of Thought — это Few-shot, где примеры содержат пошаговые рассуждения. RAG можно рассматривать как динамический Few-shot, где примеры извлекаются из базы знаний.'
        },
        diagram: {
          type: 'flowchart',
          title: 'Few-shot промптинг',
          svgContent: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">
            <defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#ah4)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:11px;text-anchor:middle}.example{fill:var(--diagram-fill2,#c8e6c9)}</style>
            <marker id="ah4" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs>
            <rect x="10" y="10" width="470" height="50" class="box"/><text x="250" y="40" class="text" style="font-weight:bold">Системная инструкция</text>
            <rect x="10" y="75" width="470" height="40" class="example box"/><text x="250" y="100" class="text">Пример 1: Вход → Правильный ответ</text>
            <rect x="10" y="125" width="470" height="40" class="example box"/><text x="250" y="150" class="text">Пример 2: Вход → Правильный ответ</text>
            <rect x="10" y="175" width="470" height="40" class="example box"/><text x="250" y="200" class="text">Пример 3: Вход → Правильный ответ</text>
            <rect x="10" y="230" width="470" height="40" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="250" y="255" class="text" style="font-weight:bold">Новый вход → ? (модель следует паттерну)</text>
          </svg>`
        },
        practicalExamples: [
          {
            title: 'Few-shot классификация с нестандартными категориями',
            description: 'Когда категории классификации неочевидны, Few-shot примеры помогают модели понять, как именно нужно классифицировать.',
            code: `Классифицируй запрос пользователя по категории:

Запрос: "Как сбросить пароль?" → Категория: Аккаунт
Запрос: "Где мой заказ #12345?" → Категория: Доставка
Запрос: "Как вернуть товар?" → Категория: Возврат

Запрос: "Хочу изменить адрес доставки" → Категория:`,
            language: 'text'
          },
          {
            title: 'Few-shot с контролем формата и стиля',
            description: 'Примеры задают не только содержание, но и стиль ответа — формальный или неформальный, краткий или развёрнутый.',
            code: `Перепиши технический текст простым языком:

Технический: "API endpoint возвращает HTTP 429 при превышении rate limit"
Простой: "Сервер временно отказывает в запросах, если их слишком много"

Технический: "Инициализация объекта происходит через dependency injection"
Простой: "Нужные настройки подставляются автоматически"

Технический: "Миграция схемы БД требует downtime для ALTER TABLE операций"
Простой:`,
            language: 'text'
          },
        ],
        commonMistakes: [
          { mistake: 'Использовать слишком много примеров', explanation: '5+ примеров расходуют контекстное окно и могут запутать модель, если примеры не идеально согласованы.', correctApproach: 'Используйте 2-4 наиболее репрезентативных примера. Качество примеров важнее количества.' },
          { mistake: 'Несогласованные примеры', explanation: 'Если примеры имеют разный формат или стиль, модель запутается и выдаст непредсказуемый результат.', correctApproach: 'Все примеры должны следовать одному формату, одной структуре и одному стилю.' },
          { mistake: 'Не учитывать порядок примеров', explanation: 'Модель больше подвержена влиянию последних примеров в последовательности (recency bias).', correctApproach: 'Помещайте наиболее релевантные примеры ближе к концу промпта.' },
        ],
        furtherReading: [
          { topic: 'Zero-shot', slug: 'zero-shot', categorySlug: 'prompt-engineering' },
          { topic: 'Chain of Thought', slug: 'cot', categorySlug: 'prompt-engineering' },
          { topic: 'Structured Output', slug: 'structured-output', categorySlug: 'prompt-engineering' },
        ],
      },
      {
        slug: 'cot',
        title: 'Chain of Thought',
        categorySlug: 'prompt-engineering',
        introduction: {
          what: 'Chain of Thought (CoT) — это техника промптинга, при которой модель побуждается к пошаговому рассуждению перед тем, как дать финальный ответ. Вместо прямого ответа модель сначала «думает вслух», разбивая задачу на промежуточные шаги.',
          why: 'CoT радикально улучшает результаты на задачах, требующих логики, математики, планирования или многошагового рассуждения. Без CoT модель часто «угадывает» ответ, пропуская логику. С CoT — последовательно выводит решение.',
          where: 'Применяется в математических задачах, логических головоломках, планировании действий, анализе сложных сценариев, правовом анализе, диагностике проблем и вообще в любых задачах, где важен ход рассуждений, а не только итог.',
          problem: 'Решает проблему «интуитивных» ошибок: когда модель мгновенно выдаёт неверный ответ, потому что паттерн похож на известный ей, но логика другая. CoT заставляет модель проверять каждый шаг, что снижает вероятность систематических ошибок.'
        },
        theory: {
          terms: [
            { term: 'Chain of Thought', definition: 'Техника пошагового рассуждения в промпте, где модель выводит промежуточные шаги перед финальным ответом' },
            { term: 'Zero-shot CoT', definition: 'Вариант CoT без примеров — добавляется фраза «Думай пошагово» к инструкции' },
            { term: 'Few-shot CoT', definition: 'CoT с примерами, содержащими полные рассуждения' },
            { term: 'Self-Consistency', definition: 'Генерация нескольких CoT-рассуждений и выбор наиболее частого ответа' },
            { term: 'Tree of Thought', definition: 'Расширение CoT, где модель исследует несколько веток рассуждений одновременно' },
          ],
          principles: 'CoT работает, потому что пошаговое рассуждение создаёт более короткие и простые вычислительные пути между токенами. Вместо одного «прыжка» от вопроса к ответу (который может быть ошибочным), модель совершает серию маленьких, более надёжных шагов. Каждый шаг использует результаты предыдущего, создавая цепочку логических выводов.\n\nВажно: CoT не добавляет модели новых знаний. Он помогает модели лучше использовать уже имеющиеся знания, структурируя процесс вывода. Эффект наиболее выражен на больших моделях (от 100B параметров).',
          architecture: 'Структура CoT промпта: [Задача] → [«Думай пошагово» / Примеры с рассуждениями] → [Шаг 1: ...] → [Шаг 2: ...] → [Шаг N: ...] → [Финальный ответ]. В Few-shot CoT примеры содержат полные цепочки рассуждений. В Zero-shot CoT достаточно добавить «Давай рассуждать пошагово» или «Think step by step».',
          connections: 'CoT — основа для ReAct (рассуждение + действие), используется в AI Agents для планирования, связан с Structured Output (можно структурировать шаги рассуждения).'
        },
        diagram: {
          type: 'flowchart',
          title: 'Chain of Thought рассуждение',
          svgContent: `<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
            <defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#ah5)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:11px;text-anchor:middle}.step{fill:var(--diagram-fill2,#c8e6c9)}</style>
            <marker id="ah5" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs>
            <rect x="160" y="10" width="180" height="35" class="box"/><text x="250" y="32" class="text" style="font-weight:bold">Вопрос</text>
            <rect x="120" y="65" width="260" height="35" class="step box"/><text x="250" y="87" class="text">Шаг 1: Анализ условия</text>
            <rect x="120" y="115" width="260" height="35" class="step box"/><text x="250" y="137" class="text">Шаг 2: Применение знаний</text>
            <rect x="120" y="165" width="260" height="35" class="step box"/><text x="250" y="187" class="text">Шаг 3: Промежуточный вывод</text>
            <rect x="120" y="215" width="260" height="35" class="step box"/><text x="250" y="237" class="text">Шаг 4: Проверка и финальный вывод</text>
            <rect x="160" y="265" width="180" height="30" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="250" y="284" class="text" style="font-weight:bold">Ответ</text>
            <line x1="250" y1="45" x2="250" y2="65" class="arrow"/>
            <line x1="250" y1="100" x2="250" y2="115" class="arrow"/>
            <line x1="250" y1="150" x2="250" y2="165" class="arrow"/>
            <line x1="250" y1="200" x2="250" y2="215" class="arrow"/>
            <line x1="250" y1="250" x2="250" y2="265" class="arrow"/>
          </svg>`
        },
        practicalExamples: [
          {
            title: 'Zero-shot CoT: «Думай пошагово»',
            description: 'Простейший вариант CoT — добавление одной фразы, которая радикально меняет качество ответов на логические задачи.',
            code: `// Без CoT (часто ошибается)
Вопрос: В магазине было 23 яблока. Утром продали 8, 
а днём ещё 5. Сколько яблок осталось?
Ответ: 10  ← ОШИБКА (модель угадала)

// С Zero-shot CoT
Вопрос: В магазине было 23 яблока. Утром продали 8, 
а днём ещё 5. Сколько яблок осталось?

Давай рассуждать пошагово:
1. Изначально было 23 яблока
2. После утра: 23 - 8 = 15 яблок
3. После дня: 15 - 5 = 10 яблок
Ответ: 10  ← ВЕРНО`,
            language: 'text'
          },
          {
            title: 'Few-shot CoT для сложной логики',
            description: 'Примеры с полными рассуждениями учат модель правильному ходу мыслей при решении аналогичных задач.',
            code: `Реши логическую задачу. Покажи рассуждения:

Задача: Все коты — животные. Некоторые животные — чёрные. 
Мурзик — кот. Что можно сказать о Мурзике?

Рассуждение:
1. Мурзик — кот (дано)
2. Все коты — животные → Мурзик — животное (вывод)
3. Некоторые животные — чёрные, но мы не знаем, 
   какие именно → нельзя утверждать, что Мурзик чёрный
Ответ: Мурзик — животное. Нельзя определить, чёрный ли он.

---

Задача: Если идёт дождь, улица мокрая. Улица мокрая. 
Идёт ли дождь?`,
            language: 'text'
          },
        ],
        commonMistakes: [
          { mistake: 'Использовать CoT для простых задач', explanation: 'CoT увеличивает расход токенов и время ответа. Для задач типа «Столица Франции?» CoT бессмысленен.', correctApproach: 'Применяйте CoT для задач с рассуждениями, логикой, математикой. Для фактических вопросов используйте Zero-shot.' },
          { mistake: 'Не проверять промежуточные шаги', explanation: 'CoT не гарантирует правильности — модель может «рассуждать» логично, но от неверной посылки.', correctApproach: 'Критически оценивайте каждый шаг рассуждения, а не только финальный ответ.' },
          { mistake: 'Считать, что больше шагов = лучше', explanation: 'Излишне длинные рассуждения могут запутать модель и увеличить вероятность галлюцинаций.', correctApproach: 'Стремитесь к лаконичным, но полным рассуждениям. 3-5 шагов обычно достаточно.' },
        ],
        furtherReading: [
          { topic: 'Zero-shot', slug: 'zero-shot', categorySlug: 'prompt-engineering' },
          { topic: 'ReAct', slug: 'react', categorySlug: 'prompt-engineering' },
          { topic: 'Agent Loop', slug: 'agent-loop', categorySlug: 'ai-agents' },
        ],
      },
      {
        slug: 'react',
        title: 'ReAct',
        categorySlug: 'prompt-engineering',
        introduction: {
          what: 'ReAct (Reasoning + Acting) — это техника промптинга, объединяющая рассуждение (Chain of Thought) с выполнением действий (Tool Use). Модель чередует шаги размышления и конкретные действия: поиск информации, вызов API, обращение к базам данных.',
          why: 'ReAct нужен, потому что чистое рассуждение (CoT) ограничено знаниями модели. Когда модели не хватает информации, она галлюцинирует. ReAct позволяет модели действовать: искать данные, выполнять вычисления, обращаться к инструментам — и использовать результаты для дальнейших рассуждений.',
          where: 'Используется в AI-агентах, которым нужно взаимодействовать с внешним миром: поиск в интернете, запросы к API, работа с базами данных, выполнение кода, управление файлами.',
          problem: 'Решает проблему ограниченности знаний LLM: модель не может знать всё, но с ReAct она может «действовать» — искать, вычислять, проверять — и тем самым получать актуальную информацию вместо выдумывания.'
        },
        theory: {
          terms: [
            { term: 'ReAct', definition: 'Парадигма Reasoning + Acting — модель чередует рассуждения и действия' },
            { term: 'Thought', definition: 'Шаг рассуждения модели — анализ текущей ситуации и планирование следующего действия' },
            { term: 'Action', definition: 'Конкретное действие модели — вызов инструмента, поиск, вычисление' },
            { term: 'Observation', definition: 'Результат действия — информация, полученная от инструмента или среды' },
            { term: 'Tool', definition: 'Внешний инструмент, доступный модели: поиск, API, калькулятор и т.д.' },
          ],
          principles: 'Цикл ReAct: Thought → Action → Observation → Thought → Action → ... → Answer. На каждом шаге модель решает: рассуждать ли дальше (у неё достаточно информации) или выполнить действие (нужны дополнительные данные). Это похоже на то, как человек решает задачу: думает, ищет информацию, снова думает.\n\nReAct значительно снижает галлюцинации, потому что модель проверяет свои рассуждения через действия. Если модель сомневается — она может найти подтверждение, прежде чем давать финальный ответ.',
          architecture: 'ReAct-промпт описывает доступные инструменты и их формат вызова. Модель генерирует структурированные действия: Action: Search[query], Action: Lookup[term], Action: Finish[answer]. Среда выполнения (runtime) перехватывает эти действия, выполняет их и возвращает наблюдения. Цикл продолжается, пока модель не вызовет Finish или не достигнет лимита шагов.',
          connections: 'ReAct — основа AI Agents. Agent Loop реализует ReAct-цикл. MCP (Model Context Protocol) предоставляет стандартизированный доступ к инструментам для ReAct-агентов. Planning в агентных системах — это расширенный ReAct.'
        },
        diagram: {
          type: 'flowchart',
          title: 'Цикл ReAct',
          svgContent: `<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
            <defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:20}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#ah6)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:12px;text-anchor:middle}</style>
            <marker id="ah6" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs>
            <rect x="170" y="10" width="160" height="45" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="250" y="37" class="text" style="font-weight:bold">Thought 💭</text>
            <rect x="30" y="110" width="160" height="45" class="box"/><text x="110" y="137" class="text" style="font-weight:bold">Action ⚡</text>
            <rect x="310" y="110" width="160" height="45" class="box"/><text x="390" y="137" class="text" style="font-weight:bold">Observation 👁</text>
            <rect x="170" y="210" width="160" height="45" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="250" y="237" class="text" style="font-weight:bold">Answer ✅</text>
            <path d="M 210 55 L 110 110" class="arrow"/>
            <path d="M 190 110 L 250 55" class="arrow"/>
            <line x1="190" y1="132" x2="310" y2="132" class="arrow"/>
            <path d="M 390 155 L 310 232" class="arrow"/>
            <path d="M 290 232 L 250 232" class="arrow" style="stroke-dasharray:5,5"/>
          </svg>`
        },
        practicalExamples: [
          {
            title: 'ReAct для поиска информации',
            description: 'Модель использует поисковый инструмент для нахождения актуальной информации вместо галлюцинирования.',
            code: `Вопрос: Кто является текущим CEO компании Apple?

Thought: Мне нужно найти актуальную информацию о CEO Apple, 
так как мои знания могут быть устаревшими.
Action: Search["CEO Apple 2025"]
Observation: Тим Кук остаётся CEO Apple с 2011 года.

Thought: Я получил подтверждение. Тим Кук — текущий CEO.
Action: Finish["Тим Кук является текущим CEO Apple"]`,
            language: 'text'
          },
        ],
        commonMistakes: [
          { mistake: 'Не ограничивать количество шагов ReAct', explanation: 'Без лимита модель может зациклиться, повторяя одни и те же действия без прогресса.', correctApproach: 'Устанавливайте максимальное количество шагов (5-10) и проверяйте прогресс.' },
          { mistake: 'Давать модели слишком много инструментов', explanation: 'Большое количество инструментов запутывает модель — она не может выбрать правильный.', correctApproach: 'Давайте 3-7 инструментов с чёткими описаниями. Каждый инструмент должен иметь однозначное назначение.' },
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
          what: 'Structured Output — это техника получения от LLM ответа в строго определённом формате: JSON, XML, таблица или другая структурированная структура данных. Это превращает LLM из «генератора текста» в «генератор данных», пригодных для программной обработки.',
          why: 'Без структурированного вывода ответ модели — просто текст, который нужно парсить вручную. Structured Output позволяет интегрировать LLM в программные системы: API, базы данных, пайплайны обработки данных — везде, где нужен предсказуемый формат ответа.',
          where: 'Используется при интеграции LLM в приложения: извлечение сущностей, классификация с множеством категорий, генерация конфигураций, парсинг документов, создание API-ответов, заполнение баз данных.',
          problem: 'Решает проблему непредсказуемости формата: модель может вернуть эссе вместо JSON, или JSON с неверной структурой, или добавить «конечно, вот ваш JSON:» перед данными. Structured Output гарантирует формат.'
        },
        theory: {
          terms: [
            { term: 'Structured Output', definition: 'Гарантированный формат ответа LLM: JSON Schema, XML Schema или другой формальный формат' },
            { term: 'JSON Mode', definition: 'Режим API, принуждающий модель генерировать валидный JSON' },
            { term: 'Function Calling', definition: 'Механизм, при котором модель генерирует структурированный вызов функции вместо текста' },
            { term: 'Schema', definition: 'Формальное описание структуры ожидаемого ответа (JSON Schema, Zod, Pydantic)' },
          ],
          principles: 'Structured Output работает на двух уровнях: 1) Промпт-уровень — модель инструктируется вернуть ответ в определённом формате с примерами; 2) API-уровень — режим JSON Mode или Function Calling принудительно ограничивает токены модели так, что она может генерировать только валидный JSON.\n\nСовременные API (OpenAI, Anthropic) поддерживают Structured Output на уровне API: вы передаёте JSON Schema, и модель гарантированно возвращает валидный JSON, соответствующий схеме. Это значительно надёжнее, чем полагаться на промпт-инструкции.',
          architecture: 'Конвейер Structured Output: [JSON Schema] → [API с поддержкой Structured Output] → [Валидный JSON]. Альтернативный путь: [Промпт с примером JSON] → [Парсинг ответа] → [Валидация + fallback]. Второй путь менее надёжен, но работает с любой моделью.',
          connections: 'Structured Output критически важен для AI Agents (структурированные вызовы инструментов), RAG (структурированные результаты извлечения), Production AI (надёжная интеграция).'
        },
        diagram: {
          type: 'pipeline',
          title: 'Structured Output конвейер',
          svgContent: `<svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg">
            <defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#ah7)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:11px;text-anchor:middle}</style>
            <marker id="ah7" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs>
            <rect x="10" y="50" width="110" height="60" class="box"/><text x="65" y="75" class="text" style="font-weight:bold">Schema</text><text x="65" y="95" class="text" style="font-size:9px">JSON Schema / Zod</text>
            <rect x="160" y="50" width="120" height="60" class="box" style="fill:var(--diagram-fill2,#c8e6c9)"/><text x="220" y="75" class="text" style="font-weight:bold">LLM API</text><text x="220" y="95" class="text" style="font-size:9px">JSON Mode / FC</text>
            <rect x="320" y="50" width="120" height="60" class="box"/><text x="380" y="75" class="text" style="font-weight:bold">Валидация</text><text x="380" y="95" class="text" style="font-size:9px">Schema validation</text>
            <rect x="460" y="55" width="30" height="50" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="475" y="85" class="text" style="font-size:18px">✓</text>
            <line x1="120" y1="80" x2="160" y2="80" class="arrow"/>
            <line x1="280" y1="80" x2="320" y2="80" class="arrow"/>
            <line x1="440" y1="80" x2="460" y2="80" class="arrow"/>
          </svg>`
        },
        practicalExamples: [
          {
            title: 'Structured Output через OpenAI API',
            description: 'Использование JSON Mode и Function Calling для гарантированного получения структурированного ответа.',
            code: `import OpenAI from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod';

const PersonSchema = z.object({
  name: z.string(),
  age: z.number(),
  skills: z.array(z.string()),
  experience: z.enum(['junior', 'middle', 'senior']),
});

const response = await client.responses.create({
  model: 'gpt-4o',
  input: 'Извлеки информацию: "Мария, 28 лет, знает Python и SQL, 5 лет опыта"',
  text: { format: zodTextFormat(PersonSchema, 'person') },
});

// Гарантированно валидный JSON:
// { name: "Мария", age: 28, skills: ["Python", "SQL"], experience: "middle" }`,
            language: 'typescript'
          },
        ],
        commonMistakes: [
          { mistake: 'Рассчитывать на промпт-Structured Output без API-поддержки', explanation: 'Просто попросить «верни JSON» ненадёжно — модель может добавить лишний текст или нарушить структуру.', correctApproach: 'Используйте JSON Mode / Function Calling API. Если модель не поддерживает — добавьте парсинг и валидацию с fallback.' },
          { mistake: 'Слишком сложная схема', explanation: 'Излишне вложенные и сложные JSON Schema приводят к ошибкам — модель путается в структуре.', correctApproach: 'Держите схему простой: максимум 2-3 уровня вложенности. Разбивайте сложные схемы на несколько вызовов.' },
        ],
        furtherReading: [
          { topic: 'Chain of Thought', slug: 'cot', categorySlug: 'prompt-engineering' },
          { topic: 'MCP Tools', slug: 'mcp-tools', categorySlug: 'mcp' },
          { topic: 'Agent Loop', slug: 'agent-loop', categorySlug: 'ai-agents' },
        ],
      },
    ],
  },
  {
    slug: 'context-engineering',
    title: 'Context Engineering',
    description: 'Стратегии управления контекстом LLM: память, сжатие, суммаризация',
    icon: 'Layers',
    subtopics: [
      {
        slug: 'context',
        title: 'Контекст',
        categorySlug: 'context-engineering',
        introduction: { what: 'Контекст в LLM — это вся информация, доступная модели в текущем запросе: системный промпт, история диалога, входные данные и любые дополнительные знания. Контекст — это «рабочая память» модели, определяющая качество и релевантность ответа.', why: 'Управление контекстом критически важно, потому что от его качества напрямую зависит качество ответа. Плохо сформированный контекст приводит к галлюцинациям, нерелевантным ответам и потере важной информации. Хорошо структурированный контекст — ключ к эффективному использованию LLM.', where: 'Работа с контекстом необходима во всех сценариях использования LLM: чат-боты, агенты, RAG-системы, анализ документов, генерация кода. Каждый раз, когда вы отправляете промпт — вы управляете контекстом.', problem: 'Проблема в ограниченности контекстного окна и в том, что не вся информация в контексте одинаково полезна. Context Engineering решает задачу отбора, структурирования и оптимизации информации, попадающей в контекстное окно модели.' },
        theory: { terms: [{ term: 'Контекст', definition: 'Вся входная информация, доступная модели в текущем запросе' }, { term: 'System Prompt', definition: 'Инструкция, задающая поведение модели — часть контекста, которая присутствует в каждом запросе' }, { term: 'Context Window', definition: 'Максимальный размер контекста в токенах' }, { term: 'Context Caching', definition: 'Кэширование частей контекста для ускорения повторных запросов' }, { term: 'Context Priority', definition: 'Приоритизация информации в контексте по важности для текущей задачи' }], principles: 'Принцип контекстного инжиниринга: каждый токен в контексте должен заслуживать своего места. Модель обрабатывает контекст через механизм внимания, и лишняя информация «размывает» внимание, снижая качество. С другой стороны, недостаток информации ведёт к галлюцинациям.\n\nБаланс между полнотой и лаконичностью — ключевое искусство. Хорошая стратегия: начинать с минимального контекста и добавлять информацию по необходимости, а не начинать с максимума и надеяться, что модель сама разберётся.', architecture: 'Структура оптимального контекста: [Системный промпт] → [Релевантные знания (RAG)] → [История диалога (сжатая)] → [Текущий запрос]. Каждый слой имеет свой приоритет и может быть динамически настроен в зависимости от задачи. Системный промпт — постоянная часть, RAG и история — переменные.', connections: 'Контекст связан со всеми аспектами LLM: Prompt Engineering определяет структуру системного промпта, RAG предоставляет внешние знания, Memory управляет историей, Compression оптимизирует использование токенов.' },
        diagram: { type: 'architecture', title: 'Структура контекста LLM', svgContent: `<svg viewBox="0 0 400 350" xmlns="http://www.w3.org/2000/svg"><defs><style>.layer{rx:4;opacity:0.9}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:12px;text-anchor:middle}</style></defs><rect x="50" y="10" width="300" height="50" class="layer" style="fill:#e8f5e9;stroke:#2e7d32;stroke-width:2"/><text x="200" y="40" class="text" style="font-weight:bold">Системный промпт</text><rect x="50" y="80" width="300" height="50" class="layer" style="fill:#c8e6c9;stroke:#2e7d32;stroke-width:2"/><text x="200" y="110" class="text">RAG: извлечённые знания</text><rect x="50" y="150" width="300" height="50" class="layer" style="fill:#a5d6a7;stroke:#2e7d32;stroke-width:2"/><text x="200" y="180" class="text">История диалога (сжатая)</text><rect x="50" y="220" width="300" height="50" class="layer" style="fill:#81c784;stroke:#2e7d32;stroke-width:2"/><text x="200" y="250" class="text">Текущий запрос</text><text x="200" y="310" class="text" style="font-size:10px;opacity:0.6">Каждый слой — от постоянного к переменному</text></svg>` },
        practicalExamples: [{ title: 'Оптимизация контекста для чат-бота', description: 'Стратегия управления контекстом в многоходовом диалоге: что оставлять, что сжимать, что удалять.', code: `interface ContextManager {
  systemPrompt: string;     // Постоянная часть (~200 токенов)
  maxHistory: number;       // Максимум последних N сообщений
  summaryThreshold: number; // Когда сжимать историю
}

function buildContext(manager: ContextManager, messages: Message[]) {
  const context = [manager.systemPrompt];
  
  if (messages.length > manager.summaryThreshold) {
    // Сжимаем старую историю в саммари
    const old = messages.slice(0, -5);
    const summary = summarize(old);
    context.push(summary);
    context.push(...messages.slice(-5));
  } else {
    context.push(...messages);
  }
  
  return context;
}`, language: 'typescript' }],
        commonMistakes: [{ mistake: 'Заполнять контекст всем подряд', explanation: 'Модель с «замусоренным» контекстом работает хуже, чем с минимальным но релевантным.', correctApproach: 'Отбирайте только релевантную информацию. Лучше меньше, но качественнее.' }, { mistake: 'Не обновлять контекст в диалоге', explanation: 'Старая информация в истории диалога может конфликтовать с новой.', correctApproach: 'Периодически сжимайте и обновляйте историю. Удаляйте устаревшие данные.' }, { mistake: 'Игнорировать порядок в контексте', explanation: 'Модель лучше запоминает начало и конец контекста (Primacy и Recency эффекты).', correctApproach: 'Ключевую информацию помещайте в начало и конец. Менее важную — в середину.' }],
        furtherReading: [{ topic: 'Memory', slug: 'memory', categorySlug: 'context-engineering' }, { topic: 'Compression', slug: 'compression', categorySlug: 'context-engineering' }, { topic: 'Summarization', slug: 'summarization', categorySlug: 'context-engineering' }],
      },
      {
        slug: 'memory',
        title: 'Memory',
        categorySlug: 'context-engineering',
        introduction: { what: 'Memory (память) в контексте LLM — это механизмы сохранения и использования информации между запросами. Поскольку LLM не имеет встроенной памяти, каждый запрос начинается «с чистого листа». Memory-системы создают иллюзию непрерывной памяти, сохраняя и подставляя релевантную информацию в контекст.', why: 'Без памяти LLM не может вести осмысленный многоходовой диалог или учитывать предпочтения пользователя. Memory нужна для персонализации, сохранения контекста диалога и накопления знаний о пользователе.', where: 'Используется в чат-ботах (сохранение контекста диалога), AI-ассистентах (пользовательские предпочтения), образовательных платформах (прогресс обучения), агентных системах (накопление опыта).', problem: 'Решает проблему «амнезии» LLM: каждый запрос независим, и модель не помнит предыдущие взаимодействия без явной передачи информации в контексте.' },
        theory: { terms: [{ term: 'Short-term Memory', definition: 'Информация в текущем контекстном окне — то, что модель «видит» прямо сейчас' }, { term: 'Long-term Memory', definition: 'Внешнее хранилище информации, которая подставляется в контекст при необходимости' }, { term: 'Episodic Memory', definition: 'Воспоминания о конкретных взаимодействиях и событиях' }, { term: 'Semantic Memory', definition: 'Структурированные знания и факты о мире и пользователе' }, { term: 'Working Memory', definition: 'Активная часть памяти, непосредственно используемая в текущем рассуждении' }], principles: 'Архитектура памяти для LLM обычно трёхуровневая: 1) Working Memory — текущий контекст (ограничен контекстным окном), 2) Short-term Memory — последние N взаимодействий (хранится в сессии), 3) Long-term Memory — постоянное хранилище (база данных, векторное хранилище).\n\nКлючевой принцип: не вся память одинаково полезна. Система должна отбирать релевантные воспоминания для текущего запроса, иначе контекст будет перегружен. Это похоже на человеческую память — мы не помним всё одновременно, но можем вспомнить нужное по ассоциации.', architecture: 'Типовая реализация: каждое сообщение и важный факт сохраняются в хранилище. При новом запросе система извлекает релевантные воспоминания (через векторный поиск или ключевые слова) и подставляет их в контекст. Semantic Memory хранит факты («пользователь — программист»), Episodic Memory — события («на прошлой неделе обсуждали Python»).', connections: 'Memory тесно связана с RAG (долгосрочная память — по сути RAG по истории взаимодействий), Compression (сжатие старой памяти), Context Engineering (управление тем, что попадает в контекст).' },
        diagram: { type: 'architecture', title: 'Архитектура памяти LLM', svgContent: `<svg viewBox="0 0 450 300" xmlns="http://www.w3.org/2000/svg"><defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#am)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:11px;text-anchor:middle}</style><marker id="am" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs><rect x="120" y="10" width="200" height="40" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="220" y="35" class="text" style="font-weight:bold">Working Memory</text><rect x="10" y="90" width="130" height="55" class="box"/><text x="75" y="113" class="text" style="font-weight:bold">Short-term</text><text x="75" y="130" class="text" style="font-size:10px">Последние N сообщений</text><rect x="310" y="90" width="130" height="55" class="box"/><text x="375" y="113" class="text" style="font-weight:bold">Long-term</text><text x="375" y="130" class="text" style="font-size:10px">Векторное хранилище</text><rect x="100" y="190" width="250" height="55" class="box" style="fill:var(--diagram-fill2,#c8e6c9)"/><text x="225" y="213" class="text" style="font-weight:bold">Retrieval Engine</text><text x="225" y="230" class="text" style="font-size:10px">Отбор релевантных воспоминаний</text><rect x="140" y="270" width="160" height="25" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="220" y="287" class="text" style="font-weight:bold;font-size:10px">→ В контекст</text><line x1="220" y1="50" x2="75" y2="90" class="arrow"/><line x1="220" y1="50" x2="375" y2="90" class="arrow"/><line x1="75" y1="145" x2="150" y2="190" class="arrow"/><line x1="375" y1="145" x2="300" y2="190" class="arrow"/><line x1="225" y1="245" x2="220" y2="270" class="arrow"/></svg>` },
        practicalExamples: [{ title: 'Реализация долгосрочной памяти для чат-бота', description: 'Система, которая сохраняет факты о пользователе и подставляет их в контекст при релевантности.', code: `interface MemoryStore {
  facts: Map<string, string[]>;  // userId -> facts
}

function buildContextWithMemory(
  userId: string,
  currentMessage: string,
  store: MemoryStore
) {
  const facts = store.facts.get(userId) || [];
  const relevantFacts = facts.filter(f => 
    isRelevant(f, currentMessage)
  );
  
  return \`
[Пользовательские факты]
\${relevantFacts.join('\\n')}

[Текущий запрос]
\${currentMessage}
\`;
}`, language: 'typescript' }],
        commonMistakes: [{ mistake: 'Пытаться хранить всю историю в контексте', explanation: 'Контекстное окно ограничено. Вся история длинного диалога не поместится.', correctApproach: 'Храните историю внешне и подставляйте только релевантную часть.' }, { mistake: 'Не фильтровать воспоминания', explanation: 'Все воспоминания сразу перегрузят контекст и «размоют» внимание модели.', correctApproach: 'Используйте retrieval для отбора только релевантных воспоминаний.' }],
        furtherReading: [{ topic: 'Контекст', slug: 'context', categorySlug: 'context-engineering' }, { topic: 'Summarization', slug: 'summarization', categorySlug: 'context-engineering' }, { topic: 'RAG Retrieval', slug: 'retrieval', categorySlug: 'rag' }],
      },
      {
        slug: 'compression',
        title: 'Compression',
        categorySlug: 'context-engineering',
        introduction: { what: 'Compression (сжатие контекста) — это методы уменьшения размера контекста при сохранении его информативности. Сжатие позволяет эффективнее использовать контекстное окно, уменьшить стоимость запросов и повысить качество ответов за счёт удаления шума.', why: 'Сжатие необходимо, когда контекст превышает лимит или содержит избыточную информацию. Без сжатия модель тратит «внимание» на нерелевантные данные, что снижает качество ответов и увеличивает стоимость.', where: 'Сжатие применяется в многоходовых диалогах (история слишком длинная), RAG-системах (слишком много извлечённых документов), при обработке длинных документов, в чат-ботах с ограниченным бюджетом на токены.', problem: 'Решает проблему переполнения контекста: когда информации больше, чем может вместить контекстное окно, сжатие позволяет оставить самое важное и удалить второстепенное.' },
        theory: { terms: [{ term: 'Context Compression', definition: 'Методы уменьшения размера контекста с сохранением информативности' }, { term: 'Late Chunking', definition: 'Техника сжатия, при которой сначала вычисляются эмбеддинги, а затем делится на чанки' }, { term: 'Context Distillation', definition: 'Сжатие через обучение модели на собственных ответах для создания компактного промпта' }, { term: 'Prompt Compression', definition: 'Автоматическое удаление неважных токенов из промпта' }], principles: 'Два основных подхода к сжатию: 1) Lossless — удаление redundancies без потери смысла (удаление повторов, упрощение формулировок), 2) Lossy — сознательное отбрасывание менее важной информации (суммаризация, выборка ключевых фактов).\n\nИнформационная плотность контекста — ключевой показатель. Цель сжатия: максимизировать информационную плотность (полезная информация / токены). Оптимальный контекст — каждый токен несёт полезную информацию.', architecture: 'Пайплайн сжатия: [Исходный контекст] → [Анализ важности] → [Отбор ключевой информации] → [Сжатый контекст]. Методы: LLM-based summarization (самая качественная, но дорогая), rule-based (быстрая, но грубая), embedding-based (баланс скорости и качества).', connections: 'Compression работает вместе с Summarization (сжатие через пересказ), Memory (сжатие старой памяти), RAG (сжатие извлечённых документов).' },
        diagram: { type: 'pipeline', title: 'Сжатие контекста', svgContent: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg"><defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#ac)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:11px;text-anchor:middle}</style><marker id="ac" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs><rect x="10" y="50" width="100" height="80" class="box"/><text x="60" y="85" class="text" style="font-weight:bold">10K</text><text x="60" y="105" class="text" style="font-size:10px">токенов</text><text x="60" y="120" class="text" style="font-size:9px;opacity:0.6">Исходный</text><rect x="160" y="60" width="120" height="60" class="box" style="fill:var(--diagram-fill2,#c8e6c9)"/><text x="220" y="85" class="text" style="font-weight:bold">Компрессор</text><text x="220" y="105" class="text" style="font-size:9px">Summarize / Filter</text><rect x="340" y="65" width="100" height="50" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="390" y="85" class="text" style="font-weight:bold">2K</text><text x="390" y="105" class="text" style="font-size:9px">токенов</text><line x1="110" y1="90" x2="160" y2="90" class="arrow"/><line x1="280" y1="90" x2="340" y2="90" class="arrow"/><text x="250" y="170" class="text" style="font-size:10px;opacity:0.6">80% сжатие — 95% информативности сохранено</text></svg>` },
        practicalExamples: [{ title: 'Сжатие истории диалога', description: 'Автоматическое сжатие длинной истории диалога перед отправкой в модель.', code: `function compressHistory(messages: Message[], maxTokens: number) {
  // 1. Удаляем устаревшие сообщения
  // 2. Сжимаем среднюю часть в саммари
  // 3. Оставляем последние сообщения как есть
  
  const recentCount = 4;
  const recent = messages.slice(-recentCount);
  const old = messages.slice(0, -recentCount);
  
  const summary = old.length > 0 
    ? summarize(old) // LLM-based summarization
    : '';
  
  return [summary, ...recent].slice(0, maxTokens);
}`, language: 'typescript' }],
        commonMistakes: [{ mistake: 'Слишком агрессивное сжатие', explanation: 'Если сжать слишком сильно, потеряется критически важная информация.', correctApproach: 'Тестируйте качество ответов после сжатия. Оставляйте запас по информативности.' }],
        furtherReading: [{ topic: 'Summarization', slug: 'summarization', categorySlug: 'context-engineering' }, { topic: 'Memory', slug: 'memory', categorySlug: 'context-engineering' }, { topic: 'RAG Retrieval', slug: 'retrieval', categorySlug: 'rag' }],
      },
      {
        slug: 'summarization',
        title: 'Summarization',
        categorySlug: 'context-engineering',
        introduction: { what: 'Summarization (суммаризация) — это процесс создания краткого изложения длинного текста с сохранением ключевой информации. В контексте LLM суммаризация используется как метод сжатия контекста: длинные тексты, истории диалогов или документы заменяются их краткими пересказами.', why: 'Суммаризация — самый универсальный метод сжатия контекста. Она позволяет сохранить суть длинного текста в компактной форме, экономя токены и улучшая фокус модели на ключевой информации.', where: 'Применяется для сжатия истории диалогов, обработки длинных документов, создания промежуточных саммари в агентных системах, подготовки контекста для RAG, генерации заголовков и аннотаций.', problem: 'Решает проблему нехватки контекстного окна: вместо того чтобы передавать модели полный текст, мы передаём его суть, экономя до 90% токенов при потере лишь 5-10% информативности.' },
        theory: { terms: [{ term: 'Extractive Summarization', definition: 'Суммаризация путём выбора наиболее важных предложений из оригинального текста без изменения формулировок' }, { term: 'Abstractive Summarization', definition: 'Суммаризация путём генерации нового текста, передающего суть оригинала — именно так работают LLM' }, { term: 'Map-Reduce Summarization', definition: 'Стратегия: разбить текст на части, просуммаризировать каждую, затем объединить саммари' }, { term: 'Rolling Summarization', definition: 'Постепенное обновление саммари по мере поступления новой информации' }], principles: 'LLM выполняют abstractive суммаризацию — они не просто копируют предложения, а переформулируют суть. Качество зависит от промпта: чем конкретнее указание на то, что важно, тем лучше саммари.\n\nДля текстов длиннее контекстного окна применяется Map-Reduce: текст разбивается на чанки, каждый чанк суммаризируется отдельно, затем саммари объединяются в финальное саммари. Этот метод можно применять рекурсивно для очень длинных текстов.', architecture: 'Пайплайн суммаризации: [Длинный текст] → [Разбиение (если нужно)] → [LLM Summarization] → [Финальное саммари]. Для диалогов: [История] → [Выборка ключевых моментов] → [Пересказ]. Критично: саммари должно содержать факты, решения и контекст, а не просто общие фразы.', connections: 'Summarization — ключевой инструмент Compression и Memory. В RAG используется для суммаризации извлечённых документов. В AI Agents — для сохранения «памяти» о выполненных шагах.' },
        diagram: { type: 'pipeline', title: 'Map-Reduce суммаризация', svgContent: `<svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg"><defs><style>.box{fill:var(--diagram-fill,#e8f5e9);stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;rx:8}.arrow{stroke:var(--diagram-stroke,#2e7d32);stroke-width:2;fill:none;marker-end:url(#as)}.text{fill:var(--diagram-text,#1a1a2e);font-family:system-ui;font-size:10px;text-anchor:middle}</style><marker id="as" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--diagram-stroke,#2e7d32)"/></marker></defs><rect x="10" y="90" width="80" height="50" class="box"/><text x="50" y="118" class="text" style="font-weight:bold">Чанк 1</text><rect x="10" y="150" width="80" height="50" class="box"/><text x="50" y="178" class="text" style="font-weight:bold">Чанк 2</text><rect x="10" y="30" width="80" height="50" class="box"/><text x="50" y="58" class="text" style="font-weight:bold">Чанк 3</text><rect x="170" y="30" width="80" height="50" class="box" style="fill:var(--diagram-fill2,#c8e6c9)"/><text x="210" y="58" class="text">Саммари 1</text><rect x="170" y="90" width="80" height="50" class="box" style="fill:var(--diagram-fill2,#c8e6c9)"/><text x="210" y="118" class="text">Саммари 2</text><rect x="170" y="150" width="80" height="50" class="box" style="fill:var(--diagram-fill2,#c8e6c9)"/><text x="210" y="178" class="text">Саммари 3</text><rect x="330" y="85" width="140" height="55" class="box" style="fill:var(--diagram-accent,#fff3e0);stroke:var(--diagram-accent-stroke,#e65100)"/><text x="400" y="108" class="text" style="font-weight:bold">Финальное</text><text x="400" y="125" class="text" style="font-weight:bold">Саммари</text><line x1="90" y1="55" x2="170" y2="55" class="arrow"/><line x1="90" y1="115" x2="170" y2="115" class="arrow"/><line x1="90" y1="175" x2="170" y2="175" class="arrow"/><line x1="250" y1="55" x2="330" y2="100" class="arrow"/><line x1="250" y1="115" x2="330" y2="112" class="arrow"/><line x1="250" y1="175" x2="330" y2="125" class="arrow"/></svg>` },
        practicalExamples: [{ title: 'Суммаризация истории диалога', description: 'Автоматическое создание краткого пересказа длинной истории диалога для экономии токенов.', code: `async function summarizeChat(messages: Message[]): Promise<string> {
  const prompt = \`Создай краткое саммари диалога, 
сохранив: 1) ключевые решения, 2) факты о пользователе, 
3) контекст текущей задачи.

Диалог:
\${messages.map(m => \`\${m.role}: \${m.content}\`).join('\\n')}

Саммари:\`;

  const response = await callLLM(prompt);
  return response;
}`, language: 'typescript' }],
        commonMistakes: [{ mistake: 'Потеря важных деталей при суммаризации', explanation: 'LLM может «обобщить» слишком сильно, потеряв критически важные конкретные факты и цифры.', correctApproach: 'Указывайте в промпте, что именно нужно сохранить: факты, цифры, имена, даты. Проверяйте качество саммари.' }],
        furtherReading: [{ topic: 'Compression', slug: 'compression', categorySlug: 'context-engineering' }, { topic: 'Memory', slug: 'memory', categorySlug: 'context-engineering' }, { topic: 'Chunking', slug: 'chunking', categorySlug: 'rag' }],
      },
    ],
  },
];

// Placeholder categories for remaining topics (to be expanded)
const placeholderCategories: TopicCategory[] = [
  { slug: 'mcp', title: 'MCP', description: 'Model Context Protocol — стандарт взаимодействия между LLM и внешними инструментами', icon: 'Plug', subtopics: [] },
  { slug: 'rag', title: 'RAG', description: 'Retrieval-Augmented Generation — обогащение ответов LLM внешними знаниями', icon: 'Database', subtopics: [] },
  { slug: 'ai-agents', title: 'AI Agents', description: 'Автономные системы на основе LLM для выполнения сложных задач', icon: 'Bot', subtopics: [] },
  { slug: 'local-ai', title: 'Local AI', description: 'Запуск и использование LLM локально на собственном оборудовании', icon: 'Laptop', subtopics: [] },
  { slug: 'production-ai', title: 'Production AI', description: 'Развертывание, мониторинг и оптимизация AI-систем в продакшене', icon: 'Rocket', subtopics: [] },
];

export const allTopics: TopicCategory[] = [...topics, ...placeholderCategories];
