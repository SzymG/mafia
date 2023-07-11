import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import * as PlayersActions from './players.actions';

export const TOWNIE_SYMBOL = 'RT';
export const TOWNIE_NAME = 'townie';
export const TOWN_FRACTIONS = ['TK', 'TI', 'TP', 'TS', 'TL', TOWNIE_SYMBOL];
export const MAFIA_FRACTIONS = ['GF', 'MF', 'MS'];
export const NEUTRAL_FRACTIONS = ['N', 'NK', 'NE'];

export interface Player {
    name: string;
    symbol: string;
    weights: {
        night: number[],
        day: number
    }
}

export interface AvailablePlayers {
    town: Player[],
    mafia: Player[],
    neutral: Player[]
}

export interface PlayersStateModel {
    players: Player[];
}

const initialState = {
    players: [
        { name: 'godfather', symbol: 'GF', weights: { night: [55], day: 0 } },
        { name: 'mafioso', symbol: 'MF', weights: { night: [54], day: 0 } },
        { name: 'agent', symbol: 'TI', weights: { night: [4], day: 0 } },
        { name: 'clown', symbol: 'NE', weights: { night: [0], day: 0 } },
        { name: 'mourder', symbol: 'NK', weights: { night: [14], day: 0 } },
        { name: 'janitor', symbol: 'MS', weights: { night: [0], day: 0 } },
        { name: 'bodyguard', symbol: 'TP', weights: { night: [41], day: 0 } },
        { name: 'doctor', symbol: 'TP', weights: { night: [42], day: 0 } },
        { name: 'escortLady', symbol: 'TS', weights: { night: [62], day: 0 } },
        { name: 'femmeFatale', symbol: 'MS', weights: { night: [57], day: 0 } },
        { name: 'medium', symbol: 'TS', weights: { night: [25], day: 1 } },
        { name: 'ressurector', symbol: 'TS', weights: { night: [18], day: 0 } },
        { name: 'avenger', symbol: 'TK', weights: { night: [33], day: 0 } },
        { name: 'hangman', symbol: 'NE', weights: { night: [1], day: 0 } },
        { name: 'matchmaker', symbol: 'RT', weights: { night: [98], day: 0 } },
        { name: 'mayor', symbol: 'TL', weights: { night: [0], day: 1 } },
        { name: 'littleGirl', symbol: 'TI', weights: { night: [4], day: 0 } },
        { name: TOWNIE_NAME, symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'bartender', symbol: 'MS', weights: { night: [51], day: 0 } },
        { name: 'insomniac', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'survivalist', symbol: 'N', weights: { night: [21], day: 0 } },
        { name: 'illusionist', symbol: 'TS', weights: { night: [99], day: 0 } },
        { name: 'madman', symbol: 'NE', weights: { night: [0], day: 1 } },
        { name: 'blackmailer', symbol: 'MS', weights: { night: [52], day: 0 } },
        { name: 'priest', symbol: 'TS', weights: { night: [18], day: 1 } },
        { name: 'woodsman', symbol: 'TK', weights: { night: [0], day: 1 } },
        { name: 'undertaker', symbol: 'MS', weights: { night: [0], day: 1 } },
        { name: 'alchemist', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'transporter', symbol: 'TS', weights: { night: [60], day: 0 } },
        { name: 'oldtimer', symbol: 'TK', weights: { night: [32], day: 0 } },
        { name: 'frauder', symbol: 'MS', weights: { night: [52], day: 0 } },
        { name: 'counselor', symbol: 'MS', weights: { night: [50], day: 0 } },
        { name: 'amnestiac', symbol: 'N', weights: { night: [18], day: 0 } },
        { name: 'lawyer', symbol: 'TL', weights: { night: [0], day: 1 } },
        { name: 'wampire', symbol: 'NK', weights: { night: [13], day: 0 } },
        { name: 'sailor', symbol: 'TS', weights: { night: [23], day: 0 } },
        { name: 'witch', symbol: 'NE', weights: { night: [15], day: 0 } },
        { name: 'assasin', symbol: 'MS', weights: { night: [56], day: 0 } },
        { name: 'spy', symbol: 'TI', weights: { night: [3], day: 0 } },
        { name: 'prisonGuard', symbol: 'TP', weights: { night: [61], day: 0 } },
        { name: 'templar', symbol: 'TP', weights: { night: [41], day: 0 } },
        { name: 'thief', symbol: 'NE', weights: { night: [97], day: 0 } },
        { name: 'seer', symbol: 'TI', weights: { night: [4], day: 0 } },
        { name: 'zombie', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'psychiatrist', symbol: 'TS', weights: { night: [22], day: 0 } },
        { name: 'shapeshifter', symbol: 'NK', weights: { night: [10], day: 0 } },
        { name: 'hunter', symbol: 'TK', weights: { night: [31], day: 0 } },
        { name: 'instigator', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'coroner', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'sheriff', symbol: 'TI', weights: { night: [4], day: 0 } },
        { name: 'dentist', symbol: 'MS', weights: { night: [52], day: 0 } },
        { name: 'manipulator', symbol: 'MS', weights: { night: [0], day: 1 } },
        { name: 'voodooMaster', symbol: 'NE', weights: { night: [15], day: 0 } },
        { name: 'butcher', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'baker', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'fool', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'peacefulTownie', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'vangefulTownie', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'werewolf', symbol: 'NK', weights: { night: [12], day: 0 } },
        { name: 'arsonist', symbol: 'NK', weights: { night: [11], day: 0 } },
        { name: 'judge', symbol: 'TL', weights: { night: [0], day: 1 } },
        { name: 'prosecutor', symbol: 'TL', weights: { night: [0], day: 1 } },
        { name: 'guardianAngel', symbol: 'N', weights: { night: [17], day: 0 } },
        { name: 'tailor', symbol: 'MS', weights: { night: [52], day: 0 } },
        { name: 'tracker', symbol: 'TI', weights: { night: [3], day: 0 } },
        { name: 'watcher', symbol: 'TI', weights: { night: [3], day: 0 } },
        { name: 'ronin', symbol: 'NE', weights: { night: [63, 30, 2], day: 0 } },
        { name: 'deamon', symbol: 'NE', weights: { night: [0], day: 0 } },
        { name: 'bauza', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'journalist', symbol: 'RT', weights: { night: [0], day: 0 } },
        { name: 'cultist', symbol: 'MS', weights: { night: [53], day: 0 } }
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