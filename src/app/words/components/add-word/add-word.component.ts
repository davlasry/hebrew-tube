import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AddNewWordComponent } from 'src/app/shared/dialogs/add-new-word/add-new-word.component';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  @Output() wordAdded = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  resetForm() {}

  onClickAddWord() {
    const dialogRef = this.dialog.open(AddNewWordComponent, {
      // width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      this.wordAdded.emit(result);
    });
  }
}
