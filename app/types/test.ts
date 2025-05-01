export interface Answer {
  questionId: number;
  answer: "yes" | "no";
  timestamp?: Date;
}

export interface Question {
  id: number;
  text: string;
  dimension: "EI" | "SN" | "TF" | "JP" | "AT";
  primaryTrait: string;
  secondaryTrait: string;
}
