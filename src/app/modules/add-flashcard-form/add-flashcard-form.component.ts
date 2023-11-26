import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AddFlashcardDTO, Flashcard, FlashcardAnswer } from '../../classes/Flashcard';

@Component({
  selector: 'app-add-flashcard-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './add-flashcard-form.component.html',
  styleUrl: './add-flashcard-form.component.css'
})
export class AddFlashcardFormComponent implements OnInit {
  @Output() flashcardCreated = new EventEmitter<AddFlashcardDTO>();
  public flashcardForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddFlashcardFormComponent>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.flashcardForm = this.fb.group({
      type: ['answer', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      trueFalseAnswer: [null]
    });

    this.flashcardForm.get("type")?.valueChanges.subscribe((value) => {
      const answerControl = this.flashcardForm.get("answer")
      const trueFalseAnswerControl = this.flashcardForm.get("trueFalseAnswer")

      answerControl?.setValidators(this.flashcardForm.get("type")?.value === "answer" ? Validators.required : null)
      trueFalseAnswerControl?.setValidators(this.flashcardForm.get("type")?.value === "trueFalse" ? Validators.required : null)

      answerControl?.updateValueAndValidity()
      trueFalseAnswerControl?.updateValueAndValidity()
    })
  } 

  public addFlashcard(): void {
    if (this.flashcardForm.valid) {
      const addFlashcardDTO: AddFlashcardDTO = this.flashcardForm.value;
      this.flashcardCreated.emit(addFlashcardDTO);
      this.dialogRef.close();
    }
  }
}
