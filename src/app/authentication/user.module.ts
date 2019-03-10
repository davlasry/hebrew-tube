import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CoreModule } from '../core/core.module';
import { UserRoutingModule } from './user.routing.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersListComponent } from './containers/users-list-container/users-list.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    UserRoutingModule
    // StoreModule.forFeature('user', userReducer),
    // EffectsModule.forFeature([UserEffects])
  ],
  declarations: [
    SignUpComponent,
    LogInComponent,
    UsersListComponent,
    UserDetailComponent
  ]
})
export class UserModule {}
