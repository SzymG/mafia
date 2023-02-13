import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GameService } from 'src/app/shared/services/game.service';
import { GamePlayers, GameState, GameStateModel } from 'src/app/store/game/game.state';

@Component({
    selector: 'app-character-list',
    templateUrl: './character-list.page.html',
    styleUrls: ['./character-list.page.scss'],
})
export class CharacterListPage implements OnInit, OnDestroy {
    @Select(GameState) game$: Observable<GameStateModel>;

    public gamePlayers: GamePlayers;

    private subscriber: Subscription = new Subscription();

    constructor(
        private gameService: GameService
    ) {
        this.subscriber.add(this.game$.subscribe(_ => {    
            this.gamePlayers = this.gameService.getPlayers();
        }));
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }
}
