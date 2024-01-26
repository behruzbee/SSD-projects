import {QueryClient} from 'react-query';

export const envKeys = {
    VITE_MS_HOST: 'VITE_MS_HOST',
    VITE_SCHEME: 'VITE_SCHEME',
    VITE_WS_SCHEME: 'VITE_WS_SCHEME',
    VITE_NOTIFICATION_WEBSOCKET: 'VITE_NOTIFICATION_WEBSOCKET',
};

export const apiKeys2 = {
    login: 'login',
    authMe: 'authMe',
    getUsers: 'getUsers',
    saveUser: 'saveUser',
    updateUser: 'updateUser',
    deleteUser: 'deleteUser',
    usersParkList: 'usersParkList',
    getAutoTrans: 'getAutoTrans',
    getTotalAutoTrans: 'getTotalAutoTrans',
    getSingleAutoTrans: 'getSingleAutoTrans',
    saveAutoTransport: 'saveAutoTransport',
    updateAutoTransport: 'updateAutoTransport',
    deleteAutoTransport: 'deleteAutoTransport',
    getBulGarages: 'getBulGarages',
    getBulData: 'getBulData',
    getBusModels: 'getBusModels',
    getAllBusModels: 'getAllBusModels',
    searchBusModel: 'searchBusModel',
    saveBusModel: 'saveBusModel',
    getTotalBusModelCount: 'getTotalBusModelCount',
    deleteBusModel: 'deleteBusModel',
    getFuelTypeList: 'getFuelTypeList',
    saveFuel: 'saveFuel',
    deleteFuel: 'deleteFuel',
    getKppData: 'getKppData',
    getGarageKppData: 'getGarageKppData',
    getDiffNormData: 'getDiffNormData',
    getCoeflist: 'getCoeflist',
    saveDiffNorm: 'saveDiffNorm',
    saveModels: 'saveModels',
    saveCoef: 'saveCoef',
    deleteCoef: 'deleteCoef',
    applyCoef: 'applyCoef',
    getEmployees: 'getEmployees',
    saveEmployee: 'saveEmployee',
    deleteEmployee: 'deleteEmployee',
    saveEmployeeFile: 'saveEmployeeFile',
    downloadDriverLicenseFile: 'downloadDriverLicenseFile',
    downloadMedCertificateFile: 'downloadMedCertificateFile',
    searchEmployee: 'searchEmployee',
    getEmployeesPositions: 'getEmployeesPositions',
    getEmployees2: 'getEmployees2',
    saveEtalon: 'saveEtalon',
    getEtalon: 'getEtalon',
    getFuelStatistics: 'getFuelStatistics',
    getGarages: 'getGarages',
    getGaragesByRegion: 'getGaragesByRegion',
    saveGarage: 'saveGarage',
    deleteGarage: 'deleteGarage',
    getGraphById: 'getGraphById',
    getGraphList: 'getGraphList',
    getMonthlyGraphicNumbers: 'getMonthlyGraphicNumbers',
    getBusList: 'getBusList',
    getHistory: 'getHistory',
    getKppById: 'getKppById',
    getKpps: 'getKpps',
    getLogsData: 'getLogsData',
    getLocations: 'getLocations',
    getParkRouteBusList: 'getParkRouteBusList',
    getTotalStatus: 'getTotalStatus',
    getAllBuses: 'getAllBuses',
    getRoutesCoords: 'getRoutesCoords',
    getBusInfo: 'getBusInfo',
    getMoveTableData: 'getMoveTableData',
    getOnlineUsers: 'getOnlineUsers',
    getParks: 'getParks',
    savePark: 'savePark',
    updatePark: 'updatePark',
    deletePark: 'deletePark',
    getParkById: 'getParkById',
    getByPark: 'getByPark',
    getGarageByPark: 'getGarageByPark',
    getRegionParks: 'getRegionParks',
    getPassportData: 'getPassportData',
    savePassport: 'savePassport',
    checkPolygon: 'checkPolygon',
    savePoints: 'savePoints',
    getPointById: 'getPointById',
    getPolygons: 'getPolygons',
    savePolygon: 'savePolygon',
    getByRouteName: 'getByRouteName',
    getPositions: 'getPositions',
    savePositions: 'savePositions',
    deletePositions: 'deletePositions',
    getProstoyRequest: 'getProstoyRequest',
    getProstoySearch: 'getProstoySearch',
    saveCheckedUser: 'saveCheckedUser',
    getProtocolData: 'getProtocolData',
    saveProtocolData: 'saveProtocolData',
    getRegions: 'getRegions',
    generateReport: 'generateReport',
    getRoles: 'getRoles',
    deleteRole: 'deleteRole',
    saveRole: 'saveRole',
    savePermissionRole: 'savePermissionRole',
    getTotal: 'getTotal',
    getRouteP: 'getRouteP',
    getRouteSearch: 'getRouteSearch',
    deleteRoute: 'deleteRoute',
    getExGarages: 'getExGarages',
    getByRoute: 'getByRoute',
    getMonthlyExchange: 'getMonthlyExchange',
    saveOrder: 'saveOrder',
    saveMonthlyOrder: 'saveMonthlyOrder',
    deleteOrder: 'deleteOrder',
    getRouteHistory: 'getRouteHistory',
    getRouteNames: 'getRouteNames',
    getRouteType: 'getRouteType',
    getRoutesList: 'getRoutesList',
    getList: 'getList',
    saveShedule: 'saveShedule',
    deleteSchedule: 'deleteSchedule',
    getStations: 'getStations',
    getStationsHistory: 'getStationsHistory',
    getStationTypeList: 'getStationTypeList',
    getStationsList: 'getStationsList',
    getSearchedStations: 'getSearchedStations',
    postStation: 'postStation',
    removeStation: 'removeStation',
    getTrackerParks: 'getTrackerParks',
    getTrackerTableData: 'getTrackerTableData',
    getTrackerDataWithDetail: 'getTrackerDataWithDetail',
    getReportData: 'getReportData',
    getReportTypes: 'getReportTypes',
};

export const apiKeys = {
    login: 'auth/login',
    authMe: 'auth/me',
    getUsers: 'manage/user/list',
    saveUser: 'manage/user/save',
    updateUser: 'manage/user/update',
    deleteUser: 'manage/user/delete',
    usersParkList: 'manage/user/parks',
    getAutoTrans: 'manage/bus/',
    getTotalAutoTrans: 'manage/bus/total',
    getSingleAutoTrans: 'manage/bus/byId',
    saveAutoTransport: 'manage/bus/save',
    updateAutoTransport: 'manage/bus/update',
    deleteAutoTransport: 'manage/bus/delete',
    getBulGarages: 'bull/getGarage',
    getBulData: 'bull/get/',
    getBusModels: 'manage/busmodel/list',
    getAllBusModels: 'manage/busmodel/listAll',
    searchBusModel: 'manage/busmodel/search',
    saveBusModel: 'manage/busmodel/save',
    getTotalBusModelCount: 'manage/busmodel/total',
    deleteBusModel: 'manage/busmodel/delete',
    getFuelTypeList: 'manage/busmodel/fueltype/list',
    saveFuel: 'manage/busmodel/fueltype/save',
    deleteFuel: 'manage/busmodel/fueltype/delete',
    getKppData: 'manage/interval/getInterval',
    getViolationInterval: 'violation/getInterval',
    getGarageKppData: 'manage/interval/getGarage',
    getDiffNormData: 'manage/diffnorm/list',
    getCoeflist: 'manage/diffnorm/coef/list',
    saveDiffNorm: 'manage/diffnorm/save',
    saveModels: 'manage/diffnorm/saveModels',
    saveCoef: 'manage/diffnorm/coef/save',
    deleteCoef: 'manage/diffnorm/coef/delete',
    applyCoef: 'manage/diffnorm/coef/apply',
    getEmployees: 'manage/employee/',
    saveEmployee: 'manage/employee/saveEmployee',
    deleteEmployee: 'manage/employee/delete',
    saveEmployeeFile: 'manage/employee/uploadFile',
    downloadDriverLicenseFile: 'manage/employee/downloadFile/',
    downloadMedCertificateFile: 'manage/employee/downloadFile/',
    searchEmployee: 'manage/employee/search',
    getEmployeesPositions: 'manage/employee/positions',
    getEmployees2: 'manage/employee/list',
    saveEtalon: 'manage/route/save/etalon',
    getEtalon: 'manage/route/getEtalon',
    getFuelStatistics: 'fuel/getByDate/',
    getGarages: 'manage/garage/garageList',
    getGaragesByRegion: 'manage/garage/getByRegionId',
    saveGarage: 'manage/garage/create',
    deleteGarage: 'manage/garage/delete',
    getGraphById: 'manage/route_exch/getGraph',
    getGraphList: 'manage/route_exch/getGraphNumbers',
    getMonthlyGraphicNumbers: 'manage/route_exch/getGraphNumbers',
    getBusList: 'manage/bus/getForHistory',
    getHistory: 'manage/history',
    getKppById: 'manage/station/getKppsByRoute',
    getKpps: 'manage/station/getKpps',
    getLogsData: 'log/getList',
    getLocations: 'activeBuses/monitoring',
    getParkRouteBusList: 'monitoring/get_buses',
    getTotalStatus: 'monitoring/totalStatus',
    getAllBuses: 'monitoring/getCurrentPoints',
    getRoutesCoords: 'monitoring/points',
    getMoveTableData: 'situation/getSituations',
    getOnlineUsers: 'auth/onlineusers',
    getParks: 'manage/park/list',
    getKPIList: 'kpi/parkEmployee/list',
    getKPIByPark: 'kpi/park',
    getKPIByEmployee: 'kpi/employee',
    getKPIParkList: 'kpi/park/list',
    savePark: 'manage/park/save',
    updatePark: 'manage/park/update',
    deletePark: 'manage/park/delete',
    getParkById: 'manage/park/getById',
    getByPark: 'manage/route/getByPark',
    getGarageByPark: 'manage/park/getGaragesByPark',
    getRegionParks: 'manage/park/getByRegion',
    getPassportData: 'manage/route/getPassport',
    savePassport: 'manage/route/save/passport',
    checkPolygon: 'manage/station/checkPolygon',
    savePoints: 'manage/route/save/points',
    getPointById: 'manage/route/getPoints',
    getPolygons: 'manage/polygon/list',
    savePolygon: 'manage/polygon/save',
    deletePolygon: 'manage/polygon/delete',
    getByRouteName: 'manage/polygon/search',
    getPositions: 'manage/employee/positions',
    savePositions: 'manage/employee/savePosition',
    deletePositions: 'manage/employee/deletePosition',
    getProstoyRequest: 'manage/prostoy/get',
    getProstoySearch: 'manage/prostoy/get',
    saveCheckedUser: 'manage/prostoy/saveCalled',
    getProtocolData: 'manage/route/getProtocol',
    saveProtocolData: 'manage/route/save/protocol',
    getRegions: 'manage/region/list',
    generateReport: 'manage/report/get_reports',
    getRoles: 'manage/role/list',
    deleteRole: 'manage/role/delete',
    saveRole: 'manage/role/save',
    savePermissionRole: 'manage/role/permission',
    getTotal: 'manage/route/total',
    getRouteP: 'manage/route/list',
    getRouteSearch: 'manage/route/search',
    deleteRoute: 'manage/route/delete',
    getExGarages: 'manage/route_exch/getExGarages',
    getByRoute: 'manage/route_exch/getByRoute',
    getMonthlyExchange: 'manage/route_exch/getByRoute',
    saveOrder: 'manage/route_exch/save',
    saveMonthlyOrder: 'manage/route_exch/save',
    deleteOrder: 'manage/route_exch/delete',
    getRouteHistory: 'manage/route/lastUser',
    getRouteNames: 'manage/route/getRouteNames',
    getRouteType: 'manage/route/getRouteType',
    getRoutesList: 'manage/route/list',
    getList: 'manage/schedule/list',
    saveShedule: 'manage/schedule/save',
    deleteSchedule: 'manage/schedule/delete',
    deleteScheduleItem: 'manage/schedule/deleteByGraph',
    getStations: 'manage/station/getByRoute',
    getStationsHistory: 'manage/route_exch/getByRoute',
    getStationTypeList: 'manage/station/type/list',
    getStationsList: 'manage/station/list',
    getSearchedStations: 'manage/station/search',
    postStation: 'manage/station/save',
    removeStation: 'manage/station/delete',
    getTrackerParks: 'gps_lose',
    getTrackerTableData: 'gps_lose/park/',
    getTrackerDataWithDetail: 'gps_lose/garage/',
    getReportData: 'manage/report/generate',
    getReportTypes: 'manage/report/getTypes',
    getBusMonitoringData: 'monitoring',
    saveClosedRoad: 'closedRoads/save',
    deleteCloseRoad: 'closedRoads/deleteById',
    getClosedRoads: 'closedRoads/getData',
    getViolationRoadHistory: 'violation/getCoordinates',
    applyKoefficient: 'manage/diffnorm/coef/apply',
    denyApplyKoefficient: 'manage/diffnorm/coef/denyApplid',
    getAppliedKoefficient: 'manage/diffnorm/getApplauds',
    deviationList: 'violation/getDeviationList',
    idleRaceList: 'violation/getIncompleteList',
    graphDetail: 'graph/detail/schedule',
    graphDetailGosByRoute: 'graph/detail/gosNumbers',
    graphNumbers: 'graph/detail/graphNumbers',
    graphDirections: 'graph/detail/directions',
    updateDynamichSchedule: 'graph/detail/update',
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
export const device = {
    mobile: '600px',
    planshet: '1000px',
    laptop: '1500px',
};

export enum MAP_ICON {
    POINT = 'https://bit.ly/3hcRprR',
    STATION = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIGZpbGw9IndoaXRlIiBzdHJva2U9IiM0NDU1RUEiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSI3IiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjQiIHJ4PSIxIiBmaWxsPSIjNDQ1NUVBIi8+Cjwvc3ZnPgo=',
    ACTIVE_STATION = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzQ0MDRfNDMzMTApIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzgiIGZpbGw9IndoaXRlIiBzdHJva2U9IiM0NDU1RUEiIHN0cm9rZS13aWR0aD0iNCIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIzMiIgZmlsbD0iIzQ0NTVFQSIvPgo8cmVjdCB4PSIyNi42NjgiIHk9IjM0LjY2NiIgd2lkdGg9IjI2LjY2NjciIGhlaWdodD0iMTAuNjY2NyIgcng9IjEiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNDQwNF80MzMxMCI+CjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
    LAST_STATION = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzQ0MDRfNDMzMzcpIiBzdHlsZT0iIiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAwLjk5MjU4NywgMCwgMC41NzgyMDYpIj4NCiAgICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIzMiIgZmlsbD0iIzQ0NTVFQSI+PC9jaXJjbGU+DQogICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAxXzQ0MDRfNDMzMzcpIj4NCiAgICAgIDxwYXRoIGQ9Ik0zOCA1MS44NzZDMzMuOTY1NCA1MS4zNjI2IDMwLjI3NzcgNDkuMzMyMyAyNy42ODY0IDQ2LjE5NzZDMjUuMDk1IDQzLjA2MjkgMjMuNzk0NiAzOS4wNTkxIDI0LjA0OTIgMzQuOTk5OUMyNC4zMDM5IDMwLjk0MDggMjYuMDk0NyAyNy4xMzEgMjkuMDU3NSAyNC4zNDQ4QzMyLjAyMDMgMjEuNTU4NSAzNS45MzI5IDIwLjAwNSA0MCAyMEM0NC4wNzIxIDE5Ljk5NyA0Ny45OTIxIDIxLjU0NjcgNTAuOTYxMyAyNC4zMzM0QzUzLjkzMDUgMjcuMTIgNTUuNzI1NSAzMC45MzQgNTUuOTgwNSAzNC45OTgxQzU2LjIzNTUgMzkuMDYyMiA1NC45MzEzIDQzLjA3MDYgNTIuMzMzNyA0Ni4yMDY1QzQ5LjczNjEgNDkuMzQyNSA0Ni4wNDA1IDUxLjM3IDQyIDUxLjg3NlY1Ni4wMjRDNDkuODkyIDU2LjIwOCA1NiA1Ny40NyA1NiA1OUM1NiA2MC42NTYgNDguODM2IDYyIDQwIDYyQzMxLjE2NCA2MiAyNCA2MC42NTYgMjQgNTlDMjQgNTcuNDcgMzAuMTA4IDU2LjIwOCAzOCA1Ni4wMjRWNTEuODc2Wk00MCA0MEM0MS4wNjA5IDQwIDQyLjA3ODMgMzkuNTc4NiA0Mi44Mjg0IDM4LjgyODRDNDMuNTc4NiAzOC4wNzgzIDQ0IDM3LjA2MDkgNDQgMzZDNDQgMzQuOTM5MSA0My41Nzg2IDMzLjkyMTcgNDIuODI4NCAzMy4xNzE2QzQyLjA3ODMgMzIuNDIxNCA0MS4wNjA5IDMyIDQwIDMyQzM4LjkzOTEgMzIgMzcuOTIxNyAzMi40MjE0IDM3LjE3MTYgMzMuMTcxNkMzNi40MjE0IDMzLjkyMTcgMzYgMzQuOTM5MSAzNiAzNkMzNiAzNy4wNjA5IDM2LjQyMTQgMzguMDc4MyAzNy4xNzE2IDM4LjgyODRDMzcuOTIxNyAzOS41Nzg2IDM4LjkzOTEgNDAgNDAgNDBaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPg0KICAgICAgPHBhdGggZD0iTTQwIDQwQzQxLjA2MDkgNDAgNDIuMDc4MyAzOS41Nzg2IDQyLjgyODQgMzguODI4NEM0My41Nzg2IDM4LjA3ODMgNDQgMzcuMDYwOSA0NCAzNkM0NCAzNC45MzkxIDQzLjU3ODYgMzMuOTIxNyA0Mi44Mjg0IDMzLjE3MTZDNDIuMDc4MyAzMi40MjE0IDQxLjA2MDkgMzIgNDAgMzJDMzguOTM5MSAzMiAzNy45MjE3IDMyLjQyMTQgMzcuMTcxNiAzMy4xNzE2QzM2LjQyMTQgMzMuOTIxNyAzNiAzNC45MzkxIDM2IDM2QzM2IDM3LjA2MDkgMzYuNDIxNCAzOC4wNzgzIDM3LjE3MTYgMzguODI4NEMzNy45MjE3IDM5LjU3ODYgMzguOTM5MSA0MCA0MCA0MFoiIGZpbGw9IndoaXRlIj48L3BhdGg+DQogICAgICA8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iNiIgcng9IjEiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDMzLjAwNzggMzkuMDM3MSkiIGZpbGw9IiM0NDU1RUEiPjwvcmVjdD4NCiAgICA8L2c+DQogIDwvZz4NCiAgPGRlZnM+DQogICAgPGNsaXBQYXRoIGlkPSJjbGlwMF80NDA0XzQzMzM3Ij4NCiAgICAgIDxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0id2hpdGUiPjwvcmVjdD4NCiAgICA8L2NsaXBQYXRoPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcDFfNDQwNF80MzMzNyI+DQogICAgICA8cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiAxNikiPjwvcmVjdD4NCiAgICA8L2NsaXBQYXRoPg0KICA8L2RlZnM+DQo8L3N2Zz4=',
    BUS = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA1MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzQ5MDlfMTkzNDEpIj4KPHBhdGggZD0iTTI1LjYwNjkgNjkuNDk4M0wyNS42MDY5IDY5LjQ5ODNDMjUuMTM4MiA2OC45NzYzIDE5LjE5MzYgNjIuMzA1OSAxMy4zNzUyIDUzLjU5NzJDMTAuNDY2IDQ5LjI0MjggNy42MDg0OCA0NC40MDg1IDUuNDgyNjUgMzkuNjAxMUMzLjM0ODU5IDM0Ljc3NTEgMiAzMC4wODIzIDIgMjUuOTgxOUMyIDEyLjYzMiAxMi44NjM0IDEuNzY4NTUgMjYuMjEzNSAxLjc2ODU1QzM5LjU2MzQgMS43Njg1NSA1MC40MjY4IDEyLjYzMiA1MC40MjcgMjUuOTgxOUM1MC40MjcgMzAuMDgyMyA0OS4wNzg0IDM0Ljc3NTEgNDYuOTQ0NCAzOS42MDExQzQ0LjgxODUgNDQuNDA4NSA0MS45NjEgNDkuMjQyOCAzOS4wNTE4IDUzLjU5NzJDMzMuMjMzNCA2Mi4zMDU5IDI3LjI4ODggNjguOTc2MyAyNi44MjAxIDY5LjQ5ODNMMjYuODIwMSA2OS40OTg0QzI2LjQ5NjggNjkuODU4NCAyNS45MzA0IDY5Ljg1ODYgMjUuNjA2OSA2OS40OTgzWiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iIzQ0NTVFQSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuMjA4IDE1SDM1Ljk5NTNDMzYuNzIwNCAxNSAzNy4yMDM4IDE1LjYwNDMgMzcuMjAzOCAxNi4yMDg1VjM4LjIwNDFDMzcuMjAzOCAzOC45MjkyIDM2LjcyMDQgMzkuNTMzNSAzNS45OTUzIDM5LjUzMzVIMzUuMTQ5NFY0Mi43OTY1SDMxLjY0NDZWMzkuNTMzNUgxOS42OFY0Mi43OTY1SDE2LjA1NDRWMzkuNTMzNUgxNS4yMDg1QzE0LjYwNDEgMzkuNTMzNSAxNCAzOC45MjkyIDE0IDM4LjIwNDFWMTYuMjA4NUMxNCAxNS42MDQxIDE0LjYwNDMgMTUgMTUuMjA4NSAxNUgxNS4yMDhaTTE3Ljk4NzcgMzIuMTYxNUMxOS4xOTYyIDMyLjE2MTUgMjAuMTYzIDMzLjEyODQgMjAuMTYzIDM0LjMzNjhDMjAuMTYzIDM1LjU0NTMgMTkuMTk2MiAzNi41MTIyIDE3Ljk4NzcgMzYuNTEyMkMxNi43NzkyIDM2LjUxMjIgMTUuODEyMyAzNS41NDUzIDE1LjgxMjMgMzQuMzM2OEMxNS44MTIzIDMzLjEyODQgMTYuNzc5MiAzMi4xNjE1IDE3Ljk4NzcgMzIuMTYxNVYzMi4xNjE1Wk0zMy4yMTU0IDMyLjE2MTVDMzQuNDIzOSAzMi4xNjE1IDM1LjM5MDggMzMuMTI4NCAzNS4zOTA4IDM0LjMzNjhDMzUuMzkwOCAzNS41NDUzIDM0LjQyMzkgMzYuNTEyMiAzMy4yMTU0IDM2LjUxMjJDMzIuMTI3NyAzNi41MTIyIDMxLjE2MDkgMzUuNTQ1MyAzMS4xNjA5IDM0LjMzNjhDMzEuMTYwOSAzMy4xMjg0IDMyLjEyNzcgMzIuMTYxNSAzMy4yMTU0IDMyLjE2MTVWMzIuMTYxNVpNMTYuMjk1NiAxNi4yMDgzSDM0LjkwNzVDMzUuNTExOSAxNi4yMDgzIDM2LjExNiAxNi42OTE2IDM2LjExNiAxNy40MTY3VjI2LjYwMjFIMTUuMjA4MVYxNy40MTY3QzE1LjIwODEgMTYuNjkxNiAxNS42OTE1IDE2LjIwODMgMTYuMjk1OCAxNi4yMDgzSDE2LjI5NTZaIiBmaWxsPSIjNDQ1NUVBIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNDkwOV8xOTM0MSI+CjxyZWN0IHdpZHRoPSI1MS40MjciIGhlaWdodD0iNzAuOTk5OSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNSAwLjI2ODU1NSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
    KPP_BUS = 'https://bit.ly/3t8A88V',
    ROUTE_MARKER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iOTIiIHZpZXdCb3g9IjAgMCA5MiA5MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ3Ljg2MDggOTAuNjcwNkw0OC4yMzI4IDkxLjAwNDdMNDcuODYwOCA5MC42NzA3QzQ2Ljg2OSA5MS43NzU0IDQ1LjEzMzggOTEuNzc3MiA0NC4xNDAzIDkwLjY3MDdMNDMuODA5NSA5MC45Njc4TDQ0LjE0MDMgOTAuNjcwNkM0My41MTI2IDg5Ljk3MTYgMzUuNzU4NyA4MS4yNzAyIDI4LjE2NDcgNjkuOTAzOUMyNC4zNjc2IDY0LjIyMDYgMjAuNjE3MyA1Ny44ODExIDE3LjgxNzcgNTEuNTVDMTUuMDE1MyA0NS4yMTI3IDEzLjE4MTYgMzguOTE5MiAxMy4xODE2IDMzLjMxODdDMTMuMTgxNiAxNS4yMjI5IDI3LjkwNDUgMC41IDQ2LjAwMDYgMC41QzY0LjA5NjQgMC41IDc4LjgxOTEgMTUuMjIyOSA3OC44MTk1IDMzLjMxODdDNzguODE5NSAzOC45MTkyIDc2Ljk4NTggNDUuMjEyNyA3NC4xODM0IDUxLjU1QzcxLjM4MzggNTcuODgxMSA2Ny42MzM1IDY0LjIyMDYgNjMuODM2NSA2OS45MDM5QzU2LjI0MjQgODEuMjcwMiA0OC40ODg1IDg5Ljk3MTYgNDcuODYwOCA5MC42NzA2Wk0yOC43MzcxIDMzLjMxODdDMjguNzM3MSA0Mi44MzgzIDM2LjQ4MDkgNTAuNTgyMyA0Ni4wMDA2IDUwLjU4MjNDNTUuNTIgNTAuNTgyMyA2My4yNjM4IDQyLjgzODUgNjMuMjYzOCAzMy4zMTg5QzYzLjI2MzggMjMuNzk5MyA1NS41MiAxNi4wNTUzIDQ2LjAwMDYgMTYuMDU1M0MzNi40ODExIDE2LjA1NTMgMjguNzM3MSAyMy43OTkxIDI4LjczNzEgMzMuMzE4N1oiIGZpbGw9IiNEMzY0NjQiIHN0cm9rZT0iI0JEMDAwMCIvPgo8L3N2Zz4K',
}

export enum FILE_TYPE {
    type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    extension = '.xlsx',
}

export enum EVEN_DAY {
    EVEN = 'Чет',
    NOTEVEN = 'Нечет',
}

export enum ROLENAME {
    SUPER_ADMIN = 'Superadmin',
}

export const yQuery = {
    ns: 'use-load-option',
    apikey: 'e3e687ba-3f11-4a48-92de-55ca45ab88b9',
    load: 'Map,control.GeolocationControl,control.FullscreenControl',
};

export const yStyle = {
    width: '100%',
    height: '100vh',
    transition: 'all 0.5s linear',
};

export const objectModule = [
    'objectManager.addon.objectsBalloon',
    'objectManager.addon.objectsHint',
];

export enum YENUM {
    MODULE = 'multiRouter.MultiRoute',
}

export const tashkentzoom: [number, number] = [41.311153, 69.279729];

export const REPORT_TYPE = {
    speedOver: 7,
    idle: 11,
    type1: 2,
    mileage: 22,
    driverRace: 21,
    parkRace: 23,
    routeRace: 24,
};