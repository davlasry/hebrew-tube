import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  typeOptions,
  numberOptions,
  genreOptions,
  formeOptions,
  timeOptions
} from '../../models/word';
import { WordsService } from 'src/app/core/services/words.service';
import { EditWord } from 'src/app/words/state/actions/words.actions';
import { Store } from '@ngrx/store';
import { WordsState } from 'src/app/words/state';

@Component({
  selector: 'app-edit-word-dialog',
  templateUrl: './edit-word-dialog.component.html',
  styleUrls: ['./edit-word-dialog.component.scss']
})
export class EditWordDialogComponent implements OnInit {
  wordForm: FormGroup;
  types = typeOptions;
  genres = genreOptions;
  numbers = numberOptions;
  formes = formeOptions;
  times = timeOptions;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditWordDialogComponent>,
    private wordsService: WordsService,
    private store: Store<WordsState>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    console.log('DATA EDIT WORD DIALOG', this.data);

    this.wordForm = this.fb.group({
      hebrew: [
        this.data.word.hebrew,
        [Validators.required, Validators.pattern(/^[א-ת\s]+$/)]
      ],
      french: [this.data.word.french, [Validators.required]],
      pronunciation: [this.data.word.pronunciation, [Validators.required]],
      type: [this.data.word.type],
      forme: [this.data.word.forme],
      time: [this.data.word.time],
      genre: [this.data.word.genre],
      number: [this.data.word.number],
      infinitif: [this.data.word.infinitif],
      _id: [this.data.word._id]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFill() {
    this.wordsService.searchReverso(this.data.word.hebrew).subscribe(word => {
      console.log(word);
    });
  }

  onSave(): void {
    const data = {
      wordData: this.wordForm.value,
      overwrite: true
    };
    this.store.dispatch(new EditWord(data));
    this.dialogRef.close(this.wordForm.value);
  }
}
