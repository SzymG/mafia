import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Player } from '../players/players.state';
import * as GameActions from './game.actions';

export interface GamePlayer extends Player {
    associated_name?: string;
}

export interface GameStateModel {
    players: GamePlayer[];
    maxPlayersCount: number;
    started: boolean;
    playersSelected: boolean;
    playersAssigned: boolean;
}

const initialState = {
    players: [],
    maxPlayersCount: 10,
    started: false,
    playersSelected: false,
    playersAssigned: false
};

@State<GameStateModel>({
    name: 'game',
    defaults: {
        ...initialState
    },
})

@Injectable()
export class GameState {
    constructor() {}

    @Action(GameActions.UnselectPlayerAction)
    public setData(ctx: StateContext<GameStateModel>, { payload }: GameActions.UnselectPlayerAction) {
        const {players, ...rest} = ctx.getState();
        const selectedPlayers = players.filter(player => player.name !== payload.name);

        ctx.setState({ ...rest, players: [...selectedPlayers] });
    }

    @Action(GameActions.SelectPlayerAction)
    public selectPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.SelectPlayerAction) {
        const {players, ...rest} = ctx.getState();
        ctx.setState({ ...rest, players: [...players, payload] });
    }

    @Action(GameActions.SelectCiviliansAndMarkAsSelectedAction)
    public selectCivilians(ctx: StateContext<GameStateModel>, { payload }: GameActions.SelectCiviliansAndMarkAsSelectedAction) {
        const {players, playersSelected, ...rest} = ctx.getState();
        ctx.setState({ ...rest, players: [...players, ...payload], playersSelected: true });
    }

    @Action(GameActions.StartGameAction)
    public startGame(ctx: StateContext<GameStateModel>) {
        const {started, ...rest} = initialState;
        ctx.patchState({started: true, ...rest});
    }

    @Action(GameActions.ClearGameAction)
    public clearGame(ctx: StateContext<GameStateModel>) {
        const {...rest} = initialState;
        ctx.patchState({...rest});
    }

    @Action(GameActions.ClearPlayersAction)
    public clearPlayers(ctx: StateContext<GameStateModel>) {
        const {players, ...rest} = initialState;
        ctx.patchState({players: [], ...rest});
    }

    @Action(GameActions.ChangePlayersCountAction)
    public changePlayersCount(ctx: StateContext<GameStateModel>, { payload }: GameActions.ChangePlayersCountAction) {
        const {players, maxPlayersCount, ...rest} = initialState;
        ctx.patchState({players: [], maxPlayersCount: payload, ...rest});
    }
}