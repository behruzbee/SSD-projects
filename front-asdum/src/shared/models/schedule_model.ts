export interface ScheduleModel {
    id: null;
    route_id: number;
    schedule_items: ScheduleItem[];
}

export interface ScheduleItem {
    id: any;
    day_type: string;
    race_count: number;
    garage_begin_time: string;
    garage_end_time: string;
    kpp_begin_time: string;
    kpp_begin: any;
    kpp_end_time: string;
    kpp_end: any;
    prostoy: any;
    interval: any;
    kpp_lunch1: any;
    lunch1_begin: string;
    lunch1_end: string;
    kpp_lunch2: any;
    lunch2_begin: string;
    lunch2_end: string;
}

export interface IScheduleTable {
    id: number;
    dayType: string;
    raceCount: number;
    garageBeginTime: string;
    garageEndTime: string;
    kppBeginTime: null;
    kppBegin: Kpp;
    kppEndTime: string;
    kppEnd: Kpp;
    prostoy: number;
    interval: number;
    kppLunch1: Kpp;
    lunch1Begin: string;
    lunch1End: string;
    kppLunch2: Kpp;
    lunch2Begin: string;
    lunch2End: string;
    lastUser: null;
}

export interface Kpp {
    id: number;
    name: string;
}
