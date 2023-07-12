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
    townie: GamePlayer[]
}

export interface GameStateModel {
    players: GamePlayer[];
    maxPlayersCount: number;
    started: boolean;
    gameWithNumbers: boolean;
    playersSelected: boolean;
    playersAssigned: boolean;
    votingFinished: boolean;
    nightActionsFinished: boolean;
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
    votingFinished: false,
    nightActionsFinished: false,
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

    /**
     * Odznaczenie gracza jako wybranego do gry (zanim gra się jeszcze zaczęła)
     */
    @Action(GameActions.UnselectPlayerAction)
    public unselectPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.UnselectPlayerAction) {
        const { players, ...rest } = ctx.getState();
        const selectedPlayers = players.filter(player => player.name !== payload.name);

        ctx.setState({ ...rest, players: [...selectedPlayers] });
    }

    /**
     * Zaznaczenie gracza jako wybranego do gry (zanim gra się jeszcze zaczęła)
     */
    @Action(GameActions.SelectPlayerAction)
    public selectPlayer(ctx: StateContext<GameStateModel>, { payload }: GameActions.SelectPlayerAction) {
        const { players, ...rest } = ctx.getState();
        ctx.setState({ ...rest, players: [...players, { id: makeid(10), ...payload }] });
    }

    /**
     * Dopełnienie wybranych graczy odpowiednią liczbą cywilów
     */
    @Action(GameActions.SelectTowniesAndMarkAsSelectedAction)
    public selectTownies(ctx: StateContext<GameStateModel>, { payload }: GameActions.SelectTowniesAndMarkAsSelectedAction) {
        const { players, playersSelected, ...rest } = ctx.getState();

        const townies: GamePlayer[] = [];

        payload.townies.forEach((civil) => {
            townies.push({
                id: makeid(10),
                ...civil
            });
        });

        ctx.setState({ ...rest, players: [...players, ...townies], playersSelected: true, gameWithNumbers: payload.gameWithNumbers });
    }

    /**
     * Rozpoczęcie gry
     */
    @Action(GameActions.StartGameAction)
    public startGame(ctx: StateContext<GameStateModel>) {
        this.store.dispatch(new InitPlayersAction());
        this.store.dispatch(new GameActions.StartNightAction())

        const { started, ...rest } = initialState;
        ctx.patchState({ started: true, ...rest });
    }

    /**
     * Zakończenie gry
     */
    @Action(GameActions.ClearGameAction)
    public clearGame(ctx: StateContext<GameStateModel>) {
        this.store.dispatch(new ClearHistoryItemsAction());
        const { ...rest } = initialState;
        ctx.patchState({ ...rest });
    }

    
    /**
     * Odznaczenie wszystkich graczy (zanim gra się jeszcze zaczęła)
     */
    @Action(GameActions.ClearPlayersAction)
    public clearPlayers(ctx: StateContext<GameStateModel>) {
        const { maxPlayersCount } = initialState;
        ctx.patchState({ players: [], maxPlayersCount });
    }

    /**
     * Zmiana liczby graczy (zanim gra się jeszcze zaczęła)
     */
    @Action(GameActions.ChangePlayersCountAction)
    public changePlayersCount(ctx: StateContext<GameStateModel>, { payload }: GameActions.ChangePlayersCountAction) {
        const { players, maxPlayersCount, ...rest } = ctx.getState();

        ctx.patchState({ players: payload > maxPlayersCount ? players : [], maxPlayersCount: payload, ...rest });
    }

    /**
     * Przypisanie osoby do postaci
     */
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

    /**
     * Automatyczne przypisanie osób do wszystkich postaci
     */
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

    /**
     * Oznaczenie, że wszyscy gracze są przypisani do postaci
     */
    @Action(GameActions.MarkPlayersAsAssignedAction)
    public markPlayersAsAssigned(ctx: StateContext<GameStateModel>) {
        const { playersAssigned, ...rest } = ctx.getState();

        ctx.setState({ ...rest, playersAssigned: true });
    }

    /**
     * Rozpoczęcie kolejnego dnia
     */
    @Action(GameActions.StartDayAction)
    public startDay(ctx: StateContext<GameStateModel>) {
        const { phase, dayNumber, votingFinished, nightActionsFinished, ...rest } = ctx.getState();

        ctx.setState({ ...rest, phase: GAME_PHASE.day, dayNumber: dayNumber + 1, votingFinished: false, nightActionsFinished: false });
    }

    /**
     * Rozpoczęcie kolejnej nocy
     */
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

    /**
     * Zabicie gracza przez GM
     */
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

    /**
     * Zakończenie głosowania plus ewentualne powieszenie przegłosowanego gracza
     */
    @Action(GameActions.EndVotingAction)
    public endVoting(ctx: StateContext<GameStateModel>, { payload }: GameActions.EndVotingAction) {
        const { players, votingFinished, ...rest } = ctx.getState();
        let updatedPlayers = players;

        // Jeśli ktoś został powieszony
        if(payload) {
            updatedPlayers = players.map((player) => {
                if (player.id === payload.id) {
                    player.user.alive = false;
                    this.store.dispatch(new AddHistoryItemAction({ dayNumber: rest.dayNumber, phase: rest.phase, type: HISTORY_ITEM_TYPE.hang, destinationPlayer: payload }));
                }
    
                return player;
            });
        }

        ctx.setState({ ...rest, players: [...updatedPlayers], votingFinished: true });
    }

    /**
     * Zakończenie akcji nocnych
     */
    @Action(GameActions.EndNightActionsAction)
    public endNightActions(ctx: StateContext<GameStateModel>) {
        const { players, nightActionsFinished, ...rest } = ctx.getState();
        let updatedPlayers = players;

        // // Jeśli na kimś zostały wykonane jakieś akcje - należy je zastosować tutaj
        // if(payload) {
        //     updatedPlayers = players.map((player) => {
        //         if (player.id === payload.id) {
        //             player.user.alive = false;
        //             this.store.dispatch(new AddHistoryItemAction({ dayNumber: rest.dayNumber, phase: rest.phase, type: HISTORY_ITEM_TYPE.hang, destinationPlayer: payload }));
        //         }
    
        //         return player;
        //     });
        // }

        ctx.setState({ ...rest, players: [...updatedPlayers], nightActionsFinished: true });
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