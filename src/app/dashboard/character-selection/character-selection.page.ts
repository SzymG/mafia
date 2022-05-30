import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { GameService } from 'src/app/shared/services/game.service';
import { PlayersService } from 'src/app/shared/services/players.service';
import {
    ChangePlayersCountAction, SelectCiviliansAndMarkAsSelectedAction,
    SelectPlayerAction, UnselectPlayerAction
} from 'src/app/store/game/game.actions';
import { GameState, GameStateModel } from 'src/app/store/game/game.state';
import { Player } from 'src/app/store/players/players.state';

@Component({
    selector: 'app-character-selection',
    templateUrl: './character-selection.page.html',
    styleUrls: ['./character-selection.page.scss'],
})
export class CharacterSelectionPage implements OnInit, OnDestroy {
    @Select(GameState) game$: Observable<GameStateModel>;

    public playersCount: number;
    public civilianCount: number;

    public townPlayers: Player[] = [];
    public mafiaPlayers: Player[] = [];
    public neutralPlayers: Player[] = [];

    private subscriber: Subscription = new Subscription();

    constructor(
        private readonly playersService: PlayersService,
        private readonly gameService: GameService,
        private readonly store: Store,
        private readonly router: Router
    ) {
        this.subscriber.add(this.game$.subscribe((game) => {
            this.playersCount = game.maxPlayersCount;
            this.civilianCount = this.playersCount - game.players.length;
        }));

        this.townPlayers = this.playersService.getTownPlayers();
        this.mafiaPlayers = this.playersService.getMafiaPlayers();
        this.neutralPlayers = this.playersService.getNeutralPlayers();
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    isPlayerSelected(player: Player): boolean {
        return this.gameService.isPlayerSelected(player.name);
    }

    playersCountChanged(event) {
        this.store.dispatch(new ChangePlayersCountAction(event.target.value));
    }

    selectPlayer(player: Player) {
        if (!this.isPlayerSelected(player)) {
            this.store.dispatch(new SelectPlayerAction(player));
        } else {
            this.store.dispatch(new UnselectPlayerAction(player));
        }
    }

    confirmSelection() {
        const ciliviansArray = [];
        const civilian = this.playersService.getByName('civilian');

        for (let i = 0; i < this.civilianCount; i++) { ciliviansArray.push(civilian) };

        this.store.dispatch(new SelectCiviliansAndMarkAsSelectedAction(ciliviansArray)).pipe(first()).subscribe(_ => {
            this.router.navigate(['/tabs/dashboard/character-assign']);
        });
    }

    // W przyszłości rozszerzyć sprawdzanie czy poprawnie wybrano postaci
    get playersSelectedProperly() {
        return this.civilianCount >= 0;
    }
}
