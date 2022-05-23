import { GameStateModel } from "./game.state";

export class SetDataAction {
    public static readonly type = '[GAME] Set Data';
    constructor(public payload: Partial<GameStateModel>) {}
}

export class StartGame {
    public static readonly type = '[GAME] Start Game';
    constructor(public payload: Pick<GameStateModel, 'started' | 'players'>) {}
}


export class ClearGame {
    public static readonly type = '[GAME] Clear Game';
    constructor() {};
}