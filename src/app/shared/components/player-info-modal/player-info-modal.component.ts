import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { KillPlayerAction } from 'src/app/store/game/game.actions';
import { GamePlayer } from 'src/app/store/game/game.state';
import { ModalService } from '../../services/modal.service';
import { GestureController, Gesture, GestureDetail } from '@ionic/angular';

@Component({
    selector: 'app-player-info-modal',
    templateUrl: './player-info-modal.component.html',
    styleUrls: ['./player-info-modal.component.scss'],
})
export class PlayerInfoModalComponent implements OnInit, OnDestroy {
    @HostListener('window:popstate', ['$event']) dismissModal() {
        this.dismiss();
    }

    public segment: string = 'info';
    public player: GamePlayer;
    public actionable: boolean = false;

    private swipeGesture: Gesture | null = null;

    constructor(
        private modalService: ModalService,
        private translateService: TranslateService,
        private gestureCtrl: GestureController,
        private elementRef: ElementRef,
        private chr: ChangeDetectorRef,
        private store: Store
    ) {}

    ngOnInit() {
        const modalState = {
            modal: true,
            desc: 'User assign modal'
        };

        history.pushState(modalState, null);
        this.actionable = !!this.player.user;

        this.createSwipeGesture();
    }

    ngOnDestroy(): void {
        this.swipeGesture?.destroy();
        this.swipeGesture = null;

        if (window.history.state.modal) {
            history.back();
        }
    }

    dismiss() {
        this.modalService.dismiss();
    }

    kill() {
        this.modalService.showConfirmationModal(this.translateService.instant('PlayerInfo.killConfirm')).then((confirmed) => {
            if(confirmed) {
                this.store.dispatch(new KillPlayerAction(this.player)).pipe(first()).subscribe(() => {
                    this.dismiss();
                });
            }
        });
    }

    createSwipeGesture() {
        this.swipeGesture = this.gestureCtrl.create({
            el: this.elementRef.nativeElement,
            gestureName: 'swipe',
            direction: 'x',
            threshold: 80,
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
}
