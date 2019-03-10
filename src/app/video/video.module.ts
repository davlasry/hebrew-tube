import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRoutingModule } from './video.routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VideosEffects } from './state/effects/videos.effects';
import { VideoComponent } from './components/video/video.component';
import { CreateVideoComponent } from './containers/create-video/create-video.component';
import { EditVideoComponent } from './containers/edit-video/edit-video.component';
import { YoutubeComponent } from '../video/components/youtube/youtube.component';
import { VideosContainerComponent } from './containers/videos-container/videos-container.component';
import { VideosListContainerComponent } from './containers/videos-list-container/videos-list-container.component';
import { VideosComponent } from './components/videos-list/videos.component';
import { MyVideosListContainerComponent } from './containers/my-videos-list-container/my-videos-list-container.component';
import { MyVideosListComponent } from './components/my-videos-list/my-videos-list.component';
import { reducers } from './state';
import { MyVideosEffects } from './state/effects/myVideos.effects';
import { VideoCardComponent } from './components/video-card/video-card.component';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    StoreModule.forFeature('videos', reducers),
    EffectsModule.forFeature([VideosEffects, MyVideosEffects])
  ],
  declarations: [
    VideoComponent,
    CreateVideoComponent,
    VideosComponent,
    EditVideoComponent,
    VideosContainerComponent,
    VideosListContainerComponent,
    YoutubeComponent,
    MyVideosListComponent,
    MyVideosListContainerComponent,
    VideoCardComponent
  ]
})
export class VideoModule {}
