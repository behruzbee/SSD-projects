export interface IFactTrackData {
    all_metres: number;
    in_line: number;
    lat: number;
    lng: number;
    regDate: number;
    regDateTime: string;
    reysid: number;
    side: number;
    speed: number;
}

export interface IPlanTrackData {
    id: number;
    lat: number;
    lng: number;
    marshrut_id: number;
    name: string;
    point_order: any;
}

export interface ISignalLoose {
    dif: string;
    from: string;
    to: string;
}

export interface INotInline {
    dif: string;
    from: string;
    to: string;
    latFrom: number;
    latTo: number;
    lngFrom: number;
    lngTo: number;
    reys: number;
}

interface IRaceDoneInfo {
    // complityTimeOfStaying: number;
    // deviation: string;
    // fact: string;
    // icon: string;
    // plan: number;
    // station: string;
    // staying: string;

    arrivetime: string;
    done: boolean;
    enter_time: string;
    idle: number;
    mej_punkt: number;
    name: string;
    side: number;
    speedavg: number;
    station_id: number;
}

export interface IStationTable {
    race: number;
    size_of_stations: number;
    plan_race_date: number;
    fact_race_data: number;
    diff: number;
    stations: IRaceDoneInfo[];
}

export interface IHistoryPolygon {
    type: number;
    coordinates: Array<Array<number>>;
}

export interface IHistoryStationLocation {
    id: number;
    lat: number;
    lng: number;
    marshrut_id: number;
    name: string;
    point_order: number;
}

export interface IRaceList {
    reys_id: number;
    reysList: IFactTrackData[];
    factRaceId?: number | string;
}

export interface IViolationHistory {
    coordinates: Array<number>;
    date: string;
    speed: number;
}
