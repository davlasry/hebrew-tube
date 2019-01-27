import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsListComponent implements OnInit, OnChanges {
  @Input() words;
  @Input() myWords;
  @Output() deleteWords = new EventEmitter();
  @Output() deleteFromMyWords = new EventEmitter();
  @Output() addToMyWords = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  dataSource;

  displayedColumns: string[] = [
    'hebrew',
    'french',
    'pronunciation',
    'type',
    'buttons'
  ];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.words.length > 0) {
      this.dataSource = new MatTableDataSource(this.words);
      this.dataSource.sort = this.sort;
    }
  }

  onDeleteFromMyWords(word) {
    this.deleteFromMyWords.emit(word);
  }

  onAddToMyWords(word) {
    console.log(word);
    this.addToMyWords.emit(word);
  }

  checkIfWordInMyWords(wordId) {
    if (this.myWords.length > 0) {
      const myWordsIds = this.myWords.map(myWord => myWord._id);
      return myWordsIds.includes(wordId);
    }
  }
}
