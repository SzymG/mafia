import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { InitPlayersAction } from '../players/players.actions';
import { Player } from '../players/players.state';
import * as GameActions from './game.actions';

export interface GamePlayer extends Player {
    id?: string;
    number?: number;
    user?: {
        id: string;
        assign_name: string;
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
}

const initialState = {
    players: [],
    maxPlayersCount: 10,
    started: false,
    gameWithNumbers: false,
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
        const {maxPlayersCount} = initialState;
        ctx.patchState({players: [], maxPlayersCount});
    }

    @Action(GameActions.ChangePlayersCountAction)
    public changePlayersCount(ctx: StateContext<GameStateModel>, { payload }: GameActions.ChangePlayersCountAction) {
        const {players, maxPlayersCount, ...rest} = ctx.getState();
        
        ctx.patchState({players: payload > maxPlayersCount ? players : [], maxPlayersCount: payload, ...rest});
    }

    @Action(GameActions.AssignPlayerAction)
    public assignPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.AssignPlayerAction) {
        const {players, ...rest} = ctx.getState();

        const updatedPlayers = players.map((player) => {
            if(player.id === payload.id) {
                const currentPlayerNumbers = players.map(player => player?.user?.number).filter(number => number && (number !== player?.user?.number));
                const randomPlayerNumber = this.getUniquePlayerNumber(currentPlayerNumbers, players.length);

                player.user = {
                    id: payload?.user?.id || makeid(10),
                    number: rest.gameWithNumbers ? randomPlayerNumber : null,
                    assign_name: payload.user.assign_name
                };
            }

            return player;
        });

        ctx.setState({ ...rest, players: [...updatedPlayers]});
    }

    @Action(GameActions.AssignAllPlayersAction)
    public assignAllPlayers(ctx: StateContext<GameStateModel>, { payload }: GameActions.AssignAllPlayersAction) {
        const {players, ...rest} = ctx.getState();
        const playerNumbers = [];

        if(players.length === payload.length) {
            const updatedPlayers = players.map((player, index) => {
                const randomPlayerNumber = this.getUniquePlayerNumber(playerNumbers, players.length);
                playerNumbers.push(randomPlayerNumber);

                player.user = {
                    id: payload[index].id,
                    number: rest.gameWithNumbers ? randomPlayerNumber : null,
                    assign_name: payload[index].assign_name
                };
    
                return player;
            });
    
            ctx.setState({ ...rest, players: [...updatedPlayers]});
        }
    }

    @Action(GameActions.MarkPlayersAsAssignedAction)
    public markPlayersAsAssigned(ctx: StateContext<GameStateModel>) {
        const {playersAssigned, ...rest} = ctx.getState();

        ctx.setState({ ...rest, playersAssigned: true});
    }

    getUniquePlayerNumber(numbers: number[], playersCount: number) {
        const numberArray = Array.from({length: playersCount}, (_, i) => i + 1);
        let uniqueNumber = numberArray[Math.floor(Math.random() * playersCount)];

        while(numbers.includes(uniqueNumber)) {
            uniqueNumber = numberArray[Math.floor(Math.random() * playersCount)];
        }

        return uniqueNumber;
    }
}