import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWordsComponent implements OnInit, OnChanges {
  @Input() myWords;
  @Input() currentUserId;

  @Output() deleteWords = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'select',
    'hebrew',
    'french',
    'pronunciation',
    'type'
  ];

  selection: SelectionModel<any>;

  constructor() {}

  ngOnInit() {
    this.selection = new SelectionModel<any>(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.myWords.length > 0) {
      this.dataSource = new MatTableDataSource(this.myWords);
      this.dataSource.sort = this.sort;
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
    this.deleteWords.emit(wordsToDelete);
  }
}
