export abstract class Flashcard {
  constructor(public id: number, public question: string) {}
}

export class FlashcardAnswer extends Flashcard {
  constructor(id: number, question: string, public answer: string) { super(id, question) }
}

export class FlashcardTrueFalse extends Flashcard {
  constructor(id: number, question: string, public answer: boolean) { super(id, question) }
}