import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Player, PlayersState } from 'src/app/store/players/players.state';

const TOWN_FRACTIONS = ['TK', 'TI', 'TP', 'TS', 'TL', 'RT'];
const MAFIA_FRACTIONS = ['MK', 'MS'];
const NEUTRAL_FRACTIONS = ['N', 'NK', 'NE'];

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

    getByName(name: string): Player | null {
        return this.players.find(player => player.name === name);
    }

    getTownPlayers(): Player[] {
        return this.players.filter((player) => {
            return TOWN_FRACTIONS.includes(player.symbol);
        });
    }

    getMafiaPlayers(): Player[] {
        return this.players.filter((player) => {
            return MAFIA_FRACTIONS.includes(player.symbol);
        });
    }

    getNeutralPlayers(): Player[] {
        return this.players.filter((player) => {
            return NEUTRAL_FRACTIONS.includes(player.symbol);
        });
    }

    isMafiaPlayer(symbol: string) {
        return MAFIA_FRACTIONS.includes(symbol);
    }

    isTownPlayer(symbol: string) {
        return TOWN_FRACTIONS.includes(symbol);
    }

    isNeutralPlayer(symbol: string) {
        return NEUTRAL_FRACTIONS.includes(symbol);
    }
}
