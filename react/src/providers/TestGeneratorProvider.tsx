import { FC, ReactNode, createContext, useContext } from "react";
import { Deck } from "../classes/Deck";
import { Test } from "../classes/Test";
import { Question, QuestionAnswer, QuestionTrueFalse } from "../classes/Question";
import { Flashcard } from "../classes/Flashcard";

type TestGeneratorContextType = {
  generate: (deck: Deck) => Test
}

const TestGeneratorContext = createContext<TestGeneratorContextType | null>(null)

export const useTestGenerator = (): TestGeneratorContextType => {
  const context = useContext(TestGeneratorContext)
  if (context == null) throw new Error("Context not initialized")
  return context
}

export const TestGeneratorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  let lastTestId: number = -1

  const shuffle = (arr: string[]): string[] => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const generate = (deck: Deck): Test => {
    const questions: Question[] = []
    const allAnswers: string[] = deck.flashcards
      .filter((flashcard: Flashcard) => flashcard.type === "answer")
      .map(flashcard => flashcard.answer)

    for (const [index, flashcard] of deck.flashcards.entries()) {
      if (flashcard.type === "answer") {
        const answers: string[] = []
        const correctAnswer: string = flashcard.answer
        answers.push(correctAnswer)
        allAnswers.splice(allAnswers.indexOf(correctAnswer), 1)
        answers.push(...shuffle(allAnswers).slice(0, Math.min(3, allAnswers.length)))
        allAnswers.push(correctAnswer)
        const shuffledAnswers: string[] = shuffle(answers)
        questions.push(new QuestionAnswer(index, flashcard.question, shuffledAnswers, shuffledAnswers.indexOf(correctAnswer)))
      } else if (flashcard.type === "trueFalse") {
        const correctAnswer: boolean = flashcard.answer === "true"
        questions.push(new QuestionTrueFalse(index, flashcard.question, correctAnswer))
      }
    }

    lastTestId++
    return { id: lastTestId, questions: questions, result: 0, time: 0 }
  }

  return (
    <TestGeneratorContext.Provider value={{
      generate: generate
    }}>
      {children}
    </TestGeneratorContext.Provider>
  )
}