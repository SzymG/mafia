import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignModalPageRoutingModule } from './assign-modal-routing.module';

import { AssignModalPage } from './assign-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignModalPageRoutingModule,
    TranslateModule
  ],
  declarations: [AssignModalPage]
})
export class AssignModalPageModule {}
