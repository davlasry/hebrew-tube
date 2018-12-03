import { VideosService } from './../../core/services/videos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  videos;

  constructor(
    private videosService: VideosService,
  ) { }

  ngOnInit() {
    this.videosService.getVideos().subscribe( res => {
      this.videos = res;
    });
  }

  onClickCreateVideo() {

  }

  onDeleteVideo(video) {

  }

  onEditVideo(video) {

  }

}
