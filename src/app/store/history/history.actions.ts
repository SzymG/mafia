import { HistoryItem } from "./history.state";

export class AddHistoryItemAction {
    public static readonly type = '[History] Add History Item';
    constructor(public payload: HistoryItem) {}
}

export class ClearHistoryItemsAction {
    public static readonly type = '[History] Clear History Items';
    constructor() {}
}