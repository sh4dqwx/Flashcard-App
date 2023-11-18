import { User } from "./User";

export type Deck = {
  id: number,
  name: string,
  //flashcards: Flashcard[],
  author: User,
  isPublic: boolean,
  //tests: Test[]
}