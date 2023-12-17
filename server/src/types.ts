export type User = {
  id: number,
  login: string,
  password: string
}

export type Deck = {
  id: number,
  name: string,
  flashcards: Flashcard[],
  author: User,
  isPublic: boolean,
  //tests: Test[]
}

export type EditDeckDTO = {
  name: string
}

export abstract class Flashcard {
  type!: string
  constructor(public id: number, public question: string) {}
  abstract getAnswer(): string
}

export class FlashcardAnswer extends Flashcard {
  constructor(id: number, question: string, public answer: string) { 
    super(id, question)
    this.type = "answer"
  }
  public getAnswer(): string { return this.answer }
}

export class FlashcardTrueFalse extends Flashcard {
  constructor(id: number, question: string, public answer: boolean) {
    super(id, question)
    this.type = "trueFalse"
  }
  public getAnswer(): string { return String(this.answer) }
}

export type AddFlashcardDTO = {
  type: string,
  question: string,
  answer: string,
  trueFalseAnswer: boolean
}