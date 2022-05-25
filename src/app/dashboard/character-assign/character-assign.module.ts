import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CharacterAssignPageRoutingModule } from './character-assign-routing.module';
import { CharacterAssignPage } from './character-assign.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterAssignPageRoutingModule,
    TranslateModule
  ],
  declarations: [CharacterAssignPage]
})
export class CharacterAssignPageModule {}
