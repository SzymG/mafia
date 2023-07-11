import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GamePlayer } from 'src/app/store/game/game.state';
import { Player } from 'src/app/store/players/players.state';
import { PlayersService } from '../../services/players.service';
import { PlayerInfoModalComponent } from '../player-info-modal/player-info-modal.component';

export interface PlayerItemConfig {
    name: string,
    selected?: boolean,
    showLabel?: boolean,
    showSymbol?: boolean,
    selectable?: boolean,
    deselectable?: boolean,
    showInfoModal?: boolean,
    class?: string,
    gamePlayer?: GamePlayer
}

const defaultConfig: PlayerItemConfig = {
    name: '',
    selected: false,
    showLabel: false,
    showSymbol: false,
    selectable: false,
    deselectable: false,
    showInfoModal: false,
    class: ''
}

@Component({
    selector: 'player-item',
    templateUrl: './player-item.component.html',
    styleUrls: ['./player-item.component.scss'],
})
export class PlayerItemComponent implements OnChanges {
    @Input() config: PlayerItemConfig;

    @Output() selectEvent = new EventEmitter<boolean>();

    public player: Player;
    public playerConfig: PlayerItemConfig;

    constructor(
        private readonly modalCtrl: ModalController,
        private readonly playerService: PlayersService
    ) {
        this.playerConfig = defaultConfig;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.player = this.config.gamePlayer || this.playerService.getByName(this.config.name);
        this.playerConfig = { ...defaultConfig, ...this.config };
    }

    imageClick() {
        if (this.config.selectable && !this.config.selected) {
            this.selectEvent.emit(true);
        }
        if (this.config.deselectable && this.config.selected) {
            this.selectEvent.emit(false);
        }
        if (this.config.showInfoModal) {
            this.showPlayerModal();
        }
    }

    labelClick() {
        if (this.config.showInfoModal) {
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
