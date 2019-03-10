import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { YoutubePlayerService } from 'src/app/core/services/youtube-player.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCardComponent implements OnInit {
  @Input() video;

  @Output() deleteVideo = new EventEmitter();

  loaded: Boolean = false;

  constructor(private youtubePlayer: YoutubePlayerService) {}

  ngOnInit() {
    this.getImageUrl();
    // console.log('INIT VIDEO CARD');
  }

  getImageUrl() {
    const regex = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;
    // console.log(this.video.link.match(regex));
    if (this.video.link.match(regex)) {
      const videoId = this.youtubePlayer.getVideoId(this.video.link);
      // console.log(`https://img.youtube.com/vi/${videoId}/default.jpg`);
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } else {
      return 'https://material.angular.io/assets/img/examples/shiba2.jpg';
    }
  }

  onLoadImage() {
    // console.log('IMAGE LOADED');
    this.loaded = true;
  }

  onDeleteVideo() {
    this.deleteVideo.emit(this.video._id);
  }
}
