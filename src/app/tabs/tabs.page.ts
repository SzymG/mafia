import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameState, GameStateModel } from '../store/game/game.state';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
    @Select(GameState) game$: Observable<GameStateModel>;

    constructor() {}

    ngOnInit() {
    }

}
