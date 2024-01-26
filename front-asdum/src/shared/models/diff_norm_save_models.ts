export interface DiffNormSave {
    item_list: ItemList[];
    route_id: number;
}

interface ItemList {
    bus_model_id: number;
    diff: number;
    id: number;
}

export interface ModelSave {
    bus_model_ids: {id: number; delete?: boolean}[];
    route_id: number;
}

export interface CoefSave {
    id: number | null;
    coefficient: number;
    amount: number;
}
