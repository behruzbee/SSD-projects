import {AxiosResponse} from 'axios';
import {UseMutationResult} from 'react-query';

import {IParkModel, ISavePark} from '@models/park_model';

export interface AutoParkFormFieldProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    selected: IParkModel;
    saveMutation: UseMutationResult<AxiosResponse, unknown, ISavePark>;
}
