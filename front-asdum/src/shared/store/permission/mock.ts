export const permissionObj: IPermissionModel = {
    manage: [],
    automobile: [],
    transports: [],
    vehicle_model: [],
    routes: [],
    checkpoints: [],
    polygons: [],
    order: [],
    hrms: [],
    races_fuel: [],
    main: [],
    logs: [],
    roles: [],
    region: [],
    history: [],
    monitoring: [],
    reports: [],
    statistics: [],
    prostoy: [],
    interval: [],
    bul: [],
    move_table: [],
    fuel_statistics: [],
    tracker_statistics: [],
    closed_road: [],
    violation_race: [],
    race_statistics: [],
    drivers_kpi: [],
};
export interface IPermissionModel {
    manage: number[];
    automobile: number[];
    transports: number[];
    vehicle_model: number[];
    routes: number[];
    checkpoints: number[];
    polygons: number[];
    order: number[];
    hrms: number[];
    races_fuel: number[];
    main: number[];
    statistics: number[];
    logs: number[];
    roles: number[];
    region: number[];
    history: number[];
    monitoring: number[];
    reports: number[];
    prostoy: number[];
    interval: number[];
    race_statistics: number[];
    bul: number[];
    move_table: number[];
    fuel_statistics: number[];
    tracker_statistics: number[];
    closed_road: number[];
    violation_race: number[];
    drivers_kpi: number[];
}

export type SavedPermissionType = {url: string; permission: number};

export type MainRoutes =
    | 'monitoring'
    | 'history'
    | 'reports'
    | 'statistics'
    | 'manage';
type ManageSubRoutes =
    | 'automobile'
    | 'transports'
    | 'vehicle_model'
    | 'routes'
    | 'dynamic_schedule'
    | 'checkpoints'
    | 'polygons'
    | 'order'
    | 'hrms'
    | 'diff_norm'
    | 'access_control'
    | 'roles'
    | 'users'
    | 'logs'
    | 'garages'
    | 'positions';
type StatisticsSubRoutes =
    | 'prostoy'
    | 'interval'
    | 'race_statistics'
    | 'bul'
    | 'move_table'
    | 'fuel_statistics'
    | 'tracker_statistics'
    | 'closed_road'
    | 'violation_race'
    | 'drivers_kpi';

type PickSubRoute<T> = T extends 'manage'
    ? ManageSubRoutes
    : StatisticsSubRoutes;
export type ChildrenPermissions<T> = {
    name: string;
    route: PickSubRoute<T>;
    value: number[];
    parent?: boolean;
    reference?: string;
};
export interface PermissionsList {
    name: string;
    route: MainRoutes;
    value: number[];
    parent?: boolean;
    reference?: string;
    children?: ChildrenPermissions<MainRoutes>[];
}

export type AllPermissionRoutes = {
    name: string;
    route: string;
    reference?: string;
};

const getAllPermissions = (list: PermissionsList[]): AllPermissionRoutes[] => {
    const allList: AllPermissionRoutes[] = [];
    list.forEach((parent) => {
        allList.push({name: parent.name, route: parent.route});
        const children = parent?.children;
        if (children) {
            children.forEach((child) =>
                allList.push({
                    name: child.name,
                    route: child.route,
                    reference: child?.reference,
                }),
            );
        }
    });

    return allList;
};

export const permissionsList: PermissionsList[] = [
    {
        name: 'monitoring',
        parent: true,
        value: [],
        route: 'monitoring',
    },
    {
        name: 'history',
        route: 'history',
        value: [],
        parent: true,
    },
    {
        name: 'reports',
        route: 'reports',
        value: [],
        parent: true,
    },
    {
        name: 'statistics',
        route: 'statistics',
        value: [],
        parent: true,
        children: [
            {
                name: 'prostoy',
                route: 'prostoy',
                value: [],
                reference: 'statistics',
            },
            {
                name: 'interval',
                route: 'interval',
                value: [],
                reference: 'statistics',
            },
            {
                name: 'race_statistics',
                route: 'race_statistics',
                value: [],
                reference: 'statistics',
            },
            {
                name: 'bul',
                route: 'bul',
                value: [],
                reference: 'statistics',
            },
            {
                name: 'move_table',
                route: 'move_table',
                value: [],
                reference: 'statistics',
            },
            {
                name: 'fuel_statistics',
                route: 'fuel_statistics',
                value: [],
                reference: 'statistics',
            },
            {
                name: 'tracker-statistics',
                route: 'tracker_statistics',
                value: [],
                reference: 'statistics',
            },
            {
                name: 'closed_roads',
                route: 'closed_road',
                value: [],
                reference: 'statistics',
            },
            {
                name: 'closed_roads_violation',
                route: 'violation_race',
                value: [],
                reference: 'statistics',
            },
            {
                name: 'drivers_kpi',
                route: 'drivers_kpi',
                value: [],
                reference: 'statistics',
            },
        ],
    },
    {
        name: 'manage',
        route: 'manage',
        value: [1],
        parent: true,
        children: [
            {
                name: 'automobile',
                route: 'automobile',
                value: [],
                reference: 'manage',
            },
            {
                name: 'transports',
                route: 'transports',
                value: [],
                reference: 'manage',
            },
            {
                name: 'vehicle_model',
                route: 'vehicle_model',
                value: [],
                reference: 'manage',
            },
            {
                name: 'routes',
                route: 'routes',
                value: [],
                reference: 'manage',
            },
            {
                name: 'dynamic_schedule',
                route: 'dynamic_schedule',
                value: [],
                reference: 'manage',
            },
            {
                name: 'checkpoints',
                route: 'checkpoints',
                value: [],
                reference: 'manage',
            },
            {
                name: 'polygons',
                route: 'polygons',
                value: [],
                reference: 'manage',
            },
            {
                name: 'order',
                route: 'order',
                value: [],
                reference: 'manage',
            },
            {
                name: 'human_resources',
                route: 'hrms',
                value: [],
                reference: 'manage',
            },
            {
                name: 'diff_norm_title',
                route: 'diff_norm',
                value: [],
                reference: 'manage',
            },
            {
                name: 'access_rights',
                route: 'access_control',
                value: [],
                reference: 'manage',
            },
            {
                name: 'users',
                route: 'users',
                value: [],
                reference: 'manage',
            },
            {
                name: 'roles',
                route: 'roles',
                value: [],
                reference: 'manage',
            },
            {
                name: 'logs',
                route: 'logs',
                value: [],
                reference: 'manage',
            },
        ],
    },
];

export const allPermissions = getAllPermissions(permissionsList);
