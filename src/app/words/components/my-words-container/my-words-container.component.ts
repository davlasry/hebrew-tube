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

@Component({
  selector: 'app-my-words-container',
  templateUrl: './my-words-container.component.html',
  styleUrls: ['./my-words-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWordsContainerComponent implements OnInit, OnChanges {
  myWords$;

  constructor(private store: Store<MyWordsState>) {}

  ngOnInit() {
    this.myWords$ = this.store.pipe(select(getAllMyWords));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.words.length > 0) {
    //   this.dataSource = new MatTableDataSource(this.words);
    //   this.dataSource.sort = this.sort;
    // }
  }
}
