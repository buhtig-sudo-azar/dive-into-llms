import { TopicCategory } from '@/types';
import { promptEngineering } from './topic-prompt-engineering';
import { contextEngineering } from './topic-context-engineering';
import { mcp } from './topic-mcp';
import { rag, aiAgents, localAI, productionAI } from './topic-remaining';

export const topics: TopicCategory[] = [
  {
    slug: 'llm-basics',
    title: 'Основы LLM',
    description: 'Фундаментальные концепции больших языковых моделей: от токенов до архитектуры Transformer',
    iconName: 'Brain',
    subtopics: [
      {
        slug: 'what-is-llm',
        title: 'Что такое LLM',
        categorySlug: 'llm-basics',
        introduction: {
          what: 'Large Language Model (LLM) — это тип нейронной сети, обученной на огромных объёмах текстовых данных для понимания и генерации естественного языка. LLM способна выполнять широкий спектр задач: от перевода и суммаризации до написания кода и творческого письма. Модели вроде GPT-4, Claude, Gemini и Llama — всё это примеры LLM.',
          why: 'LLM нужны потому, что они позволяют автоматизировать работу с текстом на уровне, сопоставимом с человеческим. До появления LLM каждая языковая задача требовала отдельной модели и обучающей выборки. Теперь одна модель может решать тысячи задач без дополнительного обучения, что радикально снижает порог входа в AI-разработку.',
          where: 'LLM используются повсеместно: чат-боты и виртуальные ассистенты, системы автоматического перевода, инструменты для написания кода (Copilot), аналитика документов, генерация контента, системы поддержки клиентов, образовательные платформы и даже в научных исследованиях для анализа данных.',
          problem: 'LLM решают фундаментальную проблему понимания неструктурированного текста. До LLM компьютеры могли обрабатывать только жёстко структурированные данные. LLM способны извлекать смысл из произвольного текста, отвечать на вопросы, делать выводы и генерировать новый осмысленный контент.',
        },
        theory: {
          terms: [
            { term: 'Параметры', definition: 'Числовые значения в нейронной сети, которые настраиваются в процессе обучения. Модели с миллиардами параметров способны улавливать более сложные закономерности языка.' },
            { term: 'Токен', definition: 'Минимальная единица текста, которую обрабатывает модель. Один токен может быть словом, частью слова или даже одним символом.' },
            { term: 'Контекстное окно', definition: 'Максимальное количество токенов, которое модель может обработать за один запрос. Определяет, сколько текста модель «помнит» в рамках одного диалога.' },
            { term: 'Температура', definition: 'Параметр, контролирующий случайность ответов. Низкая температура = более предсказуемые ответы, высокая = более креативные.' },
            { term: 'Fine-tuning', definition: 'Дополнительное обучение модели на специфичных данных для улучшения её работы в конкретной области.' },
            { term: 'Инференс', definition: 'Процесс использования обученной модели для генерации ответа на новый запрос.' },
          ],
          principles: 'LLM работает по принципу предсказания следующего токена. Модель получает последовательность токенов и вычисляет вероятности для каждого возможного следующего токена. Выбрав наиболее вероятный (или один из вероятных с учётом температуры), модель добавляет его к последовательности и повторяет процесс. Этот авторегрессионный подход позволяет генерировать связный текст произвольной длины. Качество генерации зависит от объёма обучающих данных, количества параметров и архитектуры модели. Современные LLM обучаются на триллионах токенов из интернета, книг, кода и других источников, что позволяет им накапливать обширные знания о мире.',
          architecture: 'В основе большинства современных LLM лежит архитектура Transformer, представленная в 2017 году. Её ключевой компонент — механизм внимания (attention), который позволяет модели учитывать отношения между всеми токенами в последовательности одновременно. Transformer состоит из стопки слоёв, каждый из которых содержит блок self-attention и полносвязную нейронную сеть. В LLM используется декодерная часть Transformer: модель читает входной текст слева направо и предсказывает следующий токен. Маска внимания не позволяет модели «заглядывать вперёд». Размер модели определяется количеством слоёв (глубина), размером скрытого представления (ширина) и количеством голов внимания.',
          connections: 'LLM тесно связаны с Prompt Engineering (искусством составления запросов), RAG (дополнением внешними данными), AI Agents (автономными системами на базе LLM) и MCP (протоколом подключения инструментов). LLM — это фундамент, на котором строятся все эти технологии.',
        },
        diagram: {
          type: 'architecture',
          title: 'Архитектура LLM',
          svgContent: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="380" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="40" text-anchor="middle" fill="var(--foreground)" font-size="16" font-weight="bold">Архитектура Large Language Model</text>
  <rect x="40" y="60" width="160" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="120" y="90" text-anchor="middle" fill="var(--foreground)" font-size="13">Входной текст</text>
  <rect x="40" y="130" width="160" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="120" y="160" text-anchor="middle" fill="var(--foreground)" font-size="13">Токенизация</text>
  <rect x="40" y="200" width="160" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.3" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="120" y="230" text-anchor="middle" fill="var(--foreground)" font-size="13">Embedding + Pos</text>
  <rect x="220" y="140" width="160" height="180" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="300" y="170" text-anchor="middle" fill="var(--foreground)" font-size="13" font-weight="bold">Transformer</text>
  <text x="300" y="195" text-anchor="middle" fill="var(--muted-foreground)" font-size="11">Self-Attention</text>
  <text x="300" y="215" text-anchor="middle" fill="var(--muted-foreground)" font-size="11">Feed-Forward</text>
  <text x="300" y="235" text-anchor="middle" fill="var(--muted-foreground)" font-size="11">Layer Norm</text>
  <text x="300" y="255" text-anchor="middle" fill="var(--muted-foreground)" font-size="11">× N слоёв</text>
  <text x="300" y="275" text-anchor="middle" fill="var(--muted-foreground)" font-size="11">Residual</text>
  <rect x="400" y="200" width="160" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="480" y="225" text-anchor="middle" fill="var(--foreground)" font-size="13">LM Head</text>
  <rect x="400" y="270" width="160" height="50" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.3" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="480" y="300" text-anchor="middle" fill="var(--foreground)" font-size="13">Softmax</text>
  <rect x="400" y="340" width="160" height="40" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="480" y="365" text-anchor="middle" fill="var(--foreground)" font-size="13">Следующий токен</text>
  <line x1="120" y1="110" x2="120" y2="130" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="120" y1="180" x2="120" y2="200" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="200" y1="225" x2="220" y2="225" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="380" y1="225" x2="400" y2="225" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="480" y1="250" x2="480" y2="270" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="480" y1="320" x2="480" y2="340" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arrow)"/>
  <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)"/></marker></defs>
</svg>`,
        },
        practicalExamples: [
          {
            title: 'Запрос к GPT через API',
            description: 'Простейший пример вызова LLM через OpenAI API для генерации ответа на вопрос.',
            code: `import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'Ты полезный ассистент.' },
    { role: 'user', content: 'Объясни, что такое LLM простыми словами' }
  ],
  temperature: 0.7,
});

console.log(response.choices[0].message.content);`,
            language: 'typescript',
          },
          {
            title: 'Использование OpenRouter для доступа к разным моделям',
            description: 'OpenRouter позволяет обращаться к множеству LLM через единый API, что упрощает сравнение и переключение между моделями.',
            code: `const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/gemma-4-31b-it:free',
    messages: [
      { role: 'user', content: 'Привет! Расскажи о себе.' }
    ]
  })
});`,
            language: 'typescript',
          },
          {
            title: 'Подсчёт токенов перед отправкой',
            description: 'Важно понимать, сколько токенов занимает ваш запрос, чтобы не превысить лимит контекстного окна модели.',
            code: `import { encoding_for_model } from 'tiktoken';

const enc = encoding_for_model('gpt-4');
const text = 'Привет, как дела? Это тестовое сообщение.';
const tokens = enc.encode(text);

console.log(\`Количество токенов: \${tokens.length}\`);
// Каждый токен — это число, представляющее фрагмент текста
console.log('Токены:', tokens);

enc.free(); // Освобождаем ресурсы`,
            language: 'typescript',
          },
        ],
        sandboxes: [
          {
            type: 'prompt-playground',
            title: 'Попробуйте запрос к LLM',
            description: 'Введите любой запрос и получите ответ от реальной языковой модели. Поменяйте системный промпт, чтобы увидеть, как меняется поведение модели.',
            defaultPrompt: 'Объясни, что такое LLM простыми словами',
            defaultSystem: 'Ты полезный ассистент. Отвечай кратко и понятно.',
          },
        ],
        commonMistakes: [
          {
            mistake: 'Считать, что LLM «понимает» текст как человек',
            explanation: 'LLM не обладает сознанием или пониманием в человеческом смысле. Она оперирует статистическими закономерностями в данных, на которых была обучена. Модель не «думает», а вычисляет наиболее вероятное продолжение последовательности токенов.',
            correctApproach: 'Рассматривайте LLM как мощный статистический инструмент. Она отлично справляется с паттернами, но может галлюцинировать — генерировать убедительно звучащий, но неверный контент. Всегда проверяйте критически важную информацию.',
          },
          {
            mistake: 'Игнорировать лимит контекстного окна',
            explanation: 'Многие новички пытаются отправить в модель слишком длинный текст, превышающий контекстное окно. Это приводит к обрезке входных данных или ошибке API.',
            correctApproach: 'Всегда проверяйте количество токенов в вашем запросе перед отправкой. Используйте tiktoken или аналогичные библиотеки для подсчёта. При необходимости разбивайте длинные тексты на части или используйте RAG для выборки релевантных фрагментов.',
          },
          {
            mistake: 'Использовать высокую температуру для фактических ответов',
            explanation: 'Высокая температура (0.8-1.0) увеличивает случайность, что хорошо для креативных задач, но приводит к неточностям в фактических ответах, коде и аналитике.',
            correctApproach: 'Для фактических вопросов, написания кода и аналитических задач используйте температуру 0.0-0.3. Для творческого письма, мозгового штурма и генерации идей — 0.7-1.0.',
          },
          {
            mistake: 'Не указывать системный промпт',
            explanation: 'Без системного промпта модель не знает, в какой роли она выступает, что приводит к расплывчатым и непоследовательным ответам.',
            correctApproach: 'Всегда задавайте системный промпт, определяющий роль, тон, формат и ограничения ответа. Это самый мощный инструмент для управления поведением LLM.',
          },
        ],
        furtherReading: [
          { topic: 'Как работают токены', slug: 'tokens', categorySlug: 'llm-basics' },
          { topic: 'Контекстное окно', slug: 'context-window', categorySlug: 'llm-basics' },
          { topic: 'Архитектура Transformer', slug: 'transformer', categorySlug: 'llm-basics' },
          { topic: 'Prompt Engineering', slug: 'zero-shot', categorySlug: 'prompt-engineering' },
        ],
      },
      {
        slug: 'tokens',
        title: 'Как работают токены',
        categorySlug: 'llm-basics',
        introduction: {
          what: 'Токенизация — это процесс разбиения текста на минимальные единицы (токены), которые модель может обрабатывать численно. Токен может быть целым словом, частью слова, слогом или даже одиночным символом. LLM не работает с текстом напрямую — она работает с числовыми представлениями токенов.',
          why: 'Токенизация необходима, потому что нейронные сети оперируют числами, а не символами. Без токенизации невозможно подать текст на вход модели. Качество токенизации напрямую влияет на эффективность модели: чем лучше токенизатор, тем меньше токенов требуется для представления текста, и тем больше информации помещается в контекстное окно.',
          where: 'Токенизация используется при каждом взаимодействии с LLM: когда вы отправляете запрос, текст токенизируется перед подачей в модель; когда модель генерирует ответ, токены детокенизируются обратно в текст. Все API LLM тарифицируются по количеству токенов.',
          problem: 'Токенизация решает проблему представления произвольного текста в числовой форме, понятной нейронной сети. Без токенизации модель не могла бы обрабатывать текст переменной длины, работать с разными языками или оценивать стоимость обработки запроса.',
        },
        theory: {
          terms: [
            { term: 'BPE (Byte Pair Encoding)', definition: 'Алгоритм токенизации, который итеративно объединяет наиболее частые пары байтов. Используется в GPT-моделях.' },
            { term: 'Vocabulary', definition: 'Словарь всех возможных токенов, которые модель распознаёт. Типичный размер словаря — 30 000–100 000 токенов.' },
            { term: 'Token ID', definition: 'Уникальный числовой идентификатор каждого токена в словаре модели. Именно эти числа подаются на вход нейронной сети.' },
            { term: 'Специальные токены', definition: 'Зарезервированные токены вроде <BOS>, <EOS>, <PAD>, которые обозначают начало, конец последовательности и заполнение.' },
            { term: 'Subword tokenization', definition: 'Подход, при котором редкие слова разбиваются на более мелкие подслова. Балансирует между посимвольной и пословной токенизацией.' },
          ],
          principles: 'Токенизация работает по принципу поиска оптимального разбиения текста на фрагменты из словаря модели. Алгоритм BPE начинает с посимвольного представления и итеративно объединяет наиболее часто встречающиеся пары. Например, «неделя» может быть одним токеном, а «сверхдержава» — тремя: «сверх», «дер», «жава». Английский текст обычно токенизируется эффективнее: 1 токен ≈ 4 символа. Русский текст менее эффективен: 1 токен ≈ 2-3 символа из-за меньшего представления в обучающих данных.',
          architecture: 'Токенизатор — это отдельный компонент конвейера LLM, обучаемый перед обучением основной модели. Сначала на корпусе текстов подсчитываются частоты всех пар символов. Затем итеративно объединяются самые частые пары, пока словарь не достигнет заданного размера. При инференсе текст обрабатывается жадным алгоритмом: токенизатор ищет самое длинное совпадение в словаре слева направо. Результат — последовательность целых чисел (Token ID), которая подаётся на embedding-слой модели.',
          connections: 'Токенизация напрямую связана с контекстным окном (количество токенов ограничено), влияет на стоимость API (оплата за токены), определяет эффективность RAG (чем больше токенов занимает документ, тем меньше документов можно обработать) и влияет на качество Prompt Engineering (оптимальная формулировка экономит токены).',
        },
        diagram: {
          type: 'pipeline',
          title: 'Конвейер токенизации',
          svgContent: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="280" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Конвейер токенизации BPE</text>
  <rect x="30" y="60" width="130" height="45" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="95" y="78" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Исходный текст</text>
  <text x="95" y="95" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">"Hello world"</text>
  <rect x="195" y="60" width="130" height="45" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.25" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="260" y="78" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">BPE Tokenizer</text>
  <text x="260" y="95" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Словарь + алгоритм</text>
  <rect x="360" y="60" width="100" height="45" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="410" y="78" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Token IDs</text>
  <text x="410" y="95" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">[15496, 995]</text>
  <rect x="490" y="60" width="80" height="45" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.3" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="530" y="78" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Embedding</text>
  <text x="530" y="95" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Векторы</text>
  <line x1="160" y1="82" x2="195" y2="82" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arr2)"/>
  <line x1="325" y1="82" x2="360" y2="82" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arr2)"/>
  <line x1="460" y1="82" x2="490" y2="82" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arr2)"/>
  <rect x="30" y="130" width="540" height="60" rx="8" fill="var(--muted)" opacity="0.5"/>
  <text x="300" y="155" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Примеры токенизации</text>
  <text x="300" y="175" text-anchor="middle" fill="var(--muted-foreground)" font-size="11">"неделя" → [неделя] (1 токен) | "сверхдержава" → [сверх, дер, жава] (3 токена)</text>
  <rect x="30" y="210" width="260" height="65" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.1" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="160" y="235" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Английский: ~4 символа/токен</text>
  <text x="160" y="255" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">"Hello world" = 2 токена</text>
  <rect x="310" y="210" width="260" height="65" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="440" y="235" text-anchor="middle" fill="var(--foreground)" font-size="11" font-weight="bold">Русский: ~2-3 символа/токен</text>
  <text x="440" y="255" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">"Привет мир" = 3-4 токена</text>
  <defs><marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)"/></marker></defs>
</svg>`,
        },
        practicalExamples: [
          {
            title: 'Подсчёт токенов с помощью tiktoken',
            description: 'Библиотека tiktoken от OpenAI позволяет точно подсчитать количество токенов для моделей GPT.',
            code: `import { encoding_for_model } from 'tiktoken';

const enc = encoding_for_model('gpt-4');

const russianText = 'Привет! Как у тебя дела сегодня?';
const englishText = 'Hello! How are you doing today?';

console.log('Русский:', enc.encode(russianText).length, 'токенов');
console.log('Английский:', enc.encode(englishText).length, 'токенов');

enc.free();`,
            language: 'typescript',
          },
          {
            title: 'Оценка стоимости API-запроса',
            description: 'Расчёт стоимости запроса к LLM API на основе количества токенов.',
            code: `function estimateCost(inputTokens: number, outputTokens: number, 
                model: string): number {
  const prices: Record<string, { input: number; output: number }> = {
    'gpt-4': { input: 0.03 / 1000, output: 0.06 / 1000 },
    'gpt-4-turbo': { input: 0.01 / 1000, output: 0.03 / 1000 },
    'gpt-3.5-turbo': { input: 0.0005 / 1000, output: 0.0015 / 1000 },
  };
  
  const price = prices[model];
  if (!price) throw new Error(\`Неизвестная модель: \${model}\`);
  
  return inputTokens * price.input + outputTokens * price.output;
}

// Пример: 500 входных + 200 выходных токенов на GPT-4
const cost = estimateCost(500, 200, 'gpt-4');
console.log(\`Стоимость: $\${cost.toFixed(4)}\`);`,
            language: 'typescript',
          },
        ],
        sandboxes: [
          {
            type: 'tokenizer',
            title: 'Попробуйте токенизацию',
            description: 'Введите текст и увидите, как он разбивается на токены. Попробуйте русский и английский текст, чтобы увидеть разницу.',
            defaultPrompt: 'Привет! Как у тебя дела сегодня? Hello world!',
          },
        ],
        commonMistakes: [
          {
            mistake: 'Считать, что 1 слово = 1 токен',
            explanation: 'Это распространённое заблуждение. В английском 1 токен ≈ 0.75 слова, а в русском 1 токен может быть частью слова. Слово «информатика» может разбиться на 2-3 токена.',
            correctApproach: 'Используйте tiktoken или токенайзер модели для точного подсчёта. Для оценки: английский текст ≈ 1.3 токена на слово, русский ≈ 2-3 токена на слово.',
          },
          {
            mistake: 'Не учитывать токены системного промпта',
            explanation: 'Системный промпт тоже состоит из токенов и занимает часть контекстного окна. Длинный системный промпт может «съесть» значительную часть доступного контекста.',
            correctApproach: 'Всегда включайте системный промпт в расчёт общего количества токенов. Оптимизируйте системный промпт — делайте его кратким, но точным.',
          },
        ],
        furtherReading: [
          { topic: 'Контекстное окно', slug: 'context-window', categorySlug: 'llm-basics' },
          { topic: 'Архитектура Transformer', slug: 'transformer', categorySlug: 'llm-basics' },
          { topic: 'Prompt Engineering', slug: 'zero-shot', categorySlug: 'prompt-engineering' },
        ],
      },
      {
        slug: 'context-window',
        title: 'Контекстное окно',
        categorySlug: 'llm-basics',
        introduction: {
          what: 'Контекстное окно (context window) — это максимальное количество токенов, которое LLM может обработать за один запрос. Оно включает как входной текст (промпт), так и выходной (генерируемый ответ). Это фундаментальное ограничение архитектуры Transformer, определяющее, сколько информации модель может «держать в голове» одновременно.',
          why: 'Контекстное окно критически важно, потому что оно определяет возможности модели по работе с длинными текстами. Маленькое окно ограничивает модель короткими диалогами и документами. Большое окно позволяет анализировать целые книги, длинные кодовые базы и вести протяжённые диалоги без потери контекста.',
          where: 'Ограничения контекстного окна влияют на все сценарии использования LLM: чат-боты (длина истории диалога), анализ документов (размер обрабатываемого файла), RAG-системы (количество извлекаемых фрагментов), код-ассистенты (размер кодового контекста).',
          problem: 'Контекстное окно решает проблему «памяти» модели. Без него модель не могла бы учитывать предыдущий текст при генерации следующего. Однако квадратичная сложность self-attention делает обработку очень длинных контекстов вычислительно дорогой, что и приводит к ограничению.',
        },
        theory: {
          terms: [
            { term: 'Context Length', definition: 'Максимальное количество токенов в одной последовательности, которую может обработать модель. GPT-4: 128K, Claude 3: 200K, Gemini: 1M.' },
            { term: 'KV Cache', definition: 'Кэш ключей и значений внимания, позволяющий не пересчитывать предыдущие токены при генерации нового. Занимает значительную часть GPU-памяти.' },
            { term: 'Sliding Window Attention', definition: 'Техника, при которой каждый токен обращается только к ограниченному числу предыдущих токенов, а не ко всем. Снижает сложность с O(n²) до O(n·w).' },
            { term: 'Context Overflow', definition: 'Ситуация, когда суммарное количество токенов запроса и ожидаемого ответа превышает контекстное окно модели.' },
            { term: 'RoPE (Rotary Position Embedding)', definition: 'Метод кодирования позиции токена, позволяющий модели экстраполировать на более длинные последовательности, чем при обучении.' },
          ],
          principles: 'Контекстное окно ограничено вычислительной сложностью механизма self-attention: для последовательности длины n каждый токен должен вычислить внимание ко всем n токенам, что даёт O(n²) операций. С ростом длины контекста требования к памяти и вычислениям растут квадратично. Современные модели используют различные техники для расширения эффективного контекста: Grouped Query Attention снижает нагрузку на KV Cache, а Ring Attention позволяет распределять обработку длинного контекста между несколькими GPU.',
          architecture: 'Размер контекстного окна определяется на этапе проектирования модели и фиксируется при обучении. Он зависит от размера KV Cache (который хранит промежуточные вычисления внимания) и доступной GPU-памяти. При инференсе модель выделяет память под KV Cache пропорционально длине входного текста. По мере генерации ответа кэш растёт, и при приближении к лимиту модель должна остановить генерацию или обрезать начало контекста.',
          connections: 'Контекстное окно напрямую связано с RAG (выборка фрагментов вместо загрузки всего документа), Context Engineering (оптимизация использования доступного контекста), Prompt Engineering (компактные формулировки) и Local AI (ограничения GPU-памяти при локальном запуске).',
        },
        diagram: {
          type: 'comparison',
          title: 'Сравнение контекстных окон моделей',
          svgContent: `<svg viewBox="0 0 600 350" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="330" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Контекстные окна популярных LLM</text>
  <text x="80" y="75" fill="var(--muted-foreground)" font-size="11">GPT-3.5</text>
  <rect x="160" y="62" width="60" height="20" rx="4" fill="oklch(0.55 0.15 165)" opacity="0.3"/>
  <text x="190" y="77" text-anchor="middle" fill="var(--foreground)" font-size="10">4K</text>
  <text x="80" y="110" fill="var(--muted-foreground)" font-size="11">GPT-4</text>
  <rect x="160" y="97" width="240" height="20" rx="4" fill="oklch(0.55 0.15 165)" opacity="0.4"/>
  <text x="280" y="112" text-anchor="middle" fill="var(--foreground)" font-size="10">128K</text>
  <text x="80" y="145" fill="var(--muted-foreground)" font-size="11">Claude 3</text>
  <rect x="160" y="132" width="320" height="20" rx="4" fill="oklch(0.55 0.15 165)" opacity="0.5"/>
  <text x="320" y="147" text-anchor="middle" fill="var(--foreground)" font-size="10">200K</text>
  <text x="80" y="180" fill="var(--muted-foreground)" font-size="11">Gemini</text>
  <rect x="160" y="167" width="420" height="20" rx="4" fill="oklch(0.55 0.15 165)" opacity="0.6"/>
  <text x="370" y="182" text-anchor="middle" fill="var(--foreground)" font-size="10">1M</text>
  <text x="300" y="220" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Стратегии работы с ограничениями</text>
  <rect x="30" y="235" width="130" height="40" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="95" y="258" text-anchor="middle" fill="var(--foreground)" font-size="10">RAG: выбрать нужное</text>
  <rect x="170" y="235" width="130" height="40" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="235" y="258" text-anchor="middle" fill="var(--foreground)" font-size="10">Суммаризация</text>
  <rect x="310" y="235" width="130" height="40" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="375" y="258" text-anchor="middle" fill="var(--foreground)" font-size="10">Sliding Window</text>
  <rect x="450" y="235" width="120" height="40" rx="6" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1"/>
  <text x="510" y="258" text-anchor="middle" fill="var(--foreground)" font-size="10">Компрессия</text>
  <rect x="30" y="290" width="540" height="35" rx="6" fill="var(--muted)" opacity="0.5"/>
  <text x="300" y="312" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Пример: 128K токенов ≈ 300 страниц текста ≈ 1 книга</text>
</svg>`,
        },
        practicalExamples: [
          {
            title: 'Управление историей диалога',
            description: 'При длинном диалоге необходимо управлять контекстным окном, чтобы не превысить лимит модели.',
            code: `interface Message { role: string; content: string; }

function trimConversation(messages: Message[], maxTokens: number, 
                          tokenizer: (text: string) => number): Message[] {
  let totalTokens = 0;
  const result: Message[] = [];
  
  // Системный промпт всегда первый
  if (messages[0]?.role === 'system') {
    totalTokens += tokenizer(messages[0].content);
    result.push(messages[0]);
  }
  
  // Добавляем сообщения с конца, пока не превысим лимит
  for (let i = messages.length - 1; i >= 1; i--) {
    const tokens = tokenizer(messages[i].content);
    if (totalTokens + tokens > maxTokens * 0.8) break; // 80% лимита
    totalTokens += tokens;
    result.splice(1, 0, messages[i]); // Вставляем после system
  }
  
  return result;
}`,
            language: 'typescript',
          },
        ],
        sandboxes: [
          {
            type: 'temperature',
            title: 'Как температура влияет на ответы',
            description: 'Попробуйте один и тот же запрос при разной температуре и сравните результаты. Низкая температура — точные ответы, высокая — креативные.',
            defaultPrompt: 'Напиши короткую историю о роботе',
            defaultTemperature: 0.7,
          },
        ],
        commonMistakes: [
          {
            mistake: 'Не обрезать историю диалога',
            explanation: 'Если не управлять историей, диалог быстро превысит контекстное окно, и API вернёт ошибку или молча обрежет начало.',
            correctApproach: 'Реализуйте стратегию обрезки: удаляйте старые сообщения, суммаризируйте историю или используйте скользящее окно. Оставляйте системный промпт и последние N сообщений.',
          },
          {
            mistake: 'Загружать весь документ в контекст',
            explanation: 'Для анализа большого документа некоторые пытаются загрузить весь текст в промпт. Это неэффективно и часто превышает лимит.',
            correctApproach: 'Используйте RAG: разбейте документ на фрагменты, найдите релевантные через векторный поиск и подайте только их в контекст модели.',
          },
        ],
        furtherReading: [
          { topic: 'Архитектура Transformer', slug: 'transformer', categorySlug: 'llm-basics' },
          { topic: 'RAG — Embeddings', slug: 'embeddings', categorySlug: 'rag' },
          { topic: 'Context Engineering', slug: 'context', categorySlug: 'context-engineering' },
        ],
      },
      {
        slug: 'transformer',
        title: 'Архитектура Transformer',
        categorySlug: 'llm-basics',
        introduction: {
          what: 'Transformer — это архитектура нейронной сети, представленная в 2017 году в статье «Attention Is All You Need». Она произвела революцию в обработке естественного языка и стала основой для всех современных LLM: GPT, BERT, Llama, Claude и других. Ключевая инновация — механизм self-attention, позволяющий модели учитывать взаимосвязи между всеми элементами последовательности одновременно.',
          why: 'До Transformer модели обрабатывали текст последовательно (RNN/LSTM), что было медленно и не позволяло улавливать дальние связи в тексте. Transformer решает обе проблемы: параллельная обработка делает обучение быстрым, а attention позволяет каждому токену «видеть» все остальные токены в последовательности.',
          where: 'Transformer используется не только в NLP, но и в компьютерном зрении (ViT), генерации изображений (DiT), аудио, видео и даже в биологии (AlphaFold). В мире LLM это де-факто стандарт — все современные языковые модели построены на Transformer.',
          problem: 'Transformer решает проблему параллелизма при обработке последовательностей. RNN обрабатывали токены по одному, что делало обучение на длинных текстах непрактичным. Transformer обрабатывает все токены одновременно, что позволяет эффективно использовать GPU и обучать модели на триллионах токенов.',
        },
        theory: {
          terms: [
            { term: 'Self-Attention', definition: 'Механизм, вычисляющий «внимание» каждого токена ко всем остальным. Позволяет модели понимать, какие слова в предложении связаны друг с другом, даже если они стоят далеко.' },
            { term: 'Multi-Head Attention', definition: 'Несколько параллельных attention-голов, каждая из которых изучает разные типы связей. Например, одна голова отслеживает синтаксис, другая — семантику.' },
            { term: 'Positional Encoding', definition: 'Добавление информации о позиции токена к его embedding, поскольку Transformer не имеет встроенного понимания порядка элементов.' },
            { term: 'Feed-Forward Network', definition: 'Полносвязная нейронная сеть, применяемая к каждому токену отдельно после attention. Состоит из двух линейных слоёв с ReLU/GELU между ними.' },
            { term: 'Layer Normalization', definition: 'Нормализация активаций в каждом слое, стабилизирующая обучение. В современных моделях применяется Pre-Norm вариант (нормализация до attention).' },
            { term: 'Residual Connection', definition: 'Добавление входа слоя к его выходу (x + F(x)). Упрощает обучение глубоких сетей, обеспечивая прямой путь для градиента.' },
          ],
          principles: 'Transformer работает следующим образом: входная последовательность токенов проходит через embedding-слой, преобразуясь в векторы. К ним добавляются позиционные кодировки. Затем данные проходят через N одинаковых слоёв, каждый из которых содержит блок multi-head self-attention и feed-forward сеть с residual connections и layer normalization. В декодерных моделях (GPT) применяется маска, не позволяющая токенам «заглядывать вперёд». Выход последнего слоя проецируется через LM Head на словарь с softmax для получения вероятностей следующего токена.',
          architecture: 'Архитектура Transformer-декодера (используемая в GPT): вход → token embedding + positional encoding → N × [masked self-attention → add & norm → feed-forward → add & norm] → linear projection → softmax. Ключевые размеры: d_model (размерность скрытого состояния, обычно 768-12288), n_heads (количество голов внимания, 12-96), d_ff (размерность feed-forward, обычно 4×d_model). Количество слоёв варьируется от 12 (GPT-2) до 96+ (GPT-4). Общее количество параметров ≈ d_model² × 12 × n_layers.',
          connections: 'Transformer — фундамент для всех тем этого курса. Prompt Engineering управляет входом Transformer, RAG расширяет его контекст внешними данными, AI Agents используют Transformer для планирования и рассуждений, а MCP подключает к Transformer внешние инструменты.',
        },
        diagram: {
          type: 'architecture',
          title: 'Блок Transformer-декодера',
          svgContent: `<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="430" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Блок Transformer-декодера</text>
  <rect x="170" y="55" width="260" height="40" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.15" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="80" text-anchor="middle" fill="var(--foreground)" font-size="12">Input Embedding + Pos Enc</text>
  <rect x="170" y="110" width="260" height="35" rx="6" fill="var(--muted)" opacity="0.6" stroke="var(--border)" stroke-width="1"/>
  <text x="300" y="133" text-anchor="middle" fill="var(--foreground)" font-size="11">Layer Norm</text>
  <rect x="100" y="160" width="400" height="50" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.2" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <text x="300" y="183" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Masked Multi-Head Self-Attention</text>
  <text x="300" y="200" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Q, K, V проекции → Scaled Dot-Product → Concat → Linear</text>
  <rect x="170" y="225" width="260" height="30" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="300" y="245" text-anchor="middle" fill="var(--foreground)" font-size="11">Residual + Add & Norm</text>
  <rect x="170" y="270" width="260" height="35" rx="6" fill="var(--muted)" opacity="0.6" stroke="var(--border)" stroke-width="1"/>
  <text x="300" y="293" text-anchor="middle" fill="var(--foreground)" font-size="11">Layer Norm</text>
  <rect x="100" y="320" width="400" height="45" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.25" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <text x="300" y="345" text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="bold">Feed-Forward Network</text>
  <text x="300" y="360" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Linear → GELU → Linear (4x expansion)</text>
  <rect x="170" y="380" width="260" height="30" rx="6" fill="oklch(0.55 0.15 165)" opacity="0.2" stroke="oklch(0.55 0.15 165)" stroke-width="1"/>
  <text x="300" y="400" text-anchor="middle" fill="var(--foreground)" font-size="11">Residual + Add & Norm</text>
  <rect x="40" y="160" width="45" height="250" rx="4" fill="none" stroke="var(--muted-foreground)" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="62" y="290" text-anchor="middle" fill="var(--muted-foreground)" font-size="9" transform="rotate(-90 62 290)">× N слоёв</text>
  <line x1="300" y1="95" x2="300" y2="110" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arr3)"/>
  <line x1="300" y1="145" x2="300" y2="160" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arr3)"/>
  <line x1="300" y1="210" x2="300" y2="225" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arr3)"/>
  <line x1="300" y1="255" x2="300" y2="270" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arr3)"/>
  <line x1="300" y1="305" x2="300" y2="320" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arr3)"/>
  <line x1="300" y1="365" x2="300" y2="380" stroke="var(--muted-foreground)" stroke-width="1.5" marker-end="url(#arr3)"/>
  <text x="300" y="430" text-anchor="middle" fill="var(--muted-foreground)" font-size="10">Выход → LM Head → Softmax → Вероятности токенов</text>
  <defs><marker id="arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)"/></marker></defs>
</svg>`,
        },
        practicalExamples: [
          {
            title: 'Визуализация внимания',
            description: 'Пример того, как механизм attention определяет связи между словами в предложении.',
            code: `// Упрощённая реализация Self-Attention
function selfAttention(Q: number[][], K: number[][], V: number[][]) {
  const d_k = K[0].length;
  
  // Q × K^T / sqrt(d_k)
  const scores = matMul(Q, transpose(K))
    .map(row => row.map(val => val / Math.sqrt(d_k)));
  
  // Softmax по строкам
  const attention = scores.map(row => softmax(row));
  
  // Attention × V
  const output = matMul(attention, V);
  
  return { output, attention };
}

// Результат attention показывает, какие токены
// "внимают" друг другу:
// "Кот сидит на ковре, он его любит"
//   ↑                    ↑  ↑
//   └── attention ───────┘  └── "он" → "кот"
//                          "его" → "ковёр"`,
            language: 'typescript',
          },
        ],
        sandboxes: [
          {
            type: 'prompt-playground',
            title: 'Спросите про Transformer',
            description: 'Задайте вопрос про архитектуру Transformer и механизм внимания, и получите ответ от AI.',
            defaultPrompt: 'Как работает механизм self-attention в Transformer?',
            defaultSystem: 'Ты эксперт по архитектуре нейронных сетей. Объясняй Transformer, attention и механизмы обучения просто и точно.',
          },
        ],
        commonMistakes: [
          {
            mistake: 'Путать encoder и decoder Transformer',
            explanation: 'Оригинальный Transformer имел encoder и decoder. BERT использует только encoder (двунаправленный), а GPT — только decoder (авторегрессионный с маской). Они работают по-разному.',
            correctApproach: 'Для генерации текста используется decoder (GPT-style). Для классификации и поиска — encoder (BERT-style). Понимайте разницу: encoder видит весь текст, decoder — только левую часть.',
          },
          {
            mistake: 'Думать, что больше слоёв = лучше',
            explanation: 'Больше слоёв не всегда лучше. Слишком глубокая модель может переобучиться, требовать экспоненциально больше ресурсов и страдать от затухания градиентов.',
            correctApproach: 'Оптимальная глубина зависит от задачи и объёма данных. Современные модели используют 32-96 слоёв, но с residual connections, layer norm и правильной инициализацией.',
          },
        ],
        furtherReading: [
          { topic: 'Что такое LLM', slug: 'what-is-llm', categorySlug: 'llm-basics' },
          { topic: 'Как работают токены', slug: 'tokens', categorySlug: 'llm-basics' },
          { topic: 'Prompt Engineering — Zero-shot', slug: 'zero-shot', categorySlug: 'prompt-engineering' },
        ],
      },
    ],
  },
  promptEngineering,
  contextEngineering,
  mcp,
  rag,
  aiAgents,
  localAI,
  productionAI,
];
