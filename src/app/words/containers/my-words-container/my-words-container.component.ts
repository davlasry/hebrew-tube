import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as myWordsSelectors from '../../state/selectors/myWords.selectors';
import { getUser } from 'src/app/authentication/state/user.selectors';
import {
  DeleteFromMyWords,
  DeleteManyFromMyWords
} from '../../state/actions/myWords.actions';
import { MyWordsState } from '../../state/reducers/myWords.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-words-container',
  templateUrl: './my-words-container.component.html',
  styleUrls: ['./my-words-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWordsContainerComponent implements OnInit {
  myWords$;
  myWordsLoading$: Observable<Boolean>;
  currentUserId;

  constructor(private store: Store<MyWordsState>) {}

  ngOnInit() {
    this.myWords$ = this.store.pipe(select(myWordsSelectors.getAllMyWords));
    this.myWordsLoading$ = this.store.pipe(
      select(myWordsSelectors.getMyWordsLoading)
    );
    this.store
      .select(getUser)
      .subscribe(user => (this.currentUserId = user.id));
  }

  deleteFromMyWords(wordToDelete) {
    console.log('deleteFromMyWords', wordToDelete);
    this.store.dispatch(
      new DeleteFromMyWords({
        wordID: wordToDelete._id,
        userId: this.currentUserId
      })
    );
  }

  deleteManyFromMyWords(wordsToDelete) {
    console.log('deleteManyFromMyWords', wordsToDelete);
    this.store.dispatch(
      new DeleteManyFromMyWords({
        words: wordsToDelete,
        userId: this.currentUserId
      })
    );
  }
}
