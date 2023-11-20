import { Deck } from "../classes/Deck";
import { User } from "../classes/User";

export interface IDeckRepository {
  getPrivateDecks: (user: User) => Promise<Deck[]>
  getOnlineDecks: () => Promise<Deck[]>
  addDeck: (deck: Deck) => Promise<void>
}