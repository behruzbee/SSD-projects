import i18next from 'i18next';

import i18n from '@src/shared/localization/i18n';

export enum TOKEN {
    AUTH_TOKEN = 'AUTH_TOKEN_FRONT',
    ROLE_NAME = 'ROLE_NAME_FRONT',
    PERMISSIONS = 'PERMISSIONS_FRONT',
    AUTHED = 'AUTHED',
}

export enum PERMISSION {
    PARK = 'PARK',
    USER = 'USER',
    MANAGEMENT = 'MANAGEMENT',
    POLYGON = 'POLYGON',
    BUS = 'BUS',
    REPORT = 'REPORT',
    MODEL = 'MODEL',
    ROUTE = 'ROUTE',
    POINT_TYPE = 'POINT_TYPE',
    BUS_MAP_GOOGLE = 'BUS_MAP_GOOGLE',
    CHECKUP = 'CHECKUP',
    CHANGE_BUS_STATUS = 'CHANGE_BUS_STATUS',
    FUELING = 'FUELING',
    MSCHEDULE = 'MSCHEDULE',
    HISTORY = 'HISTORY',
    LOGGING = 'LOGGING',
    UTILITIES = 'UTILITIES',
    CHAT_TEMPLATE = 'CHAT_TEMPLATE',
}

export enum PermissionEnum {
    automobile = 'automobile',
    transports = 'transports',
    vehicle_model = 'transports',
    routes = 'routes',
    checkpoints = 'checkpoints',
    polygons = 'polygons',
    order = 'order',
    races_fuel = 'races_fuel',
    main = 'main',
    statistic = 'statistics',
    logs = 'logs',
    role = 'role',
    region = 'region',
    positions = 'positions',
    employees = 'employees',
}

export enum FileTypes {
    pdf = 'application/pdf',
    png = 'image/png',
    jpeg = 'image/jpeg',
    word = 'application/msword',
}

// field validation
export const requireText = i18n.t('requiredFields');
export const confirmError = i18n.t('confirm_password_incorrect');
export const moreError = i18n.t('more_than_min');

export const handleMinimal = (count: number) => {
    return i18n.t('minimal_character_length', {length: count});
};

export enum DAYS {
    MONDAY = 'pon',
    SATURDAY = 'sub',
    SUNDAY = 'vos',
    OTHER = 'bud',
}

export enum VERSION {
    V1 = 1.0,
}

export let ACTIONS: any = {
    ACTION_ADD: i18n.t('ACTION_ADD'),
    ACTION_UPDATE: i18n.t('ACTION_UPDATE'),
    ACTION_DELETE: i18n.t('ACTION_DELETE'),
    ACTION_GENERATE: i18n.t('ACTION_GENERATE'),
    ACTION_ENTER: i18n.t('ACTION_ENTER'),
    ACTION_EXIT: i18n.t('ACTION_EXIT'),
    ACTION_LIST: i18n.t('ACTION_LIST'),
};

export const ACTION_STATUS: any = {
    ACTION_ADD: 'green',
    ACTION_UPDATE: 'blue',
    ACTION_DELETE: 'red',
    ACTION_GENERATE: 'darkgray',
    ACTION_ENTER: 'darkBlue',
    ACTION_EXIT: 'orange',
    ACTION_LIST: 'gray',
};

export let ENTITY_TYPE: any = {
    MONITORING: i18n.t('MONITORING'),
    VECTOR: i18n.t('VECTOR'),
    IO_TABLE: i18n.t('IO_TABLE'),
    MAIN_BOARD: i18n.t('MAIN_BOARD'),
    INTERCITY_BOARD: i18n.t('INTERCITY_BOARD'),
    HISTORY: i18n.t('HISTORY'),
    AUTOPARK: i18n.t('AUTOPARK'),
    BUS: i18n.t('BUS'),
    BUS_DOCUMENT: i18n.t('BUS_DOCUMENT'),
    CHAT_TEMPLATE: i18n.t('CHAT_TEMPLATE'),
    GARAGE: i18n.t('GARAGE'),
    BUS_MODEL: i18n.t('BUS_MODEL'),
    ORDER: i18n.t('ORDER'),
    POINT_TYPE: i18n.t('POINT_TYPE'),
    POLYGON_TYPE: i18n.t('POLYGON_TYPE'),
    POLYGON: i18n.t('POLYGON'),
    REPORT: i18n.t('REPORT'),
    REPORT_TEMPLATE: i18n.t('REPORT_TEMPLATE'),
    ROLE: i18n.t('ROLE'),
    ROUTE: i18n.t('ROUTE'),
    STATION: i18n.t('STATION'),
    USER: i18n.t('USER'),
    POSITION: i18n.t('POSITION'),
    EMPLOYEE: i18n.t('EMPLOYEE'),
    EMPLOYEE_DOCUMENT: i18n.t('EMPLOYEE_DOCUMENT'),
    PERMISSION: i18n.t('PERMISSION'),
    POINT: i18n.t('POINT'),
    DIFF_NORM: i18n.t('DIFF_NORM'),
    BUS_STATUS: i18n.t('BUS_STATUS'),
    BUS_STATUS_CURRENT: i18n.t('BUS_STATUS_CURRENT'),
    ETALON: i18n.t('ETALON'),
    ROUTE_EXCH: i18n.t('ROUTE_EXCH'),
    MILEAGE: i18n.t('MILEAGE'),
    COEFICIENT: i18n.t('COEFICIENT'),
    GRAPH: i18n.t('GRAPH'),
    MSCHEDULE: i18n.t('MSCHEDULE'),
    MSCHEDULE_ITEM: i18n.t('MSCHEDULE_ITEM'),
    MTIMETABLE: i18n.t('MTIMETABLE'),
    CHECKIN: i18n.t('CHECKIN'),
    DISPETCHER: i18n.t('DISPETCHER'),
    KASSA: i18n.t('KASSA'),
    FUELING: i18n.t('FUELING'),
    DISPETCHERRETURN: i18n.t('DISPETCHERRETURN'),
    PLAN_KASSA: i18n.t('PLAN_KASSA'),
    ZoneExch: i18n.t('ZoneExch'),
    STATION_TYPE: i18n.t('STATION_TYPE'),
    ROUTE_TYPE: i18n.t('ROUTE_TYPE'),
    REGION: i18n.t('REGION'),
    FUEL_TYPE: i18n.t('FUEL_TYPE'),
    STATUS_CODE: i18n.t('STATUS_CODE'),
    VALIDATION_ERROR_MESSAGE: i18n.t('VALIDATION_ERROR_MESSAGE'),
};

i18next.on('languageChanged', function () {
    ACTIONS = {
        ACTION_ADD: i18n.t('ACTION_ADD'),
        ACTION_UPDATE: i18n.t('ACTION_UPDATE'),
        ACTION_DELETE: i18n.t('ACTION_DELETE'),
        ACTION_GENERATE: i18n.t('ACTION_GENERATE'),
        ACTION_ENTER: i18n.t('ACTION_ENTER'),
        ACTION_EXIT: i18n.t('ACTION_EXIT'),
        ACTION_LIST: i18n.t('ACTION_LIST'),
    };

    ENTITY_TYPE = {
        MONITORING: i18n.t('MONITORING'),
        VECTOR: i18n.t('VECTOR'),
        IO_TABLE: i18n.t('IO_TABLE'),
        MAIN_BOARD: i18n.t('MAIN_BOARD'),
        INTERCITY_BOARD: i18n.t('INTERCITY_BOARD'),
        HISTORY: i18n.t('HISTORY'),
        AUTOPARK: i18n.t('AUTOPARK'),
        BUS: i18n.t('BUS'),
        BUS_DOCUMENT: i18n.t('BUS_DOCUMENT'),
        CHAT_TEMPLATE: i18n.t('CHAT_TEMPLATE'),
        GARAGE: i18n.t('GARAGE'),
        BUS_MODEL: i18n.t('BUS_MODEL'),
        ORDER: i18n.t('ORDER'),
        POINT_TYPE: i18n.t('POINT_TYPE'),
        POLYGON_TYPE: i18n.t('POLYGON_TYPE'),
        POLYGON: i18n.t('POLYGON'),
        REPORT: i18n.t('REPORT'),
        REPORT_TEMPLATE: i18n.t('REPORT_TEMPLATE'),
        ROLE: i18n.t('ROLE'),
        ROUTE: i18n.t('ROUTE'),
        STATION: i18n.t('STATION'),
        USER: i18n.t('USER'),
        POSITION: i18n.t('POSITION'),
        EMPLOYEE: i18n.t('EMPLOYEE'),
        EMPLOYEE_DOCUMENT: i18n.t('EMPLOYEE_DOCUMENT'),
        PERMISSION: i18n.t('PERMISSION'),
        POINT: i18n.t('POINT'),
        DIFF_NORM: i18n.t('DIFF_NORM'),
        BUS_STATUS: i18n.t('BUS_STATUS'),
        BUS_STATUS_CURRENT: i18n.t('BUS_STATUS_CURRENT'),
        ETALON: i18n.t('ETALON'),
        ROUTE_EXCH: i18n.t('ROUTE_EXCH'),
        MILEAGE: i18n.t('MILEAGE'),
        COEFICIENT: i18n.t('COEFICIENT'),
        GRAPH: i18n.t('GRAPH'),
        MSCHEDULE: i18n.t('MSCHEDULE'),
        MSCHEDULE_ITEM: i18n.t('MSCHEDULE_ITEM'),
        MTIMETABLE: i18n.t('MTIMETABLE'),
        CHECKIN: i18n.t('CHECKIN'),
        DISPETCHER: i18n.t('DISPETCHER'),
        KASSA: i18n.t('KASSA'),
        FUELING: i18n.t('FUELING'),
        DISPETCHERRETURN: i18n.t('DISPETCHERRETURN'),
        PLAN_KASSA: i18n.t('PLAN_KASSA'),
        ZoneExch: i18n.t('ZoneExch'),
        STATION_TYPE: i18n.t('STATION_TYPE'),
        ROUTE_TYPE: i18n.t('ROUTE_TYPE'),
        REGION: i18n.t('REGION'),
        FUEL_TYPE: i18n.t('FUEL_TYPE'),
        STATUS_CODE: i18n.t('STATUS_CODE'),
        VALIDATION_ERROR_MESSAGE: i18n.t('VALIDATION_ERROR_MESSAGE'),
    };
});
