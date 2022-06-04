import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { InitPlayersAction } from '../players/players.actions';
import { Player } from '../players/players.state';
import * as GameActions from './game.actions';

export interface GamePlayer extends Player {
    id?: string;
    user?: {
        id: string;
        assign_name: string;
    }
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
    ) {}

    @Action(GameActions.UnselectPlayerAction)
    public unselectPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.UnselectPlayerAction) {
        const {players, ...rest} = ctx.getState();
        const selectedPlayers = players.filter(player => player.name !== payload.name);

        ctx.setState({ ...rest, players: [...selectedPlayers] });
    }

    @Action(GameActions.SelectPlayerAction)
    public selectPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.SelectPlayerAction) {
        const {players, ...rest} = ctx.getState();
        ctx.setState({ ...rest, players: [...players, {id: makeid(10), ...payload}] });
    }

    @Action(GameActions.SelectCiviliansAndMarkAsSelectedAction)
    public selectCivilians(ctx: StateContext<GameStateModel>, { payload }: GameActions.SelectCiviliansAndMarkAsSelectedAction) {
        const {players, playersSelected, ...rest} = ctx.getState();

        const civilians: GamePlayer[] = [];
        
        payload.forEach((civil) => {
            civilians.push({
                id: makeid(10),
                ...civil
            });
        });

        ctx.setState({ ...rest, players: [...players, ...civilians], playersSelected: true });
    }

    @Action(GameActions.StartGameAction)
    public startGame(ctx: StateContext<GameStateModel>) {
        this.store.dispatch(new InitPlayersAction());
        
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
        const {players, started, maxPlayersCount, ...rest} = initialState;
        ctx.patchState({players: [], started: true, maxPlayersCount: payload, ...rest});
    }

    @Action(GameActions.AssignPlayerAction)
    public assignPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.AssignPlayerAction) {
        const {players, ...rest} = ctx.getState();

        const updatedPlayers = players.map((player) => {
            if(player.id === payload.id) {
                player.user = {
                    id: payload?.user?.id || makeid(10),
                    assign_name: payload.user.assign_name
                };
            }

            return player;
        });

        ctx.setState({ ...rest, players: [...updatedPlayers]});
    }

    @Action(GameActions.MarkPlayersAsAssignedAction)
    public markPlayersAsAssigned(ctx: StateContext<GameStateModel>) {
        const {playersAssigned, ...rest} = ctx.getState();

        ctx.setState({ ...rest, playersAssigned: true});
    }
}