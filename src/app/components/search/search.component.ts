import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCloud, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Deck } from '../../classes/Deck';
import { DeckRepositoryService } from '../../services/deck-repository/deck-repository.service';
import { IDeckRepository } from '../../interfaces/IDeckRepository';
import { RouterModule, Router } from '@angular/router';
import { CurrentStateService } from '../../services/current-state/current-state.service';
import { User } from '../../classes/User';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  private deckRepository!: IDeckRepository
  private applicationState!: CurrentStateService

  editIcon!: IconDefinition
  deleteIcon!: IconDefinition
  publicIcon!: IconDefinition
  privateDecks!: Deck[]
  onlineDecks!: Deck[]
  filteredPrivateDecks!: Deck[]
  filteredOnlineDecks!: Deck[]
  showPrivateDecks!: boolean

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  constructor(private injector: Injector, private router: Router) {
    this.deckRepository = this.injector.get<IDeckRepository>(DeckRepositoryService);
    this.applicationState = this.injector.get(CurrentStateService);
  }

  async ngOnInit(): Promise<void> {
    if (this.applicationState.getCurrentUser === null)
      return this.logout()

    this.editIcon = faPen
    this.deleteIcon = faTrash
    this.publicIcon = faCloud
    this.showPrivateDecks = true

    await Promise.all([
      this.getPrivateDecks(),
      this.getOnlineDecks()
    ])
  }

  private async getPrivateDecks(): Promise<void> {
    const user: User | null = this.applicationState.getCurrentUser();
    if (user == null)
      return this.logout();

    this.privateDecks = await this.deckRepository.getPrivateDecks(user);
    this.filteredPrivateDecks = this.privateDecks; //.map(deck => deck);
  }

  private async getOnlineDecks(): Promise<void> {
    this.onlineDecks = await this.deckRepository.getOnlineDecks();
    this.filteredOnlineDecks = this.onlineDecks; //.map(deck => deck);
  }

  public onlineToggle(): void {
    this.showPrivateDecks = !this.showPrivateDecks;
    this.searchInput.nativeElement.value = '';
    this.filteredPrivateDecks = this.privateDecks;
    this.filteredOnlineDecks = this.onlineDecks;
  }

  public filterDecks(event: any): void {
    if (this.showPrivateDecks)
      this.filteredPrivateDecks = this.privateDecks.filter(deck =>
        deck.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
    else
      this.filteredOnlineDecks = this.onlineDecks.filter(deck =>
        deck.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
  }

  public logout(): void {
    this.applicationState.removeCurrentUser();
    this.router.navigate(['/login']);
  }
}
