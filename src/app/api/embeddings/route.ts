import { NextRequest } from 'next/server';

// Простой локальный эмулятор эмбеддингов на основе семантических категорий
// Используется когда API недоступен или нет ключа

const CATEGORIES: Record<string, string[]> = {
  ai: ['машинн', 'обучен', 'нейрон', 'сет', 'ai', 'искусственн', 'интеллект', 'глубок', 'обучен', 'модел', 'трениров', 'данн', 'программирован', 'алгоритм', 'llm', 'language model', 'transformer', 'embedding', 'inference', 'gpu', 'токен', 'промпт', 'генерац', 'gpt', 'bert', 'llama', 'mistral'],
  food: ['рецепт', 'борщ', 'свёкл', 'капуст', 'картофел', 'морков', 'лук', 'томат', 'суп', 'каша', 'мясо', 'рыб', 'запекан', 'салат', 'соус', 'варен', 'жарен', 'печён', 'готов', 'кулинар', 'еда', 'блюдо', 'ингредиент'],
  nature: ['природ', 'лес', 'рек', 'гор', 'озер', 'океан', 'погод', 'климат', 'эколог', 'животн', 'растен', 'цвет', 'дерев', 'птиц', 'рыб', 'насеком', 'земл', 'воздух', 'вод'],
  tech: ['компьютер', 'программ', 'код', 'серв', 'баз', 'данн', 'api', 'бэкенд', 'фронтенд', 'web', 'интернет', 'сайт', 'приложен', 'мобильн', 'облачн', 'docker', 'kubernetes', 'devops', 'базы данных'],
  science: ['наук', 'исследован', 'эксперимент', 'теори', 'гипотез', 'физик', 'хими', 'биолог', 'математик', 'статистик', 'формул', 'зако', 'открыти', 'анализ', 'синтез'],
  art: ['искусств', 'музык', 'живопис', 'картин', 'скульптур', 'театр', 'кино', 'фильм', 'литератур', 'поэзи', 'роман', 'архитектур', 'дизайн', 'фото', 'танц'],
  sport: ['спорт', 'футбол', 'хоккей', 'баскетбол', 'теннис', 'олимпи', 'чемпион', 'трениров', 'матч', 'команд', 'игрок', 'гол', 'побед', 'медал'],
  medicine: ['медицин', 'врач', 'больниц', 'лечен', 'диагноз', 'симптом', 'болезн', 'здоровь', 'пациент', 'лекарств', 'операци', 'анализ', 'вакцин', 'терапи'],
  business: ['бизнес', 'компани', 'рынк', 'экономик', 'финанс', 'инвестиц', 'прибыл', 'менеджмент', 'маркетинг', 'продаж', 'клиент', 'стартап', 'банк', 'кредит'],
  education: ['образован', 'школ', 'университет', 'учител', 'студент', 'учебн', 'курс', 'экзамен', 'урок', 'заняти', 'лекци', 'семинар', 'диплом', 'знани'],
};

function getCategories(text: string): Map<string, number> {
  const lower = text.toLowerCase();
  const scores = new Map<string, number>();
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += 1;
    }
    if (score > 0) scores.set(cat, score);
  }
  // Нормализуем
  const total = [...scores.values()].reduce((a, b) => a + b, 0) || 1;
  for (const [cat, score] of scores) {
    scores.set(cat, score / total);
  }
  return scores;
}

function categoryToVector(text: string): number[] {
  const cats = getCategories(text);
  const keys = Object.keys(CATEGORIES);
  const vector = keys.map(k => cats.get(k) || 0);
  // Добавляем хеш-компоненты для уникальности (на основе слов)
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const hashDim = 8;
  for (let d = 0; d < hashDim; d++) {
    let h = 0;
    for (const w of words) {
      for (let c = 0; c < w.length; c++) {
        h = ((h << 5) - h + w.charCodeAt(c) * (d + 1)) | 0;
      }
    }
    vector.push(Math.sin(h) * 0.3);
  }
  return vector;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
}

export async function POST(req: NextRequest) {
  try {
    const { texts, apiToken } = await req.json() as { texts: string[]; apiToken?: string };
    const apiKey = apiToken || process.env.OPENROUTER_API_KEY;

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return new Response(JSON.stringify({ error: 'texts array required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    // Пробуем настоящие эмбеддинги через OpenRouter
    if (apiKey) {
      try {
        const embeddingModels = [
          'openai/text-embedding-3-small',
          'text-embedding-ada-002',
        ];

        for (const model of embeddingModels) {
          try {
            const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://dive-into-llms.app',
                'X-Title': 'Dive Into LLMs Embeddings',
              },
              body: JSON.stringify({ model, input: texts }),
            });

            if (res.ok) {
              const data = await res.json();
              if (data.data && Array.isArray(data.data)) {
                const embeddings = data.data
                  .sort((a: { index: number }, b: { index: number }) => a.index - b.index)
                  .map((d: { embedding: number[] }) => d.embedding);

                // Вычисляем матрицу сходства
                const similarities = texts.map((_, i) =>
                  texts.map((_, j) => Math.round(cosineSimilarity(embeddings[i], embeddings[j]) * 100) / 100)
                );

                // PCA для 2D-проекции
                const positions2d = pcaProject(embeddings, 2);

                return new Response(JSON.stringify({
                  embeddings,
                  similarities,
                  positions2d,
                  model,
                  source: 'api',
                }), {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' },
                });
              }
            }
          } catch {
            continue;
          }
        }
      } catch {
        // Fall through to local
      }
    }

    // Fallback: локальный эмулятор на основе семантических категорий
    const vectors = texts.map(t => categoryToVector(t));
    const similarities = texts.map((_, i) =>
      texts.map((_, j) => Math.round(cosineSimilarity(vectors[i], vectors[j]) * 100) / 100)
    );
    const positions2d = pcaProject(vectors, 2);

    return new Response(JSON.stringify({
      embeddings: vectors,
      similarities,
      positions2d,
      model: 'local-semantic',
      source: 'local',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Простая PCA-проекция для 2D визуализации
function pcaProject(vectors: number[][], dims: number): number[][] {
  if (vectors.length <= 1) return vectors.map(() => [50, 50]);

  const n = vectors.length;
  const d = vectors[0].length;

  // Центрируем
  const means = Array(d).fill(0);
  for (const v of vectors) for (let i = 0; i < d; i++) means[i] += v[i] / n;
  const centered = vectors.map(v => v.map((val, i) => val - means[i]));

  // Ковариационная матрица (d x d) — используем только первые 20 компонент для скорости
  const maxDim = Math.min(d, 20);
  const cov: number[][] = Array(maxDim).fill(0).map(() => Array(maxDim).fill(0));
  for (let i = 0; i < maxDim; i++) {
    for (let j = i; j < maxDim; j++) {
      let sum = 0;
      for (const v of centered) sum += v[i] * v[j];
      cov[i][j] = sum / (n - 1 || 1);
      cov[j][i] = cov[i][j];
    }
  }

  // Power iteration для первых 2 компонент
  const components: number[][] = [];
  const matrixCopy = cov.map(r => [...r]);

  for (let c = 0; c < dims; c++) {
    let vec = Array(maxDim).fill(0).map(() => Math.random() - 0.5);
    for (let iter = 0; iter < 100; iter++) {
      const newVec = Array(maxDim).fill(0);
      for (let i = 0; i < maxDim; i++) {
        for (let j = 0; j < maxDim; j++) {
          newVec[i] += matrixCopy[i][j] * vec[j];
        }
      }
      const norm = Math.sqrt(newVec.reduce((s, v) => s + v * v, 0)) || 1;
      vec = newVec.map(v => v / norm);
    }

    // Deflation
    const eigenvalue = vec.reduce((s, v, i) => s + v * matrixCopy[i].reduce((ss, vv, j) => ss + vv * vec[j], 0), 0);
    for (let i = 0; i < maxDim; i++) {
      for (let j = 0; j < maxDim; j++) {
        matrixCopy[i][j] -= eigenvalue * vec[i] * vec[j];
      }
    }
    components.push(vec);
  }

  // Проецируем
  const projected = centered.map(v => {
    return components.map(comp => {
      let sum = 0;
      for (let i = 0; i < maxDim; i++) sum += v[i] * comp[i];
      return sum;
    });
  });

  // Нормализуем в [10, 90] для SVG
  const mins = Array(dims).fill(Infinity);
  const maxs = Array(dims).fill(-Infinity);
  for (const p of projected) {
    for (let i = 0; i < dims; i++) {
      mins[i] = Math.min(mins[i], p[i]);
      maxs[i] = Math.max(maxs[i], p[i]);
    }
  }

  return projected.map(p =>
    p.map((val, i) => {
      const range = maxs[i] - mins[i] || 1;
      return 10 + ((val - mins[i]) / range) * 80;
    })
  );
}
