import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordsListContainerComponent } from './components/words-list-container/words-list-container.component';
import { WordsComponent } from './words.component';
import { MyWordsContainerComponent } from './components/my-words-container/my-words-container.component';
import { LibrariesComponent } from './components/libraries/libraries.component';
import { AuthGuard } from '../core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'words',
    component: WordsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: WordsListContainerComponent
      },
      {
        path: 'my-words',
        component: MyWordsContainerComponent
      },
      {
        path: 'library/:id',
        component: LibrariesComponent
      }
      // {
      //   path: 'create',
      //   component: AddWordComponent
      // },
      // {
      //   path: ':id',
      //   component: WordComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule {}
