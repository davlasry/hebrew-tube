import { VideosService } from './../../core/services/videos.service';
import {
  Component,
  OnInit,
  AfterContentInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { takeWhile, distinctUntilChanged } from 'rxjs/operators';
import { YoutubePlayerService } from 'src/app/core/services/youtube-player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('videoDiv') videoElem: ElementRef;

  definitionShowed = null;

  selectedSentence = 0;

  timer = interval(500);

  timerSubscription: Subscription;

  currentTime = 0;

  videoLength = 100000;

  loopActivated: Boolean = false;

  isPlayerReady: Boolean = false;

  isVideoLoaded = false;
  videoId;
  inputUrl;

  videoHeight: number;
  videoWidth: number;

  video: any;

  constructor(
    private youtubePlayer: YoutubePlayerService,
    private route: ActivatedRoute,
    private videosService: VideosService
  ) {}

  ngOnInit() {
    console.log('Video Component');
    this.getVideo();
    this.youtubePlayer.isPlayerReady$
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        // console.log('Player Ready: ', res);
        this.isPlayerReady = res;
      });

    this.youtubePlayer.youtubePlayerState$.subscribe(state => {
      console.log(`State: ${state}`);
      switch (state) {
        // -1 (unstarted)
        case -1:
          break;
        // 0 (ended)
        case 0:
          break;
        // 1 (playing)
        case 1:
          if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
          }
          this.getCurrentTime();
          break;
        // 2 (paused)
        case 2:
          this.currentTime = this.youtubePlayer.getCurrentTime();
          break;
        // 3 (buffering)
        case 3:
          break;
        // 5 (video cued)
      }
    });
  }

  ngAfterContentInit() {
    this.addYoutubeApiScript();
  }

  ngOnDestroy(): void {
    this.isPlayerReady = false;
    // this.youtubePlayer.isPlayerReady$.unsubscribe();
  }

  getVideo(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.videosService.getVideo(id).subscribe(result => {
      console.log(result);
      this.video = result;
      this.inputUrl = this.video.youtubeLink;
    });
  }

  getVideoSize() {
    this.videoWidth = this.videoElem.nativeElement.offsetWidth;
    console.log(this.videoWidth);
    this.videoHeight = this.videoElem.nativeElement.offsetHeight;
    console.log(this.videoHeight);
  }

  getCurrentTime() {
    this.timerSubscription = this.timer
      .pipe(takeWhile(v => this.currentTime < this.videoLength))
      .subscribe(time => {
        const subtitles = this.video.subtitles;
        this.currentTime = this.youtubePlayer.getCurrentTime();
        // console.log(time, this.currentTime);
        if (this.currentTime < subtitles[subtitles.length - 1].endTime) {
          // console.log(subtitles);
          if (this.loopActivated) {
            if (this.currentTime > subtitles[this.selectedSentence].endTime) {
              this.youtubePlayer.skipTo(
                subtitles[this.selectedSentence].startTime
              );
            }
          } else {
            const currentSentence = subtitles.find(elem => {
              // console.log(elem.startTime, elem.endTime);
              return (
                this.currentTime >= elem.startTime &&
                this.currentTime <= elem.endTime
              );
            });
            this.selectedSentence = subtitles.indexOf(currentSentence);
          }
          // console.log(currentSentence, this.selectedSentence);
        }
      });
  }

  addYoutubeApiScript() {
    const doc = window.document;
    const playerApi = doc.createElement('script');
    playerApi.type = 'text/javascript';
    playerApi.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApi);
  }

  getVideoId(link) {
    return link.match(
      /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
    )[1];
  }

  showDefinition(i) {
    this.definitionShowed = i;
    console.log(this.definitionShowed);
  }

  onClickNext() {
    this.youtubePlayer.skipTo(
      parseInt(this.video.subtitles[this.selectedSentence + 1].startTime, 10) +
        0.5
    );
    this.selectedSentence++;
    this.currentTime = this.youtubePlayer.getCurrentTime();
  }

  onClickPrevious() {
    this.youtubePlayer.skipTo(
      parseInt(this.video.subtitles[this.selectedSentence - 1].startTime, 10) +
        0.5
    );
    this.selectedSentence--;
    this.currentTime = this.youtubePlayer.getCurrentTime();
  }

  onClickBeginning() {
    this.youtubePlayer.skipTo(0);
  }

  onClickLoop() {
    this.loopActivated = !this.loopActivated;
    console.log(this.loopActivated);
  }

  onClickPause() {}
}
