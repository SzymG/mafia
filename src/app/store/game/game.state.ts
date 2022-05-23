import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import * as GameActions from './game.actions';

export interface Player {
    id: string;
    name: string;
    associated_name: string;
}

export interface GameStateModel {
    players: Player[];
    started: boolean;
}

const initialState = {
    players: [],
    started: false
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

    @Action(GameActions.SetDataAction)
    public setData(ctx: StateContext<GameStateModel>, { payload }: GameActions.SetDataAction) {
        const stateModel = ctx.getState();
        ctx.setState({ ...stateModel, ...payload });
    }

    @Action(GameActions.StartGame)
    public loginUser(ctx: StateContext<GameStateModel>, { payload }: GameActions.StartGame ) {
        ctx.patchState({...payload});
    }

    @Action(GameActions.ClearGame)
    public clearUser(ctx: StateContext<GameStateModel>) {
        const {...rest} = initialState;
        ctx.patchState({...rest});
    }
}