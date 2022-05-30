import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class DashboardPage implements OnInit, OnDestroy {
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

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    resumeGame() {
        // TODO przekierowanie już powinno iść na /game i tam odpowiednio guard w zależności od przypisania
        this.router.navigate(['/tabs/dashboard/character-assign']);
    }

    startGame() {
        this.store.dispatch(new StartGameAction()).pipe(first()).subscribe(_ => {
            this.router.navigate(['/tabs/dashboard/character-selection']);
        });
    }
}
