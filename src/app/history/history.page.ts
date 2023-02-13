import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { HistoryItem, HistoryState, HistoryStateModel } from '../store/history/history.state';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, OnDestroy {
    @Select(HistoryState) history$: Observable<HistoryStateModel>;

    private subscriber: Subscription = new Subscription();

    public historyItemsByDay = {};

    constructor() {
        this.subscriber.add(this.history$.subscribe(history => {
            this.mapHistory(history);
        }));
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    private mapHistory(history: HistoryStateModel) {
        this.historyItemsByDay = {};

        history.historyItems.forEach((item: HistoryItem) => {
            if(!this.historyItemsByDay[item.dayNumber]) {
                this.historyItemsByDay[item.dayNumber] = {};
            }

            if(!this.historyItemsByDay[item.dayNumber][item.phase]) {
                this.historyItemsByDay[item.dayNumber][item.phase] = [item];
            } else {
                this.historyItemsByDay[item.dayNumber][item.phase].unshift(item);
            }
        });
    }

    get hasHistoryItems() {
        return JSON.stringify(this.historyItemsByDay) !== '{}';
    }
}
