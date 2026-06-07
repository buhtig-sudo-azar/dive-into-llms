export interface AgentData {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  gradient: string;
  greeting: string;
  suggestions: string[];
}

export const agents: Record<string, AgentData> = {
  'llm-basics': {
    slug: 'llm-basics',
    name: 'Нейрон',
    role: 'Специалист по основам LLM',
    avatar: '/agents/llm-basics.png',
    gradient: 'from-blue-500 to-purple-600',
    greeting: 'Привет! Я Нейрон — твой наставник по основам LLM. Спрашивай про токены, трансформеры и контекстные окна!',
    suggestions: ['Что такое токены и как они работают?', 'Объясни архитектуру трансформера', 'Зачем нужно контекстное окно?'],
  },
  'prompt-engineering': {
    slug: 'prompt-engineering',
    name: 'Промпт-мастер',
    role: 'Мастер промпт-инжиниринга',
    avatar: '/agents/prompt-engineering.png',
    gradient: 'from-amber-500 to-orange-600',
    greeting: 'Привет! Я Промпт-мастер. Научу тебя писать промпты, которые работают. Zero-shot, CoT, ReAct — спрашивай!',
    suggestions: ['Что такое Chain-of-Thought?', 'Как написать хороший системный промпт?', 'В чём разница zero-shot и few-shot?'],
  },
  'context-engineering': {
    slug: 'context-engineering',
    name: 'Контекст-архитектор',
    role: 'Архитектор контекста',
    avatar: '/agents/context-engineering.png',
    gradient: 'from-emerald-500 to-teal-600',
    greeting: 'Привет! Я Контекст-архитектор. Помогу управлять памятью, сжимать контекст и оптимизировать контекстное окно!',
    suggestions: ['Как уменьшить расход токенов?', 'Что такое контекстная инженерия?', 'Как работает память в LLM?'],
  },
  'mcp': {
    slug: 'mcp',
    name: 'Протокол-инженер',
    role: 'Инженер MCP-протокола',
    avatar: '/agents/mcp.png',
    gradient: 'from-cyan-500 to-blue-600',
    greeting: 'Привет! Я Протокол-инженер. Знаю всё про MCP — серверы, клиенты, инструменты и ресурсы. Спрашивай!',
    suggestions: ['Что такое MCP и зачем он нужен?', 'Как создать MCP-сервер?', 'Какие бывают MCP-инструменты?'],
  },
  'rag': {
    slug: 'rag',
    name: 'Поиск-страж',
    role: 'Специалист по RAG',
    avatar: '/agents/rag.png',
    gradient: 'from-rose-500 to-pink-600',
    greeting: 'Привет! Я Поиск-страж. Embeddings, векторные БД, retrieval — моя стихия. Задавай вопросы!',
    suggestions: ['Как работает RAG простыми словами?', 'Что такое эмбеддинги?', 'Как выбрать векторную базу данных?'],
  },
  'ai-agents': {
    slug: 'ai-agents',
    name: 'Агент-координатор',
    role: 'Координатор AI-агентов',
    avatar: '/agents/ai-agents.png',
    gradient: 'from-violet-500 to-purple-600',
    greeting: 'Привет! Я Агент-координатор. Agent Loop, планирование, инструменты, multi-agent — всё здесь!',
    suggestions: ['Что такое AI-агент?', 'Как работает Agent Loop?', 'В чём разница single-agent и multi-agent?'],
  },
  'local-ai': {
    slug: 'local-ai',
    name: 'Локал-техник',
    role: 'Техник локального AI',
    avatar: '/agents/local-ai.png',
    gradient: 'from-lime-500 to-green-600',
    greeting: 'Привет! Я Локал-техник. Ollama, LM Studio, квантование — помогу запустить AI на твоей машине!',
    suggestions: ['Как запустить LLM локально?', 'Что такое квантование моделей?', 'Ollama vs LM Studio — что выбрать?'],
  },
  'production-ai': {
    slug: 'production-ai',
    name: 'Прод-наблюдатель',
    role: 'Специалист по Production AI',
    avatar: '/agents/production-ai.png',
    gradient: 'from-red-500 to-orange-600',
    greeting: 'Привет! Я Прод-наблюдатель. Мониторинг, observability, оценка, оптимизация расходов — спрашивай!',
    suggestions: ['Как оценить качество LLM в продакшене?', 'Как снизить расходы на API?', 'Что такое LLM observability?'],
  },
};
