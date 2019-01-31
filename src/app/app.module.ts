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
import { DeleteSessionDialogComponent } from './shared/dialogs/delete-session-dialog/delete-session-dialog.component';
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

@NgModule({
  declarations: [
    AddNewWordComponent,
    DeleteDialogComponent,
    DeleteSessionDialogComponent,
    EditWordDialogComponent,
    ProfileComponent,
    ViewWordDialogComponent
  ],
  entryComponents: [
    AddNewWordComponent,
    DeleteDialogComponent,
    DeleteSessionDialogComponent,
    EditWordDialogComponent,
    ViewWordDialogComponent
  ],
  imports: [
    AppRoutingModule,
    UserModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    WordsModule,
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
