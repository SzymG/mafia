import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GameState, GameStateModel } from '../store/game/game.state';
import { StartGameAction } from '../store/game/game.actions';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    @Select(GameState) game$: Observable<GameStateModel>;

    public game: GameStateModel;

    private subscriber: Subscription = new Subscription();

    constructor(
        private readonly store: Store,
        private readonly router: Router,
    ) {
        this.subscriber.add(
            this.game$.subscribe((game) => { 
                this.game = game;
                console.log(this.game);
            })
        );
    }

    ngOnInit() {
    }

    resumeGame() {
        // TODO przekierowanie już powinno iść na /game i tam odpowiednio guard w zależności od przypisania
        this.router.navigate(['/dashboard/character-assign']);
    }

    startGame() {
        this.store.dispatch(new StartGameAction()).pipe(first()).subscribe((res) => {
            console.log('res', res);
            this.router.navigate(['/dashboard/character-selection']);
        });
    }
}
