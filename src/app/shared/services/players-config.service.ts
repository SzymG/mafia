import { Injectable } from '@angular/core';
import { GamePlayer } from 'src/app/store/game/game.state';
import { TOWNIE_SYMBOL } from 'src/app/store/players/players.state';

interface Config {
    town: ConfigItem[];
    townies: ConfigItem,
    mafia: ConfigItem[];
    neutral: ConfigItem[];
}

export interface ConfigItem {
    symbol: string[],
    count: number
}

export interface ConfigWithCount {
    town: {
        count: number,
        items: ConfigItem[]
    },
    mafia: {
        count: number,
        items: ConfigItem[]
    },
    neutral: {
        count: number,
        items: ConfigItem[]
    },
    townie: {
        count: number,
        items: ConfigItem[]
    }
}

@Injectable({
    providedIn: 'root'
})
export class PlayersConfigService {
    constructor(
    ) { }

    getConfigByCount(count: number): ConfigWithCount {
        switch (count) {
            case 7:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 1 }],
                    townies: { symbol: ['RT'], count: 2 },
                    mafia: [{ symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N', 'NE'], count: 1 }],
                });
            case 8:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 1 }],
                    townies: { symbol: ['RT'], count: 3 },
                    mafia: [{ symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N', 'NE'], count: 1 }],
                });
            case 9:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 1 }, { symbol: ['TP', 'TS'], count: 1 }],
                    townies: { symbol: ['RT'], count: 2 },
                    mafia: [{ symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }],
                });
            case 10:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 1 }, { symbol: ['TP', 'TS'], count: 1 }],
                    townies: { symbol: ['RT'], count: 3 },
                    mafia: [{ symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }],
                });
            case 11:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 1 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS', 'TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 3 },
                    mafia: [{ symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N', 'NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 12:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 1 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS', 'TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 4 },
                    mafia: [{ symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N', 'NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 13:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 1 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 3 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N', 'NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 14:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 1 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 4 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N', 'NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 15:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 3 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 16:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 1 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 4 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 1 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 17:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 3 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 2 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 18:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 4 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 2 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 19:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 5 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 2 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 20:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 1 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 6 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 2 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 21:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 5 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 3 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 22:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 6 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 3 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 23:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 7 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 3 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 24:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 8 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 3 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 25:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 9 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 3 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 26:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 10 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 3 }],
                    neutral: [{ symbol: ['N'], count: 1 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 27:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 9 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 4 }],
                    neutral: [{ symbol: ['N'], count: 2 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 28:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 1 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 10 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 4 }],
                    neutral: [{ symbol: ['N'], count: 2 }, { symbol: ['NE'], count: 1 }, { symbol: ['NK'], count: 1 }],
                });
            case 29:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 2 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 9 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 4 }],
                    neutral: [{ symbol: ['N'], count: 2 }, { symbol: ['NE'], count: 2 }, { symbol: ['NK'], count: 1 }],
                });
            case 30:
                return this.mapConfig({
                    town: [{ symbol: ['TK'], count: 2 }, { symbol: ['TI'], count: 2 }, { symbol: ['TP'], count: 2 }, { symbol: ['TS'], count: 2 }, { symbol: ['TL'], count: 1 }],
                    townies: { symbol: ['RT'], count: 10 },
                    mafia: [{ symbol: ['GF'], count: 1 }, { symbol: ['MF'], count: 1 }, { symbol: ['MS'], count: 4 }],
                    neutral: [{ symbol: ['N'], count: 2 }, { symbol: ['NE'], count: 2 }, { symbol: ['NK'], count: 1 }],
                });
        }
    }

    checkConfig(players: GamePlayer[], config: ConfigWithCount) {
        const gamePlayersSymbols = players?.map(player => player.symbol).filter(symbol => symbol != TOWNIE_SYMBOL).sort() || [];
        const configPlayersSymbols = [];

        const processItems = (items) => {
            items?.forEach(item => {
                item.symbol.forEach(symbol => {
                    configPlayersSymbols.push(...Array(item.count).fill(symbol));
                    configPlayersSymbols.sort();
                });
            });
        };

        processItems(config?.town.items);
        processItems(config?.mafia.items);
        processItems(config?.neutral.items);

        const areAllItemsInArray = () => {
            const configPlayersSymbolsCopy = [...configPlayersSymbols];
            return gamePlayersSymbols.every(item => {
                const index = configPlayersSymbolsCopy.indexOf(item);
        
                if (index === -1) {
                    return false;
                }

                configPlayersSymbolsCopy.splice(index, 1);  
                return true;
            });
        };

        return ((config?.mafia.count + config?.neutral.count + config?.town.count) == gamePlayersSymbols.length) && areAllItemsInArray();
    }



    private mapConfig(config: Config): ConfigWithCount {
        const add = (a, b) => { return a + b };
        return {
            town: { count: config.town.map(item => item.count).reduce(add, 0), items: config.town },
            mafia: { count: config.mafia.map(item => item.count).reduce(add, 0), items: config.mafia },
            neutral: { count: config.neutral.map(item => item.count).reduce(add, 0), items: config.neutral },
            townie: { count: config.townies.count, items: [config.townies] }
        };
    }
}
