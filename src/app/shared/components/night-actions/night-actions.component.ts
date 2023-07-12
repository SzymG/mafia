import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GamePlayer } from 'src/app/store/game/game.state';
import { ModalService } from '../../services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../services/toast.service';
import { Store } from '@ngxs/store';
import { GestureController, Gesture, GestureDetail } from '@ionic/angular';

interface NightActionPlayer extends GamePlayer {
    index: number,
    weight: number
}

@Component({
    selector: 'app-night-actions',
    templateUrl: './night-actions.component.html',
    styleUrls: ['./night-actions.component.scss'],
})
export class NightActionsComponent implements OnInit {

    public players: NightActionPlayer[] = [];
    public selectedPlayer: NightActionPlayer;
    public selectedPlayerIndex: number;
    public segment: string = 'info';

    private swipeGesture: Gesture | null = null;
    private subscriber = new Subscription();

    constructor(
        private modalService: ModalService,
        private elementRef: ElementRef,
        private gestureCtrl: GestureController,
        private chr: ChangeDetectorRef,
        private translateService: TranslateService,
        private toastService: ToastService,
        private store: Store
    ) { }

    ngOnInit() {
        this.players = this.players.flatMap(player => {
            return player.weights.night.map((weight, index) => ({
                index,
                weight,
                ...player
            }));
        })
            .filter(nightPlayer => nightPlayer.weight > 0)
            .sort((a, b) => b.weight - a.weight);

        this.selectedPlayerIndex = 0;
        this.selectedPlayer = this.players[this.selectedPlayerIndex];

        this.createSwipeGesture();
    }

    ngOnDestroy(): void {
        this.swipeGesture?.destroy();
        this.swipeGesture = null;
        this.subscriber.unsubscribe();
    }

    dismiss() {
        this.modalService.dismiss();
    }

    nextAction() {
        this.selectedPlayerIndex++;
        this.selectedPlayer = this.players[this.selectedPlayerIndex];
    }

    createSwipeGesture() {
        this.swipeGesture = this.gestureCtrl.create({
            el: this.elementRef.nativeElement,
            gestureName: 'swipe',
            direction: 'x',
            threshold: 0,
            passive: false,
            canStart: () => true,
            onStart: () => { },
            onMove: (ev) => { },
            onEnd: (ev) => this.handleSwipeGesture(ev)
        });

        this.swipeGesture.enable(true);
    }

    handleSwipeGesture(ev: GestureDetail) {
        if (ev.deltaX > 0 && Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) {
            this.segment = 'info'; // Swipe right
            this.chr.detectChanges();
        } else if (ev.deltaX < 0 && Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) {
            this.segment = 'action'; // Swipe left
            this.chr.detectChanges();
        }
    }

    endActions() {
        this.modalService.dismiss();
        // this.modalService.showConfirmationModal(this.translateService.instant(`Voting.endVotingConfirm`)).then((confirmed) => {
        //     if (confirmed) {
        //         this.store.dispatch(new EndVotingAction(null)).pipe(first()).subscribe(() => {
        //             this.modalService.dismiss();
        //             this.toastService.presentToast(this.translateService.instant('Voting.endVotingSuccess'));
        //         });
        //     }
        // });
    }

    get selectedPlayerActionDone(): boolean {
        return true;
    }

    get isLastPlayerAction(): boolean {
        return this.selectedPlayerIndex == (this.players.length - 1);
    }
}
