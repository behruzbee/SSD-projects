import {DriverFormData} from './models';

export const useGetDriverData = (data: DriverFormData) => {
    const driverData = {
        ...data,
        park_id: data.park_id.value,
        position_id: data.position_id.value,
    };
    return driverData;
};
