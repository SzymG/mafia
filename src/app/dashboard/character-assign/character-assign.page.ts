import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { GameService } from 'src/app/shared/services/game.service';
import { MarkPlayersAsAssignedAction } from 'src/app/store/game/game.actions';
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
        private readonly modalCtrl: ModalController,
        private readonly store: Store,
        private readonly router: Router
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
        this.store.dispatch(new MarkPlayersAsAssignedAction()).pipe(first()).subscribe(_ => {
            this.router.navigate(['/tabs/game']);
        });
    }

    get playersAssignedProperly() {
        return this.gameService.areAllPlayersAssigned();;
    }
}
