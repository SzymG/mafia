import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GamePlayer, GameState, GameStateModel } from 'src/app/store/game/game.state';

@Component({
    selector: 'app-character-list',
    templateUrl: './character-list.page.html',
    styleUrls: ['./character-list.page.scss'],
})
export class CharacterListPage implements OnInit, OnDestroy {
    @Select(GameState) game$: Observable<GameStateModel>;

    public townGamePlayers: GamePlayer[] = [];
    public mafiaGamePlayers: GamePlayer[] = [];
    public neutralGamePlayers: GamePlayer[] = [];
    public civiliansGamePlayers: GamePlayer[] = [];

    private subscriber: Subscription = new Subscription();

    constructor() {
        this.subscriber.add(this.game$.subscribe((game) => {
            this.townGamePlayers = game.players.filter((player) => {
                return ['A', 'TS'].includes(player.symbol);
            });

            this.mafiaGamePlayers = game.players.filter((player) => {
                return ['MK', 'MS'].includes(player.symbol);
            });
            
            this.neutralGamePlayers = game.players.filter((player) => {
                return ['SK', 'N'].includes(player.symbol);
            });

            this.civiliansGamePlayers = game.players.filter((player) => {
                return ['RT'].includes(player.symbol);
            });
        }));
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }
}
