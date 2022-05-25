import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Player } from 'src/app/store/game/game.state';

@Injectable({
    providedIn: 'root',
})
export class PlayersSelectedGuard implements CanActivate {
    constructor(private store: Store, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isGameStarted = this.store.selectSnapshot<boolean>(state => state.game.started);
        const arePlayersSelected = this.store.selectSnapshot<Array<Player>>(state => state.game.players).length;

        return isGameStarted ? (arePlayersSelected ? true : this.router.parseUrl('/dashboard/character-selection')) : this.router.parseUrl('/dashboard');
    }
}
