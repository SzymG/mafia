import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { PlayerItemConfig } from 'src/app/shared/components/player-item/player-item.component';
import { ToolbarActionsConfig } from 'src/app/shared/components/toolbar-actions/toolbar-actions.component';
import { GameService } from 'src/app/shared/services/game.service';
import { ConfigWithCount, PlayersConfigService } from 'src/app/shared/services/players-config.service';
import { PlayersService } from 'src/app/shared/services/players.service';
import {
    ChangePlayersCountAction, ClearPlayersAction, SelectTowniesAndMarkAsSelectedAction,
    SelectPlayerAction, UnselectPlayerAction
} from 'src/app/store/game/game.actions';
import { GameState, GameStateModel, GamePlayer } from 'src/app/store/game/game.state';
import { AvailablePlayers, Player, TOWNIE_NAME } from 'src/app/store/players/players.state';

@Component({
    selector: 'app-character-selection',
    templateUrl: './character-selection.page.html',
    styleUrls: ['./character-selection.page.scss'],
})
export class CharacterSelectionPage implements OnInit, OnDestroy {
    @Select(GameState) game$: Observable<GameStateModel>;

    public toolbarActionsConfig: ToolbarActionsConfig[] = [
        {
            text: this.translate.instant('CharacterSelection.reset'),
            handler: this.resetSelection.bind(this)
        },
    ];

    public playersConfig: ConfigWithCount;
    public maxPlayersCount: number;
    public gamePlayers: GamePlayer[];
    public availablePlayers: AvailablePlayers;
    public gameWithNumbers: boolean = false;

    private subscriber: Subscription = new Subscription();

    constructor(
        private readonly playersService: PlayersService,
        private readonly playersConfigService: PlayersConfigService,
        private readonly gameService: GameService,
        private readonly store: Store,
        private readonly router: Router,
        private readonly translate: TranslateService
    ) {
        this.availablePlayers = this.playersService.getAvailablePlayers();

        this.subscriber.add(this.game$.pipe(debounceTime(150)).subscribe((game) => {
            this.maxPlayersCount = game.maxPlayersCount;
            this.gamePlayers = game.players;
            this.playersConfig = this.playersConfigService.getConfigByCount(this.maxPlayersCount);
        }));
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    isPlayerSelected(player: Player): boolean {
        return this.gameService.isPlayerSelected(player.name);
    }

    playersCountChanged(event) {
        this.store.dispatch(new ChangePlayersCountAction(event.target.value));
    }

    selectPlayer(player: Player) {
        if (!this.isPlayerSelected(player)) {
            this.store.dispatch(new SelectPlayerAction(player));
        } else {
            this.store.dispatch(new UnselectPlayerAction(player));
        }
    }

    resetSelection() {
        this.store.dispatch(new ClearPlayersAction());
    }

    confirmSelection() {
        const ciliviansArray = [];
        const townie = this.playersService.getByName('townie');

        for (let i = 0; i < this.townieCount; i++) { ciliviansArray.push(townie) };

        this.store.dispatch(new SelectTowniesAndMarkAsSelectedAction({ townies: ciliviansArray, gameWithNumbers: this.gameWithNumbers })).pipe(first()).subscribe(_ => {
            this.router.navigate(['/tabs/dashboard/character-assign']);
        });
    }

    getPlayerItemConfig(player: Player): PlayerItemConfig {
        const isPlayerSelected = this.isPlayerSelected(player);

        return {
            name: player.name,
            selected: isPlayerSelected,
            selectable: this.canSelectPlayer(player.symbol),
            deselectable: isPlayerSelected,
            showLabel: true,
            showSymbol: true
        };
    }

    getTowniePlayerItemConfig(): PlayerItemConfig {
        return {
            name: TOWNIE_NAME,
            selected: this.townieCount > 0,
            showLabel: true,
            showSymbol: true
        };
    }

    canSelectPlayer(playerSymbol: string): boolean {
        if (this.playersService.isTownPlayer(playerSymbol)) {
            return this.townSelectedPlayersCount < this.playersConfig?.town.count;
        }
        else if (this.playersService.isMafiaPlayer(playerSymbol)) {
            return this.mafiaSelectedPlayersCount < this.playersConfig?.mafia.count;
        }
        else if (this.playersService.isNeutralPlayer(playerSymbol)) {
            return this.neutralSelectedPlayersCount < this.playersConfig?.neutral.count;
        }
    }

    // TODO W przyszłości rozszerzyć sprawdzanie czy poprawnie wybrano postaci
    get playersSelectedProperly() {
        return this.townieCount >= 0;
    }

    get selectedPlayersCount() {
        return this.gamePlayers?.length || 0;
    }

    get townieCount() {
        return this.playersConfig?.town?.towniesCount || 0;
    }

    get townSelectedPlayersCount() {
        return this.gamePlayers?.filter(player => this.playersService.isTownPlayer(player.symbol))?.length || 0;
    }

    get mafiaSelectedPlayersCount() {
        return this.gamePlayers?.filter(player => this.playersService.isMafiaPlayer(player.symbol))?.length || 0;
    }

    get neutralSelectedPlayersCount() {
        return this.gamePlayers?.filter(player => this.playersService.isNeutralPlayer(player.symbol))?.length || 0;
    }
}
