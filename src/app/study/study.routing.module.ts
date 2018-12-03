import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyComponent } from './study.component';
import { NewSessionComponent } from './new-session/new-session.component';


const routes: Routes = [
  {
    path: '',
    component: StudyComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {
        path: 'youtube/:id',
        component: YoutubeComponent
      },
      {
        path: 'list',
        component: SessionsListComponent
      },
      {
        path: 'new',
        component: NewSessionComponent
      },
      // {
      //   path: 'edit/:id',
      //   component: EditRecipeComponent
      // },
      // {
      //   path: ':id',
      //   component: WordComponent
      // }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class StudyRoutingModule { }

