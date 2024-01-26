export interface IReportDataProps {
    gos_numbers: string[];
    name: string;
    pdf_file: string;
    requested_time: string;
    user_name: string;
}

export interface IReportRequestParam {
    busId: number;
    fromTime: string;
    toTime: string;
    type: number;
}

export interface ISelectedReport {
    garageno: number | string;
    gos: string;
    route: number | string;
    driver: string;
    tab_number: number | string;
    speeds: string;
    interval: string;
    duration: string;
    maxSpeed: number;
    user: string;
}

export interface IGenerateReport {
    page: number;
    size: number;
    type: string;
}
