import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CurrentStateService } from '../../services/current-state/current-state.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
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

  public next(answear: number): void {
    this.router.navigate(['/summary']);
  }
}
