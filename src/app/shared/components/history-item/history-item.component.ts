import { Component, Input, OnInit } from '@angular/core';
import { HistoryItem } from 'src/app/store/history/history.state';

@Component({
    selector: 'history-item',
    templateUrl: './history-item.component.html',
    styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {
    @Input() item: HistoryItem;

    constructor() {
    }

    ngOnInit() {
    }
}
