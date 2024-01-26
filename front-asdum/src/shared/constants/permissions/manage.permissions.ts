export enum MainRoutePermission {
    monitoring = 'monitoring',
    history = 'history',
    reports = 'reports',
    statistics = 'statistics',
    manage = 'manage',
}

export enum ParkPermissions {
    PARK = 'PARK',
    PARK_ADD = 'PARK_ADD',
    PARK_UPDATE = 'PARK_UPDATE',
    PARK_DELETE = 'PARK_DELETE',
    GARAGE = 'GARAGE',
    GARAGE_ADD = 'GARAGE_ADD',
    GARAGE_UPDATE = 'GARAGE_UPDATE',
    GARAGE_DELETE = 'GARAGE_DELETE',
}

export enum BusPermissions {
    BUS = 'BUS',
    BUS_ADD = 'BUS_ADD',
    BUS_UPDATE = 'BUS_UPDATE',
    BUS_DELETE = 'BUS_DELETE',
}

export enum VehicleModelPermissions {
    MODEL = 'MODEL',
    MODEL_ADD = 'MODEL_ADD',
    MODEL_UPDATE = 'MODEL_UPDATE',
    MODEL_DELETE = 'MODEL_DELETE',
    FUEL_TYPES = 'FUEL_TYPES',
    FUEL_TYPES_ADD = 'FUEL_TYPES_ADD',
    FUEL_TYPES_UPDATE = 'FUEL_TYPES_UPDATE',
    FUEL_TYPES_DELETE = 'FUEL_TYPES_DELETE',
}

export enum RoutePermissions {
    ROUTE = 'ROUTE',
    ROUTE_ADD = 'ROUTE_ADD',
    ROUTE_UPDATE = 'ROUTE_UPDATE',
    ROUTE_DELETE = 'ROUTE_DELETE',
}

export enum DynamicSchPermissions {
    DYNAMIC_SCHEDULE = 'DYNAMIC_SCHEDULE',
    DYNAMIC_SCHEDULE_ADD = 'DYNAMIC_SCHEDULE_ADD',
}

export enum StationPermissions {
    STATION = 'STATION',
    STATION_ADD = 'STATION_ADD',
    STATION_UPDATE = 'STATION_UPDATE',
    STATION_DELETE = 'STATION_DELETE',
}

export enum PolygonPermissions {
    POLYGON = 'POLYGON',
    POLYGON_ADD = 'POLYGON_ADD',
    POLYGON_UPDATE = 'POLYGON_UPDATE',
    POLYGON_DELETE = 'POLYGON_DELETE',
}

export enum RouteExchPermissions {
    ROUTE_EXCH = 'ROUTE_EXCH',
    ROUTE_EXCH_ADD = 'ROUTE_EXCH_ADD', //add
    ROUTE_EXCH_UPDATE = 'ROUTE_EXCH_UPDATE',
    ROUTE_EXCH_DELETE = 'ROUTE_EXCH_DELETE', //add
    MONTHLY_EXCH = 'MONTHLY_EXCH', //add
    MONTHLY_EXCH_ADD = 'MONTHLY_EXCH_ADD', //add
    MONTHLY_EXCH_UPDATE = 'MONTHLY_EXCH_UPDATE', //add
    MONTHLY_EXCH_DELETE = 'MONTHLY_EXCH_DELETE', //add
    DAILY_EXCH_LOG = 'DAILY_EXCH_LOG', //add
    MONTHLY_EXCH_LOG = 'MONTHLY_EXCH_LOG', //add
}

export enum HRMPermissions {
    HRMS = 'HRMS',
    HRMS_ADD = 'HRMS_ADD', //add
    HRMS_UPDATE = 'HRMS_UPDATE', //add
    HRMS_DELETE = 'HRMS_DELETE', //add
    POSITIONS = 'POSITIONS', //add
    POSITIONS_ADD = 'POSITIONS_ADD', //add
    POSITIONS_UPDATE = 'POSITIONS_UPDATE', //add
    POSITIONS_DELETE = 'POSITIONS_DELETE', //add
}

export enum DiffNormPermission {
    DIFF_NORM = 'DIFF_NORM',
    DIFF_NORM_APPLY = 'DIFF_NORM_APPLY', //add
    DIFF_NORM_RESET = 'DIFF_NORM_RESET', //add
    KOEFFICIENT = 'KOEFFICIENT', //add
    KOEFFICIENT_ADD = 'KOEFFICIENT_ADD', //add
    KOEFFICIENT_UPDATE = 'KOEFFICIENT_UPDATE', //add
    KOEFFICIENT_DELETE = 'KOEFFICIENT_DELETE', //add
}

export enum AccessRightsPermissions {
    USER = 'USER',
    ACCESS_CONTROL = 'ACCESS_CONTROL',
    USER_ADD = 'USER_ADD',
    USER_UPDATE = 'USER_UPDATE',
    USER_DELETE = 'USER_DELETE',
    ROLE = 'ROLE',
    ROLE_ADD = 'ROLE_ADD',
    ROLE_UPDATE = 'ROLE_UPDATE',
    ROLE_DELETE = 'ROLE_DELETE',
}

export enum LogPermissions {
    LOGGING = 'LOGGING',
}
