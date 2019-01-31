import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './authentication/components/sign-up/sign-up.component';
import { LogInComponent } from './authentication/components/log-in/log-in.component';
import { ProfileComponent } from './authentication/components/profile/profile.component';
import { CustomPreloading } from './custom-preloading';
import { AuthGuard } from './core/guards/auth-guard.service';
import { HomeComponent } from './core/layout/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'videos',
    loadChildren: './video/video.module#VideoModule',
    canActivate: [AuthGuard],
    data: { preload: true }
  },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
  // { path: '**', component: 'NotFoundComponent' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloading
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
