import { Injectable, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
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
    ) {
        this.subscriber.add(
            this.game$.subscribe((game) => {
                this.gamePlayers = game.players;
                console.log('game', game);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    isPlayerSelected(name: string): boolean {
        return !!this.gamePlayers.find(player => player.name === name);
    }
}
