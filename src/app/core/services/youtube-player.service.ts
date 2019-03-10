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

  constructor() {}

  createPlayer(videoId: string, width, height, startTime): void {
    this.isPlayerReadySubject.next(false);
    // console.log(height, width);
    const youtubeInterval = setInterval(() => {
      if (
        typeof _window.YT !== 'undefined' &&
        _window.YT &&
        _window.YT.Player
      ) {
        console.log('createPlayer', height, width);
        this.yt_player = new _window.YT.Player('youtube-player', {
          width: width,
          height: height,
          videoId: videoId,
          playerVars: {
            iv_load_policy: '3',
            showinfo: '0',
            rel: '0',
            origin: 'http://localhost:4200',
            host: 'https://www.youtube.com'
          },
          events: {
            onReady: ev => {
              this.onPlayerReady(ev, startTime);
            },
            onStateChange: ev => {
              this.onPlayerStateChange(ev);
            }
          }
        });
        clearInterval(youtubeInterval);
      }
    }, 100);
  }

  resizePlayer(width: number, height: number) {
    console.log('resizePlayer', width, height);
    this.yt_player.setSize(width, height);
  }

  onPlayerReady(ev, startTime) {
    this.isPlayerReadySubject.next(true);
    if (startTime) {
      this.yt_player.seekTo(startTime);
    }
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

  resumeVideo() {
    this.yt_player.playVideo();
  }

  pauseVideo() {
    this.yt_player.pauseVideo();
  }

  skipTo(time) {
    this.yt_player.seekTo(time);
  }

  destroyPlayer() {
    if (this.yt_player) {
      this.yt_player.destroy();
    }
    this.youtubePlayerStateSubject.next(-1);
  }

  getVideoId(link) {
    // console.log('getVideoId', link);
    const regex = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;
    return link.match(regex)[1];
  }
}
