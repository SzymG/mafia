import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { KillPlayerAction } from 'src/app/store/game/game.actions';
import { GamePlayer } from 'src/app/store/game/game.state';
import { ModalService } from '../../services/modal.service';

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

    constructor(
        private readonly modalService: ModalService,
        private readonly translateService: TranslateService,
        private readonly store: Store
    ) {}

    ngOnInit() {
        const modalState = {
            modal: true,
            desc: 'User assign modal'
        };

        history.pushState(modalState, null);
        this.actionable = !!this.player.user;
    }

    ngOnDestroy(): void {
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
}
