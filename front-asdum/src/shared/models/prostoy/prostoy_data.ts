export interface IProstoyData {
    c_time: string;
    called: boolean;
    caller: string;
    curr: boolean;
    difference: string | null;
    driver: string;
    driverTabel: string;
    duration: string;
    factFromTime: null;
    garageId: string;
    gosNo: string;
    id: string;
    park: string;
    phone: string;
    planFromTime: null;
    route: string;
    routeID: null;
    side: string;
    start: string;
    stationName: string;
    statusType: string;

    col1: number | string; // for table
    number: number; // for table
    status: string; // for table
}
