import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'player-item',
    templateUrl: './player-item.component.html',
    styleUrls: ['./player-item.component.scss'],
})
export class PlayerItemComponent {
    @Input() name: string;
    @Input() selected: boolean = false;

    constructor() {
    }
}
