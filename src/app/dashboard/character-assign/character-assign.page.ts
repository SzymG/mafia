import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/shared/services/game.service';
import { GamePlayer } from 'src/app/store/game/game.state';

@Component({
    selector: 'app-character-assign',
    templateUrl: './character-assign.page.html',
    styleUrls: ['./character-assign.page.scss'],
})
export class CharacterAssignPage implements OnInit {
    public townGamePlayers: GamePlayer[] = [];
    public mafiaGamePlayers: GamePlayer[] = [];
    public neutralGamePlayers: GamePlayer[] = [];
    public civiliansGamePlayers: GamePlayer[] = [];

    constructor(
        private readonly gameService: GameService
    ) {
        this.townGamePlayers = this.gameService.getTownPlayers();
        this.mafiaGamePlayers = this.gameService.getMafiaPlayers();
        this.neutralGamePlayers = this.gameService.getNeutralPlayers();
        this.civiliansGamePlayers = this.gameService.getCiviliansPlayers();
    }
    
    ngOnInit() {
    }

    confirmSelection() {
        // TODO zmienić odpowiednią flagę i przejść na nowy route (game)
        console.log('confirm')
    }

    get playersAssignedProperly() {
        // TODO sprawdzić czy wszyscy są przypisani
        return false;
    }
}
