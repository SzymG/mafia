import { Player } from "../players/players.state";
import { User } from "../user/user.state";
import { GamePlayer } from "./game.state";

export class UnselectPlayerAction {
    public static readonly type = '[GAME] Unselect Player';
    constructor(public payload: Player) {}
}

export class SelectPlayerAction {
    public static readonly type = '[GAME] Select Player';
    constructor(public payload: Player) {}
}

export class SelectCiviliansAndMarkAsSelectedAction {
    public static readonly type = '[GAME] Select Civilians';
    constructor(public payload: Player[]) {}
}

export class StartGameAction {
    public static readonly type = '[GAME] Start Game';
    constructor() {}
}

export class ClearGameAction {
    public static readonly type = '[GAME] Clear Game';
    constructor() {};
}

export class ClearPlayersAction {
    public static readonly type = '[GAME] Clear Players';
    constructor() {};
}

export class ChangePlayersCountAction {
    public static readonly type = '[GAME] Change Players Count';
    constructor(public payload: number) {};
}

export class AssignPlayerAction {
    public static readonly type = '[GAME] Assign Player';
    constructor(public payload: {id: string, user: User}) {};
}

export class MarkPlayersAsAssignedAction {
    public static readonly type = '[GAME] Mark All Players Assigned';
    constructor() {};
}