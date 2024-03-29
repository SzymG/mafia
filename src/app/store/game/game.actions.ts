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

export class SelectTowniesAndMarkAsSelectedAction {
    public static readonly type = '[GAME] Select Townies';
    constructor(public payload: {townies: Player[], gameWithNumbers: boolean}) {}
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

export class AssignAllPlayersAction {
    public static readonly type = '[GAME] Assign All Players';
    constructor(public payload: User[]) {};
}

export class MarkPlayersAsAssignedAction {
    public static readonly type = '[GAME] Mark All Players Assigned';
    constructor() {};
}

export class StartNightAction {
    public static readonly type = '[GAME] Start night';
    constructor() {};
}

export class StartDayAction {
    public static readonly type = '[GAME] Start day';
    constructor() {};
}

export class KillPlayerAction {
    public static readonly type = '[GAME] Kill Player';
    constructor(public payload: GamePlayer) {};
}

export class EndVotingAction {
    public static readonly type = '[GAME] End Voting';
    constructor(public payload: GamePlayer | null) {};
}

export class EndNightActionsAction {
    public static readonly type = '[GAME] End Night Actions';
    constructor() {};
}