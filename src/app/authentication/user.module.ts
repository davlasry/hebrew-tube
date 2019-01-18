import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { userReducer } from './state/user.reducers';
import { UserEffects } from './state/user.effects';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [SignUpComponent, LogInComponent]
})
export class UserModule {}
