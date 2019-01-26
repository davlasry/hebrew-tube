import { VideosComponent } from './videos/videos.component';
import { CreateVideoComponent } from './create-video/create-video.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { VideosContainerComponent } from './videos-container/videos-container.component';

const routes: Routes = [
  {
    path: '',
    component: VideosContainerComponent
  },
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
  // children: [
  //   // {path: '', redirectTo: 'list', pathMatch: 'full'},
  //   {
  //     path: 'create',
  //     component: CreateVideoComponent
  //   },
  //   {
  //     path: 'create',
  //     component: AddWordComponent
  //   },
  // {
  //   path: 'my-recipes',
  //   component: MyRecipesComponent
  // },
  // {
  //   path: 'edit/:id',
  //   component: EditRecipeComponent
  // },
  //   {
  //     path: ':id',
  //     component: WordComponent
  //   }
  // ]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule {}
