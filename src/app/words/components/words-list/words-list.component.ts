import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  AfterViewInit
} from '@angular/core';
import { MatSort, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-word-dialog/delete-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { EditWordDialogComponent } from 'src/app/shared/dialogs/edit-word-dialog/edit-word-dialog.component';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { VideosService } from 'src/app/core/services/videos.service';
import { map } from 'rxjs/operators';
import { WordsService } from 'src/app/core/services/words.service';
import { Store, select } from '@ngrx/store';
import { WordsState } from '../../state/words.reducers';
import { getAllWords, getMyWords } from '../../state/words.selectors';
import { LoadMyWords } from '../../state/words.actions';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() words$: Observable<any[]>;
  @Output() deleteWords = new EventEmitter();

  wordsSubscribtion;

  currentUserWords;

  currentUserId;

  myWords$;

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private store: Store<WordsState>
  ) {}

  ngOnInit() {
    // TO DO: add to store
    this.usersService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserId = user._id;
      }
    });

    this.store.dispatch(new LoadMyWords(this.currentUserId));

    this.myWords$ = this.store.pipe(select(getMyWords));
  }

  ngOnChanges(changes) {
    this.words$.subscribe(val => console.log(val));
  }

  ngOnDestroy(): void {}

  onDeleteWord(word) {
    console.log(word);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '250px',
      data: {
        words: [word]
      }
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

  onEditWord(word) {
    const dialogRef = this.dialog.open(EditWordDialogComponent, {
      // width: '250px',
      data: {
        word
      }
    });
  }

  addToFavorite(wordToAdd): void {
    console.log('add to favorite');
    console.log(wordToAdd);
    this.usersService.addWordToFavorite(wordToAdd).subscribe(val => {
      console.log(val);
    });
  }

  removeFromFavorite(): void {
    console.log('remove from favorite');
  }
}
