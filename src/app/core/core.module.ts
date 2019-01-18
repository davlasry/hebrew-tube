import { LayoutService } from './services/layout.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordsService } from './services/words.service';
import { YoutubePlayerService } from './services/youtube-player.service';
import { YoutubeApiService } from './services/youtube-api.service';
import { SessionsService } from './services/sessions.service';
import { VideosService } from './services/videos.service';
import { UsersService } from './services/users.service';
import { JwtService } from './services/jwt.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    WordsService,
    YoutubeApiService,
    YoutubePlayerService,
    LayoutService,
    SessionsService,
    VideosService,
    UsersService,
    JwtService
  ]
})
export class CoreModule {}
