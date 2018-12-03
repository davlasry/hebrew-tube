import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { VideoRoutingModule } from './video.routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateVideoComponent } from './create-video/create-video.component';
import { VideosComponent } from './videos/videos.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { YoutubeComponent } from './youtube/youtube.component';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
  ],
  declarations: [
    VideoComponent,
    CreateVideoComponent,
    VideosComponent,
    EditVideoComponent,
    YoutubeComponent
  ]
})
export class VideoModule { }
