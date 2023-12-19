import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentStateService } from '../../services/current-state/current-state.service';
import { IDeckRepository } from '../../interfaces/IDeckRepository';
import { TestGeneratorService } from '../../services/test-generator/test-generator.service';
import { DeckRepositoryService } from '../../services/deck-repository/deck-repository.service';
import { Flashcard } from '../../classes/Flashcard';
import { Deck } from '../../classes/Deck';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  private deckRepository!: IDeckRepository
  private applicationState!: CurrentStateService
  private testGenerator!: TestGeneratorService
  public currentIndex: number = 0
  public currentDeck: Deck | undefined
  public firstRandomIndex: number = 0
  public secondRandomIndex: number = 0
  public thirdRandomIndex: number = 0

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private injector: Injector
  ) {
    this.deckRepository = this.injector.get<IDeckRepository>(DeckRepositoryService);
    this.applicationState = this.injector.get(CurrentStateService);
    this.testGenerator = this.injector.get(TestGeneratorService);
  }

  ngOnInit(): void {
    if (this.applicationState.getCurrentUser === null)
      return this.logout();

    const routeParams = this.route.snapshot.paramMap;
    const deckId = Number(routeParams.get("deckId"));
    this.deckRepository.getDeck(deckId).subscribe((deck: Deck) => {
      this.testGenerator.generate(deck);
      this.currentDeck = deck;
      this.firstRandomIndex = Math.floor(Math.random() * this.currentDeck.flashcards.length);
      this.secondRandomIndex = Math.floor(Math.random() * this.currentDeck.flashcards.length);
      this.thirdRandomIndex = Math.floor(Math.random() * this.currentDeck.flashcards.length);
    });
  }

  public logout(): void {
    this.applicationState.removeCurrentUser();
    this.router.navigate(['/login']);
  }

  public next(answear: number): void {
    if (this.currentDeck === undefined)
      return;

    if (this.currentIndex + 1 >= this.currentDeck.flashcards.length)
      this.router.navigate(['/summary']);

    this.currentIndex++;
    this.firstRandomIndex = Math.floor(Math.random() * this.currentDeck.flashcards.length);
    this.secondRandomIndex = Math.floor(Math.random() * this.currentDeck.flashcards.length);
    this.thirdRandomIndex = Math.floor(Math.random() * this.currentDeck.flashcards.length);
  }
}
