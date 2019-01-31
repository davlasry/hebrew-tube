import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { VideosState } from '../state/videos.reducers';
import { getIsVideosLoaded, getAllVideos } from '../state/videos.selectors';
import { LoadVideos } from '../state/videos.actions';
import { Observable } from 'rxjs';
import { getUser } from 'src/app/authentication/state/user.selectors';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list-container.component.html',
  styleUrls: ['./videos-list-container.component.scss']
})
export class VideosListContainerComponent implements OnInit {
  videos$: Observable<any>;
  isVideosLoaded$: Observable<any>;

  currentUserId;

  constructor(private store: Store<VideosState>) {}

  ngOnInit() {
    this.store.pipe(select(getIsVideosLoaded)).subscribe(hasLoaded => {
      if (!hasLoaded) {
        this.store.dispatch(new LoadVideos());
      }
    });

    this.store.pipe(select(getUser)).subscribe(user => {
      // console.log(user);
      return (this.currentUserId = user._id);
    });

    this.videos$ = this.store.pipe(select(getAllVideos));

    this.isVideosLoaded$ = this.store.pipe(select(getIsVideosLoaded));
  }
}
