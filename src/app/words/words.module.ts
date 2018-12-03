import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { WordsRoutingModule } from './words.routing.module';
import { CoreModule } from '../core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { WordsEffects } from './state/words.effect';
import { WordsListComponent } from './components/words-list/words-list.component';
import { WordsComponent } from './components/words-parent/words.component';
import { AddWordComponent } from './components/add-word/add-word.component';
import { WordComponent } from './components/word/word.component';
import { wordsReducer } from './state/words.reducer';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    WordsRoutingModule,
    CoreModule,
    StoreModule.forFeature('words', wordsReducer),
    EffectsModule.forFeature([WordsEffects]),
  ],
  declarations: [
    WordsListComponent,
    WordsComponent,
    AddWordComponent,
    WordComponent
  ]
})
export class WordsModule { }
