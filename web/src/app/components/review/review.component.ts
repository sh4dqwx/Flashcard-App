import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentStateService } from '../../services/current-state/current-state.service';
import { IDeckRepository } from '../../interfaces/IDeckRepository';
import { TestGeneratorService } from '../../services/test-generator/test-generator.service';
import { Deck } from '../../classes/Deck';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  private deckRepository!: IDeckRepository
  private applicationState!: CurrentStateService
  private testGenerator!: TestGeneratorService
  public currentIndex: number = 0
  public currentDeck: Deck | undefined

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private injector: Injector
  ) {
    this.applicationState = this.injector.get(CurrentStateService);
  }

  ngOnInit(): void {
    if (this.applicationState.getCurrentUser === null)
      return this.logout()

    const routeParams = this.route.snapshot.paramMap;
    const deckId = Number(routeParams.get("deckId"));
    this.deckRepository.getDeck(deckId).subscribe((deck: Deck) => {
      this.testGenerator.generate(deck);
      this.currentDeck = deck;
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
  }
}
