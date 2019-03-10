import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  ElementRef
} from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-word-dialog/delete-dialog.component';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWordsComponent implements OnInit, OnChanges {
  @Input() myWords;
  @Input() myWordsLoading;

  @Output() deleteFromMyWords = new EventEmitter();
  @Output() deleteManyFromMyWords = new EventEmitter();

  sort;

  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'select',
    'hebrew',
    'french',
    'pronunciation',
    'type',
    'buttons'
  ];

  selection: SelectionModel<any>;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.selection = new SelectionModel<any>(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.myWords.length > 0) {
      this.dataSource = new MatTableDataSource(this.myWords);
      this.dataSource.sort = this.sort;
    }
  }

  showWord(row) {
    console.log('showWord', row);
    this.router.navigate(['/words', row.id_word]);
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

  onDeleteFromMyWords(word, event) {
    event.stopPropagation();
    console.log('Delete From My Words Words-list component', word);
    this.deleteFromMyWords.emit(word);
  }

  deleteSelection() {
    // console.log(this.selection.selected.map(word => word._id));
    const wordsToDelete = this.selection.selected.map(word => word._id);
    this.selection.clear();
    this.deleteManyFromMyWords.emit(wordsToDelete);
  }

  onClickDeleteWord(word) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '250px',
      data: { word: word }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      // this.deleteFromMyWords.emit(result);
    });
  }

  onMoreOptions(event) {
    event.stopPropagation();
  }

  onClickFavorite(event) {
    event.stopPropagation();
  }
}
