import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WordCollectionsDialogComponent } from 'src/app/shared/dialogs/word-collections/word-collections.component';
import { Store } from '@ngrx/store';
import { WordsState } from 'src/app/words/state';
import { EditWordDialogComponent } from 'src/app/shared/dialogs/edit-word-dialog/edit-word-dialog.component';
import { EditWord } from 'src/app/words/state/actions/words.actions';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() result;

  constructor(public dialog: MatDialog, private store: Store<WordsState>) {}

  ngOnInit() {}

  onClickFavorite(event) {
    const dialogRef = this.dialog.open(WordCollectionsDialogComponent, {
      // width: '250px',
      data: { word: this.result }
    });
  }

  editWord() {
    console.log('edit word', this.result);
    const dialogRef = this.dialog.open(EditWordDialogComponent, {
      // width: '250px',
      data: { word: this.result }
    });
  }
}
