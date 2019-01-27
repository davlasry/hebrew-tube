import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AddWord } from 'src/app/words/state/words.actions';

@Component({
  selector: 'view-word',
  templateUrl: './view-word.component.html',
  styleUrls: ['./view-word.component.scss']
})
export class ViewWordDialogComponent implements OnInit {
  wordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewWordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.wordForm = this.fb.group({
      hebrew: ['', [Validators.required, Validators.pattern(/^[א-ת\s]+$/)]],
      createdAt: [''],
      definitions: this.fb.array([])
    });
    this.addDefinition();
  }

  get definitionsForm() {
    return this.wordForm.get('definitions') as FormArray;
  }

  addDefinition() {
    const definitionGroup = this.fb.group({
      french: [''],
      english: [''],
      phonetic: [''],
      notes: ['']
    });
    this.definitionsForm.push(definitionGroup);
  }

  deleteDefinition(i) {
    this.definitionsForm.removeAt(i);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetForm() {}

  onSubmit() {
    console.log(this.wordForm.value);
    this.wordForm.patchValue({
      createdAt: Date.now()
    });
    this.store.dispatch(new AddWord(this.wordForm.value));
    this.dialogRef.close();
  }
}
