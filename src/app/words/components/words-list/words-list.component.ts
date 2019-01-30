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
import { SelectionModel } from '@angular/cdk/collections';

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
    'select',
    'hebrew',
    'french',
    'pronunciation',
    'type',
    'buttons'
  ];

  selection = new SelectionModel<any>(true, []);

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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  deleteSelection() {
    // console.log(this.selection.selected.map(word => word._id));
    const wordsToDelete = this.selection.selected.map(word => word._id);
    this.selection.clear();
    this.deleteWords.emit(wordsToDelete);
  }
}
