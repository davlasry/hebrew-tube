import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteVideoDialogComponent } from 'src/app/shared/dialogs/delete-video-dialog/delete-video-dialog.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  @Input() videos;
  @Input() isVideosLoaded;

  @Output() deleteVideo = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onClickDeleteVideo(video) {
    const dialogRef = this.dialog.open(DeleteVideoDialogComponent, {
      minWidth: '60%',
      // minHeight: '400px',
      height: '60%',
      data: { video }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.onDeleteVideo(result);
    });
  }

  onDeleteVideo(videoID) {
    this.deleteVideo.emit(videoID);
  }
}
