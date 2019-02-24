import { YoutubePlayerService } from 'src/app/core/services/youtube-player.service';
import {
  Component,
  OnInit,
  AfterContentInit,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';

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

  ngOnDestroy(): void {
    this.isPlayerReady = false;
    this.youtubePlayer.destroyPlayer();
    // this.youtubePlayer.isPlayerReady$.unsubscribe();
  }

  addYoutubeApiScript() {
    // const doc = window.document;
    // const playerApi = doc.createElement('script');
    // playerApi.type = 'text/javascript';
    // playerApi.src = 'https://www.youtube.com/iframe_api';
    // doc.body.appendChild(playerApi);
  }

  onLoad() {
    // console.log(this.video.youtubeLink);
    if (this.isVideoLoaded) {
      this.youtubePlayer.playVideo(this.video.link);
    } else {
      // console.log(this.isVideoLoaded);
      this.isVideoLoaded = true;
      const source = timer(1);
      source.subscribe(res => this.createPlayer());
    }
  }

  getVideoId(link) {
    console.log('getVideoId', link);
    return link.match(
      /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
    )[1];
  }

  createPlayer() {
    this.videoWidth = this.videoElem.nativeElement.offsetWidth;
    this.videoHeight = this.videoElem.nativeElement.offsetHeight;
    console.log(
      'videoWidth and videoHeight',
      this.videoWidth,
      this.videoHeight
    );
    this.youtubePlayer.createPlayer(
      this.getVideoId(this.video.link),
      this.videoWidth,
      this.videoHeight
    );
  }
}
