import { WordsService } from './../../core/services/words.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-word-dialog/delete-dialog.component';
import { EditWordDialogComponent } from 'src/app/shared/dialogs/edit-word-dialog/edit-word-dialog.component';

@Component({
  selector: 'app-session-words',
  templateUrl: './session-words.component.html',
  styleUrls: ['./session-words.component.scss']
})
export class SessionWordsComponent implements OnInit {

  @Input() words;

  constructor(
    private wordsService: WordsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onDeleteWord(word) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '250px',
      data: {word}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // if (result === 1) {
      //   this.words = this.words.filter(e => {
      //         return e._id !== word._id;
      //   });
      //   this.dataSource.data = this.words;
      // }
      console.log(result);
    });
  }

  onEditWord(word) {
    const dialogRef = this.dialog.open(EditWordDialogComponent, {
      // width: '250px',
      data: {word}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.hebrew) {
        // this.wordsService.editWord(result).subscribe(res => {
        //   console.log(res);
        // });
      }
      console.log(result);
    });
  }

}
