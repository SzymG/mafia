import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AddUserAction, RemoveUserAction } from 'src/app/store/user/user.actions';
import { User, UsersState, UserStateModel } from 'src/app/store/user/user.state';

@Component({
    selector: 'app-user-manage',
    templateUrl: './user-manage.page.html',
    styleUrls: ['./user-manage.page.scss'],
})
export class UserManagePage implements OnInit, OnDestroy {
    @Select(UsersState) users$: Observable<UserStateModel>;

    @HostListener('window:popstate', ['$event']) dismissModal() {
        this.dismiss();
    }

    public users: User[] = [];
    public userName: string;

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
            desc: 'User manage modal'
        };

        history.pushState(modalState, null);
    }

    ngOnDestroy(): void {
        if (window.history.state.modal) {
            history.back();
        }

        this.subscriber.unsubscribe();
    }

    addUser() {
        this.store.dispatch(new AddUserAction(this.userName)).pipe(first()).subscribe(() => {
            this.userName = '';
        });
    }

    removeUser(user: User) {
        this.store.dispatch(new RemoveUserAction(user));
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
