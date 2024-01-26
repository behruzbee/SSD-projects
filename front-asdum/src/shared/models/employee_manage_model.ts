export interface IEmployeeData {
    id?: number | null;
    fullname: string | null;
    serialNumber?: number | null;
    tab_number: string | number | null;
    pinfl: number | null | string;
    position_id: number | null;
    park_id: number | null;
    works: any[];
    med_certificate: string | null;
    med_certificate_expire_date: string | null;
    driver_license: string | null;
    driver_license_expire_date: string | null;
    driver_file: string | null;
    med_file: string | null;
    remove_emloyee?: any;
    col1: number;
    actions: string;
}

export interface ISaveEmployeeData extends IEmployeeData {
    fullname: string | null;
    tabNumber: string | number | null;
    pinfl: number | null;
    position_id: number | null;
    park_id: number | null;
    works: any[];
    med_certificate: string | null;
    med_certificate_expire_date: string | null;
    driver_license: string | null;
    driver_license_expire_date: string | null;
}

export interface IEmployeeManage {
    totalCount: number;
    list: IEmployeeData[];
}
