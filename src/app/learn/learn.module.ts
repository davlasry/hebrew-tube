import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './components/learn/learn.component';
import { LearnContainerComponent } from './containers/learn-container/learn-container.component';
import { LearnRoutingModule } from './learn.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LearnComponent, LearnContainerComponent],
  imports: [CommonModule, LearnRoutingModule, SharedModule]
})
export class LearnModule {}
