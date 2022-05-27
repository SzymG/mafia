import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Player, PlayersState } from 'src/app/store/players/players.state';

@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    private players: Player[] = [];

    constructor(
        private readonly store: Store
    ) {
        this.players = this.store.selectSnapshot(PlayersState).players;
    }

    // getAll() {
    // }

    getTownPlayers(): Player[] {
        return this.players.filter((player) => {
            return ['A', 'TS'].includes(player.symbol);
        });
    }
}
