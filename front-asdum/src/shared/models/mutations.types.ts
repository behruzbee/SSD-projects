import {AxiosResponse} from 'axios';
import {UseMutationResult} from 'react-query';

export type MutationWrapType<T = any> = (
    onSuccess?: (response?: AxiosResponse<T>) => void,
) => UseMutationResult<T>;
