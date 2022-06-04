import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserManagePageRoutingModule } from './user-manage-routing.module';

import { UserManagePage } from './user-manage.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserManagePageRoutingModule,
    TranslateModule
  ],
  declarations: [UserManagePage]
})
export class UserManagePageModule {}
