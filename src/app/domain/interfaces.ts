export interface Question {
  id?: string;
  title: string
  observations: string|null;
  answers: Answer[];
  created_at?: string;
  updated_at?: string;
  topic?: Topic|null;
  lesson?: Lesson|null;
}
export interface Answer {
  id?: string;
  text: string;
  position: number;
  result: boolean;
}

export interface Topic {
  id?: string;
  description: string;
}

export interface Book {
  id?: string;
  title: string;
  author?: string|null;
}

export interface Lesson {
  id?: string;
  book?: Book|null;
  description: string;
  position: number;
}
