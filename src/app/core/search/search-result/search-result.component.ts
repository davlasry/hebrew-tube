import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WordCollectionsDialogComponent } from 'src/app/shared/dialogs/word-collections/word-collections.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() result;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  editWord() {
    console.log('EDIT WORD');
  }

  onClickFavorite(event) {
    const dialogRef = this.dialog.open(WordCollectionsDialogComponent, {
      // width: '250px',
      data: { word: this.result }
    });
  }
}
