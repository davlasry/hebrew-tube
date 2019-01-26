import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './authentication/components/sign-up/sign-up.component';
import { LogInComponent } from './authentication/components/log-in/log-in.component';
import { HomeComponent } from './layout/home/home.component';
import { ProfileComponent } from './authentication/components/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'words', loadChildren: './words/words.module#WordsModule' },
  { path: 'study', loadChildren: './study/study.module#StudyModule' },
  { path: 'videos', loadChildren: './video/video.module#VideoModule' },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent }
  // { path: '**', component: 'NotFoundComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
