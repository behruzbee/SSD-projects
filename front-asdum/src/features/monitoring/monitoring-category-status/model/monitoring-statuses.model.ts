import {MainStatusType, ParentStatusType} from '@models/monitoring';
import {IBusStatus} from '@models/monitoring';

export type StatusChildrenType = {
    type: MainStatusType;
    count: number;
};
export type StatusesTypes = {
    type: ParentStatusType;
    count: number;
    children: Array<StatusChildrenType>;
};

export interface IMonitoringStatus {
    statusesData: Array<StatusesTypes>;
    setStatusesData: (payload: IBusStatus) => void;
}
