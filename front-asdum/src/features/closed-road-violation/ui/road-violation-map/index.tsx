import {ClosedRoadMap} from '@entities/closed-road-page';
import React, {FC, useEffect, useRef} from 'react';

import {useViolationRoadStore} from '../../model/closed-road-violation.store';

export const RoadViolationMap: FC<{isLoading?: boolean; fetched: boolean}> = ({
    isLoading,
    fetched,
}) => {
    const [setMap] = useViolationRoadStore((s) => [s.setMap]);
    const mapRef = useRef<null | HTMLElement>();
    useEffect(() => {
        if (!isLoading && mapRef && fetched) {
            mapRef?.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [isLoading, mapRef]);
    return (
        <ClosedRoadMap
            isLoading={isLoading}
            mapContainerRef={mapRef}
            setMap={setMap}
        />
    );
};
