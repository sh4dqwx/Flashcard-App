import { Injectable, OnInit } from '@angular/core';
import { Deck } from '../../classes/Deck';
import { LocalDatabaseService } from '../local-database/local-database.service';

@Injectable({
  providedIn: 'root'
})
export class DeckRepositoryService {
  constructor(private localDatabase: LocalDatabaseService) { }

  getUserDecks(): Deck[] {
    //do zmiany, trzeba tu podać coś z zalogowanego użytkownika
    return this.localDatabase.decks.filter((deck: Deck) => deck.author.id == 1)
  }

  getOnlineDecks(): Deck[] {
    return this.localDatabase.decks.filter((deck: Deck) => deck.isPublic == true)
  }
}
