interface IParkFuel {
    fuel: number;
    name: string;
    list: Array<IParkFuel>;
}
export interface IOriginalFuel {
    date: string;
    fuel: number;
    list: Array<IParkFuel>;
}

export type FuelResponseDTO = Array<IOriginalFuel>;
