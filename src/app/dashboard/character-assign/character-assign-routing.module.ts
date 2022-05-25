import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterAssignPage } from './character-assign.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterAssignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterAssignPageRoutingModule {}
