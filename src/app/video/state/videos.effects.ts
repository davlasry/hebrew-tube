import { WordsService } from '../../core/services/words.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  LOAD_VIDEOS,
  LoadVideosSuccess,
  CREATE_VIDEO,
  CreateVideo,
  CreateVideoSuccess
} from './videos.actions';
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

  @Effect()
  createVideo$ = this.actions$.ofType(CREATE_VIDEO).pipe(
    switchMap((action: CreateVideo) => {
      console.log('CREATE VIDEO EFFECT', action.payload);
      return this.videosService.createVideo(action.payload).pipe(
        map((videos: any) => {
          return new CreateVideoSuccess(videos.data);
        })
        // catchError(error => new LoadWordsFail(error));
      );
    })
  );
}
