export interface IAlertData {
    gos_number: string;
    full_park: string;
    time: string;
    interval: string;
    speed: number;
    isChecked: boolean;
}

export interface IIdleSocketData {
    gos_number: string;
    full_park: string;
    duration: string;
    station: string;
    long: number;
    isChecked: boolean;
}

export interface ISpeedOver {
    [key: string]: {time: number; speed: number};
}
export interface IIdleData {
    [key: string]: {time: number; idle: number; station: string};
}
