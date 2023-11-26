import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditDeckDTO } from '../../classes/Deck';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

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
  @Output() deckEdited = new EventEmitter<EditDeckDTO>()
  public deckForm!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<EditDeckFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EditDeckDTO
  ) {}

  ngOnInit(): void {
    this.deckForm = this.fb.group({
      name: [this.data.name, Validators.required]
    })
  }

  public editDeck(): void {
    if(this.deckForm.valid) {
      const editDeckDTO: EditDeckDTO = this.deckForm.value
      this.deckEdited.emit(editDeckDTO)
      this.dialogRef.close()
    }
  }
}
