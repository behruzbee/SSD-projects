import {AxiosResponse} from 'axios';
import {UseMutationResult} from 'react-query';

import {IGarage, ISaveGarage} from '@models/garage_model';

export interface GarageFormFieldProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    selectedGarage: IGarage;
    saveGarage: UseMutationResult<AxiosResponse, unknown, ISaveGarage>;
}
