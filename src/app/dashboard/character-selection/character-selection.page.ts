import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { GameService } from 'src/app/shared/services/game.service';
import { ConfigWithCount, PlayersConfigService } from 'src/app/shared/services/players-config.service';
import { PlayersService } from 'src/app/shared/services/players.service';
import {
    ChangePlayersCountAction, ClearPlayersAction, SelectCiviliansAndMarkAsSelectedAction,
    SelectPlayerAction, UnselectPlayerAction
} from 'src/app/store/game/game.actions';
import { GameState, GameStateModel, GamePlayer } from 'src/app/store/game/game.state';
import { AvailablePlayers, Player } from 'src/app/store/players/players.state';

@Component({
    selector: 'app-character-selection',
    templateUrl: './character-selection.page.html',
    styleUrls: ['./character-selection.page.scss'],
})
export class CharacterSelectionPage implements OnInit, OnDestroy {
    @Select(GameState) game$: Observable<GameStateModel>;

    public playersConfig: ConfigWithCount;
    public maxPlayersCount: number;
    public gamePlayers: GamePlayer[];

    public availablePlayers: AvailablePlayers;

    private subscriber: Subscription = new Subscription();

    constructor(
        private readonly playersService: PlayersService,
        private readonly playersConfigService: PlayersConfigService,
        private readonly gameService: GameService,
        private readonly store: Store,
        private readonly router: Router
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
        const civilian = this.playersService.getByName('civilian');

        for (let i = 0; i < this.civilianCount; i++) { ciliviansArray.push(civilian) };

        this.store.dispatch(new SelectCiviliansAndMarkAsSelectedAction(ciliviansArray)).pipe(first()).subscribe(_ => {
            this.router.navigate(['/tabs/dashboard/character-assign']);
        });
    }

    // W przyszłości rozszerzyć sprawdzanie czy poprawnie wybrano postaci
    get playersSelectedProperly() {
        return this.civilianCount >= 0;
    }

    get selectedPlayersCount() {
        return this.gamePlayers?.length || 0;
    }

    get civilianCount() {
        return this.playersConfig?.town?.civiliansCount || 0;
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
