import {IBusStatus} from './busStatuses.model';
import {IBusMonitoring} from './monitoring-bus.model';

export interface IBusMonitoringResponse {
    statuses: IBusStatus;
    parkList: Array<IBusMonitoring>;
}
