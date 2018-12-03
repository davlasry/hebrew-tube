import { LayoutService } from './services/layout.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordsService } from './services/words.service';
import { YoutubePlayerService } from './services/youtube-player.service';
import { YoutubeApiService } from './services/youtube-api.service';
import { SessionsService } from './services/sessions.service';
import { VideosService } from './services/videos.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    WordsService,
    YoutubeApiService,
    YoutubePlayerService,
    LayoutService,
    SessionsService,
    VideosService
]
})
export class CoreModule { }
