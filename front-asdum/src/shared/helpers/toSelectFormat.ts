import {SelectOptions} from '@models/select_options_model';

export const toSelectFormats = <T>(
    label: string,
    value: string | number,
    data: Array<T>,
) => {
    return (data as Array<T>).map((item: any) => ({
        label: item[label],
        value: item[value],
    }));
};

export const arrOfSelectObjects = <T>(data: T[]): SelectOptions[] => {
    return data.map((item) => ({label: item + '', value: item}));
};
