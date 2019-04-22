import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { WordsRoutingModule } from './words.routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WordsEffects } from './state/effects/words.effects';
import { WordsListComponent } from './components/words-list/words-list.component';
import { AddWordComponent } from './components/add-word/add-word.component';
import { WordComponent } from './components/word/word.component';
import { MyWordsComponent } from './components/my-words/my-words.component';
import { WordsComponent } from './words.component';
import { reducers } from './state';
import { MyWordsEffects } from './state/effects/myWords.effects';
import { WordsListContainerComponent } from './containers/words-list-container/words-list-container.component';
import { MyWordsContainerComponent } from './containers/my-words-container/my-words-container.component';
import { CollectionsEffects } from './state/effects/collections.effects';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    WordsRoutingModule,
    StoreModule.forFeature('words', reducers),
    EffectsModule.forFeature([WordsEffects, MyWordsEffects, CollectionsEffects])
  ],
  declarations: [
    WordsListComponent,
    WordsListContainerComponent,
    AddWordComponent,
    WordComponent,
    WordsComponent,
    MyWordsComponent,
    MyWordsContainerComponent,
    WordsComponent
  ]
})
export class WordsModule {}
