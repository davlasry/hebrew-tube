import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from './core/core.module';
import { DeleteDialogComponent } from './shared/dialogs/delete-word-dialog/delete-dialog.component';
import { EditWordDialogComponent } from './shared/dialogs/edit-word-dialog/edit-word-dialog.component';
import { AddNewWordComponent } from './shared/dialogs/add-new-word/add-new-word.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './app-state';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UserModule } from './authentication/user.module';
import { UserEffects } from './authentication/state/user.effects';
import { WordsModule } from './words/words.module';
import { ProfileComponent } from './authentication/components/profile/profile.component';
import { CustomPreloading } from './custom-preloading';
import { ViewWordDialogComponent } from './shared/dialogs/view-word/view-word.component';
import { AppComponent } from './core/layout/app.component';
import { DeleteVideoDialogComponent } from './shared/dialogs/delete-video-dialog/delete-video-dialog.component';
import { VideoModule } from './video/video.module';
import { LearnModule } from './learn/learn.module';
import { WordCollectionsDialogComponent } from './shared/dialogs/word-collections/word-collections.component';

@NgModule({
  declarations: [
    AddNewWordComponent,
    DeleteDialogComponent,
    DeleteVideoDialogComponent,
    EditWordDialogComponent,
    ProfileComponent,
    ViewWordDialogComponent,
    WordCollectionsDialogComponent
  ],
  entryComponents: [
    AddNewWordComponent,
    DeleteDialogComponent,
    DeleteVideoDialogComponent,
    EditWordDialogComponent,
    ViewWordDialogComponent,
    WordCollectionsDialogComponent
  ],
  imports: [
    AppRoutingModule,
    LearnModule,
    UserModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    WordsModule,
    VideoModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CustomPreloading
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
