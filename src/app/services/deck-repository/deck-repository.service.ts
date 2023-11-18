import { Injectable, OnInit } from '@angular/core';
import { Deck } from '../../classes/Deck';
import { IDeckRepository } from '../../interfaces/IDeckRepository';

@Injectable({
  providedIn: 'root'
})
export class DeckRepositoryService implements IDeckRepository {
  decks: Deck[] = [
    {
      id: 1,
      name: "Angielski",
      author: {
        id: 1,
        login: "admin",
        password: "admin"
      },
      isPublic: true
    },
    {
      id: 2,
      name: "Niemiecki",
      author: {
        id: 1,
        login: "admin",
        password: "admin"
      },
      isPublic: false
    },
    {
      id: 3,
      name: "Hiszpański",
      author: {
        id: 1,
        login: "admin",
        password: "admin"
      },
      isPublic: false
    },
  ]

  constructor() { }

  async getPrivateDecks(userId: number): Promise<Deck[]> {
    return this.decks.filter((deck: Deck) => deck.author.id == userId)
  }

  async getOnlineDecks(): Promise<Deck[]> {
    return this.decks.filter((deck: Deck) => deck.isPublic == true)
  }
}
