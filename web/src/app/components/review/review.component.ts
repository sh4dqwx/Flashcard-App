import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CurrentStateService } from '../../services/current-state/current-state.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  applicationState!: CurrentStateService

  constructor(
    private router: Router,
    private injector: Injector
  ) {
    this.applicationState = this.injector.get(CurrentStateService);
  }

  ngOnInit(): void {
    if (this.applicationState.getCurrentUser === null)
      return this.logout()
  }

  public logout(): void {
    this.applicationState.removeCurrentUser();
    this.router.navigate(['/login']);
  }

  public next(answear: number): void {
    this.router.navigate(['/summary']);
  }
}
