import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameStartedAndNotSelectedGuard } from '../shared/guards/game-started.guard';
import { PlayersSelectedGuard } from '../shared/guards/players-selected.guard';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
    {
        path: '',
        component: DashboardPage,
    },
    {
        path: 'character-selection',
        loadChildren: () => import('./character-selection/character-selection.module').then(m => m.CharacterSelectionPageModule),
        canActivate: [GameStartedAndNotSelectedGuard],
    },
    {
        path: 'character-assign',
        loadChildren: () => import('./character-assign/character-assign.module').then(m => m.CharacterAssignPageModule),
        canActivate: [PlayersSelectedGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
