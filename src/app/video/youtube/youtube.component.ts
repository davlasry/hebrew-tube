import { YoutubePlayerService } from 'src/app/core/services/youtube-player.service';
import { YoutubeApiService } from './../../core/services/youtube-api.service';
import {
  Component,
  OnInit,
  AfterContentInit,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit, AfterContentInit {
  @Input() video;

  @ViewChild('videoDiv') videoElem: ElementRef;

  isVideoLoaded = false;

  isPlayerReady: Boolean;

  videoWidth;
  videoHeight;

  constructor(private youtubePlayer: YoutubePlayerService) {}

  ngOnInit() {
    // console.log(this.videoElem.nativeElement.offsetWidth, this.videoElem.nativeElement.offsetHeight);
  }

  ngAfterContentInit() {
    this.addYoutubeApiScript();
    this.youtubePlayer.isPlayerReady$
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        console.log('Player Ready: ', res);
        this.isPlayerReady = res;
      });
    this.onLoad();
  }

  addYoutubeApiScript() {
    const doc = window.document;
    const playerApi = doc.createElement('script');
    playerApi.type = 'text/javascript';
    playerApi.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApi);
  }

  onLoad() {
    // console.log(this.video.youtubeLink);
    if (this.isVideoLoaded) {
      this.youtubePlayer.playVideo(this.video.youtubeLink);
    } else {
      // console.log(this.isVideoLoaded);
      this.isVideoLoaded = true;
      this.createPlayer();
    }
  }

  getVideoId(link) {
    return link.match(
      /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
    )[1];
  }

  createPlayer() {
    this.videoWidth = this.videoElem.nativeElement.offsetWidth;
    this.videoHeight = this.videoElem.nativeElement.offsetHeight;
    console.log(this.videoWidth, this.videoHeight);
    this.youtubePlayer.createPlayer(
      this.getVideoId(this.video.youtubeLink),
      this.videoWidth,
      this.videoHeight
    );
  }
}
