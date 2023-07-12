import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import * as PlayersActions from './players.actions';

export const TOWNIE_SYMBOL = 'RT';
export const TOWNIE_NAME = 'townie';
export const TOWN_FRACTIONS = ['TK', 'TI', 'TP', 'TS', 'TL'];
export const MAFIA_FRACTIONS = ['GF', 'MF', 'MS'];
export const NEUTRAL_FRACTIONS = ['N', 'NK', 'NE'];

export interface Player {
    name: string;
    symbol: string;
    actionWeights: {
        night: number[],
        day: number
    }
}

export interface AvailablePlayers {
    town: Player[],
    mafia: Player[],
    neutral: Player[],
    townie: Player[]
}

export interface PlayersStateModel {
    players: Player[];
}

const initialState = {
    players: [
        { name: 'godfather', symbol: 'GF', actionWeights: { night: [55], day: 0 } },
        { name: 'mafioso', symbol: 'MF', actionWeights: { night: [54], day: 0 } },
        { name: 'agent', symbol: 'TI', actionWeights: { night: [4], day: 0 } },
        { name: 'clown', symbol: 'NE', actionWeights: { night: [0], day: 0 } },
        { name: 'mourder', symbol: 'NK', actionWeights: { night: [14], day: 0 } },
        { name: 'janitor', symbol: 'MS', actionWeights: { night: [0], day: 0 } },
        { name: 'bodyguard', symbol: 'TP', actionWeights: { night: [41], day: 0 } },
        { name: 'doctor', symbol: 'TP', actionWeights: { night: [42], day: 0 } },
        { name: 'escortLady', symbol: 'TS', actionWeights: { night: [62], day: 0 } },
        { name: 'femmeFatale', symbol: 'MS', actionWeights: { night: [57], day: 0 } },
        { name: 'medium', symbol: 'TS', actionWeights: { night: [25], day: 1 } },
        { name: 'ressurector', symbol: 'TS', actionWeights: { night: [18], day: 0 } },
        { name: 'avenger', symbol: 'TK', actionWeights: { night: [33], day: 0 } },
        { name: 'hangman', symbol: 'NE', actionWeights: { night: [1], day: 0 } },
        { name: 'matchmaker', symbol: 'RT', actionWeights: { night: [98], day: 0 } },
        { name: 'mayor', symbol: 'TL', actionWeights: { night: [0], day: 1 } },
        { name: 'littleGirl', symbol: 'TI', actionWeights: { night: [4], day: 0 } },
        { name: TOWNIE_NAME, symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'bartender', symbol: 'MS', actionWeights: { night: [51], day: 0 } },
        { name: 'insomniac', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'survivalist', symbol: 'N', actionWeights: { night: [21], day: 0 } },
        { name: 'illusionist', symbol: 'TS', actionWeights: { night: [99], day: 0 } },
        { name: 'madman', symbol: 'NE', actionWeights: { night: [0], day: 1 } },
        { name: 'blackmailer', symbol: 'MS', actionWeights: { night: [52], day: 0 } },
        { name: 'priest', symbol: 'TS', actionWeights: { night: [18], day: 1 } },
        { name: 'woodsman', symbol: 'TK', actionWeights: { night: [0], day: 1 } },
        { name: 'undertaker', symbol: 'MS', actionWeights: { night: [0], day: 1 } },
        { name: 'alchemist', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'transporter', symbol: 'TS', actionWeights: { night: [60], day: 0 } },
        { name: 'oldtimer', symbol: 'TK', actionWeights: { night: [32], day: 0 } },
        { name: 'frauder', symbol: 'MS', actionWeights: { night: [52], day: 0 } },
        { name: 'counselor', symbol: 'MS', actionWeights: { night: [50], day: 0 } },
        { name: 'amnestiac', symbol: 'N', actionWeights: { night: [18], day: 0 } },
        { name: 'lawyer', symbol: 'TL', actionWeights: { night: [0], day: 1 } },
        { name: 'wampire', symbol: 'NK', actionWeights: { night: [13], day: 0 } },
        { name: 'sailor', symbol: 'TS', actionWeights: { night: [23], day: 0 } },
        { name: 'witch', symbol: 'NE', actionWeights: { night: [15], day: 0 } },
        { name: 'assasin', symbol: 'MS', actionWeights: { night: [56], day: 0 } },
        { name: 'spy', symbol: 'TI', actionWeights: { night: [3], day: 0 } },
        { name: 'prisonGuard', symbol: 'TP', actionWeights: { night: [61], day: 0 } },
        { name: 'templar', symbol: 'TP', actionWeights: { night: [41], day: 0 } },
        { name: 'thief', symbol: 'NE', actionWeights: { night: [97], day: 0 } },
        { name: 'seer', symbol: 'TI', actionWeights: { night: [4], day: 0 } },
        { name: 'zombie', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'psychiatrist', symbol: 'TS', actionWeights: { night: [22], day: 0 } },
        { name: 'shapeshifter', symbol: 'NK', actionWeights: { night: [10], day: 0 } },
        { name: 'hunter', symbol: 'TK', actionWeights: { night: [31], day: 0 } },
        { name: 'instigator', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'coroner', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'sheriff', symbol: 'TI', actionWeights: { night: [4], day: 0 } },
        { name: 'dentist', symbol: 'MS', actionWeights: { night: [52], day: 0 } },
        { name: 'manipulator', symbol: 'MS', actionWeights: { night: [0], day: 1 } },
        { name: 'voodooMaster', symbol: 'NE', actionWeights: { night: [15], day: 0 } },
        { name: 'butcher', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'baker', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'fool', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'peacefulTownie', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'vangefulTownie', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'werewolf', symbol: 'NK', actionWeights: { night: [12], day: 0 } },
        { name: 'arsonist', symbol: 'NK', actionWeights: { night: [11], day: 0 } },
        { name: 'judge', symbol: 'TL', actionWeights: { night: [0], day: 1 } },
        { name: 'prosecutor', symbol: 'TL', actionWeights: { night: [0], day: 1 } },
        { name: 'guardianAngel', symbol: 'N', actionWeights: { night: [17], day: 0 } },
        { name: 'tailor', symbol: 'MS', actionWeights: { night: [52], day: 0 } },
        { name: 'tracker', symbol: 'TI', actionWeights: { night: [3], day: 0 } },
        { name: 'watcher', symbol: 'TI', actionWeights: { night: [3], day: 0 } },
        { name: 'ronin', symbol: 'NE', actionWeights: { night: [63, 30, 2], day: 0 } },
        { name: 'deamon', symbol: 'NE', actionWeights: { night: [0], day: 0 } },
        { name: 'bauza', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'journalist', symbol: 'RT', actionWeights: { night: [0], day: 0 } },
        { name: 'cultist', symbol: 'MS', actionWeights: { night: [53], day: 0 } }
    ]
};

@State<PlayersStateModel>({
    name: 'players',
    defaults: {
        ...initialState
    },
})

@Injectable()
export class PlayersState {
    constructor() { }

    @Action(PlayersActions.InitPlayersAction)
    public initPlayers(ctx: StateContext<PlayersStateModel>) {
        ctx.patchState(initialState);
    }
}