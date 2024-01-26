import React from 'react';

import {useMonitoringTreeModel} from '@features/monitoring_tree';

import {MyMarker} from './components/my-marker';

const MonitoringBuses = () => {
    const filteredBuses = useMonitoringTreeModel((s) => s.filteredBuses);
    return (
        <>
            {filteredBuses.map((bus) => (
                <MyMarker bus={bus} key={bus.unique_id} />
            ))}
        </>
    );
};

export default React.memo(MonitoringBuses);
