import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { DeckCreatorComponent } from './components/deck-creator/deck-creator.component';
import { ReviewComponent } from './components/review/review.component';
import { TestComponent } from './components/test/test.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "search", component: SearchComponent },
    { path: "deck-creator", component: DeckCreatorComponent },
    { path: "review", component: ReviewComponent },
    { path: "test", component: TestComponent },
    { path: "summary", component: SummaryComponent },
    { path: "**", component: ErrorComponent}
];
