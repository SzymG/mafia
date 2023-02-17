import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { VotingComponent } from '../shared/components/voting/voting.component';
import { ModalService } from '../shared/services/modal.service';
import { ClearGameAction, StartDayAction, StartNightAction } from '../store/game/game.actions';
import { GameState, GameStateModel, GAME_PHASE } from '../store/game/game.state';

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {
    @Select(GameState) game$: Observable<GameStateModel>;

    public game: GameStateModel;

    private subscriber: Subscription = new Subscription();

    constructor(
        private store: Store,
        private router: Router,
        private modalCtrl: ModalController,
        private translateService: TranslateService,
        private modalService: ModalService
    ) {
        this.subscriber.add(
            this.game$.subscribe((game) => { 
                this.game = game;
            })
        );
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();``
    }

    startDay() {
        this.modalService.showConfirmationModal(this.translateService.instant('Game.startDayConfirm')).then((confirmed) => {
            if(confirmed) {
                this.store.dispatch(new StartDayAction()).pipe(first()).subscribe(_ => {});
            }
        });
    }

    startNight() {
        this.modalService.showConfirmationModal(this.translateService.instant('Game.startNightConfirm')).then((confirmed) => {
            if(confirmed) {
                this.store.dispatch(new StartNightAction()).pipe(first()).subscribe(_ => {});
            }
        });
    }

    endGame() {
        this.modalService.showConfirmationModal(this.translateService.instant('Game.endGameConfirm')).then((confirmed) => {
            if(confirmed) {
                this.store.dispatch(new ClearGameAction()).pipe(first()).subscribe(_ => {
                    this.router.navigate(['/tabs/dashboard']);
                });
            }
        });
    }

    async startVoting() {
        const modal = await this.modalCtrl.create({
            component: VotingComponent,
            componentProps: { 
                players: this.game.players
            }
        });

        await modal.present();
    }

    get isNight() {
        return this.game.phase === GAME_PHASE.night;
    }
}
