import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Player } from 'src/app/store/players/players.state';
import { PlayersService } from '../../services/players.service';
import { PlayerInfoModalComponent } from '../player-info-modal/player-info-modal.component';

@Component({
    selector: 'player-item',
    templateUrl: './player-item.component.html',
    styleUrls: ['./player-item.component.scss'],
})
export class PlayerItemComponent implements OnChanges {
    @Input() name: string;
    @Input() selected: boolean = false;
    @Input() selectable: boolean = false;

    @Output() selectEvent = new EventEmitter<boolean>();

    private player: Player;

    constructor(
        private readonly modalCtrl: ModalController,
        private readonly playerService: PlayersService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.player = this.playerService.getByName(this.name);
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
                player: this.player
            }
        });

        await modal.present();
    }
}
