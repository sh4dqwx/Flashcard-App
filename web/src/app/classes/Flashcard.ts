export abstract class Flashcard {
  answer!: string
  type!: string
  constructor(public id: number, public question: string) {}
}

export class FlashcardAnswer extends Flashcard {
  constructor(id: number, question: string, answer: string) { 
    super(id, question)
    this.answer = answer
    this.type = "answer"
  }
}

export class FlashcardTrueFalse extends Flashcard {
  constructor(id: number, question: string, answer: boolean) {
    super(id, question)
    this.answer = String(answer)
    this.type = "trueFalse"
  }
}

export type AddFlashcardDTO = {
  type: string,
  question: string,
  answer: string,
  trueFalseAnswer: boolean
}