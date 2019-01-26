import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { LoadWords } from '../../state/words.actions';
import { WordsState } from '../../state/words.reducers';
import { getAllWords, getWordsLoaded } from '../../state/words.selectors';
import { getUser } from 'src/app/authentication/state/user.selectors';
import {
  AddToMyWords,
  DeleteFromMyWords,
  LoadMyWords
} from '../../state/myWords.actions';
import { getMyWordsLoaded, getMyWords } from '../../state/myWords.selectors';

@Component({
  selector: 'app-words-list-container',
  templateUrl: './words-list-container.component.html',
  styleUrls: ['./words-list-container.component.scss']
})
export class WordsListContainerComponent implements OnInit {
  words$: Observable<any[]>;
  myWords$: Observable<any[]>;

  currentUserId;

  constructor(private store: Store<WordsState>) {}

  ngOnInit() {
    // console.log(LoadWords);
    this.store
      .pipe(select(getWordsLoaded))
      .pipe(take(1))
      .subscribe(hasLoaded => {
        if (!hasLoaded) {
          this.store.dispatch(new LoadWords());
        }
      });

    this.store
      .pipe(select(getUser))
      .subscribe(user => (this.currentUserId = user._id));

    this.store
      .pipe(select(getMyWordsLoaded))
      .pipe(take(1))
      .subscribe(hasLoaded => {
        // console.log(hasLoaded);
        if (!hasLoaded) {
          this.store.dispatch(new LoadMyWords(this.currentUserId));
        }
      });

    this.myWords$ = this.store.pipe(select(getMyWords));

    this.words$ = this.store.pipe(select(getAllWords));
    // this.words$.subscribe(words => console.log(words));
  }

  addToMyWords(word) {
    // console.log('add ', word);
    this.store.dispatch(new AddToMyWords(word));
  }

  deleteFromMyWords(word) {
    // console.log('delete ', word);
    this.store.dispatch(new DeleteFromMyWords(word));
  }
}
