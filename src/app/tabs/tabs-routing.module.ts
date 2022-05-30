import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersAssignedGuard } from '../shared/guards/players-assigned.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
            },
            {
                path: 'game',
                canActivate: [PlayersAssignedGuard],
                loadChildren: () => import('../game/game.module').then(m => m.GamePageModule)
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
