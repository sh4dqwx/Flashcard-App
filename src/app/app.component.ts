import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DeckCreatorComponent } from './deck-creator/deck-creator.component';
import { ReviewComponent } from './review/review.component';
import { SummaryComponent } from './summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DeckCreatorComponent,
    ReviewComponent,
    SummaryComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flashcard-app';
}
