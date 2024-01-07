import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { DeckCreatorComponent } from './components/deck-creator/deck-creator.component';
import { ReviewComponent } from './components/review/review.component';
import { TestComponent } from './components/test/test.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "search", component: SearchComponent },
    { path: "deck/:deckId", component: DeckCreatorComponent },
    { path: "review/:deckId", component: ReviewComponent },
    { path: "test/:deckId", component: TestComponent },
    { path: "summary", component: SummaryComponent },
    { path: "error", component: ErrorComponent },
    { path: "**", redirectTo: "/error", pathMatch: "full" }
];
