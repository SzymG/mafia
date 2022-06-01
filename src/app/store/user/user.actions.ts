import { User } from "./user.state";

export class AddUserAction {
    public static readonly type = '[User] Add User';
    constructor(public payload: string) {}
}

export class RemoveUserAction {
    public static readonly type = '[User] Remove User';
    constructor(public payload: User) {}
}