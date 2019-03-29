import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { LearnComponent } from './components/learn/learn.component';
import { LearnContainerComponent } from './containers/learn-container/learn-container.component';
import { GenreComponent } from './containers/genre/genre.component';

const routes: Routes = [
  {
    path: 'learn',
    component: LearnContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: LearnComponent },
      {
        path: 'genre',
        component: GenreComponent
      }
      // {
      //   path: 'edit/:id',
      //   component: EditVideoComponent
      // },
      // {
      //   path: ':id',
      //   component: VideoComponent
      // },
      // {
      //   path: ':id/:subtitle',
      //   component: VideoComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule {}
