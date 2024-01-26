import {AxiosResponse} from 'axios';
import {UseMutationResult} from 'react-query';

export type DriverFormProps = {
    saveDriver: UseMutationResult<AxiosResponse, unknown, any>;
};

type SelectProps = {
    label: string;
    value: number;
};

export interface DriverFormData {
    fullname: string;
    park_id: SelectProps;
    pinfl: number;
    position_id: SelectProps;
    tab_number: number;
    id?: number | null;
    med_file: string | null;
    driver_file: string | null;
    med_certificate_expire_date: Date;
    driver_license_expire_date: Date;
    driver_license: string;
    med_certificate: string;
}
