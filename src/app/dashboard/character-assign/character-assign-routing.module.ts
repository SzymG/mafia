import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterAssignPage } from './character-assign.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterAssignPage
  },
  {
    path: 'assign-modal',
    loadChildren: () => import('./assign-modal/assign-modal.module').then( m => m.AssignModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterAssignPageRoutingModule {}
