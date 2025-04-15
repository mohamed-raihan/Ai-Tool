export interface Option {
    id: string;
    text: string;
  }
  
  export interface Question {
    id: string;
    text: string;
    options: Option[];
  }
  
  export interface TestResults {
    userId: string;
    answers: Record<string, string>; // Question ID -> Selected Option ID
    completedAt: string; // ISO date string
  }
  
  export enum TestStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
  }
  
  export interface UserTest {
    id: string;
    userId: string;
    testId: string;
    status: TestStatus;
    currentQuestionIndex?: number;
    answers: Record<string, string>;
    startedAt: string;
    completedAt?: string;
  }