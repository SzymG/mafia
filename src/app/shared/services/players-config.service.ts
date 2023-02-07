import { Injectable } from '@angular/core';

interface ConfigItem {
    symbol: string | string[],
    count: number
}

interface Config {
    town: ConfigItem[],
    mafia: ConfigItem[],
    neutral: ConfigItem[]
}

@Injectable({
    providedIn: 'root'
})
export class PlayersConfigService {
    constructor(
    ) { }

    getConfigByCount(count: number) {
        let town: ConfigItem[] = [];
        let mafia: ConfigItem[] = [];
        let neutral: ConfigItem[] = [];

        switch (count) {
            case 7:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 1 }, { symbol: 'RT', count: 2 }];
                mafia = [{ symbol: 'MK', count: 1 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: ['N', 'NE'], count: 1 }];
                break;
            case 8:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 1 }, { symbol: 'RT', count: 3 }];
                mafia = [{ symbol: 'MK', count: 1 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: ['N', 'NE'], count: 1 }];
                break;
            case 9:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 1 }, { symbol: ['TP', 'TS'], count: 1 }, { symbol: 'RT', count: 2 }];
                mafia = [{ symbol: 'MK', count: 1 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }];
                break;
            case 10:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 1 }, { symbol: ['TP', 'TS'], count: 1 }, { symbol: 'RT', count: 3 }];
                mafia = [{ symbol: 'MK', count: 1 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }];
                break;
            case 11:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 1 }, { symbol: 'TP', count: 1 }, { symbol: ['TS', 'TL'], count: 1 }, { symbol: 'RT', count: 3 }];
                mafia = [{ symbol: 'MK', count: 1 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: ['N', 'NE'], count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 12:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 1 }, { symbol: 'TP', count: 1 }, { symbol: ['TS', 'TL'], count: 1 }, { symbol: 'RT', count: 4 }];
                mafia = [{ symbol: 'MK', count: 1 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: ['N', 'NE'], count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 13:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 1 }, { symbol: 'TP', count: 1 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 3 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: ['N', 'NE'], count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 14:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 1 }, { symbol: 'TP', count: 1 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 4 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: ['N', 'NE'], count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 15:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 1 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 3 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 16:
                town = [{ symbol: 'TK', count: 1 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 1 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 4 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 1 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 17:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 1 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 3 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 2 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 18:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 1 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 4 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 2 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 19:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 1 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 5 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 2 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 20:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 1 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 6 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 2 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 21:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 5 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 3 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 22:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 6 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 3 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 23:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 7 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 3 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 24:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 8 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 3 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 25:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 9 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 3 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 26:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 10 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 3 }];
                neutral = [{ symbol: 'N', count: 1 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 27:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 9 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 4 }];
                neutral = [{ symbol: 'N', count: 2 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 28:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 1 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 10 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 4 }];
                neutral = [{ symbol: 'N', count: 2 }, { symbol: 'NE', count: 1 }, { symbol: 'NK', count: 1 }];
                break;
            case 29:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 2 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 9 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 4 }];
                neutral = [{ symbol: 'N', count: 2 }, { symbol: 'NE', count: 2 }, { symbol: 'NK', count: 1 }];
                break;
            case 30:
                town = [{ symbol: 'TK', count: 2 }, { symbol: 'TI', count: 2 }, { symbol: 'TP', count: 2 }, { symbol: 'TS', count: 2 }, { symbol: 'TL', count: 1 }, { symbol: 'RT', count: 10 }];
                mafia = [{ symbol: 'MK', count: 2 }, { symbol: 'MS', count: 4 }];
                neutral = [{ symbol: 'N', count: 2 }, { symbol: 'NE', count: 2 }, { symbol: 'NK', count: 1 }];
                break;
        }

        return this.mapPlayersArrayToConfig({ town, mafia, neutral });
    }

    private mapPlayersArrayToConfig(config: Config) {
        return config;
    }
}
