import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { VideoRoutingModule } from './video.routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateVideoComponent } from './create-video/create-video.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { videosReducer } from './state/videos.reducers';
import { VideosEffects } from './state/videos.effects';
import { VideosContainerComponent } from './videos-container/videos-container.component';
import { WordsModule } from '../words/words.module';
import { VideosComponent } from './videos-list/videos.component';
import { VideosListContainerComponent } from './videos-list-container/videos-list-container.component';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    StoreModule.forFeature('videos', videosReducer),
    EffectsModule.forFeature([VideosEffects])
    // WordsModule
  ],
  declarations: [
    VideoComponent,
    CreateVideoComponent,
    VideosComponent,
    EditVideoComponent,
    YoutubeComponent,
    VideosContainerComponent,
    VideosListContainerComponent
  ]
})
export class VideoModule {}
