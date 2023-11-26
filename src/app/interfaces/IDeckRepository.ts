import { Deck } from "../classes/Deck";
import { AddFlashcardDTO } from "../classes/Flashcard";
import { User } from "../classes/User";

export interface IDeckRepository {
  getPrivateDecks: (user: User) => Promise<Deck[]>
  getOnlineDecks: () => Promise<Deck[]>
  getDeck: (id: number) => Promise<Deck | undefined>
  addDeck: (deck: Deck) => Promise<void>
  addFlashcard: (addFlashcardDTO: AddFlashcardDTO, deck: Deck) => Promise<void>
}