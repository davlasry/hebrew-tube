import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUser } from 'src/app/authentication/state/user.selectors';
import { Observable } from 'rxjs';
import { MyVideosState } from '../../state/reducers/myVideos.reducers';
import * as myVideosSelectors from '../../state/selectors/myVideos.selectors';
import {
  DeleteFromMyVideos,
  DeleteManyFromMyVideos
} from '../../state/actions/myVideos.actions';

@Component({
  selector: 'app-my-videos-list-container',
  templateUrl: './my-videos-list-container.component.html',
  styleUrls: ['./my-videos-list-container.component.scss']
})
export class MyVideosListContainerComponent implements OnInit {
  myVideos$;
  myVideosLoading$: Observable<Boolean>;
  currentUserId;

  constructor(private store: Store<MyVideosState>) {}

  ngOnInit() {
    this.myVideos$ = this.store.pipe(select(myVideosSelectors.getAllMyVideos));
    this.myVideosLoading$ = this.store.pipe(
      select(myVideosSelectors.getMyVideosLoading)
    );
    this.store
      .pipe(select(getUser))
      .subscribe(user => (this.currentUserId = user.id));
  }

  deleteFromMyVideos(videoToDelete) {
    console.log('deleteFromMyVideos', videoToDelete);
    this.store.dispatch(
      new DeleteFromMyVideos({
        videoID: videoToDelete._id,
        userId: this.currentUserId
      })
    );
  }

  deleteManyFromMyVideos(videosToDelete) {
    console.log('deleteManyFromMyVideos', videosToDelete);
    this.store.dispatch(
      new DeleteManyFromMyVideos({
        videos: videosToDelete,
        userId: this.currentUserId
      })
    );
  }
}
