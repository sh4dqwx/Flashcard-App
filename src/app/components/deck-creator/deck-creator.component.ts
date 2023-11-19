import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) { }

  public logout(): void {
    this.router.navigate(['/login']);
  }
}