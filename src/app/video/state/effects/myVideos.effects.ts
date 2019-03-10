import { Injectable, OnInit } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';
import {
  ADD_TO_MY_VIDEOS,
  LoadMyVideosSuccess,
  LOAD_MY_VIDEOS,
  AddToMyVideosSuccess,
  DeleteFromMyVideos,
  DELETE_FROM_MY_VIDEOS,
  DeleteFromMyVideosSuccess,
  AddToMyVideos,
  LoadMyVideos
} from '../actions/myVideos.actions';

@Injectable()
export class MyVideosEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  @Effect()
  getMyVideos$ = this.actions$.pipe(
    ofType(LOAD_MY_VIDEOS),
    switchMap((action: LoadMyVideos) => {
      console.log('LOAD MY VIDEOS EFFECT', action.payload);
      return this.usersService.getVideosByUser(action.payload).pipe(
        map(myVideos => {
          return new LoadMyVideosSuccess(myVideos.data);
        })
      );
    })
  );

  @Effect()
  addToMyVideos$: Observable<any> = this.actions$.ofType(ADD_TO_MY_VIDEOS).pipe(
    switchMap((action: AddToMyVideos) => {
      const payload = action.payload;
      console.log('ADD TO MY VIDEOS EFFECT', action.payload);
      return this.usersService.addToMyVideos(payload.video).pipe(
        map(myVideos => {
          return new AddToMyVideosSuccess(myVideos);
        })
      );
    })
  );

  @Effect()
  deleteFromMyVideos$: Observable<any> = this.actions$
    .ofType(DELETE_FROM_MY_VIDEOS)
    .pipe(
      switchMap((action: DeleteFromMyVideos) => {
        const payload = action.payload;
        console.log('DELETE FROM MY VIDEOS EFFECT', action.payload);
        return this.usersService.deleteFromMyVideos(payload.videoID).pipe(
          map(res => {
            console.log(res);
            return new DeleteFromMyVideosSuccess(res.videoID);
          })
        );
      })
    );
}
