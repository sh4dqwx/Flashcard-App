import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CurrentStateService } from '../../services/current-state/current-state.service';
import { Deck } from '../../classes/Deck';
import { IDeckRepository } from '../../interfaces/IDeckRepository';
import { DeckRepositoryService } from '../../services/deck-repository/deck-repository.service';
import { AddFlashcardDTO, Flashcard } from '../../classes/Flashcard';
import { MatDialog } from '@angular/material/dialog';
import { AddFlashcardFormComponent } from '../../modules/add-flashcard-form/add-flashcard-form.component';

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
  private _deck!: Deck

  get deck(): Deck { return this._deck }

  set deck(value: Deck | undefined) {
    if(value === undefined)
      this.router.navigate(['/error'])
    else this._deck = value
  }

  editIcon!: IconDefinition
  deleteIcon!: IconDefinition

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private injector: Injector,
    private dialog: MatDialog
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
    this.deck = await this.deckRepository.getDeck(deckId);
  }

  public addFlashcard(): void {
    const dialogRef = this.dialog.open(AddFlashcardFormComponent);
    dialogRef.componentInstance.flashcardCreated.subscribe(async (addFlashcardDTO: AddFlashcardDTO) => {
      await this.deckRepository.addFlashcard(addFlashcardDTO, this.deck)
      this.deck = await this.deckRepository.getDeck(this.deck.id)
    })
    dialogRef.afterClosed().subscribe(async result => {
      console.log("AddFlashcard dialog has been closed");
    })
  }

  public deleteFlashcard(flashcard: Flashcard): void {

  }

  public logout(): void {
    this.applicationState.removeCurrentUser();
    this.router.navigate(['/login']);
  }
}