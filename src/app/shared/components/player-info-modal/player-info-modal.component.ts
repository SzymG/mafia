import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Player } from 'src/app/store/players/players.state';

@Component({
    selector: 'app-player-info-modal',
    templateUrl: './player-info-modal.component.html',
    styleUrls: ['./player-info-modal.component.scss'],
})
export class PlayerInfoModalComponent implements OnInit {

    public player: Player;

    constructor(
        private readonly modalCtrl: ModalController
    ) {}

    ngOnInit() {}

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
