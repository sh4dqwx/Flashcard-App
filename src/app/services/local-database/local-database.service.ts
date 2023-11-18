import { Injectable, OnInit } from '@angular/core';
import { Deck } from '../../classes/Deck';
import { User } from '../../classes/User';

@Injectable({
  providedIn: 'root'
})
export class LocalDatabaseService {
  users: User[] = [
    {
      id: 1,
      login: "admin",
      password: "admin"
    }
  ]
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
}