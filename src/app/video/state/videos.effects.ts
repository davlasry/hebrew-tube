import { WordsService } from '../../core/services/words.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { LOAD_VIDEOS, LoadVideosSuccess } from './videos.actions';
import { VideosService } from 'src/app/core/services/videos.service';

@Injectable()
export class VideosEffects {
  constructor(
    private actions$: Actions,
    private videosService: VideosService
  ) {}

  @Effect()
  getVideos$ = this.actions$.ofType(LOAD_VIDEOS).pipe(
    switchMap(() => {
      // console.log('LOAD VIDEOS');
      return this.videosService
        .getVideos()
        .pipe(map((videos: any) => new LoadVideosSuccess(videos.data)));
      // catchError(error => new LoadWordsFail(error));
    })
  );
}
