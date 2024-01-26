interface IGarageList {
    busId: number;
    garageName: string;
}

export type KppDataType = 'kpp1' | 'kpp2';

export interface IKPPGarage {
    parkName: string;
    routeName: string;
    garageList: IGarageList[];
}

export interface IKPPData {
    difference: number;
    tabNumber: string;
    enter: string;
    exit: string;
    reysTimeFact: string;
    reysTimePlan: string;
    idle: string;
    garageNumber: string;
    interval: string;
    graphNumber: string;
}

export interface IControlIntervalRaces {
    allRaces: number;
    plan_race: number;
    plan_exit: number;
    plan_mileage: number;
    fact_mileage: number;
    fact_exit: number;
    accepted: number;
    violationRaces: number;
    nvtime: string;
    regRace: number;
    inCompletedRace: number;
    early: number;
}

export interface IControlIntervalParams {
    date: string;
    from_time: string;
    to_time: string;
    route_id: number | null;
    bus_id?: number | null;
}

export interface IKppDataResponse extends IControlIntervalRaces {
    kpp1Data: Array<IKPPData>;
    kpp2Data: Array<IKPPData>;
    kpp1Name: string;
    kpp2Name: string;
}

export interface IViolationDataDTO {
    race_number: number;
    check_in: string;
    idle: string;
    departure_fact: string;
    deviation: string;
    arrived: string;
    mileage: number;
}
