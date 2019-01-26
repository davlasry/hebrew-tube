import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUser } from '../authentication/state/user.selectors';
import { getMyWordsLoaded } from './state/myWords.selectors';
import { take } from 'rxjs/operators';
import { LoadMyWords } from './state/myWords.actions';
import { LoadWords } from './state/words.actions';
import { getWordsLoaded } from './state/words.selectors';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  currentUserId;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    console.log('WORDS COMPONENT');
    this.store.pipe(select(getWordsLoaded)).subscribe(hasLoaded => {
      if (!hasLoaded) {
        this.store.dispatch(new LoadWords());
      }
    });

    this.store.pipe(select(getUser)).subscribe(user => {
      console.log(user);
      return (this.currentUserId = user._id);
    });

    this.store.pipe(select(getMyWordsLoaded)).subscribe(hasLoaded => {
      console.log(hasLoaded);
      if (!hasLoaded && this.currentUserId) {
        console.log(this.currentUserId);
        this.store.dispatch(new LoadMyWords(this.currentUserId));
      }
    });
  }
}
