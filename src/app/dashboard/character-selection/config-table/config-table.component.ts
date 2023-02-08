import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConfigItem, ConfigWithCount, PlayersConfigService } from 'src/app/shared/services/players-config.service';
import { GamePlayer, GameState, GameStateModel } from 'src/app/store/game/game.state';

@Component({
    selector: 'config-table',
    templateUrl: './config-table.component.html',
    styleUrls: ['./config-table.component.scss'],
})
export class ConfigTableComponent implements OnInit, OnDestroy {
    @Select(GameState) game$: Observable<GameStateModel>;

    @Input() type: 'town' | 'mafia' | 'neutral' = 'town';

    public playersConfig: {
        count: number,
        items: ConfigItem[]
    };

    public gamePlayers: GamePlayer[];

    private subscriber: Subscription = new Subscription();

    constructor(
        private readonly playersConfigService: PlayersConfigService
    ) {
        this.subscriber.add(this.game$.pipe(debounceTime(150)).subscribe((game) => {
            this.gamePlayers = game.players;
            const config = this.playersConfigService.getConfigByCount(game?.maxPlayersCount || 0);
            this.playersConfig = config[this.type];
            console.log(this.playersConfig);
        }));
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }
}
