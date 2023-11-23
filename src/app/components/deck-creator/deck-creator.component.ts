import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CurrentStateService } from '../../services/current-state/current-state.service';
import { Deck } from '../../classes/Deck';
import { IDeckRepository } from '../../interfaces/IDeckRepository';
import { DeckRepositoryService } from '../../services/deck-repository/deck-repository.service';

@Component({
  selector: 'app-deck-creator',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './deck-creator.component.html',
  styleUrl: './deck-creator.component.css'
})
export class DeckCreatorComponent implements OnInit {
  private deckRepository!: IDeckRepository
  private applicationState!: CurrentStateService

  editIcon!: IconDefinition
  deleteIcon!: IconDefinition
  deck!: Deck

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private injector: Injector
  ) {
    this.deckRepository = this.injector.get<IDeckRepository>(DeckRepositoryService);
    this.applicationState = this.injector.get(CurrentStateService);
  }

  async ngOnInit(): Promise<void> {
    console.log(this.applicationState.getCurrentUser())
    if (this.applicationState.getCurrentUser() == null)
      return this.logout()

    this.editIcon = faPen
    this.deleteIcon = faTrash

    const routeParams = this.route.snapshot.paramMap
    const deckId = Number(routeParams.get("deckId"));
    const tmpDeck: Deck | undefined = await this.deckRepository.getDeck(deckId);
    if(tmpDeck == null) this.router.navigate(['/error']);
    else this.deck = tmpDeck;
  }

  public logout(): void {
    this.applicationState.removeCurrentUser();
    this.router.navigate(['/login']);
  }
}