export class Flashcard {
    constructor(id, question) {
        this.id = id;
        this.question = question;
    }
}
export class FlashcardAnswer extends Flashcard {
    constructor(id, question, answer) {
        super(id, question);
        this.answer = answer;
    }
    getAnswer() { return this.answer; }
}
export class FlashcardTrueFalse extends Flashcard {
    constructor(id, question, answer) {
        super(id, question);
        this.answer = answer;
    }
    getAnswer() { return String(this.answer); }
}
//# sourceMappingURL=types.js.map