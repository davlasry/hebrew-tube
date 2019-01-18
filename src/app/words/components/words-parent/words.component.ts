import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { LoadWords } from '../../state/words.actions';
import { WordsState } from '../../state/words.reducers';
import { getAllWords, getWordsLoaded } from '../../state/words.selectors';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  words;

  words$: Observable<any[]>;

  wordsSubscribtion;

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
    this.words$ = this.store.pipe(select(getAllWords));
    // this.words$.subscribe(words => console.log(words));
  }

  deleteWords(wordsIds) {
    this.words = this.words.filter(e => {
      return wordsIds.indexOf(e._id) === -1;
    });
  }
}
