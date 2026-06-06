export interface Introduction {
  what: string;
  why: string;
  where: string;
  problem: string;
}

export interface Term {
  term: string;
  definition: string;
}

export interface Theory {
  terms: Term[];
  principles: string;
  architecture: string;
  connections: string;
}

export interface Diagram {
  type: 'flowchart' | 'architecture' | 'pipeline' | 'comparison';
  title: string;
  svgContent: string;
}

export interface PracticalExample {
  title: string;
  description: string;
  code?: string;
  language?: string;
}

export interface CommonMistake {
  mistake: string;
  explanation: string;
  correctApproach: string;
}

export interface FurtherReading {
  topic: string;
  slug: string;
  categorySlug: string;
}

export interface Subtopic {
  slug: string;
  title: string;
  categorySlug: string;
  introduction: Introduction;
  theory: Theory;
  diagram: Diagram;
  practicalExamples: PracticalExample[];
  commonMistakes: CommonMistake[];
  furtherReading: FurtherReading[];
}

export interface TopicCategory {
  slug: string;
  title: string;
  icon: string;
  description: string;
  subtopics: Subtopic[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  categorySlug: string;
  messages: ChatMessage[];
  isLoading: boolean;
}

export interface SearchResult {
  type: 'category' | 'subtopic' | 'term';
  categorySlug: string;
  subtopicSlug?: string;
  title: string;
  excerpt: string;
  matchField: string;
}
