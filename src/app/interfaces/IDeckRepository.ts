import { Deck, EditDeckDTO } from "../classes/Deck";
import { AddFlashcardDTO, Flashcard } from "../classes/Flashcard";
import { User } from "../classes/User";

export interface IDeckRepository {
  getPrivateDecks: (user: User) => Promise<Deck[]>
  getOnlineDecks: () => Promise<Deck[]>
  getDeck: (id: number) => Promise<Deck | undefined>
  addDeck: (deck: Deck) => Promise<void>
  editDeck: (editDeckDTO: EditDeckDTO, deck: Deck) => Promise<void>
  addFlashcard: (addFlashcardDTO: AddFlashcardDTO, selectedDeck: Deck) => Promise<void>
  deleteFlashcard: (selectedFlashcard: Flashcard, selectedDeck: Deck) => Promise<void>
}