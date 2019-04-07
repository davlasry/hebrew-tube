import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { WordsService } from 'src/app/core/services/words.service';
import { ViewWordDialogComponent } from 'src/app/shared/dialogs/view-word/view-word.component';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// export class WordsListComponent implements OnInit, AfterViewInit {
export class WordsListComponent implements OnInit, OnChanges {
  @Input() words;
  @Input() myWords;
  @Input() wordsLoading;
  @Output() deleteWords = new EventEmitter();
  @Output() deleteFromMyWords = new EventEmitter();
  @Output() addToMyWords = new EventEmitter();
  @Output() deleteWord = new EventEmitter();
  @Output() editWord = new EventEmitter();

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

  selection: SelectionModel<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.selection = new SelectionModel<any>(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes in WORDS LIST', this.words);
    if (this.words.length > 0) {
      this.dataSource = new MatTableDataSource(this.words);
      this.dataSource.sort = this.sort;
    }
  }

  showWord(row) {
    console.log('showWord', row);
    const dialogRef = this.dialog.open(ViewWordDialogComponent, {
      // width: '250px',
      data: { word: row }
    });
    // this.router.navigate(['/words', row._id]);
  }

  onDeleteWord(word) {
    event.stopPropagation();
    console.log('onDeleteWord', word);
    this.deleteWord.emit(word);
  }

  onEditWord(word) {
    event.stopPropagation();
    console.log('onEditWord', word);
    this.editWord.emit(word);
  }

  onDeleteFromMyWords(word, event) {
    event.stopPropagation();
    console.log('Delete From My Words Words-list component', word);
    this.deleteFromMyWords.emit(word);
  }

  onAddToMyWords(word, event) {
    event.stopPropagation();
    console.log('Add To My Words Words-list component', word);
    this.addToMyWords.emit(word);
  }

  checkIfWordInMyWords(wordId) {
    if (this.myWords.length > 0) {
      const myWordsIds = this.myWords.map(myWord => myWord.id_word);
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
