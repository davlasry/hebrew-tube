import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsContainerComponent } from './containers/collections-container/collections-container.component';
import { CollectionContainerComponent } from './containers/collection-container/collection-container.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionsRoutingModule } from './collections.routing.module';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CollectionsContainerComponent,
    CollectionContainerComponent,
    CollectionComponent,
    CollectionsListComponent
  ],
  imports: [CommonModule, CollectionsRoutingModule, SharedModule]
})
export class CollectionsModule {}
