import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/shared/services/players.service';
import { Player } from 'src/app/store/players/players.state';

@Component({
    selector: 'app-character-selection',
    templateUrl: './character-selection.page.html',
    styleUrls: ['./character-selection.page.scss'],
})
export class CharacterSelectionPage implements OnInit {
    public playersCount: number = 10;
    public townPlayers: Player[] = [];

    constructor(
        private readonly playersService: PlayersService
    ) {
        this.townPlayers = this.playersService.getTownPlayers();
    }

    ngOnInit() {
    }

    playersCountChanged() {
        console.log('playersCountChanged');
    }

}
