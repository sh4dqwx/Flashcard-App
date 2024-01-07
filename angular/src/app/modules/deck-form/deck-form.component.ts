import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deck-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deck-form.component.html',
  styleUrl: './deck-form.component.css'
})
export class DeckFormComponent {
  @ViewChild('deckNameInput')
  deckNameInput!: ElementRef;

  constructor(public dialogRef: MatDialogRef<DeckFormComponent>) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onCreateClick(): void {
    this.dialogRef.close(this.deckNameInput.nativeElement.value);
  }
}