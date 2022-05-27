import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export interface Player {
    name: string;
    symbol: string;
    description: string;
}

export interface PlayersStateModel {
    players: Player[];
}

const initialState = {
    players: [
        {
            name: "agent",
            symbol: "A",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "lawyer",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "alchemist",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "barman",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "mayor",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "dentist",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "doctor",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "girl",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "escort",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "priest",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "hunter",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "magican",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "medium",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "avenger",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "guard",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "matchmaker",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "transporter",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "veteran",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "reviver",
            symbol: "TS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "amnesia",
            symbol: "N",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "clown",
            symbol: "N",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "prosecutor",
            symbol: "N",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "survivalist",
            symbol: "N",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "madman",
            symbol: "N",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "blackmailer",
            symbol: "N",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "harlot",
            symbol: "MS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "consiliere",
            symbol: "MS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "gravedigger",
            symbol: "MS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "cheater",
            symbol: "MS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "janitor",
            symbol: "MS",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "don",
            symbol: "MK",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "caporegime",
            symbol: "MK",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "killer",
            symbol: "SK",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "vampire",
            symbol: "SK",
            description: "Lorem ipsum lorem ipsum"
        }, {
            name: "civilian",
            symbol: "C",
            description: "Lorem ipsum lorem ipsum"
        }
    ]
};

@State<PlayersStateModel>({
    name: 'players',
    defaults: {
        ...initialState
    },
})

@Injectable()
export class PlayersState {
    constructor() {}
}