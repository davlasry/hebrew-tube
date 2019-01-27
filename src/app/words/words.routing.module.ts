import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWordsComponent } from './components/my-words/my-words.component';
import { WordsListComponent } from './components/words-list/words-list.component';
import { WordsListContainerComponent } from './components/words-list-container/words-list-container.component';
import { WordsComponent } from './words.component';
import { MyWordsContainerComponent } from './components/my-words-container/my-words-container.component';

const routes: Routes = [
  {
    path: 'words',
    component: WordsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: WordsListContainerComponent
      },
      {
        path: 'my-words',
        component: MyWordsContainerComponent
      }
      // {
      //   path: 'create',
      //   component: AddWordComponent
      // },
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule {}
