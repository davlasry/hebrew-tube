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
import {
  MatSort,
  MatTableDataSource,
  MatDialog,
  MatPaginator,
  PageEvent
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { WordsService } from 'src/app/core/services/words.service';
import { ViewWordDialogComponent } from 'src/app/shared/dialogs/view-word/view-word.component';
import { merge, of, Subscription, interval } from 'rxjs';
import {
  startWith,
  switchMap,
  map,
  catchError,
  distinctUntilChanged
} from 'rxjs/operators';

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
  @Output() getWords = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource([]);
  paginatorSubscription: Subscription;
  newWords = [];

  currentPage = 0;

  displayedColumns: string[] = [
    'select',
    'hebrew',
    'french',
    'pronunciation',
    'type',
    'buttons'
  ];

  pageSize: number;

  selection: SelectionModel<any>;

  constructor(public dialog: MatDialog, private wordsService: WordsService) {
    this.pageSize = 20;
  }

  ngOnInit() {
    console.log('this.dataSource:', this.dataSource);
    this.selection = new SelectionModel<any>(true);
  }

  ngAfterViewInit() {
    // if (this.paginatorSubscription) {
    //   this.paginatorSubscription.unsubscribe();
    // }
    // setTimeout(() => {
    //   return (this.paginatorSubscription = this.paginator.page
    //     .pipe(
    //       startWith({
    //         pageIndex: 0,
    //         pageSize: 20
    //       })
    //       // distinctUntilChanged()
    //     )
    //     .subscribe(res => {
    //       console.log('res', res);
    //       // console.log('this.words:', this.words);
    //       this.dataSource.data = this.words.slice(
    //         res.pageIndex * res.pageSize,
    //         res.pageIndex * res.pageSize + res.pageSize
    //       );
    //     }));
    // }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes:', changes);
    // console.log('Changes in WORDS LIST words', this.words);
    // console.log('this.paginatorSubscription:', this.paginatorSubscription);
    // console.log('Changes in WORDS LIST wordsLoading', this.wordsLoading);
    // if (this.paginatorSubscription) {
    //   this.paginatorSubscription.unsubscribe();
    // }
    // if (this.paginator) {
    // this.paginatorSubscription = this.paginator.page
    //   .pipe(
    //     startWith({
    //       pageIndex: 0,
    //       pageSize: 20
    //     })
    //     // distinctUntilChanged()
    //   )
    //   .subscribe(res => {
    //     console.log('res', res);
    //     this.dataSource.data = this.words.slice(
    //       res.pageIndex * res.pageSize,
    //       res.pageIndex * res.pageSize + res.pageSize
    //     );
    //   });
    // }
    if (this.words.length > 0) {
      // if (this.words.length > 0 && !this.paginatorSubscription) {
      // const intervalSubscription = interval(500).subscribe(val => {
      //   // console.log('val:', val);
      //   if (this.paginatorSubscription) {
      //     intervalSubscription.unsubscribe();
      //   }
      if (this.paginator) {
        this.paginatorSubscription = this.paginator.page
          .pipe(
            startWith({
              pageIndex: this.currentPage,
              pageSize: this.pageSize
            })
            // distinctUntilChanged()
          )
          .subscribe(res => {
            console.log('res', res);
            this.currentPage = res.pageIndex;
            // console.log(this.words[0]);
            this.dataSource.data = this.words.slice(
              res.pageIndex * this.pageSize,
              res.pageIndex * this.pageSize + this.pageSize
            );
            // console.log(
            //   this.words.slice(
            //     res.pageIndex * res.pageSize,
            //     res.pageIndex * res.pageSize + res.pageSize
            //   )
            // );
            // console.log('this.dataSource:', this.dataSource);
            // const payload = {
            //   sortOrder: 'asc',
            //   pageNumber: res['pageIndex'] + 1,
            //   pageSize: res['pageSize']
            // };
            // this.wordsService.getWords(payload).subscribe(res => {
            //   this.dataSource.data = [...res.data];
            //   console.log('this.dataSource:', this.dataSource);
            //   console.log('res', res);
            // });
            // });
          });
      }
      // // });
    }
  }

  ngOnDestroy() {
    this.paginatorSubscription.unsubscribe();
  }

  showWord(row) {
    // console.log('showWord', row);
    this.dialog.open(ViewWordDialogComponent, {
      // width: '250px',
      data: { word: row }
    });
    // this.router.navigate(['/words', row._id]);
  }

  onDeleteWord(word) {
    event.stopPropagation();
    // console.log('onDeleteWord', word);
    this.deleteWord.emit(word);
  }

  onEditWord(word) {
    event.stopPropagation();
    // console.log('onEditWord', word);
    this.editWord.emit(word);
  }

  onDeleteFromMyWords(word, event) {
    event.stopPropagation();
    // console.log('Delete From My Words Words-list component', word);
    this.deleteFromMyWords.emit(word);
  }

  onAddToMyWords(word, event) {
    event.stopPropagation();
    // console.log('Add To My Words Words-list component', word);
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
    // console.log('wordsToDelete:', wordsToDelete);

    this.selection.clear();
    this.deleteWords.emit(wordsToDelete);
  }
}
