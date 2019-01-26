import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { WordsRoutingModule } from './words.routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WordsEffects } from './state/words.effects';
import { WordsListComponent } from './components/words-list/words-list.component';
import { AddWordComponent } from './components/add-word/add-word.component';
import { WordComponent } from './components/word/word.component';
import { wordsReducer } from './state/words.reducers';
import { MyWordsComponent } from './components/my-words/my-words.component';
import { WordsListContainerComponent } from './components/words-list-container/words-list-container.component';
import { WordsComponent } from './words.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    WordsRoutingModule
    // StoreModule.forFeature('words', wordsReducer),
    // EffectsModule.forFeature([WordsEffects])
  ],
  declarations: [
    WordsListComponent,
    WordsListContainerComponent,
    AddWordComponent,
    WordComponent,
    WordsComponent,
    MyWordsComponent
  ]
})
export class WordsModule {}
