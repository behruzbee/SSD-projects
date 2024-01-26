export interface IAllStatuses {
    inline: number;
    notinlineexit: number;
    inactiveexit: number;
    on_route_total: number;
    ingarage: number;
    inrepair: number;
    inactivegarage: number;
    garage_total: number;
    offroute: number;
}

export type MainStatusType = keyof Omit<
    IAllStatuses,
    'on_route_total' | 'garage_total'
>;

export type ParentStatusType = keyof Pick<
    IAllStatuses,
    'ingarage' | 'inline' | 'offroute'
>;

export type InlineType = keyof Pick<
    IAllStatuses,
    'notinlineexit' | 'inactiveexit' | 'on_route_total' | 'inline'
>;
export type IngarageType = keyof Pick<
    IAllStatuses,
    'inrepair' | 'inactivegarage' | 'garage_total' | 'ingarage'
>;
export type OffRouteType = keyof Pick<IAllStatuses, 'offroute'>;

export interface IBusStatus {
    inline: Record<InlineType, number>;
    ingarage: Record<IngarageType, number>;
    offroute: Record<OffRouteType, number>;
}
