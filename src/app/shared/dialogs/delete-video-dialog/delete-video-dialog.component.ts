import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-video-dialog',
  templateUrl: './delete-video-dialog.component.html',
  styleUrls: ['./delete-video-dialog.component.scss']
})
export class DeleteVideoDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteVideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    console.log('DELETE VIDEO DIALOG DATA', this.data.video);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.dialogRef.close(this.data.video._id);
  }
}
