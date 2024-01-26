import * as yup from 'yup';

export type UpdateVehicleModelProps = {
    id?: number;
    name: string;
    remark: string;
    type_of_fuel?: number;
    toplivo?: any;
};

const requireText = 'Поля обьязательны';

export const vehicleModelUpdateScheme = yup.object().shape({
    name: yup.string().trim().required(requireText),
    remark: yup.string().trim().required(requireText),
});
