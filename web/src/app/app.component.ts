import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DeckCreatorComponent } from './components/deck-creator/deck-creator.component';
import { ReviewComponent } from './components/review/review.component';
import { SummaryComponent } from './components/summary/summary.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { SearchComponent } from './components/search/search.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    DeckCreatorComponent,
    ReviewComponent,
    SummaryComponent,
    LoginComponent,
    TestComponent,
    SearchComponent,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flashcard-app';
}
