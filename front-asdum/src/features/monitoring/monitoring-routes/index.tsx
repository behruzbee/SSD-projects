import React from 'react';
import {Polyline} from 'react-leaflet';
import shallow from 'zustand/shallow';

import {useMonitoringTreeModel} from '@features/monitoring_tree';

export const MonitoringRoute = () => {
    console.log('Render route');
    const filteredRoutes = useMonitoringTreeModel(
        (state) => state.filteredRoutes,
        shallow,
    );
    return (
        <>
            {filteredRoutes.map((route) => (
                <Polyline key={route.route_id} positions={route.coords} />
            ))}
        </>
    );
};
