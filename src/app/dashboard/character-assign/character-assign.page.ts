import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertInput, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { ToolbarActionsConfig } from 'src/app/shared/components/toolbar-actions/toolbar-actions.component';
import { GameService } from 'src/app/shared/services/game.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AssignAllPlayersAction, MarkPlayersAsAssignedAction } from 'src/app/store/game/game.actions';
import { GamePlayer, GamePlayers } from 'src/app/store/game/game.state';
import { User } from 'src/app/store/user/user.state';
import { AssignModalPage } from './assign-modal/assign-modal.page';
import { UserManagePage } from './user-manage-modal/user-manage.page';
import { PlayerItemConfig } from 'src/app/shared/components/player-item/player-item.component';

@Component({
    selector: 'app-character-assign',
    templateUrl: './character-assign.page.html',
    styleUrls: ['./character-assign.page.scss'],
})
export class CharacterAssignPage implements OnInit {
    
    public toolbarActionsConfig: ToolbarActionsConfig[] = [
        {
            text: this.translateService.instant('CharacterAssign.listManage'),
            handler: this.manageUsers.bind(this)
        },
        {
            text: this.translateService.instant('CharacterAssign.assignAutomatically'),
            handler: this.assignAutomatically.bind(this)
        },
    ];

    public gamePlayers: GamePlayers;

    constructor(
        private readonly gameService: GameService,
        private readonly modalCtrl: ModalController,
        private readonly store: Store,
        private readonly router: Router,
        private readonly translateService: TranslateService,
        private readonly toastService: ToastService,
        private readonly alertController: AlertController
    ) {
        this.gamePlayers = this.gameService.getPlayers();
    }

    ngOnInit() {
    }

    async assignPlayer(player: GamePlayer) {
        const users = this.store.selectSnapshot<User[]>(state => state.user.users);
        const selectedUser = users.find(user => user.id === player?.user?.id);

        const modal = await this.modalCtrl.create({
            component: AssignModalPage,
            componentProps: {
                player,
                userId: selectedUser?.id,
                userName: !selectedUser ? player?.user?.assign_name : null
            }
        });

        await modal.present();
    }

    confirmSelection() {
        this.store.dispatch(new MarkPlayersAsAssignedAction()).pipe(first()).subscribe(_ => {
            this.router.navigate(['/tabs/game']);
        });
    }

    getPlayerItemConfig(player: GamePlayer): PlayerItemConfig {
        return {
            name: player.name,
            selected: !!player.user?.assign_name,
            showLabel: true
        };
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
                cssClass: 'custom-alert',
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

    private shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
}
