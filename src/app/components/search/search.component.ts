import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCloud, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Deck } from '../../classes/Deck';
import { DeckRepositoryService } from '../../services/deck-repository/deck-repository.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  editIcon!: IconDefinition
  deleteIcon!: IconDefinition
  publicIcon!: IconDefinition
  privateDecks!: Deck[]
  onlineDecks!: Deck[]
  showPrivateDecks!: boolean

  constructor(private deckRepository: DeckRepositoryService) { }

  ngOnInit(): void {
    this.editIcon = faPen
    this.deleteIcon = faTrash
    this.publicIcon = faCloud
    this.getPrivateDecks()
    this.getOnlineDecks()
    this.showPrivateDecks = true
  }

  getPrivateDecks(): void {
    this.privateDecks = this.deckRepository.getUserDecks()
  }

  getOnlineDecks(): void {
    this.onlineDecks = this.deckRepository.getOnlineDecks()
  }
}
