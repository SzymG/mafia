import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlayersService } from '../../services/players.service';
import { PlayerInfoModalComponent } from '../player-info-modal/player-info-modal.component';

@Component({
    selector: 'player-item',
    templateUrl: './player-item.component.html',
    styleUrls: ['./player-item.component.scss'],
})
export class PlayerItemComponent {
    @Input() name: string;
    @Input() selected: boolean = false;
    @Input() selectable: boolean = false;

    @Output() selectEvent = new EventEmitter<boolean>();

    constructor(
        private readonly modalCtrl: ModalController,
        private readonly playerService: PlayersService
    ) {
    }

    imageClick() {
        if(this.selectable) {
            this.selectEvent.emit(!this.selected);
        } else {
            this.showPlayerModal();
        }
    }

    labelClick() {
        this.showPlayerModal();
    }

    private async showPlayerModal() {
        const modal = await this.modalCtrl.create({
            component: PlayerInfoModalComponent,
            componentProps: { 
                player: this.playerService.getByName(this.name)
            }
        });

        await modal.present();
    }
}
