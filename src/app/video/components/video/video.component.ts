import {
  Component,
  OnInit,
  AfterContentInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Location } from '@angular/common';
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

  currentUserId: string;
  isUserAdmin: Boolean;

  definitionShowed = null;

  selectedSentence = 0;

  timer = interval(500);

  timerSubscription: Subscription;

  currentTime: Number = 0;

  videoLength: Number = 100000;

  loopActivated: Boolean = false;

  isPlayerReady: Boolean = false;

  isVideoLoaded: Boolean = false;
  videoId: string;
  subtitleStartTime: Number;
  indexSubtitleStartTime;
  inputUrl: string;

  videoHeight: number;
  videoWidth: number;

  video: any;

  constructor(
    private youtubePlayer: YoutubePlayerService,
    private route: ActivatedRoute,
    private videosService: VideosService,
    public dialog: MatDialog,
    private store: Store<any>,
    private location: Location
  ) {}

  ngOnInit() {
    /* Get video details and starting time if param is set */
    this.getVideo();

    /* Check if the youtube playsr is ready */
    this.youtubePlayer.isPlayerReady$
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        // console.log('Player Ready: ', res);
        this.isPlayerReady = res;
      });

    /* Check if the user is Admin */
    this.store.pipe(select(getUser)).subscribe(user => {
      this.currentUserId = user.id;
      this.isUserAdmin = user.role === 'admin';
    });

    /* Actions to launch according to youtube player state */
    this.youtubePlayer.youtubePlayerState$.subscribe(state => {
      // console.log(`State: ${state}`);
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
    /* Get Video ID from url param */
    const id: string = this.route.snapshot.paramMap.get('id');
    // console.log('getVideo id route', id);

    /* Get current subtitle index from url param */
    this.indexSubtitleStartTime = parseInt(
      this.route.snapshot.paramMap.get('subtitle'),
      10
    );
    // console.log('this.indexSubtitleStartTime', this.indexSubtitleStartTime);

    /* Set current subtitle if subtitle index in param */
    if (this.indexSubtitleStartTime) {
      this.selectedSentence = this.indexSubtitleStartTime - 1;
      this.loopActivated = true;
    }

    /* Get video details */
    this.videosService.getVideo(id).subscribe(result => {
      // console.log('getVideo result', result);
      this.video = result.data;
      console.log('this.video.subtitles', this.video.subtitles);

      /* Get current subtitle starting time */
      if (this.indexSubtitleStartTime) {
        this.subtitleStartTime = parseFloat(
          this.video.subtitles[this.indexSubtitleStartTime - 1].startTime + 0.01
        );
      }
      // console.log('this.subtitleStartTime', this.subtitleStartTime);
      // this.inputUrl = this.video.link;
    });
  }

  onClickWord(word): void {
    this.youtubePlayer.pauseVideo();

    /* Open the word dialog */
    const dialogRef = this.dialog.open(ViewWordDialogComponent, {
      minWidth: '60%',
      // minHeight: '400px',
      height: '60%',
      data: { word, userId: this.currentUserId }
    });

    /* When the word dialog is closed */
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.youtubePlayer.resumeVideo();
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
        // console.log(time);
        const subtitles = this.video.subtitles;
        // console.log(subtitles);
        if (this.isPlayerReady) {
          // console.log('PLAYER READY');
          this.currentTime = this.youtubePlayer.getCurrentTime();
          console.log(time, this.currentTime);
          if (this.currentTime < subtitles[subtitles.length - 1].endTime) {
            console.log(
              'subtitles[subtitles.length - 1].endTime',
              subtitles[subtitles.length - 1].endTime
            );
            // console.log('subtitles', subtitles);
            // console.log('loopActivated', this.loopActivated);
            if (this.loopActivated) {
              if (this.currentTime > subtitles[this.selectedSentence].endTime) {
                this.youtubePlayer.skipTo(
                  subtitles[this.selectedSentence].startTime
                );
              }
            } else {
              console.log(
                'subtitles[this.selectedSentence]',
                subtitles[this.selectedSentence]
              );
              console.log('this.selectedSentence', this.selectedSentence);
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

  showDefinition(i) {
    this.definitionShowed = i;
    // console.log(this.definitionShowed);
  }

  onClickNext() {
    this.loopActivated = false;
    this.youtubePlayer.skipTo(
      parseInt(this.video.subtitles[this.selectedSentence + 1].startTime, 10) +
        0.5
    );
    this.selectedSentence++;
    this.currentTime = this.youtubePlayer.getCurrentTime();
  }

  onClickPrevious() {
    this.loopActivated = false;
    this.youtubePlayer.skipTo(
      parseInt(this.video.subtitles[this.selectedSentence - 1].startTime, 10) +
        0.5
    );
    this.selectedSentence--;
    this.currentTime = this.youtubePlayer.getCurrentTime();
  }

  onClickBeginning() {
    this.loopActivated = false;
    this.youtubePlayer.skipTo(0);
  }

  onClickLoop() {
    this.loopActivated = !this.loopActivated;
    console.log('isLoopActivated', this.loopActivated);
  }

  onClickPause() {}

  onClickGoBack() {
    this.location.back();
  }
}
