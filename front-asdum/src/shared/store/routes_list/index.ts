import create from 'zustand';

interface IRouteInfo {
    value: number;
    label: string;
    name: string;
}
interface IRoutesList {
    routesList: IRouteInfo[];
    selectedRoute: IRouteInfo;
    setRoutesList: (payload: IRouteInfo[]) => void;
    setSelectedRoute: (payload: IRouteInfo) => void;
}

export const useRoutesListStore = create<IRoutesList>((set) => ({
    routesList: [],
    selectedRoute: {label: '', value: 0, name: ''},
    setRoutesList: (payload: IRouteInfo[]) => {
        set({routesList: payload});
    },
    setSelectedRoute: (payload: IRouteInfo) => {
        set({selectedRoute: payload});
    },
}));
