import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterListPageRoutingModule } from './character-list-routing.module';

import { CharacterListPage } from './character-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterListPageRoutingModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [CharacterListPage]
})
export class CharacterListPageModule {}
