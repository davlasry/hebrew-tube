import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getAllWords } from '../../state/selectors/words.selectors';
import {
  AddToMyWords,
  DeleteFromMyWords
} from '../../state/actions/myWords.actions';
import { WordsState } from '../../state';
import { getUser } from 'src/app/authentication/state/user.selectors';
import { getAllMyWords } from '../../state/selectors/myWords.selectors';
import { DeleteWords, DeleteWord } from '../../state/actions/words.actions';

@Component({
  selector: 'app-words-list-container',
  templateUrl: './words-list-container.component.html',
  styleUrls: ['./words-list-container.component.scss']
})
export class WordsListContainerComponent implements OnInit {
  words$: Observable<any[]>;
  myWords$: Observable<any[]>;

  currentUserId;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.myWords$ = this.store.pipe(select(getAllMyWords));

    this.words$ = this.store.pipe(select(getAllWords));
    // this.words$.subscribe(words => console.log(words));

    this.store.pipe(select(getUser)).subscribe(user => {
      // console.log(user);
      return (this.currentUserId = user.id);
    });
  }

  addToMyWords(word) {
    console.log('add ', word);
    console.log('currentUserId ', this.currentUserId);
    this.store.dispatch(new AddToMyWords({ word, userId: this.currentUserId }));
  }

  deleteFromMyWords(word) {
    console.log('delete ', word);
    this.store.dispatch(
      new DeleteFromMyWords({ words: [word.id], userId: this.currentUserId })
    );
  }

  deleteWords(wordsToDelete) {
    console.log(wordsToDelete);
    this.store.dispatch(new DeleteWords(wordsToDelete));
  }

  deleteWord(wordToDelete) {
    console.log(wordToDelete);
    this.store.dispatch(new DeleteWord(wordToDelete));
  }
}
