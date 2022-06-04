import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CharacterAssignPageRoutingModule } from './character-assign-routing.module';
import { CharacterAssignPage } from './character-assign.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CharacterAssignPageRoutingModule,
        TranslateModule,
        SharedModule
    ],
    declarations: [
        CharacterAssignPage
    ]
})
export class CharacterAssignPageModule { }
