import L from 'leaflet';

import {useMonitoringTreeModel} from '@features/monitoring_tree';
import {IBusCoords} from '@models/monitoring/bus-coords';

export const useMonitoringBusOperations = () => {
    const handleBusClick = useMonitoringTreeModel((s) => s.handleBusClick);
    const handleGetBusData = (e: L.LeafletMouseEvent, bus: IBusCoords) => {
        handleBusClick(bus);
        e.target.openPopup();
    };

    return {
        handleGetBusData,
    };
};
