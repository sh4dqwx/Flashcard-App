export abstract class Question {
  constructor(public id: number, public question: string) {}
}

export class QuestionAnswer extends Question {
  public selectedAnswerId!: number
  constructor(id: number, question: string, public answers: string[], public correctAnswerId: number) {
    super(id, question)
    this.selectedAnswerId = -1
  }
}

export class QuestionTrueFalse extends Question {
  public selectedAnswer!: boolean
  constructor(id: number, question: string, public correctAnswer: boolean) {
    super(id, question)
  }
}