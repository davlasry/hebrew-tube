import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { UsersListComponent } from './containers/users-list-container/users-list.component';

const routes: Routes = [
  {
    path: 'users',
    // component: VideosContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: UsersListComponent }
      //   {
      //     path: 'create',
      //     component: CreateVideoComponent
      //   },
      //   {
      //     path: 'edit/:id',
      //     component: EditVideoComponent
      //   },
      //   {
      //     path: ':id',
      //     component: VideoComponent
      //   }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
