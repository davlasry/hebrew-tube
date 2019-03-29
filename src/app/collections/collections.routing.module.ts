import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { CollectionsContainerComponent } from './containers/collections-container/collections-container.component';
import { CollectionsListContainerComponent } from './containers/collections-list-container/collections-list-container.component';
import { CollectionContainerComponent } from './containers/collection-container/collection-container.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';

const routes: Routes = [
  {
    path: 'collections',
    component: CollectionsContainerComponent,
    // canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'list/', pathMatch: 'full' },
      {
        path: '',
        component: CollectionsListComponent,
        children: [{ path: ':id', component: CollectionComponent }]
      }
      // {
      //   path: 'list/:id',
      //   component: CollectionsListContainerComponent
      // }
      // {
      //   path: ':id',
      //   component: CollectionContainerComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule {}
