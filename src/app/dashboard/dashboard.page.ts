import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { GameState, GameStateModel } from '../store/game/game.state';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    @Select(GameState) game$: Observable<GameStateModel>;

    public game: GameStateModel;

    private subscriber: Subscription = new Subscription();

    constructor() {
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
        console.log('resume');
    }

    startGame() {
        console.log('start');
    }
}
