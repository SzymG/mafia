import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AvailablePlayers, MAFIA_FRACTIONS, NEUTRAL_FRACTIONS, Player, PlayersState, TOWN_FRACTIONS } from 'src/app/store/players/players.state';

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

    getAvailablePlayers(): AvailablePlayers {
        return {
            town: this.players.filter(player => TOWN_FRACTIONS.includes(player.symbol)),
            mafia: this.players.filter(player => MAFIA_FRACTIONS.includes(player.symbol)),
            neutral: this.players.filter(player => NEUTRAL_FRACTIONS.includes(player.symbol)),
        };
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
