import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { ClearGameAction } from '../store/game/game.actions';

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

    constructor(
        private readonly store: Store,
        private readonly router: Router
    ) { }

    ngOnInit() {
    }

    endGame() {
        this.store.dispatch(new ClearGameAction()).pipe(first()).subscribe(_ => {
            this.router.navigate(['/tabs/dashboard']);
        });
    }
}
