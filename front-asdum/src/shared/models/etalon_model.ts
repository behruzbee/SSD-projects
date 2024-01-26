export interface IEtalon {
    route_id: number;
    model_id: number;
    race: number;
    day: 'bud' | 'vos' | 'sub' | 'pon';
    norm_fuel: number;
    h6: number;
    h8: number;
    h9: number;
    h14: number;
    h15: number;
    h17: number;
    h19: number;
    h21: number;
    h22: number;
    h23: number;
    obsh: number;
    normtop?: number;
}

export interface SaveEtalon {
    route_id: number;
    etalons: Etalon[];
}

export interface Etalon {
    race: number;
    day: string;
    norm_fuel: number;
    h6: number;
    h8: number;
    h9: number;
    h14: number;
    h15: number;
    h17: number;
    h19: number;
    h21: number;
    h22: number;
    h23: number;
    obsh: number;
}

// {
//     "route_id":780,

//     "model_id":49,
//     "race":70,
//     "day":"bud",
//     "norm_fuel":21.3,
//     "h6":10,
//     "h8":10,
//     "h9":10,
//     "h14":8,
//     "h15":9,
//     "h17":10,
//     "h19":8,
//     "h21":7,
//     "h22":6,
//     "h23":5,
//     "obsh":130
//  }
