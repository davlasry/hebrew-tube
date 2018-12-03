import { WordsService } from './../../../core/services/words.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private wordsService: WordsService
  ) { }

  ngOnInit() {
    console.log(this.data.words);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.wordsService.deleteManyWords(this.data.words).subscribe(res => {
      console.log(res);
    });
  }

}
