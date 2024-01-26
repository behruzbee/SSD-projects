import {StatusClass} from './status-types';

export interface ITotalStatus {
    onGarage: TotalList;
    onRoute: TotalList;
    notInline: TotalList;
}

export interface TotalList {
    total: number;
    list?: StatusClass;
}
