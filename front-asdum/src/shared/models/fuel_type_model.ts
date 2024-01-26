export interface IFuelType {
    id: number;
    name: string;
    remark: string;
    lastChanged: string;
    lastUser: number;
    col1: number;
    actions: string;
}

export interface ISaveFuelType {
    id?: number | null;
    nameUz: string;
    nameRu: string;
    nameEn: string;
    remark: string;
    code: string;
}
