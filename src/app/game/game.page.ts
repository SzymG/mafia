import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
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
        private readonly store: Store,
        private readonly router: Router,
        private readonly alertController: AlertController,
        private translateService: TranslateService
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
        this.subscriber.unsubscribe();
    }

    startDay() {
        this.showConfirmationModal(this.translateService.instant('Game.startDayConfirm')).then((confirmed) => {
            if(confirmed) {
                this.store.dispatch(new StartDayAction()).pipe(first()).subscribe(_ => {
                    console.log('startDay');
                });
            }
        });
    }

    startNight() {
        this.showConfirmationModal(this.translateService.instant('Game.startNightConfirm')).then((confirmed) => {
            if(confirmed) {
                this.store.dispatch(new StartNightAction()).pipe(first()).subscribe(_ => {
                    console.log('startNight');
                });
            }
        });
    }

    endGame() {
        this.showConfirmationModal(this.translateService.instant('Game.endGameConfirm')).then((confirmed) => {
            if(confirmed) {
                this.store.dispatch(new ClearGameAction()).pipe(first()).subscribe(_ => {
                    this.router.navigate(['/tabs/dashboard']);
                });
            }
        });
    }

    showConfirmationModal(message: string) {
        return new Promise(async (resolve) => {
            const alert = await this.alertController.create({
                cssClass: 'confirmation-modal',
                header: message,
                buttons: [
                    {
                        text: this.translateService.instant('Basic.no'),
                        role: 'cancel',
                        handler: (_) => {
                            resolve(false);
                        }
                    }, {
                        text: this.translateService.instant('Basic.yes'),
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            });
    
            await alert.present();
        });
    }

    get isNight() {
        return this.game.phase === GAME_PHASE.night;
    }
}
