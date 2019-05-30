import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import {
  AddToMyWords,
  DeleteFromMyWords
} from 'src/app/words/state/actions/myWords.actions';
import { getUser } from 'src/app/authentication/state/user.selectors';
import { map, distinctUntilChanged } from 'rxjs/operators';
import {
  getAllMyWords,
  getMyWordsIds
} from 'src/app/words/state/selectors/myWords.selectors';

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
        // console.log('getMyWordsIds', myWords);
        return myWords.indexOf(this.data.word._id) !== -1;
      })
      // distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );

    this.isWordFavorite$.subscribe(val => console.log(val));
  }

  addToMyWords() {
    console.log('addToMyWords', this.data.word);
    this.data.word.id_word = this.data.word._id;
    this.store.dispatch(
      new AddToMyWords({ word: this.data.word, userId: this.data.userId })
    );
  }

  deleteFromMyWords() {
    console.log('deleteFromMyWords data', this.data);
    this.store.dispatch(
      new DeleteFromMyWords({
        wordID: this.data.word._id
        // userId: this.data.userId
      })
    );
  }

  onClickEdit() {
    this.dialogRef.close('edit');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
