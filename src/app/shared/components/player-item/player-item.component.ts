import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GamePlayer } from 'src/app/store/game/game.state';
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
    @Input() class: string;
    @Input() selected: boolean = false;
    @Input() selectable: boolean = false;
    @Input() showInfoModal: boolean = false;
    @Input() withLabel: boolean = true;
    @Input() gamePlayer: GamePlayer;

    @Output() selectEvent = new EventEmitter<boolean>();

    public player: Player;

    constructor(
        private readonly modalCtrl: ModalController,
        private readonly playerService: PlayersService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.player = this.gamePlayer || this.playerService.getByName(this.name);
    }

    imageClick() {
        if (this.selectable) {
            this.selectEvent.emit(!this.selected);
        }
        if (this.showInfoModal) {
            this.showPlayerModal();
        }
    }

    labelClick() {
        if (this.showInfoModal) {
            this.showPlayerModal();
        }
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
