import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AssignPlayerAction } from 'src/app/store/game/game.actions';
import { GamePlayer } from 'src/app/store/game/game.state';
import { User, UsersState, UserStateModel } from 'src/app/store/user/user.state';

@Component({
    selector: 'app-assign-modal',
    templateUrl: './assign-modal.page.html',
    styleUrls: ['./assign-modal.page.scss'],
})
export class AssignModalPage implements OnInit, OnDestroy {
    @Select(UsersState) users$: Observable<UserStateModel>;

    @HostListener('window:popstate', ['$event']) dismissModal() {
        this.dismiss();
    }
    
    public users: User[] = [];
    public player: GamePlayer;
    public userId: string;
    public userName: string;
    public segment: string = 'user';

    private subscriber: Subscription = new Subscription();

    constructor(
        private readonly modalCtrl: ModalController,
        private readonly store: Store
    ) {
        this.subscriber.add(
            this.users$.subscribe((userState) => { 
                this.users = userState.users;
            })
        );
    }

    ngOnInit() {
        const modalState = {
            modal: true,
            desc: 'User assign modal'
        };

        history.pushState(modalState, null);
    }

    ngOnDestroy(): void {
        if (window.history.state.modal) {
            history.back();
        }

        this.subscriber.unsubscribe();
    }

    confirmAssignUser() {
        const selectedUser = this.users.find((user) => {
            return this.userId === user.id;
        });
        
        this.store.dispatch(new AssignPlayerAction({id: this.player.id, user: selectedUser})).pipe(first()).subscribe(_ => {
            this.dismiss();
        });
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
