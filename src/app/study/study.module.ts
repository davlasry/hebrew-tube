import { StudyRoutingModule } from './study.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeComponent } from './youtube/youtube.component';
import { StudyComponent } from './study.component';
import { SharedModule } from '../shared/shared.module';
import { DictionariesComponent } from './dictionaries/dictionaries.component';
import { NewSessionComponent } from './new-session/new-session.component';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { SessionWordsComponent } from './session-words/session-words.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StudyRoutingModule
  ],
  declarations: [YoutubeComponent, StudyComponent, DictionariesComponent, NewSessionComponent, SessionsListComponent, SessionWordsComponent]
})
export class StudyModule { }
