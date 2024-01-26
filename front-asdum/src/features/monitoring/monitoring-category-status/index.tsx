import React from 'react';

import {useBusStatusStore} from './model/bus-statuses.store';
import BusStatusAccordion from './ui/StatusAccordion';

export const MonitoringCategoryStatus = () => {
    const statusesData = useBusStatusStore((s) => s.statusesData);
    return (
        <>
            <BusStatusAccordion data={statusesData} />
        </>
    );
};
