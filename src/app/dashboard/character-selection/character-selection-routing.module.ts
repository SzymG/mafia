import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterSelectionPage } from './character-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterSelectionPageRoutingModule {}
