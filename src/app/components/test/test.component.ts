import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  constructor(private router: Router) { }

  public logout(): void {
    this.router.navigate(['/login']);
  }

  public next(answear: number): void {
    this.router.navigate(['/summary']);
  }
}
