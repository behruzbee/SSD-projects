import {ReactElement} from 'react';
export interface IMProps<T> {
    children: ReactElement;
    title: string;
    data?: Array<T>;
}
