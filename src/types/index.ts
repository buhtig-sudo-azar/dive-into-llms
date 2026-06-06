export interface SubtopicIntroduction {
  what: string;
  why: string;
  where: string;
  problem: string;
}

export interface Term {
  term: string;
  definition: string;
}

export interface SubtopicTheory {
  terms: Term[];
  principles: string;
  architecture: string;
  connections: string;
}

export interface DiagramData {
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
  introduction: SubtopicIntroduction;
  theory: SubtopicTheory;
  diagram: DiagramData;
  practicalExamples: PracticalExample[];
  commonMistakes: CommonMistake[];
  furtherReading: FurtherReading[];
}

export interface TopicCategory {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  subtopics: Subtopic[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SearchItem {
  type: 'category' | 'subtopic' | 'term';
  title: string;
  description: string;
  categorySlug: string;
  subtopicSlug?: string;
  keywords: string[];
}
