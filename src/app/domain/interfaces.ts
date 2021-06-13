export interface Question {
  id?: string;
  translations: QuestionTranslation[];
  answers: Answer[];
}
export interface Language {
  id?: string;
  iso_code: string;
  name: string;
}
export interface Answer {
  id?: string;
  position: number;
  result: boolean;
}
export interface Translation {
  id: string;
  language: Language;
}
export interface QuestionTranslation extends Translation {
  title: string;
}
export interface AnswerTranslation extends Translation {
  text: string;
}
