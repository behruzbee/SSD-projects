export interface IBusModelJSON {
    id: number;
    name: string;
    remark: string;
    fuelType: null;
    last_user: string;
    last_date: string;
    col1: number;
    toplivo?: number;
    actions: string;
}

export interface ISaveBusModel {
    id: number | null;
    name: string;
    remark: string;
    type_of_fuel: number;
}

export interface IUpdateBusModel {
    id?: number | null;
    name: string;
    remark: string;
    type_of_fuel?: number;
    toplivo?: any;
}
