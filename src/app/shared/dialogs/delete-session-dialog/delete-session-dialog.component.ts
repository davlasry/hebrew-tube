import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { SessionsService } from 'src/app/core/services/sessions.service';

@Component({
  selector: 'app-delete-session-dialog',
  templateUrl: './delete-session-dialog.component.html',
  styleUrls: ['./delete-session-dialog.component.scss']
})
export class DeleteSessionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private sessionsService: SessionsService
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.sessionsService.deleteSession(this.data.session._id).subscribe(res => {
      console.log(res);
    });
  }


}
