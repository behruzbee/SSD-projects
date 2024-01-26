export interface IProtocolData {
    station_name: string;
    distance: number;
    mej_punkt: number;
    naprav: number;
}

export interface IProtocolSave {
    route_id: number;
    protocolStations: any;
}
