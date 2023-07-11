import { Injectable, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GamePlayer, GamePlayers, GameState, GameStateModel } from 'src/app/store/game/game.state';
import { TOWNIE_SYMBOL, MAFIA_FRACTIONS, NEUTRAL_FRACTIONS, TOWN_FRACTIONS } from 'src/app/store/players/players.state';

@Injectable({
    providedIn: 'root'
})
export class GameService implements OnDestroy {
    @Select(GameState) game$: Observable<GameStateModel>;

    private gamePlayers: GamePlayer[] = [];
    private subscriber: Subscription = new Subscription();

    constructor(
        private readonly store: Store
    ) {
        this.subscriber.add(
            this.game$.subscribe((game) => {
                this.gamePlayers = game.players;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    isPlayerSelected(name: string): boolean {
        return !!this.gamePlayers.find(player => player.name === name);
    }

    areAllPlayersAssigned() {
        return !this.gamePlayers.find((player) => {
            return !player.user?.id
        });
    }

    getPlayers(): GamePlayers {
        return {
            town: this.gamePlayers.filter(player => TOWN_FRACTIONS.includes(player.symbol)),
            mafia: this.gamePlayers.filter(player => MAFIA_FRACTIONS.includes(player.symbol)),
            neutral: this.gamePlayers.filter(player => NEUTRAL_FRACTIONS.includes(player.symbol)),
            townie: this.gamePlayers.filter(player => TOWNIE_SYMBOL === player.symbol),
        };
    }

    get game() {
        return this.store.selectSnapshot<GameStateModel>(state => state.game);
    }
}
