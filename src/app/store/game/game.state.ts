import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { AddHistoryItemAction, ClearHistoryItemsAction } from '../history/history.actions';
import { HISTORY_ITEM_TYPE } from '../history/history.state';
import { InitPlayersAction } from '../players/players.actions';
import { Player } from '../players/players.state';
import * as GameActions from './game.actions';

const FULL_MOON_PROBABILITY = 0.3333334;

export const GAME_PHASE = {
    night: 'night',
    day: 'day'
};

export interface GamePlayer extends Player {
    id?: string;
    number?: number;
    user?: {
        id: string;
        assign_name: string;
        alive: boolean;
        number?: number;
    }
}

export interface GamePlayers {
    town: GamePlayer[],
    mafia: GamePlayer[],
    neutral: GamePlayer[],
    civilian: GamePlayer[]
}

export interface GameStateModel {
    players: GamePlayer[];
    maxPlayersCount: number;
    started: boolean;
    gameWithNumbers: boolean;
    playersSelected: boolean;
    playersAssigned: boolean;
    phase: string;
    dayNumber: number,
    fullMoon: {
        active: boolean,
        probability: number
    }
}

const initialState = {
    players: [],
    maxPlayersCount: 10,
    started: false,
    gameWithNumbers: false,
    playersSelected: false,
    playersAssigned: false,
    phase: GAME_PHASE.day,
    dayNumber: 1,
    fullMoon: {
        active: false,
        probability: FULL_MOON_PROBABILITY
    }
};

const makeid = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

@State<GameStateModel>({
    name: 'game',
    defaults: {
        ...initialState
    },
})

@Injectable()
export class GameState {
    constructor(
        private readonly store: Store
    ) { }

    @Action(GameActions.UnselectPlayerAction)
    public unselectPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.UnselectPlayerAction) {
        const { players, ...rest } = ctx.getState();
        const selectedPlayers = players.filter(player => player.name !== payload.name);

        ctx.setState({ ...rest, players: [...selectedPlayers] });
    }

    @Action(GameActions.SelectPlayerAction)
    public selectPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.SelectPlayerAction) {
        const { players, ...rest } = ctx.getState();
        ctx.setState({ ...rest, players: [...players, { id: makeid(10), ...payload }] });
    }

    @Action(GameActions.SelectCiviliansAndMarkAsSelectedAction)
    public selectCivilians(ctx: StateContext<GameStateModel>, { payload }: GameActions.SelectCiviliansAndMarkAsSelectedAction) {
        const { players, playersSelected, ...rest } = ctx.getState();

        const civilians: GamePlayer[] = [];

        payload.civilians.forEach((civil) => {
            civilians.push({
                id: makeid(10),
                ...civil
            });
        });

        ctx.setState({ ...rest, players: [...players, ...civilians], playersSelected: true, gameWithNumbers: payload.gameWithNumbers });
    }

    @Action(GameActions.StartGameAction)
    public startGame(ctx: StateContext<GameStateModel>) {
        this.store.dispatch(new InitPlayersAction());

        const { started, ...rest } = initialState;
        ctx.patchState({ started: true, ...rest });
    }

    @Action(GameActions.ClearGameAction)
    public clearGame(ctx: StateContext<GameStateModel>) {
        this.store.dispatch(new ClearHistoryItemsAction());
        const { ...rest } = initialState;
        ctx.patchState({ ...rest });
    }

    @Action(GameActions.ClearPlayersAction)
    public clearPlayers(ctx: StateContext<GameStateModel>) {
        const { maxPlayersCount } = initialState;
        ctx.patchState({ players: [], maxPlayersCount });
    }

    @Action(GameActions.ChangePlayersCountAction)
    public changePlayersCount(ctx: StateContext<GameStateModel>, { payload }: GameActions.ChangePlayersCountAction) {
        const { players, maxPlayersCount, ...rest } = ctx.getState();

        ctx.patchState({ players: payload > maxPlayersCount ? players : [], maxPlayersCount: payload, ...rest });
    }

    @Action(GameActions.AssignPlayerAction)
    public assignPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.AssignPlayerAction) {
        const { players, ...rest } = ctx.getState();

        const updatedPlayers = players.map((player) => {
            if (player.id === payload.id) {
                const currentPlayerNumbers = players.map(player => player?.user?.number).filter(number => number && (number !== player?.user?.number));
                const randomPlayerNumber = this.getUniquePlayerNumber(currentPlayerNumbers, players.length);

                player.user = {
                    id: payload?.user?.id || makeid(10),
                    number: rest.gameWithNumbers ? randomPlayerNumber : null,
                    assign_name: payload.user.assign_name,
                    alive: true
                };
            }

            return player;
        });

        ctx.setState({ ...rest, players: [...updatedPlayers] });
    }

    @Action(GameActions.AssignAllPlayersAction)
    public assignAllPlayers(ctx: StateContext<GameStateModel>, { payload }: GameActions.AssignAllPlayersAction) {
        const { players, ...rest } = ctx.getState();
        const playerNumbers = [];

        if (players.length === payload.length) {
            const updatedPlayers = players.map((player, index) => {
                const randomPlayerNumber = this.getUniquePlayerNumber(playerNumbers, players.length);
                playerNumbers.push(randomPlayerNumber);

                player.user = {
                    id: payload[index].id,
                    number: rest.gameWithNumbers ? randomPlayerNumber : null,
                    assign_name: payload[index].assign_name,
                    alive: true
                };

                return player;
            });

            ctx.setState({ ...rest, players: [...updatedPlayers] });
        }
    }

    @Action(GameActions.MarkPlayersAsAssignedAction)
    public markPlayersAsAssigned(ctx: StateContext<GameStateModel>) {
        const { playersAssigned, ...rest } = ctx.getState();

        ctx.setState({ ...rest, playersAssigned: true });
    }

    @Action(GameActions.StartDayAction)
    public startDay(ctx: StateContext<GameStateModel>) {
        const { phase, dayNumber, ...rest } = ctx.getState();

        ctx.setState({ ...rest, phase: GAME_PHASE.day, dayNumber: dayNumber + 1 });
    }

    @Action(GameActions.StartNightAction)
    public startNight(ctx: StateContext<GameStateModel>) {
        const { phase, fullMoon, ...rest } = ctx.getState();
        const isFullMoonActive = Math.random() < fullMoon.probability;

        let newFullMoon = {
            active: false,
            probability: fullMoon.probability + FULL_MOON_PROBABILITY
        };

        if (isFullMoonActive) {
            this.store.dispatch(new AddHistoryItemAction({ dayNumber: rest.dayNumber, phase: GAME_PHASE.night, type: HISTORY_ITEM_TYPE.fullMoon }));

            newFullMoon = {
                active: true,
                probability: FULL_MOON_PROBABILITY
            }
        }

        ctx.setState({ ...rest, phase: GAME_PHASE.night, fullMoon: newFullMoon });
    }

    @Action(GameActions.KillPlayerAction)
    public killPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.KillPlayerAction) {
        const { players, ...rest } = ctx.getState();

        const updatedPlayers = players.map((player) => {
            if (player.id === payload.id) {
                player.user.alive = false;
                this.store.dispatch(new AddHistoryItemAction({ dayNumber: rest.dayNumber, phase: rest.phase, type: HISTORY_ITEM_TYPE.kill, destinationPlayer: payload }));
            }

            return player;
        });

        ctx.setState({ ...rest, players: [...updatedPlayers] });
    }

    getUniquePlayerNumber(numbers: number[], playersCount: number) {
        const numberArray = Array.from({ length: playersCount }, (_, i) => i + 1);
        let uniqueNumber = numberArray[Math.floor(Math.random() * playersCount)];

        while (numbers.includes(uniqueNumber)) {
            uniqueNumber = numberArray[Math.floor(Math.random() * playersCount)];
        }

        return uniqueNumber;
    }
}