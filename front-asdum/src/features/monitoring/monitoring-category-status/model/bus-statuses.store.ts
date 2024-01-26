import create from 'zustand';

import {
    IAllStatuses,
    IngarageType,
    InlineType,
    OffRouteType,
} from '@models/monitoring/busStatuses.model';

import {
    IMonitoringStatus,
    StatusChildrenType,
    StatusesTypes,
} from './monitoring-statuses.model';

export const useBusStatusStore = create<IMonitoringStatus>((set) => ({
    statusesData: [],
    setStatusesData: (payload) => {
        const commonKeys = Object.keys(payload) as Array<
            keyof Pick<IAllStatuses, 'inline' | 'offroute' | 'ingarage'>
        >;

        const data: Array<StatusesTypes> = commonKeys.map((key) => {
            let commonCount = 0;
            let childrenData: StatusChildrenType[] = [];

            if (key === 'inline') {
                childrenData = (
                    Object.keys(payload['inline']) as Array<InlineType>
                ).map((inlineKey) => {
                    const child: StatusChildrenType = {} as StatusChildrenType;
                    if (inlineKey === 'on_route_total') {
                        commonCount = payload['inline']['on_route_total'];
                    } else {
                        child['type'] = inlineKey;
                        child['count'] = payload['inline'][inlineKey];
                    }
                    return child;
                });
            }

            if (key === 'ingarage') {
                childrenData = (
                    Object.keys(payload['ingarage']) as Array<IngarageType>
                ).map((inlineKey) => {
                    const child: StatusChildrenType = {} as StatusChildrenType;
                    if (inlineKey === 'garage_total') {
                        commonCount = payload['ingarage']['garage_total'];
                    } else {
                        child['type'] = inlineKey;
                        child['count'] = payload['ingarage'][inlineKey];
                    }
                    return child;
                });
            }

            if (key === 'offroute') {
                childrenData = (
                    Object.keys(payload['offroute']) as Array<OffRouteType>
                ).map((inlineKey) => {
                    const child: StatusChildrenType = {} as StatusChildrenType;
                    commonCount = payload['offroute']['offroute'];
                    child['type'] = inlineKey;
                    child['count'] = payload['offroute'][inlineKey];
                    return child;
                });
            }

            return {
                type: key,
                count: commonCount,
                children:
                    key !== 'offroute' ? childrenData.slice(1) : childrenData,
            };
        });
        set({statusesData: data});
    },
}));
