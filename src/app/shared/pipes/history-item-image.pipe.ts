import { Pipe, PipeTransform } from '@angular/core';
import { HISTORY_ITEM_TYPE } from 'src/app/store/history/history.state';

@Pipe({
    name: 'historyItemImage'
})
export class HistoryItemImagePipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        switch (value) {
            case HISTORY_ITEM_TYPE.fullMoon:
                return '/assets/img/full-moon.png';
            case HISTORY_ITEM_TYPE.kill:
                return '';
            default:
                return value;
        }
    }
}
