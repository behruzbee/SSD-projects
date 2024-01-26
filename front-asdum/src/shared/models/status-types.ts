export interface StatusClass {
    inline: number;
    inactiveexit: number;
    notinlineexit: number;
    inactivegarage: number;
    ingarage: number;
    inrepair: number;
    offroute: number;
}

export interface ICommonStatusClass {
    inline: number;
    notinline: number;
    notactive: number;
    ingarage: number;
    inrepair: number;
}

export type StatusTypes = keyof StatusClass;
export type CommonStatusType = keyof ICommonStatusClass;
