import { WordsDataSource } from './words.datasource';
import { Component, OnInit, ViewChild, OnDestroy, Input, OnChanges, ChangeDetectionStrategy,
  EventEmitter, Output, AfterViewInit } from '@angular/core';
import { MatSort, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-word-dialog/delete-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { EditWordDialogComponent } from 'src/app/shared/dialogs/edit-word-dialog/edit-word-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsListComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() words$: Observable<any[]>;
  @Output() deleteWords = new EventEmitter();

  wordsSubscribtion;

  displayedColumns: string[] = ['select', 'hebrew', 'french', 'english', 'phonetic', 'sessions', 'createdAt', 'buttons'];
  columnsToDisplay = this.displayedColumns.slice();

  dataSource;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource = new WordsDataSource(this.words$, this.sort);
    console.log(this.dataSource);

    this.sort.sortChange.subscribe((sort) => {
      console.log(sort);
      this.dataSource.sort = sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes) {
    // console.log(changes, this.words);
    // this.updateData();
  }

  ngOnDestroy(): void {
  }



  // updateData() {
  //   console.log(this.words);
  //   if (this.dataSource) {
  //     this.dataSource.data = this.words;
  //     this.dataSource.sort = this.sort;
  //   } else {
  //     this.dataSource = new MatTableDataSource(this.words);
  //     this.dataSource.data = this.words;
  //     this.dataSource.sort = this.sort;
  //   }
  // }

  onDeleteWord(word) {
    console.log(word);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '250px',
      data: {words: [word]}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 1) {
        // this.words = this.words.filter(e => {
        //       return e._id !== word._id;
        // });
        // this.dataSource.data = this.words;
      }
      console.log(result);
    });
  }

  deleteMany() {
    const words = this.selection.selected;
    console.log(words);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '250px',
      data: {words}
    });

    const wordsIds = words.map(selectedWord => {
      return selectedWord._id;
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result === 1) {
    //     this.deleteWords.emit(wordsIds);
    //     // this.dataSource.data = this.words;
    //     this.selection.clear();
    //   }
    //   console.log(result);
    // });
  }

  onEditWord(word) {
    const dialogRef = this.dialog.open(EditWordDialogComponent, {
      // width: '250px',
      data: {word}
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleColumnToDisplay(columnToDisplay, value) {
    console.log(value.checked);
    console.log('toggle column to display');
    if (value.checked) {
      this.columnsToDisplay.splice(this.displayedColumns.indexOf(columnToDisplay), 0, columnToDisplay);
    } else {
      const index = this.columnsToDisplay.indexOf(columnToDisplay);
      if (index > -1) {
        this.columnsToDisplay.splice(index, 1);
      }
    }
  }
}

