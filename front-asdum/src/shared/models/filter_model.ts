export interface IFilter {
    name: string;
    type: number | string;
    isChecked: boolean;
    label: string;
}

export interface IReportFilter {
    name: string;
    type: string;
    isChecked: boolean;
    label: string;
}
