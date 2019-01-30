import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AddWord } from 'src/app/words/state/words.actions';
import {
  AddToMyWords,
  DeleteFromMyWords
} from 'src/app/words/state/myWords.actions';
import { getUser } from 'src/app/authentication/state/user.selectors';
import { map } from 'rxjs/operators';
import { getMyWords } from 'src/app/words/state/myWords.reducers';
import {
  getAllMyWords,
  getMyWordsIds
} from 'src/app/words/state/myWords.selectors';

@Component({
  selector: 'app-view-word',
  templateUrl: './view-word.component.html',
  styleUrls: ['./view-word.component.scss']
})
export class ViewWordDialogComponent implements OnInit {
  wordForm: FormGroup;
  isWordFavorite$;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewWordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store<any>
  ) {}

  ngOnInit() {
    // console.log(this.data);
    this.isWordFavorite$ = this.store.select(getMyWordsIds).pipe(
      map((myWords: string[]) => {
        console.log(myWords);
        return myWords.indexOf(this.data.word._id) != -1;
      })
    );

    this.isWordFavorite$.subscribe(val => console.log(val));
  }

  addToMyWords() {
    // console.log(this.data.word);
    this.store.dispatch(
      new AddToMyWords({ word: this.data.word, userId: this.data.userId })
    );
  }

  deleteFromMyWords() {
    // console.log(this.data.word);
    this.store.dispatch(
      new DeleteFromMyWords({ word: this.data.word, userId: this.data.userId })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
