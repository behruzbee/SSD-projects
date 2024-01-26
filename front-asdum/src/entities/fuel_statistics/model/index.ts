import {DateRange} from 'react-day-picker';
import create, {GetState, SetState} from 'zustand';

import i18n from '@shared/localization/i18n';

import {IOriginalFuel} from './fuelStatistics.types';

interface IFuelStatistics {
    pathName: string;
    selectedRange: DateRange;
    fuelData: any[];
    gasData: any[];
    columnsArr: Array<string>;
    dateColumns: Array<string>;
    routesGaragesData: Map<string, string[]>;
    parksData: Map<string, string[]>;
    routesData: Map<string, string[]>;
    routesMapData: Map<string, string[]>;
    garagesMapData: Map<string, string[]>;
    parksMapData: Map<string, Record<string, number>>;
    distributorFn: (data: any[]) => void;
    setFuelData: (paylad: any[], type: 'diesel' | 'gas') => void;
    setRoutesGarages: (payload: any[]) => void;
    setColumnsArr: (payload: Array<IOriginalFuel>) => void;
    setPathName: (payload: string) => void;
    setSelectedRange: (payload: DateRange) => void;
    clearFuel: () => void;
}

export const fuelStatisticsStore = create<IFuelStatistics>(
    (set: SetState<IFuelStatistics>, get: GetState<IFuelStatistics>) => {
        return {
            pathName: '',
            selectedRange: {
                from: new Date(),
                to: new Date(),
            },
            fuelData: [],
            gasData: [],
            columnsArr: [],
            routesGaragesData: new Map(),
            parksData: new Map(),
            routesData: new Map(),
            routesMapData: new Map(),
            garagesMapData: new Map(),
            parksMapData: new Map(),
            distributorFn: (data) => {
                const routesData = get().routesMapData;
                const garagesData = get().garagesMapData;
                let routesArr: string[] = [];
                let garagesArr: string[] = [];
                data.forEach((item) => {
                    item.list.forEach((park: any) => {
                        if (!routesData.has(park?.name)) {
                            routesData.set(park?.name, []);
                        }
                        park.list.forEach((route: any) => {
                            if (!garagesData.has(route?.name)) {
                                garagesData.set(route?.name, []);
                            }
                            if (!routesArr.includes(route?.name)) {
                                routesArr.push(route?.name);
                            }
                            route.list.forEach((garage: any) => {
                                if (!garagesArr.includes(garage?.name)) {
                                    garagesArr.push(garage?.name);
                                }
                            });
                            garagesData.set(route?.name, garagesArr);
                            garagesArr = [];
                        });
                        routesData.set(park?.name, routesArr);
                        routesArr = [];
                    });
                });
            },
            dateColumns: [],
            setRoutesGarages: (fuelData) => {
                const garagesData = get().routesGaragesData;
                const parksData = get().parksData;
                const routesData = get().routesData;
                fuelData.forEach((fuel) => {
                    fuel['list'].forEach((park: any) => {
                        const parkName = park['name'];
                        if (parksData.has(parkName)) {
                            if (!parksData.get(parkName)?.includes(park.name)) {
                                const parkList: string[] = parksData.get(
                                    parkName,
                                ) as string[];
                                parkList?.push(park.name);
                                parksData.set(parkName, parkList);
                            }
                        } else {
                            parksData.set(parkName, [park['name']]);
                        }
                        park['list'].forEach((route: any) => {
                            const routeName = route['name'];
                            if (routesData.has(routeName)) {
                                if (
                                    !routesData
                                        .get(routeName)
                                        ?.includes(routeName)
                                ) {
                                    const routeList: string[] = routesData.get(
                                        routeName,
                                    ) as string[];
                                    routeList?.push(routeName);
                                    routesData.set(routeName, routeList);
                                }
                            } else {
                                routesData.set(routeName, [route['name']]);
                            }
                            route['list'].forEach((garage: any) => {
                                if (garagesData.has(routeName)) {
                                    if (
                                        !garagesData
                                            .get(routeName)
                                            ?.includes(garage.name)
                                    ) {
                                        const garageList: string[] =
                                            garagesData.get(
                                                routeName,
                                            ) as string[];
                                        garageList?.push(garage.name);
                                        garagesData.set(routeName, garageList);
                                    }
                                } else {
                                    garagesData.set(routeName, [
                                        garage['name'],
                                    ]);
                                }
                            });
                        });
                    });
                });
            },
            setColumnsArr: (payload) => {
                const columnsNameArr: string[] = [];
                columnsNameArr.push('name');
                payload.forEach((item) => {
                    columnsNameArr.push(item.date);
                });

                set({columnsArr: columnsNameArr});
                set({
                    dateColumns: columnsNameArr.slice(1),
                });
            },
            setFuelData: (fuel, type) => {
                get().setColumnsArr(fuel);
                get().setRoutesGarages(fuel);
                const comingData: any = [];

                fuel.forEach((data) => {
                    comingData.push({
                        ...data,
                        list: Array.from(get().parksData.keys()).map(
                            (park: any) => {
                                const foundedPark = data.list.find(
                                    (p: any) => p.name === park,
                                );
                                if (!foundedPark) {
                                    return {
                                        name: park,
                                        fuel: 0,
                                        list: [],
                                    };
                                }
                                return {
                                    ...foundedPark,
                                    list: foundedPark.list.map((route: any) => {
                                        return {
                                            ...route,
                                            list: get()
                                                .routesGaragesData.get(
                                                    route['name'],
                                                )
                                                ?.map((gName) => {
                                                    const founded =
                                                        route.list.find(
                                                            ({name}: any) =>
                                                                name === gName,
                                                        );

                                                    if (!founded) {
                                                        return {
                                                            name: gName,
                                                            fuel: 0,
                                                        };
                                                    }

                                                    return founded;
                                                }),
                                        };
                                    }),
                                };
                            },
                        ),
                    });
                });

                get().distributorFn(comingData);

                if (comingData?.length) {
                    try {
                        const data: any[] = [];
                        const dates = get().dateColumns;

                        Array.from(get().parksData.keys()).forEach(
                            (parkName, i) => {
                                data.push({name: parkName, children: []});
                                dates.forEach((date) => {
                                    data[i][date] = comingData
                                        .find((item: any) => item.date === date)
                                        .list.find(
                                            (park: any) =>
                                                park?.name === parkName,
                                        )?.fuel;
                                });
                                get()
                                    .routesMapData.get(parkName)
                                    ?.forEach((routeName, rI) => {
                                        data[i].children.push({
                                            name: routeName,
                                            children: [],
                                        });
                                        dates.forEach((date) => {
                                            data[i].children[rI][date] =
                                                comingData
                                                    .find(
                                                        (item: any) =>
                                                            item.date === date,
                                                    )
                                                    .list.find(
                                                        (park: any) =>
                                                            park?.name ===
                                                            parkName,
                                                    )
                                                    ?.list.find(
                                                        (route: any) =>
                                                            route?.name ===
                                                            routeName,
                                                    )?.fuel;
                                        });

                                        get()
                                            .garagesMapData.get(routeName)
                                            ?.forEach((garageName, gI) => {
                                                data[i].children[
                                                    rI
                                                ].children.push({
                                                    name: garageName,
                                                });
                                                dates.forEach((date) => {
                                                    data[i].children[
                                                        rI
                                                    ].children[gI][date] =
                                                        comingData
                                                            .find(
                                                                (item: any) =>
                                                                    item.date ===
                                                                    date,
                                                            )
                                                            .list.find(
                                                                (park: any) =>
                                                                    park?.name ===
                                                                    parkName,
                                                            )
                                                            ?.list.find(
                                                                (route: any) =>
                                                                    route?.name ===
                                                                    routeName,
                                                            )
                                                            ?.list.find(
                                                                (garage: any) =>
                                                                    garage?.name ===
                                                                    garageName,
                                                            )?.fuel;
                                                });
                                            });
                                    });
                            },
                        );

                        if (type === 'diesel') {
                            set({fuelData: data});
                        } else {
                            set({gasData: data});
                        }
                    } catch (e) {
                        if (type === 'diesel') {
                            set({fuelData: []});
                        } else {
                            set({gasData: []});
                        }
                    }
                }
            },
            setPathName: (payload) => {
                if (payload.includes('gas')) {
                    set({pathName: i18n.t('gas')});
                } else {
                    set({pathName: i18n.t('fuel')});
                }
            },
            setSelectedRange: (payload) => {
                set({selectedRange: payload});
            },
            clearFuel: () => {
                get().routesMapData.clear();
                get().garagesMapData.clear();
                get().parksData.clear();
                get().routesData.clear();
                if (get().fuelData.length) {
                    set({fuelData: []});
                }
                if (get().gasData.length) {
                    set({gasData: []});
                }
            },
        };
    },
);
