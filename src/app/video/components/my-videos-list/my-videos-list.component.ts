import {
  Component,
  OnInit,
  SimpleChanges,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
  Input
} from '@angular/core';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-word-dialog/delete-dialog.component';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-videos-list',
  templateUrl: './my-videos-list.component.html',
  styleUrls: ['./my-videos-list.component.scss']
})
export class MyVideosListComponent implements OnInit {
  @Input() myVideos;
  @Input() myVideosLoading;

  @Output() deleteFromMyVideos = new EventEmitter();
  @Output() deleteManyFromMyVideos = new EventEmitter();

  sort;

  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['select', 'name', 'link', 'buttons'];

  selection: SelectionModel<any>;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.selection = new SelectionModel<any>(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.myVideos.length > 0) {
      this.dataSource = new MatTableDataSource(this.myVideos);
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

  onDeleteFromMyWords(video, event) {
    event.stopPropagation();
    console.log('Delete From My Videos component', video);
    this.deleteFromMyVideos.emit(video);
  }

  deleteSelection() {
    // console.log(this.selection.selected.map(word => word._id));
    const wordsToDelete = this.selection.selected.map(word => word._id);
    this.selection.clear();
    this.deleteManyFromMyVideos.emit(wordsToDelete);
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
}
