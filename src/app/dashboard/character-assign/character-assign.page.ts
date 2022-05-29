import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameService } from 'src/app/shared/services/game.service';
import { GamePlayer } from 'src/app/store/game/game.state';
import { AssignModalPage } from './assign-modal/assign-modal.page';

@Component({
    selector: 'app-character-assign',
    templateUrl: './character-assign.page.html',
    styleUrls: ['./character-assign.page.scss'],
})
export class CharacterAssignPage implements OnInit {
    public townGamePlayers: GamePlayer[] = [];
    public mafiaGamePlayers: GamePlayer[] = [];
    public neutralGamePlayers: GamePlayer[] = [];
    public civiliansGamePlayers: GamePlayer[] = [];

    constructor(
        private readonly gameService: GameService,
        private readonly modalCtrl: ModalController
    ) {
        this.townGamePlayers = this.gameService.getTownPlayers();
        this.mafiaGamePlayers = this.gameService.getMafiaPlayers();
        this.neutralGamePlayers = this.gameService.getNeutralPlayers();
        this.civiliansGamePlayers = this.gameService.getCiviliansPlayers();
    }

    ngOnInit() {
    }

    async assignPlayer(player: GamePlayer) {
        const modal = await this.modalCtrl.create({
            component: AssignModalPage,
            componentProps: { 
                player
            }
        });

        await modal.present();
    }

    confirmSelection() {
        // TODO zmienić odpowiednią flagę (akcja) i przejść na nowy route (game)
        console.log('confirm')
    }

    get playersAssignedProperly() {
        return this.gameService.areAllPlayersAssigned();;
    }
}
