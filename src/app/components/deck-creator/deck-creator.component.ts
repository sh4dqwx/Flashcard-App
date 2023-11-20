import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { CurrentStateService } from '../../services/current-state/current-state.service';

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
export class DeckCreatorComponent {
  editIcon = faPen
  deleteIcon = faTrash
  applicationState!: CurrentStateService

  constructor(
    private router: Router,
    private injector: Injector
  ) {
    this.applicationState = this.injector.get(CurrentStateService);
  }

  public logout(): void {
    this.applicationState.removeCurrentUser();
    this.router.navigate(['/login']);
  }
}