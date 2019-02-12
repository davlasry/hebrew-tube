import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { VideosContainerComponent } from './containers/videos-container/videos-container.component';
import { VideosListContainerComponent } from './containers/videos-list-container/videos-list-container.component';
import { CreateVideoComponent } from './containers/create-video/create-video.component';
import { EditVideoComponent } from './containers/edit-video/edit-video.component';
import { VideoComponent } from './components/video/video.component';

const routes: Routes = [
  {
    path: '',
    component: VideosContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: VideosListContainerComponent },
      {
        path: 'create',
        component: CreateVideoComponent
      },
      {
        path: 'edit/:id',
        component: EditVideoComponent
      },
      {
        path: ':id',
        component: VideoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule {}
