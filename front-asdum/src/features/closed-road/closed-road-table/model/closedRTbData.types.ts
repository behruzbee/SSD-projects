import {CheckboxProps} from '@models/props';

type ClosedRoadStations = {
    id: number;
    station_name: string;
    lat: number;
    lng: number;
};
export interface ICRoadTbData extends CheckboxProps {
    fromDate: string;
    toDate: string;
    beginTime: string;
    endTime: string;
    streetName: string;
    fromDirection: string;
    toDirection: string;
    fromCenterStations: Array<ClosedRoadStations>;
    toCenterStations: Array<ClosedRoadStations>;
    firstSidePoints: Array<{lat: number; lng: number; side: string}>;
    secondSidePoints: Array<{lat: number; lng: number; side: string}>;
    routes: string;
}

export interface ICRoadTbResponse {
    totalCount: number;
    list: Array<ICRoadTbData>;
}
export interface ICRoadTbSlice {
    tableData: ICRoadTbData[];
    selectedData: ICRoadTbData;
    map: L.Map | null;
    page: number;
    size: number;
    totalCount: number;
    deletedId: number | null;
    setDeletedId: (id: number) => void;
    setPage: (page: number) => void;
    setTotalCount: (count: number) => void;
    drawElements: (selected: ICRoadTbData) => void;
    drawStations: (stations: Array<ClosedRoadStations>) => void;
    drawPolylines: (
        polylines: Array<{lat: number; lng: number; side: string}>,
    ) => void;
    setMap: (map: L.Map) => void;
    setSelectedData: (payload: ICRoadTbData) => void;
    setTableData: (payload: ICRoadTbData[]) => void;
}
