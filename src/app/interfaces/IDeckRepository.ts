import { Deck } from "../classes/Deck";

export interface IDeckRepository {
  getPrivateDecks: (userId: number) => Promise<Deck[]>
  getOnlineDecks: () => Promise<Deck[]>
}