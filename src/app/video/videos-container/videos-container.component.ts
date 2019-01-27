import { Component, OnInit } from '@angular/core';
import { LoadVideos } from '../state/videos.actions';
import { Observable } from 'rxjs';
import { VideosState } from '../state/videos.reducers';
import { Store, select } from '@ngrx/store';
import { getAllVideos, getIsVideosLoaded } from '../state/videos.selectors';
import { getWordsLoaded } from 'src/app/words/state/words.selectors';
import { LoadWords } from 'src/app/words/state/words.actions';
import { getMyWordsLoaded } from 'src/app/words/state/myWords.reducers';
import { LoadMyWords } from 'src/app/words/state/myWords.actions';
import { getUser } from 'src/app/authentication/state/user.selectors';

@Component({
  selector: 'app-videos-container',
  templateUrl: './videos-container.component.html',
  styleUrls: ['./videos-container.component.scss']
})
export class VideosContainerComponent implements OnInit {
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
      console.log(user);
      return (this.currentUserId = user._id);
    });

    this.store.pipe(select(getWordsLoaded)).subscribe(hasLoaded => {
      if (!hasLoaded) {
        this.store.dispatch(new LoadWords());
      }
    });

    this.store.pipe(select(getMyWordsLoaded)).subscribe(hasLoaded => {
      if (!hasLoaded) {
        this.store.dispatch(new LoadMyWords(this.currentUserId));
      }
    });

    this.videos$ = this.store.pipe(select(getAllVideos));

    this.isVideosLoaded$ = this.store.pipe(select(getIsVideosLoaded));
  }
}
