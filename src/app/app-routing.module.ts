import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'words'},
  { path: 'words', loadChildren: './words/words.module#WordsModule' },
  { path: 'study', loadChildren: './study/study.module#StudyModule' },
  { path: 'videos', loadChildren: './video/video.module#VideoModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

