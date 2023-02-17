import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerItemComponent } from './components/player-item/player-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { PlayerInfoModalComponent } from './components/player-info-modal/player-info-modal.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToolbarActionsComponent } from './components/toolbar-actions/toolbar-actions.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { HistoryItemImagePipe } from './pipes/history-item-image.pipe';
import { VotingComponent } from './components/voting/voting.component';


@NgModule({
    declarations: [
        PlayerItemComponent,
        PlayerInfoModalComponent,
        ToolbarActionsComponent,
        HistoryItemComponent,
        HistoryItemImagePipe,
        VotingComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        PlayerItemComponent,
        PlayerInfoModalComponent,
        ToolbarActionsComponent,
        HistoryItemComponent,
        VotingComponent
    ]
})
export class SharedModule { }
