import { Flashcard } from "./Flashcard";
import { User } from "./User";

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