import {AxiosResponse} from 'axios';
import {UseMutationResult} from 'react-query';

import {IAutoTransModel, IAutoTransSave} from '@models/autotrans_model';

export type SelectNames = 'region' | 'park_id' | 'bus_model_id';

export interface AutoTransFormFieldProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    selected: IAutoTransModel;
    saveMutation: UseMutationResult<AxiosResponse, unknown, IAutoTransSave>;
}
