import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

const _window: any = window;

@Injectable()
export class YoutubePlayerService {

  currentTimeSubject = new BehaviorSubject('');
  currentTime$ = this.currentTimeSubject.asObservable();

  youtubePlayerStateSubject = new BehaviorSubject(-1);
  youtubePlayerState$ = this.youtubePlayerStateSubject.asObservable();

  isPlayerReadySubject = new BehaviorSubject(false);
  isPlayerReady$ = this.isPlayerReadySubject.asObservable();

  public yt_player;

  constructor() {
  }

  createPlayer(videoId: string, width, height): void {
    this.isPlayerReadySubject.next(false);
    // console.log(height, width);
    const youtubeInterval = setInterval(() => {
      if ((typeof _window.YT !== 'undefined') && _window.YT && _window.YT.Player) {
        // console.log(height, width);
        this.yt_player = new _window.YT.Player('youtube-player', {
          // host: 'https://www.youtube.com',
          width: width,
          height: height,
          videoId: videoId,
          playerVars: {
            iv_load_policy: '3',
            showinfo: '0',
            rel: '0',
            origin: 'http://localhost:4200'
          },
          events: {
            'onReady': (ev) => {
              this.onPlayerReady(ev);
            },
            'onStateChange': (ev) => {
              this.onPlayerStateChange(ev);
            }
          }
        });
        clearInterval(youtubeInterval);
      }
    }, 100);
  }

  resizePlayer(width: number, height: number) {
    // console.log(width, height);
    this.yt_player.setSize(width, height);
  }

  onPlayerReady(ev) {
    this.isPlayerReadySubject.next(true);
    // ev.target.playVideo();
  }

  onPlayerStateChange(event) {
    return this.youtubePlayerStateSubject.next(event.data);
  }

  getCurrentTime() {
    if (this.yt_player) {
      return this.yt_player.getCurrentTime();
    }
  }

  playVideo(videoId: string): void {
    this.yt_player.loadVideoById(videoId);
  }

  skipTo(time) {
    this.yt_player.seekTo(time);
  }

  destroyPlayer() {
    this.yt_player.destroy();
    this.youtubePlayerStateSubject.next(-1);
  }
}
