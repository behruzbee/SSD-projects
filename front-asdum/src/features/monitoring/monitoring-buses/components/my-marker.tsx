import L from 'leaflet';
import LeafletDriftMarker from 'leaflet-drift-marker';
import React, {FC, useRef} from 'react';
import {renderToString} from 'react-dom/server';
import {Popup} from 'react-leaflet';
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker';
import shallow from 'zustand/shallow';

import {useMonitoringTreeModel} from '@features/monitoring_tree';
import {useMonitoringBusOperations} from '@features/monitoring/monitoring-buses/lib/useMonitoringBusOperations';
import {IBusCoords} from '@models/monitoring/bus-coords';
import BusInfo from '@views/monitoring/ui/monitoring-map-component/components/monitoring_map/BusInfo';
import s from '@views/monitoring/ui/monitoring-map-component/components/monitoring_map/index.module.scss';

interface IMarkersProps {
    bus: IBusCoords;
}
const busIcon = (Icon: JSX.Element) => {
    return new L.DivIcon({
        //@ts-ignore
        html: renderToString((<Icon className={s.busIcon} />) as JSX.Element),
        className: '',
    });
};
export const MyMarker: FC<IMarkersProps> = ({bus}) => {
    const markerRef = useRef<LeafletDriftMarker | null>(null);
    const {handleGetBusData} = useMonitoringBusOperations();
    const [busInfoLoading, setBusIcon, selected] = useMonitoringTreeModel(
        (s) => [s.busInfoLoading, s.setBusIcon, s.selectedBusCoords],
        shallow,
    );
    return (
        <ReactLeafletDriftMarker
            key={bus.bus_id}
            position={[bus.lat, bus.lng]}
            ref={markerRef}
            duration={5000}
            //@ts-ignore
            icon={busIcon(setBusIcon(bus.bus_id))}
            eventHandlers={{
                click: (e) => handleGetBusData(e, bus),
            }}
        >
            <Popup closeButton={false} autoPan={false}>
                <BusInfo
                    data={selected}
                    isLoading={busInfoLoading}
                    speed={bus.speed}
                />
            </Popup>
        </ReactLeafletDriftMarker>
    );
};
