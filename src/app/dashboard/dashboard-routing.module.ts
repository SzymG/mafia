import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameStartedAndNotSelectedGuard } from '../shared/guards/game-started.guard';
import { PlayersAssignedGuard } from '../shared/guards/players-assigned.guard';
import { PlayersNotAssignedGuard } from '../shared/guards/players-not-assigned.guard';
import { PlayersSelectedGuard } from '../shared/guards/players-selected.guard';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
    {
        path: '',
        component: DashboardPage,
        canActivate: [PlayersNotAssignedGuard]
    },
    {
        path: 'character-selection',
        loadChildren: () => import('./character-selection/character-selection.module').then(m => m.CharacterSelectionPageModule),
        canActivate: [GameStartedAndNotSelectedGuard],
    },
    {
        path: 'character-assign',
        loadChildren: () => import('./character-assign/character-assign.module').then(m => m.CharacterAssignPageModule),
        canActivate: [PlayersSelectedGuard, PlayersNotAssignedGuard],
    },
    {
        path: 'character-list',
        loadChildren: () => import('./character-list/character-list.module').then(m => m.CharacterListPageModule),
        canActivate: [PlayersAssignedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
