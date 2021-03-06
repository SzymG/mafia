import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Injectable({
    providedIn: 'root',
})
export class GameStartedAndNotSelectedGuard implements CanActivate {
    constructor(private store: Store, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return (this.store.selectSnapshot<boolean>(state => state.game.started) && !this.store.selectSnapshot<boolean>(state => state.game.playersSelected))
            || this.router.parseUrl('/tabs/dashboard');
    }
}
