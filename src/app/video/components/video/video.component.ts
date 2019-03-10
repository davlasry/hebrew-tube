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
import { MatDialog } from '@angular/material';
import { ViewWordDialogComponent } from 'src/app/shared/dialogs/view-word/view-word.component';
import { Store, select } from '@ngrx/store';
import { getUser } from 'src/app/authentication/state/user.selectors';
import { VideosService } from 'src/app/core/services/videos.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('videoDiv') videoElem: ElementRef;

  currentUserId;
  isUserAdmin: Boolean;

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
    private videosService: VideosService,
    public dialog: MatDialog,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.getVideo();
    this.youtubePlayer.isPlayerReady$
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        // console.log('Player Ready: ', res);
        this.isPlayerReady = res;
      });

    this.store.pipe(select(getUser)).subscribe(user => {
      this.currentUserId = user.id;
      this.isUserAdmin = user.role === 'admin';
    });

    this.youtubePlayer.youtubePlayerState$.subscribe(state => {
      console.log(`State: ${state}`);
      switch (state) {
        // -1 (unstarted)
        case -1:
          if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
          }
          break;
        // 0 (ended)
        case 0:
          this.timerSubscription.unsubscribe();
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
          if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
          }
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
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  getVideo(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    // console.log('getVideo id route', id);
    this.videosService.getVideo(id).subscribe(result => {
      console.log('getVideo result', result);
      this.video = result.data;
      console.log(this.video.subtitles);
      // this.inputUrl = this.video.link;
    });
  }

  onClickWord(word): void {
    this.youtubePlayer.pauseVideo();
    const dialogRef = this.dialog.open(ViewWordDialogComponent, {
      minWidth: '60%',
      // minHeight: '400px',
      height: '60%',
      data: { word, userId: this.currentUserId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.youtubePlayer.resumeVideo();
      // this.animal = result;
    });
  }

  getVideoSize() {
    this.videoWidth = this.videoElem.nativeElement.offsetWidth;
    // console.log(this.videoWidth);
    this.videoHeight = this.videoElem.nativeElement.offsetHeight;
    // console.log(this.videoHeight);
  }

  getCurrentTime() {
    this.timerSubscription = this.timer
      .pipe(takeWhile(v => this.currentTime < this.videoLength))
      .subscribe(time => {
        const subtitles = this.video.subtitles;
        // console.log(subtitles);
        if (this.isPlayerReady) {
          this.currentTime = this.youtubePlayer.getCurrentTime();
          // console.log(time, this.currentTime);
          if (this.currentTime < subtitles[subtitles.length - 1].endTime) {
            // console.log('subtitles', subtitles);
            // console.log('loopActivated', this.loopActivated);
            if (this.loopActivated) {
              if (this.currentTime > subtitles[this.selectedSentence].endTime) {
                this.youtubePlayer.skipTo(
                  subtitles[this.selectedSentence].startTime
                );
              }
            } else {
              this.selectedSentence = subtitles.findIndex(elem => {
                // console.log(elem.startTime, elem.endTime);
                return (
                  this.currentTime >= elem.startTime &&
                  this.currentTime <= elem.endTime
                );
              });
            }
            // console.log('selectedSentence', this.selectedSentence);
          }
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

  // getVideoId(link) {
  //   console.log('getVideoId', link);
  //   return link.match(
  //     /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
  //   )[1];
  // }

  showDefinition(i) {
    this.definitionShowed = i;
    // console.log(this.definitionShowed);
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
    console.log('isLoopActivated', this.loopActivated);
  }

  onClickPause() {}
}
