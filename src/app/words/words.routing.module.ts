import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWordsComponent } from './components/my-words/my-words.component';
import { WordsListComponent } from './components/words-list/words-list.component';
import { WordsListContainerComponent } from './components/words-list-container/words-list-container.component';
import { WordsComponent } from './words.component';

const routes: Routes = [
  {
    path: '',
    component: WordsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: WordsListContainerComponent
      }
      // {
      //   path: 'create',
      //   component: AddWordComponent
      // },
      // {
      //   path: 'my-recipes',
      //   component: MyRecipesComponent
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
  },
  {
    path: 'my-words',
    component: MyWordsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule {}
