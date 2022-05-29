import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PlayersAssignedGuard } from './shared/guards/players-assigned.guard';
import { PlayersNotAssignedGuard } from './shared/guards/players-not-assigned.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        canActivate: [PlayersNotAssignedGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
    },
    {
        path: 'game',
        canActivate: [PlayersAssignedGuard],
        loadChildren: () => import('./game/game.module').then(m => m.GamePageModule)
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
