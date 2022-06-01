import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import * as UserActions from './user.actions';

export interface User {
    id?: string;
    assign_name?: string;
}

export interface UserStateModel {
    users: User[];
}

const initialState = {
    users: [],
};

const makeid = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

@State<UserStateModel>({
    name: 'user',
    defaults: {
        ...initialState
    },
})

@Injectable()
export class UsersState {
    constructor() {}

    @Action(UserActions.AddUserAction)
    public addUser(ctx: StateContext<UserStateModel>, { payload }: UserActions.AddUserAction) {
        const {users, ...rest} = ctx.getState();
        ctx.setState({ ...rest, users: [...users, {id: makeid(10), assign_name: payload}] });
    }

    @Action(UserActions.RemoveUserAction)
    public removeUser(ctx: StateContext<UserStateModel>, { payload }: UserActions.RemoveUserAction) {
        const {users, ...rest} = ctx.getState();
        const restPlayers = users.filter(user => user.id !== payload.id);

        ctx.setState({ ...rest, users: [...restPlayers] });
    }
}