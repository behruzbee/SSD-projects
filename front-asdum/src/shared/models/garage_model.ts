type Park = {park_id: number; park_name: string};

export interface IGarage {
    parks: Park[];
    last_user: string;
    name: string;
    id: string;
    coords: Array<number[]>;
    region_id: number;
    fixed_auto: string;
    actions: string;
    col1: number;
}

export interface ISaveGarage {
    garage_name: string;
    id: string | null;
    coords: {lat: number; lng: number}[];
    region_id: number;
    parks?: Park[];
}
