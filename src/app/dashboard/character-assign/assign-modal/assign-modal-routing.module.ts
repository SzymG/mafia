import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignModalPage } from './assign-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AssignModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignModalPageRoutingModule {}
