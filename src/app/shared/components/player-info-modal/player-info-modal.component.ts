import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { KillPlayerAction } from 'src/app/store/game/game.actions';
import { GamePlayer } from 'src/app/store/game/game.state';
import { Player } from 'src/app/store/players/players.state';

@Component({
    selector: 'app-player-info-modal',
    templateUrl: './player-info-modal.component.html',
    styleUrls: ['./player-info-modal.component.scss'],
})
export class PlayerInfoModalComponent implements OnInit {
    public segment: string = 'info';
    public player: GamePlayer;
    public actionable: boolean = false;

    constructor(
        private readonly modalCtrl: ModalController,
        private readonly alertController: AlertController,
        private readonly translateService: TranslateService,
        private readonly store: Store
    ) {}

    ngOnInit() {
        this.actionable = !!this.player.user;
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    kill() {
        this.showConfirmationModal(this.translateService.instant('PlayerInfo.killConfirm')).then((confirmed) => {
            if(confirmed) {
                this.store.dispatch(new KillPlayerAction(this.player)).pipe(first()).subscribe(() => {
                    this.dismiss();
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
}
