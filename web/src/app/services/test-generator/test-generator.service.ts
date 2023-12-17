import { Injectable } from '@angular/core';
import { Deck } from '../../classes/Deck';
import { Test } from '../../classes/Test';
import { Flashcard, FlashcardAnswer, FlashcardTrueFalse } from '../../classes/Flashcard';
import { Question, QuestionAnswer, QuestionTrueFalse } from '../../classes/Question';

@Injectable({
  providedIn: 'root'
})
export class TestGeneratorService {
  private lastTestId!: number

  constructor() {
    this.lastTestId = -1
  }

  private shuffle(arr: string[]): string[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  generate(deck: Deck): Test {
    const questions: Question[] = []
    const allAnswers: string[] = deck.flashcards
      .filter((flashcard: Flashcard) => flashcard.type === "answer")
      .map(flashcard => flashcard.answer)

    for(const [index, flashcard] of deck.flashcards.entries()) {
      if(flashcard.type === "answer") {
        const answers: string[] = []
        const correctAnswer: string = flashcard.answer
        answers.push(correctAnswer)
        allAnswers.splice(allAnswers.indexOf(correctAnswer), 1)
        answers.push(...this.shuffle(allAnswers).slice(0, Math.min(3, allAnswers.length)))
        allAnswers.push(correctAnswer)
        const shuffledAnswers: string[] = this.shuffle(answers)
        questions.push(new QuestionAnswer(index, flashcard.question, shuffledAnswers, shuffledAnswers.indexOf(correctAnswer)))
      } else if(flashcard.type === "trueFalse") {
        const correctAnswer: boolean = flashcard.answer === "true"
        questions.push(new QuestionTrueFalse(index, flashcard.question, correctAnswer))
      }
    }

    this.lastTestId++
    return { id: this.lastTestId, questions: questions, result: 0, time: 0 }
  }
}