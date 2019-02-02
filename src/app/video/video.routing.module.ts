import { CreateVideoComponent } from './create-video/create-video.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { VideosContainerComponent } from './videos-container/videos-container.component';
import { VideosListContainerComponent } from './videos-list-container/videos-list-container.component';
import { AuthGuard } from '../core/guards/auth-guard.service';

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
