import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { MyWordsState } from '../../state/myWords.reducers';
import { Store, select } from '@ngrx/store';
import { getAllMyWords } from '../../state/myWords.selectors';
import { getUser } from 'src/app/authentication/state/user.selectors';
import { map } from 'rxjs/operators';
import { DeleteFromMyWords } from '../../state/myWords.actions';

@Component({
  selector: 'app-my-words-container',
  templateUrl: './my-words-container.component.html',
  styleUrls: ['./my-words-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWordsContainerComponent implements OnInit, OnChanges {
  myWords$;
  currentUserId;

  constructor(private store: Store<MyWordsState>) {}

  ngOnInit() {
    this.myWords$ = this.store.pipe(select(getAllMyWords));
    this.store
      .select(getUser)
      .subscribe(user => (this.currentUserId = user._id));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.words.length > 0) {
    //   this.dataSource = new MatTableDataSource(this.words);
    //   this.dataSource.sort = this.sort;
    // }
  }

  deleteWords(wordsToDelete) {
    console.log(wordsToDelete);
    this.store.dispatch(
      new DeleteFromMyWords({
        words: wordsToDelete,
        userId: this.currentUserId
      })
    );
  }
}
