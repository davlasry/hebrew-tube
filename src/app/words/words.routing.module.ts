import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordsComponent } from './components/words-parent/words.component';
import { MyWordsComponent } from './components/my-words/my-words.component';

const routes: Routes = [
  {
    path: '',
    component: WordsComponent
    // children: [
    //   {path: '', redirectTo: 'list', pathMatch: 'full'},
    //   {
    //     path: 'list',
    //     component: WordsListComponent
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
  },
  {
    path: 'my-words',
    component: MyWordsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule {}
