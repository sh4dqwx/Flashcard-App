import { Observable } from "rxjs";
import { Deck, EditDeckDTO } from "../classes/Deck";
import { AddFlashcardDTO, Flashcard } from "../classes/Flashcard";
import { User } from "../classes/User";

export interface IDeckRepository {
  getPrivateDecks: (userId: number) => Observable<Deck[]>
  getOnlineDecks: () => Observable<Deck[]>
  getDeck: (id: number) => Observable<Deck>
  addDeck: (deck: Deck) => Observable<void>
  editDeck: (deckId: number, editDeckDTO: EditDeckDTO) => Observable<void>
  addFlashcard: (deckId: number, addFlashcardDTO: AddFlashcardDTO) => Observable<void>
  deleteFlashcard: (deckId: number, flashcardId: number) => Observable<void>
}