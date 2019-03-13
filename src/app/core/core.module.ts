import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordsService } from './services/words.service';
import { YoutubePlayerService } from './services/youtube-player.service';
import { YoutubeApiService } from './services/youtube-api.service';
import { SessionsService } from './services/sessions.service';
import { VideosService } from './services/videos.service';
import { UsersService } from './services/users.service';
import { JwtService } from './services/jwt.service';
import { HeaderComponent } from './layout/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AppComponent } from './layout/app.component';
import { CollectionsService } from './services/collections.service';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [HeaderComponent, AppComponent, HomeComponent],
  providers: [
    WordsService,
    YoutubeApiService,
    YoutubePlayerService,
    SessionsService,
    VideosService,
    UsersService,
    JwtService,
    CollectionsService
  ]
})
export class CoreModule {}
