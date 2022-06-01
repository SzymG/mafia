import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { AssignPlayerAction } from 'src/app/store/game/game.actions';
import { GamePlayer } from 'src/app/store/game/game.state';
import { User } from 'src/app/store/user/user.state';

@Component({
    selector: 'app-assign-modal',
    templateUrl: './assign-modal.page.html',
    styleUrls: ['./assign-modal.page.scss'],
})
export class AssignModalPage implements OnInit {
    public player: GamePlayer;
    public user: User;
    public userName: string;

    public segment: string = 'user';

    constructor(
        private readonly modalCtrl: ModalController,
        private readonly store: Store
    ) { }

    ngOnInit() {
    }

    confirmAssignUser() {
        // this.store.dispatch(new AssignPlayerAction({id: this.player.id, user: {assign_name: this.userName}})).pipe(first()).subscribe(_ => {
        //     this.dismiss();
        // });
    }

    confirmAssignName() {
        this.store.dispatch(new AssignPlayerAction({id: this.player.id, user: {assign_name: this.userName}})).pipe(first()).subscribe(_ => {
            this.dismiss();
        });
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
