import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditDeckDTO } from '../../classes/Deck';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { EditDeckDialogComponent } from '../edit-deck-dialog/edit-deck-dialog.component';

@Component({
  selector: 'app-edit-deck-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './edit-deck-form.component.html',
  styleUrl: './edit-deck-form.component.css'
})
export class EditDeckFormComponent implements OnInit {
  @Input() deckData!: EditDeckDTO
  @Output() deckEdited = new EventEmitter<EditDeckDTO>()
  public deckForm!: FormGroup

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(EditDeckDialogComponent, { data: this.deckData })
    dialogRef.componentInstance.deckEdited.subscribe((editDeckDTO: EditDeckDTO) => {
      this.deckEdited.emit(editDeckDTO)
    })
    dialogRef.afterClosed().subscribe(async result => {
      console.log("EditDeck dialog has been closed");
    })
  }
}