import {TypeProps} from '@features/edit-operation';
import {IFuelType} from '@models/fuel_type_model';

export type Props = {
    fuel: IFuelType;
    setModal: (type: TypeProps, value: boolean) => void;
    editModalOpen: boolean;
};
