import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CurrentStateService } from '../../services/current-state/current-state.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
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
