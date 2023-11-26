import { Injectable, OnInit } from '@angular/core';
import { Deck } from '../../classes/Deck';
import { IDeckRepository } from '../../interfaces/IDeckRepository';
import { User } from '../../classes/User';
import { AddFlashcardDTO, Flashcard, FlashcardAnswer, FlashcardTrueFalse } from '../../classes/Flashcard';

@Injectable({
  providedIn: 'root'
})
export class DeckRepositoryService implements IDeckRepository {
  decks: Deck[] = [
    {
      id: 1,
      name: "Angielski",
      flashcards: [
        new FlashcardAnswer(1, 'classroom', 'klasa'),
        new FlashcardTrueFalse(2, 'Is the sky blue?', true),
        new FlashcardAnswer(3, 'weather', 'pogoda'),
        new FlashcardTrueFalse(4, 'Are elephants able to fly?', false),
        new FlashcardAnswer(5, 'delicious', 'pyszny'),
      ],
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
      flashcards: [
        new FlashcardAnswer(1, 'Haus', 'Dom'),
        new FlashcardAnswer(2, 'Apfel', 'Jabłko'),
        new FlashcardAnswer(3, 'Auto', 'Samochód'),
        new FlashcardTrueFalse(4, 'Ist Berlin die Hauptstadt von Deutschland?', true),
        new FlashcardTrueFalse(5, 'Ist Wasser eine feste Substanz?', false)
      ],
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
      flashcards: [
        new FlashcardAnswer(1, 'Casa', 'Dom'),
        new FlashcardAnswer(2, 'Manzana', 'Jabłko'),
        new FlashcardAnswer(3, 'Coche', 'Samochód'),
        new FlashcardTrueFalse(1, 'Es Madrid la capital de España?', true),
        new FlashcardTrueFalse(2, 'El agua es una sustancia sólida?', false)
      ],
      author: {
        id: 2,
        login: "user",
        password: "user"
      },
      isPublic: false
    },
  ]

  constructor() { }

  async getPrivateDecks(user: User): Promise<Deck[]> {
    return this.decks.filter((deck: Deck) => deck.author.id === user.id);
  }

  async getOnlineDecks(): Promise<Deck[]> {
    return this.decks.filter((deck: Deck) => deck.isPublic === true);
  }

  async getDeck(id: number): Promise<Deck | undefined> {
    return this.decks.find((deck: Deck) => deck.id == id)
  }

  async addDeck(deck: Deck): Promise<void> {
    deck.id = this.decks[this.decks.length - 1].id + 1;
    this.decks.push(deck);
  }

  async addFlashcard(addFlashcardDTO: AddFlashcardDTO, selectedDeck: Deck): Promise<void> {
    let flashcard: Flashcard
    const flashcardId = selectedDeck.flashcards[selectedDeck.flashcards.length - 1].id + 1

    if(addFlashcardDTO.type === "answer")
      flashcard = new FlashcardAnswer(flashcardId, addFlashcardDTO.question, addFlashcardDTO.answer)
    else if(addFlashcardDTO.type === "trueFalse")
      flashcard = new FlashcardTrueFalse(flashcardId, addFlashcardDTO.question, addFlashcardDTO.trueFalseAnswer)

    this.decks = this.decks.map((deck: Deck) => {
      if(deck.id === selectedDeck.id) return { ...deck, flashcards: [...deck.flashcards, flashcard] }
      else return deck
    })
  }
}
