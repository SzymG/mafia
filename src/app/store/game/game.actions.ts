import { GameStateModel } from "./game.state";

export class SetDataAction {
    public static readonly type = '[GAME] Set Data';
    constructor(public payload: Partial<GameStateModel>) {}
}

export class StartGameAction {
    public static readonly type = '[GAME] Start Game';
    constructor() {}
}

export class ClearGameAction {
    public static readonly type = '[GAME] Clear Game';
    constructor() {};
}