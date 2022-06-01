import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { AssignPlayerAction } from 'src/app/store/game/game.actions';
import { GamePlayer } from 'src/app/store/game/game.state';

@Component({
    selector: 'app-assign-modal',
    templateUrl: './assign-modal.page.html',
    styleUrls: ['./assign-modal.page.scss'],
})
export class AssignModalPage implements OnInit {
    @ViewChild('nameInput') nameInput: IonInput;

    public player: GamePlayer;
    public assignName: string;

    constructor(
        private readonly modalCtrl: ModalController,
        private readonly store: Store
    ) { }

    ngOnInit() {
    }

    ionViewDidEnter(): void {
        this.nameInput.setFocus();
    }

    confirmAssign() {
        this.store.dispatch(new AssignPlayerAction({id: this.player.id, assign_name: this.assignName})).pipe(first()).subscribe(_ => {
            this.dismiss();
        });
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
