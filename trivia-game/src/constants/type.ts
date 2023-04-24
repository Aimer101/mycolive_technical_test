
export interface TriviaGame {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    options: string[]
    question: string
    type: string
}

export interface ProgressProps {
    progress: number;
  }