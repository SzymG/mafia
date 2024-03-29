import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CharacterSelectionPageRoutingModule } from './character-selection-routing.module';
import { CharacterSelectionPage } from './character-selection.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigTableComponent } from './config-table/config-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterSelectionPageRoutingModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [CharacterSelectionPage, ConfigTableComponent]
})
export class CharacterSelectionPageModule {}
