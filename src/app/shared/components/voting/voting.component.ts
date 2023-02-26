import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { interval, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { EndVotingAction } from 'src/app/store/game/game.actions';
import { GamePlayer } from 'src/app/store/game/game.state';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';

interface VotingGamePlayer extends GamePlayer {
    voting: {
        for: number,
        against: number
    }
}

@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit, OnDestroy {
    @HostListener('window:popstate', ['$event']) dismissModal() {
        this.dismiss();
    }

    public players: VotingGamePlayer[];
    public selectedPlayer: VotingGamePlayer;
    public showAlive: boolean = true;
    public isGuiltyPhase: boolean = false;

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
        const modalState = {
            modal: true,
            desc: 'Voting modal'
        };

        this.players.forEach(player => player.voting = { for: 0, against: 0 });

        history.pushState(modalState, null);
    }

    ngOnDestroy(): void {
        if (window.history.state.modal) {
            history.back();
        }

        this.subscriber.unsubscribe();
    }

    dismiss() {
        this.modalService.dismiss();
    }

    makeGuilty() {
        this.modalService.showConfirmationModal(this.translateService.instant(`Voting.makeGuiltyConfirm`, { name: this.selectedPlayer.user.assign_name })).then((confirmed) => {
            if (confirmed) {
                this.isGuiltyPhase = true;
                this.resetTimer();

                if (this.isGuiltyPhase) {
                    this.selectedPlayer.voting = { for: 0, against: 0 };
                } else {
                    this.players.forEach(player => player.voting = { for: 0, against: 0 });
                    this.selectedPlayer = null;
                }
            }
        });
    }

    endVoting() {
        this.modalService.showConfirmationModal(this.translateService.instant(`Voting.endVotingConfirm`)).then((confirmed) => {
            if (confirmed) {
                this.store.dispatch(new EndVotingAction(null)).pipe(first()).subscribe(() => {
                    this.modalService.dismiss();
                    this.toastService.presentToast(this.translateService.instant('Voting.endVotingSuccess'));
                });
            }
        });
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

    resetVoting() {
        this.modalService.showConfirmationModal(this.translateService.instant(`Voting.resetVotingConfirm`)).then((confirmed) => {
            if (confirmed) {
                this.resetState();
            }
        });
    }

    resetTimer() {
        this.timerSeconds = 0;
    }

    addVoteFor(player: VotingGamePlayer) {
        player.voting.for += 1;

        if(!this.isGuiltyPhase) {
            this.calculateVotes();
        }
    }

    addVoteAgainst(player: VotingGamePlayer) {
        player.voting.against += 1;
        
        if(!this.isGuiltyPhase) {
            this.calculateVotes();
        }
    }

    removeVoteFor(player: VotingGamePlayer) {
        player.voting.for -= 1;
        
        if(!this.isGuiltyPhase) {
            this.calculateVotes();
        }
    }

    removeVoteAgainst(player: VotingGamePlayer) {
        player.voting.against -= 1;
        
        if(!this.isGuiltyPhase) {
            this.calculateVotes();
        }
    }

    get time() {
        const minutes: number = Math.floor(this.timerSeconds / 60);
        return this.completeToTwoDigits(minutes) + ':' + this.completeToTwoDigits(this.timerSeconds - minutes * 60);
    }

    get canStartGuiltyPhase() {
        return !this.isGuiltyPhase && this.selectedPlayer && (this.selectedPlayer.voting.for - this.selectedPlayer.voting.against >= Math.ceil(this.players.length / 2));
    }

    get canKillSelectedPlayer() {
        return this.isGuiltyPhase && (this.selectedPlayer.voting.for > this.selectedPlayer.voting.against);
    }

    private completeToTwoDigits(number: number) {
        return number.toString().length > 1 ? number.toString() : `0${number.toString()}`;
    }

    private calculateVotes() {
        let playersWithTheMostVotes = [];
        let mostVotesCount = 0;

        this.players.forEach(player => {
            const playerVotesCount = player.voting.for - player.voting.against;

            if (playerVotesCount > mostVotesCount) {
                mostVotesCount = playerVotesCount;
                playersWithTheMostVotes = [player];
            } else if (playerVotesCount == mostVotesCount) {
                playersWithTheMostVotes = [...playersWithTheMostVotes, player];
            }
        });

        if(playersWithTheMostVotes.length == 1) {
            this.selectedPlayer = playersWithTheMostVotes[0];
        } else {
            this.selectedPlayer = null;
        }
    }

    private resetState() {
        this.resetTimer();

        if (this.isGuiltyPhase) {
            this.selectedPlayer.voting = { for: 0, against: 0 };
        } else {
            this.players.forEach(player => player.voting = { for: 0, against: 0 });
            this.selectedPlayer = null;
        }
    }
}
