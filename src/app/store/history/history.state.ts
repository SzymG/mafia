import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { GamePlayer } from '../game/game.state';
import * as HistoryActions from './history.actions';

export const HISTORY_ITEM_TYPE = {
    fullMoon: 'fullMoon',
    kill: 'kill'
};

export interface HistoryItem {
    dayNumber: number,
    phase: string,
    type: string,
    sourcePlayer?: GamePlayer,
    destinationPlayer?: GamePlayer
}

export interface HistoryStateModel {
    historyItems: HistoryItem[];
}

const initialState = {
    historyItems: [],
};

@State<HistoryStateModel>({
    name: 'history',
    defaults: {
        ...initialState
    },
})

@Injectable()
export class HistoryState {
    constructor() { }

    @Action(HistoryActions.AddHistoryItemAction)
    public addHistoryItem(ctx: StateContext<HistoryStateModel>, { payload }: HistoryActions.AddHistoryItemAction) {
        const { historyItems } = ctx.getState();
        ctx.setState({ historyItems: [...historyItems, payload] });
    }

    @Action(HistoryActions.ClearHistoryItemsAction)
    public clearHistoryItems(ctx: StateContext<HistoryStateModel>) {
        const { ...rest } = initialState;
        ctx.patchState({ ...rest });
    }
}