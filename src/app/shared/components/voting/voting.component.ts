import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { interval, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { EndVotingAction } from 'src/app/store/game/game.actions';
import { GamePlayer } from 'src/app/store/game/game.state';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit, OnDestroy {
    public players: GamePlayer[];
    public selectedPlayer: GamePlayer;
    public showAlive: boolean = true;

    private subscriber = new Subscription();
    private timerSeconds: number = 0;

    constructor(
        private modalService: ModalService,
        private translateService: TranslateService,
        private toastService: ToastService,
        private store: Store
    ) {
        const source = interval(1000);
        this.subscriber.add(source.subscribe(() => {
            this.timerSeconds += 1;
        }));
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    dismiss() {
        this.modalService.dismiss();
    }

    killSelected() {
        this.modalService.showConfirmationModal(this.translateService.instant(`Voting.${this.selectedPlayer ? 'hangPlayer' : 'endVoting'}Confirm`)).then((confirmed) => {
            if (confirmed) {
                this.store.dispatch(new EndVotingAction(this.selectedPlayer)).pipe(first()).subscribe(() => {
                    this.modalService.dismiss();
                    this.toastService.presentToast(this.translateService.instant('Voting.endVotingSuccess'));
                });
            }
        });
    }

    selectPlayer(player: GamePlayer) {
        if (this.selectedPlayer?.id === player.id) {
            this.selectedPlayer = null;
        } else {
            this.selectedPlayer = player;
        }
    }

    resetTimer() {
        this.timerSeconds = 0;
    }

    get time() {
        const minutes: number = Math.floor(this.timerSeconds / 60);
        return this.completeToTwoDigits(minutes) + ':' + this.completeToTwoDigits(this.timerSeconds - minutes * 60);
    }

    private completeToTwoDigits(number: number) {
        return number.toString().length > 1 ? number.toString() : `0${number.toString()}`;
    }
}
