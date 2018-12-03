import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { WordsState } from 'src/app/words/state/words.reducer';
import { EditWord } from 'src/app/words/state/words.actions';

@Component({
  selector: 'app-edit-word-dialog',
  templateUrl: './edit-word-dialog.component.html',
  styleUrls: ['./edit-word-dialog.component.scss']
})
export class EditWordDialogComponent implements OnInit {

  wordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditWordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store<WordsState>,
  ) { }

  ngOnInit() {
    this.wordForm = this.fb.group({
      hebrew: [this.data.word.hebrew, [Validators.required, Validators.pattern(/^[א-ת\s]+$/)]],
      definitions: this.fb.array(this.setInitialDefinitions()),
    });
  }

  get definitionsForm() {
    return this.wordForm.get('definitions') as FormArray;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log(this.wordForm.value);
    this.store.dispatch(new EditWord(this.wordForm));
    // this.dialogRef.close(this.wordForm.value);
  }

  setInitialDefinitions() {
    return this.data.word.definitions.map(definition => {
      return this.fb.group({
        french: [definition.french],
        english: [definition.english],
        phonetic: [definition.phonetic],
        notes: [definition.notes],
      });
    });
  }

  addDefinition() {
    const definitionGroup = this.fb.group({
      french: [''],
      english: [''],
      phonetic: [''],
      notes: [''],
    });
    this.definitionsForm.push(definitionGroup);
  }

  deleteDefinition(i) {
    this.definitionsForm.removeAt(i);
  }


}
