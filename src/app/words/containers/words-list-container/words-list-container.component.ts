import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getAllWords } from '../../state/selectors/words.selectors';
import {
  AddToMyWords,
  DeleteFromMyWords
} from '../../state/actions/myWords.actions';
import { getUser } from 'src/app/authentication/state/user.selectors';
import { getAllMyWords } from '../../state/selectors/myWords.selectors';
import {
  DeleteWord,
  DeleteManyWords,
  EditWord
} from '../../state/actions/words.actions';
import * as wordsSelectors from '../../state/selectors/words.selectors';
import { MatDialog } from '@angular/material';
import { EditWordDialogComponent } from 'src/app/shared/dialogs/edit-word-dialog/edit-word-dialog.component';

@Component({
  selector: 'app-words-list-container',
  templateUrl: './words-list-container.component.html',
  styleUrls: ['./words-list-container.component.scss']
})
export class WordsListContainerComponent implements OnInit {
  words$: Observable<any[]>;
  myWords$: Observable<any[]>;
  wordsLoading$: Observable<Boolean>;

  currentUserId;

  constructor(private store: Store<any>, public dialog: MatDialog) {}

  ngOnInit() {
    this.myWords$ = this.store.pipe(select(getAllMyWords));

    this.words$ = this.store.pipe(select(getAllWords));

    this.wordsLoading$ = this.store.pipe(
      select(wordsSelectors.getWordsLoading)
    );

    this.store.pipe(select(getUser)).subscribe(user => {
      // console.log(user);
      return (this.currentUserId = user.id);
    });
  }

  addToMyWords(word) {
    console.log('add to my words', word);
    console.log('currentUserId ', this.currentUserId);
    word.id_word = word._id;
    this.store.dispatch(new AddToMyWords({ word, userId: this.currentUserId }));
  }

  deleteFromMyWords(word) {
    console.log('Delete from my words', word);
    word.id_word = word._id;
    this.store.dispatch(
      new DeleteFromMyWords({ wordID: word._id, userId: this.currentUserId })
    );
  }

  deleteManyWords(wordsToDelete) {
    console.log('delete Many Words', wordsToDelete);
    this.store.dispatch(new DeleteManyWords(wordsToDelete));
  }

  deleteWord(wordToDelete) {
    console.log('delete Word', wordToDelete);
    this.store.dispatch(new DeleteWord(wordToDelete));
  }

  editWord(wordToEdit) {
    const dialogRef = this.dialog.open(EditWordDialogComponent, {
      // width: '250px',
      data: { word: wordToEdit }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.store.dispatch(new EditWord(result));
      }
    });
  }

  getWords() {}
}
