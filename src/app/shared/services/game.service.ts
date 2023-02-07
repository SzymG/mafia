import { Injectable, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GamePlayer, GameState, GameStateModel } from 'src/app/store/game/game.state';

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

    getTownPlayers(): GamePlayer[] {
        return this.gamePlayers.filter((player) => {
            return ['A', 'TS'].includes(player.symbol);
        });
    }

    getMafiaPlayers(): GamePlayer[] {
        return this.gamePlayers.filter((player) => {
            return ['MK', 'MS'].includes(player.symbol);
        });
    }
    
    getNeutralPlayers(): GamePlayer[] {
        return this.gamePlayers.filter((player) => {
            return ['SK', 'N'].includes(player.symbol);
        });
    }

    getCiviliansPlayers(): GamePlayer[] {
        return this.gamePlayers.filter((player) => {
            return ['C'].includes(player.symbol);
        });
    }

    get game() {
        return this.store.selectSnapshot<GameStateModel>(state => state.game);
    }
}
