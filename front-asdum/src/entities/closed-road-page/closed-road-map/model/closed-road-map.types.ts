import {ReactElement} from 'react';

export interface IClosedRoadMap {
    setMap: (map: L.Map) => void;
    mapComponent?: ReactElement;
    mapContainerRef?: any;
    isCanvas?: boolean;
    isLoading?: boolean;
}
