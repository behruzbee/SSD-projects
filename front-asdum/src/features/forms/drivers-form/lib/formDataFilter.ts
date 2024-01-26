import {timeParser} from '@shared/helpers/timeParser';

import {DriverFormData} from '../model/models';
import {useGetDriverData} from '../model/useGetDriverData';

const formDataFilter = (keys: string[], formData: FormData) => {
    keys.forEach((key) => {
        if (!formData.get(key)) {
            formData.delete(key);
        }
    });

    return formData;
};

export const driverFormData = (
    driverData: ReturnType<typeof useGetDriverData>,
): FormData => {
    const formData = new FormData();
    Object.keys(driverData).forEach((field: keyof DriverFormData) => {
        if (
            field === 'driver_license_expire_date' ||
            field === 'med_certificate_expire_date'
        ) {
            formData.append(field, timeParser(driverData[field], 'YYYY-MM-DD'));
        } else {
            //@ts-ignore
            formData.append(field, driverData[field]);
        }
    });
    if (!driverData['id']) {
        formData.delete('id');
    }

    if (typeof formData.get('med_file') === 'string') {
        formData.delete('med_file');
    }
    if (typeof formData.get('driver_file') === 'string') {
        formData.delete('driver_file');
    }

    const savedForm = formDataFilter(Object.keys(driverData), formData);
    return savedForm;
};
