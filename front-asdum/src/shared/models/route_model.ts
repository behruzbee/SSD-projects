export interface RouteModel {
    route_id: number;
    park_name: string;
    route_name: string;
    license_number: any;
    remark: string;
    user_name: string;
    last_date: string;
    saved_details: boolean | any;
    saved_etalon: boolean | any;
    saved_passport: boolean | any;
    saved_points: boolean | any;
    saved_protocol: boolean | any;
    saved_raspisaniya: boolean | any;
    col1: number;
    actions: string;
}

export interface RouteHistoryModel {
    route: string;
    action: string;
    time: string;
    userName: string;
}
