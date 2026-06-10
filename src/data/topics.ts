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
          svgContent: `<svg viewBox="0 0 600 530" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="510" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Архитектура LLM</text>
  <!-- Шаг 1 -->
  <rect x="30" y="55" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="82" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="87" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="77" fill="var(--foreground)" font-size="12" font-weight="bold">Входной текст</text>
  <text x="80" y="95" fill="var(--muted-foreground)" font-size="10">Пользователь отправляет запрос в виде текста</text>
  <!-- Connector -->
  <line x1="55" y1="110" x2="55" y2="125" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 2 -->
  <rect x="30" y="125" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="152" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="157" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="147" fill="var(--foreground)" font-size="12" font-weight="bold">Токенизация</text>
  <text x="80" y="165" fill="var(--muted-foreground)" font-size="10">Текст разбивается на токены (числовые ID из словаря)</text>
  <!-- Connector -->
  <line x1="55" y1="180" x2="55" y2="195" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 3 -->
  <rect x="30" y="195" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="222" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="227" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="217" fill="var(--foreground)" font-size="12" font-weight="bold">Embedding + Позиция</text>
  <text x="80" y="235" fill="var(--muted-foreground)" font-size="10">Токены превращаются в векторы + позиционное кодирование</text>
  <!-- Connector -->
  <line x1="55" y1="250" x2="55" y2="265" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 4 -->
  <rect x="30" y="265" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="292" r="14" fill="oklch(0.75 0.15 75)" opacity="0.25"/>
  <text x="55" y="297" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="287" fill="var(--foreground)" font-size="12" font-weight="bold">Transformer (N слоёв)</text>
  <text x="80" y="305" fill="var(--muted-foreground)" font-size="10">Self-Attention + Feed-Forward + Layer Norm × N слоёв с residual связями</text>
  <!-- Connector -->
  <line x1="55" y1="320" x2="55" y2="335" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 5 -->
  <rect x="30" y="335" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="362" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="367" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">5</text>
  <text x="80" y="357" fill="var(--foreground)" font-size="12" font-weight="bold">LM Head + Softmax</text>
  <text x="80" y="375" fill="var(--muted-foreground)" font-size="10">Превращение в вероятности следующего токена</text>
  <!-- Connector -->
  <line x1="55" y1="390" x2="55" y2="405" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 6 -->
  <rect x="30" y="405" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="432" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="437" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">6</text>
  <text x="80" y="427" fill="var(--foreground)" font-size="12" font-weight="bold">Генерация токена</text>
  <text x="80" y="445" fill="var(--muted-foreground)" font-size="10">Выбор наиболее вероятного следующего токена</text>
  <!-- Bottom insight -->
  <rect x="30" y="475" width="540" height="40" rx="6" fill="var(--muted)" opacity="0.3"/>
  <text x="300" y="500" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">LLM = авторегрессионная модель, предсказывающая следующий токен шаг за шагом</text>
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
          svgContent: `<svg viewBox="0 0 600 390" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="370" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Конвейер токенизации</text>
  <!-- Шаг 1 -->
  <rect x="30" y="55" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="82" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="87" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="77" fill="var(--foreground)" font-size="12" font-weight="bold">Исходный текст</text>
  <text x="80" y="95" fill="var(--muted-foreground)" font-size="10">"Hello world" или "Привет мир"</text>
  <!-- Connector -->
  <line x1="55" y1="110" x2="55" y2="125" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 2 -->
  <rect x="30" y="125" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="152" r="14" fill="oklch(0.75 0.15 75)" opacity="0.25"/>
  <text x="55" y="157" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="147" fill="var(--foreground)" font-size="12" font-weight="bold">BPE алгоритм</text>
  <text x="80" y="165" fill="var(--muted-foreground)" font-size="10">Итеративное объединение частых пар байтов по словарю</text>
  <!-- Connector -->
  <line x1="55" y1="180" x2="55" y2="195" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 3 -->
  <rect x="30" y="195" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="222" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="227" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="217" fill="var(--foreground)" font-size="12" font-weight="bold">Token IDs</text>
  <text x="80" y="235" fill="var(--muted-foreground)" font-size="10">[15496, 995] — числовые идентификаторы из словаря</text>
  <!-- Connector -->
  <line x1="55" y1="250" x2="55" y2="265" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 4 -->
  <rect x="30" y="265" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="292" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="297" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="287" fill="var(--foreground)" font-size="12" font-weight="bold">Векторизация</text>
  <text x="80" y="305" fill="var(--muted-foreground)" font-size="10">Token IDs превращаются в Embedding vectors для подачи в модель</text>
  <!-- Bottom insight -->
  <rect x="30" y="335" width="540" height="40" rx="6" fill="var(--muted)" opacity="0.3"/>
  <text x="300" y="360" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Английский ~4 символа/токен, русский ~2-3 символа/токен</text>
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
          svgContent: `<svg viewBox="0 0 600 460" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="440" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Сравнение контекстных окон</text>
  <!-- Шаг 1 -->
  <rect x="30" y="55" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="82" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="87" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="77" fill="var(--foreground)" font-size="12" font-weight="bold">GPT-3.5 — 4K токенов</text>
  <text x="80" y="95" fill="var(--muted-foreground)" font-size="10">Короткий диалог, несколько абзацев</text>
  <!-- Connector -->
  <line x1="55" y1="110" x2="55" y2="125" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 2 -->
  <rect x="30" y="125" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="152" r="14" fill="oklch(0.55 0.15 165)" opacity="0.25"/>
  <text x="55" y="157" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="147" fill="var(--foreground)" font-size="12" font-weight="bold">GPT-4 — 128K токенов</text>
  <text x="80" y="165" fill="var(--muted-foreground)" font-size="10">300 страниц = 1 книга</text>
  <!-- Connector -->
  <line x1="55" y1="180" x2="55" y2="195" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 3 -->
  <rect x="30" y="195" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="222" r="14" fill="oklch(0.75 0.15 75)" opacity="0.25"/>
  <text x="55" y="227" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="217" fill="var(--foreground)" font-size="12" font-weight="bold">Claude 3 — 200K токенов</text>
  <text x="80" y="235" fill="var(--muted-foreground)" font-size="10">Длинные документы и отчёты</text>
  <!-- Connector -->
  <line x1="55" y1="250" x2="55" y2="265" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 4 -->
  <rect x="30" y="265" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="292" r="14" fill="oklch(0.75 0.15 75)" opacity="0.3"/>
  <text x="55" y="297" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="287" fill="var(--foreground)" font-size="12" font-weight="bold">Gemini — 1M токенов</text>
  <text x="80" y="305" fill="var(--muted-foreground)" font-size="10">Целая библиотека текстов</text>
  <!-- Connector -->
  <line x1="55" y1="320" x2="55" y2="335" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 5 -->
  <rect x="30" y="335" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="362" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="367" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">5</text>
  <text x="80" y="357" fill="var(--foreground)" font-size="12" font-weight="bold">Расширение памяти</text>
  <text x="80" y="375" fill="var(--muted-foreground)" font-size="10">RAG + Суммаризация + Sliding Window + KV Cache оптимизация</text>
  <!-- Bottom insight -->
  <rect x="30" y="405" width="540" height="40" rx="6" fill="var(--muted)" opacity="0.3"/>
  <text x="300" y="430" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Больше окно = больше контекст, но квадратичная сложность внимания ограничивает рост</text>
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
          svgContent: `<svg viewBox="0 0 600 530" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect x="10" y="10" width="580" height="510" rx="12" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
  <text x="300" y="38" text-anchor="middle" fill="var(--foreground)" font-size="15" font-weight="bold">Архитектура Transformer</text>
  <!-- Шаг 1 -->
  <rect x="30" y="55" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="82" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="87" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">1</text>
  <text x="80" y="77" fill="var(--foreground)" font-size="12" font-weight="bold">Input Embedding</text>
  <text x="80" y="95" fill="var(--muted-foreground)" font-size="10">Токены превращаются в векторные представления + позиционное кодирование</text>
  <!-- Connector -->
  <line x1="55" y1="110" x2="55" y2="125" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 2 -->
  <rect x="30" y="125" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.1" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="152" r="14" fill="oklch(0.75 0.15 75)" opacity="0.25"/>
  <text x="55" y="157" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">2</text>
  <text x="80" y="147" fill="var(--foreground)" font-size="12" font-weight="bold">Multi-Head Self-Attention</text>
  <text x="80" y="165" fill="var(--muted-foreground)" font-size="10">Каждый токен «смотрит» на все остальные через Query, Key, Value</text>
  <!-- Connector -->
  <line x1="55" y1="180" x2="55" y2="195" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 3 -->
  <rect x="30" y="195" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.08" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="222" r="14" fill="oklch(0.55 0.15 165)" opacity="0.2"/>
  <text x="55" y="227" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">3</text>
  <text x="80" y="217" fill="var(--foreground)" font-size="12" font-weight="bold">Feed-Forward Network</text>
  <text x="80" y="235" fill="var(--muted-foreground)" font-size="10">Двухслойная нейросеть применяется к каждой позиции</text>
  <!-- Connector -->
  <line x1="55" y1="250" x2="55" y2="265" stroke="oklch(0.55 0.15 165)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 4 -->
  <rect x="30" y="265" width="540" height="55" rx="8" fill="oklch(0.55 0.15 165)" opacity="0.12" stroke="oklch(0.55 0.15 165)" stroke-width="1.5"/>
  <circle cx="55" cy="292" r="14" fill="oklch(0.55 0.15 165)" opacity="0.25"/>
  <text x="55" y="297" text-anchor="middle" fill="oklch(0.55 0.15 165)" font-size="12" font-weight="bold">4</text>
  <text x="80" y="287" fill="var(--foreground)" font-size="12" font-weight="bold">Layer Norm + Residual</text>
  <text x="80" y="305" fill="var(--muted-foreground)" font-size="10">Нормализация + обходной путь для стабильности обучения</text>
  <!-- Connector -->
  <line x1="55" y1="320" x2="55" y2="335" stroke="oklch(0.75 0.15 75)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 5 -->
  <rect x="30" y="335" width="540" height="55" rx="8" fill="oklch(0.75 0.15 75)" opacity="0.15" stroke="oklch(0.75 0.15 75)" stroke-width="1.5"/>
  <circle cx="55" cy="362" r="14" fill="oklch(0.75 0.15 75)" opacity="0.3"/>
  <text x="55" y="367" text-anchor="middle" fill="oklch(0.75 0.15 75)" font-size="12" font-weight="bold">5</text>
  <text x="80" y="357" fill="var(--foreground)" font-size="12" font-weight="bold">Стек N слоёв</text>
  <text x="80" y="375" fill="var(--muted-foreground)" font-size="10">Шаги 2-4 повторяются N раз (6-96 слоёв)</text>
  <!-- Connector -->
  <line x1="55" y1="390" x2="55" y2="405" stroke="oklch(0.6 0.2 280)" stroke-width="1.5" opacity="0.3"/>
  <!-- Шаг 6 -->
  <rect x="30" y="405" width="540" height="55" rx="8" fill="oklch(0.6 0.2 280)" opacity="0.08" stroke="oklch(0.6 0.2 280)" stroke-width="1.5"/>
  <circle cx="55" cy="432" r="14" fill="oklch(0.6 0.2 280)" opacity="0.2"/>
  <text x="55" y="437" text-anchor="middle" fill="oklch(0.6 0.2 280)" font-size="12" font-weight="bold">6</text>
  <text x="80" y="427" fill="var(--foreground)" font-size="12" font-weight="bold">Выход</text>
  <text x="80" y="445" fill="var(--muted-foreground)" font-size="10">Вероятности следующего токена через Linear + Softmax</text>
  <!-- Bottom insight -->
  <rect x="30" y="475" width="540" height="40" rx="6" fill="var(--muted)" opacity="0.3"/>
  <text x="300" y="500" text-anchor="middle" fill="var(--foreground)" font-size="10" font-weight="bold">Transformer = стек слоёв Attention + FFN с residual связями</text>
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
