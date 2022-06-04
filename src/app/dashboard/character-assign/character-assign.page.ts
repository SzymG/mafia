import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertInput, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { GameService } from 'src/app/shared/services/game.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AssignAllPlayersAction, AssignPlayerAction, MarkPlayersAsAssignedAction } from 'src/app/store/game/game.actions';
import { GamePlayer } from 'src/app/store/game/game.state';
import { User } from 'src/app/store/user/user.state';
import { AssignModalPage } from './assign-modal/assign-modal.page';
import { UserManagePage } from './user-manage-modal/user-manage.page';

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
        private readonly router: Router,
        private readonly translateService: TranslateService,
        private readonly toastService: ToastService,
        private readonly alertController: AlertController
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

    async manageUsers() {
        const modal = await this.modalCtrl.create({
            component: UserManagePage,
        });

        await modal.present();
    }

    async assignAutomatically() {
        const users = this.store.selectSnapshot<User[]>(state => state.user.users);
        const game = this.gameService.game;

        if (this.gameService.game.maxPlayersCount > users.length) {
            this.toastService.presentToast(this.translateService.instant('CharacterAssign.notEnoughPlayers'));
        } else {
            const assignSelectedPlayers = (selected) => {
                selected = this.shuffleArray(selected);

                this.store.dispatch(new AssignAllPlayersAction(selected)).pipe(first()).subscribe(() => {
                    this.toastService.presentToast(this.translateService.instant('CharacterAssign.assignedSuccessfully'));
                });
            }

            const userOptions: AlertInput[] = users.map((user, index) => {
                return {
                    name: user.id,
                    type: 'checkbox',
                    label: user.assign_name,
                    value: user,
                    checked: index < game.maxPlayersCount
                }
            });

            const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: this.translateService.instant('CharacterAssign.assignAutomatically') + ``,
                inputs: userOptions,
                buttons: [
                    {
                        text: this.translateService.instant('CharacterAssign.cancel'),
                        role: 'cancel',
                        handler: (_) => {
                        }
                    }, {
                        text: this.translateService.instant('CharacterAssign.save'),
                        handler: (selected) => {
                            if (selected.length !== game.maxPlayersCount) {
                                this.toastService.presentToast(this.translateService.instant('CharacterAssign.assignNotEqual', { selected: selected.length, of: game.maxPlayersCount }));
                                return false;
                            } else {
                                assignSelectedPlayers(selected);
                            }
                        }
                    }
                ]
            });

            await alert.present();
        }
    }

    get playersAssignedProperly() {
        return this.gameService.areAllPlayersAssigned();;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
}
