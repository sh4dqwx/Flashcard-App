import { Injectable } from '@angular/core';
import { Deck, EditDeckDTO } from '../../classes/Deck';
import { IDeckRepository } from '../../interfaces/IDeckRepository';
import { AddFlashcardDTO } from '../../classes/Flashcard';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckRepositoryService implements IDeckRepository {
  private apiUrl: string = `${environment.apiUrl}/decks`

  constructor(private http: HttpClient) { }

  getPrivateDecks(userId: number): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${this.apiUrl}/private/${userId}`)
  }

  getOnlineDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${this.apiUrl}/online`)
  }

  getDeck(id: number): Observable<Deck> {
    return this.http.get<Deck>(`${this.apiUrl}/${id}`)
  }

  addDeck(deck: Deck): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, deck)
  }

  editDeck(deckId: number, editDeckDTO: EditDeckDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${deckId}`, editDeckDTO)
  }

  addFlashcard(deckId: number, addFlashcardDTO: AddFlashcardDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${deckId}/flashcards`, addFlashcardDTO)
  }

  deleteFlashcard(deckId: number, flashcardId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${deckId}/flashcards/${flashcardId}`)
  }
}
