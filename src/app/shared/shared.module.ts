import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerItemComponent } from './components/player-item/player-item.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [PlayerItemComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [PlayerItemComponent]
})
export class SharedModule { }
