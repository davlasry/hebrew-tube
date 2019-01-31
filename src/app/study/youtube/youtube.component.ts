import {
  Component,
  OnInit,
  AfterContentInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  OnDestroy
} from '@angular/core';
import { YoutubePlayerService } from 'src/app/core/services/youtube-player.service';
import { ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../core/services/sessions.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChild('videoDiv') videoElem: ElementRef;

  session;

  isVideoLoaded = false;
  videoId;
  inputUrl;

  videoHeight;
  videoWidth;

  isWordsOpen: Boolean = true;

  isPlayerReady = false;

  constructor(
    private youtubePlayer: YoutubePlayerService,
    private sessionsService: SessionsService,
    private route: ActivatedRoute
  ) {}

  @HostListener('document:keypress', ['$event']) handleKeyboardEvent(event) {
    const elemType = event.target.nodeName;
    // console.log(event.keyCode);
    const keyNumber = event.keyCode;
    if (elemType !== 'INPUT' && keyNumber === 32) {
      this.toggleVideoPause();
    }
  }

  ngOnInit() {
    this.getSession();
    this.youtubePlayer.isPlayerReady$
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        console.log('Player Ready: ', res);
        this.isPlayerReady = res;
      });
  }

  ngAfterContentInit() {
    this.addYoutubeApiScript();
  }

  ngAfterViewInit() {
    this.getVideoSize();
  }

  ngOnDestroy(): void {
    this.isPlayerReady = false;
    // this.youtubePlayer.isPlayerReady$.unsubscribe();
  }

  getSession(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.sessionsService.getSession(id).subscribe(result => {
      this.session = result;
      this.inputUrl = this.session.youtubeLink;
      this.onLoad();
      console.log(result);
    });
  }

  toggleVideoPause() {
    console.log('toggle pause');
  }

  getVideoSize() {
    this.videoWidth = this.videoElem.nativeElement.offsetWidth;
    this.videoHeight = this.videoElem.nativeElement.offsetHeight;
  }

  addYoutubeApiScript() {
    const doc = window.document;
    const playerApi = doc.createElement('script');
    playerApi.type = 'text/javascript';
    playerApi.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApi);
  }

  onLoad() {
    this.videoId = this.getVideoId(this.inputUrl);
    if (this.isVideoLoaded) {
      this.youtubePlayer.playVideo(this.videoId);
    } else {
      console.log(this.inputUrl);
      this.isVideoLoaded = true;
      this.youtubePlayer.createPlayer(
        this.videoId,
        this.videoWidth,
        this.videoHeight
      );
    }
  }

  getVideoId(link) {
    return link.match(
      /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
    )[1];
  }

  onToggleWords() {
    this.isWordsOpen = !this.isWordsOpen;
    // this.getVideoSize();
    // this.youtubePlayer.resizePlayer(this.videoWidth, this.videoHeight);
    // this.layoutService.toggleWords(this.isWordsOpen);
  }

  testKey() {
    // console.log('aaaaa');
  }

  onSaveLink() {
    this.session.youtubeLink = this.inputUrl;
    this.sessionsService.saveSession(this.session).subscribe(res => {
      console.log(res);
    });
  }
}
