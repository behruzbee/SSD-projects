import {Chip} from '@mui/material';
import React from 'react';

import DataLoading from '@shared/hoc/DataLoading';

import s from './index.module.scss';

interface ListWithBusIconProps<T> {
    data: T[] | undefined;
    value: keyof T;
    keyProp: keyof T;
    isLoading?: boolean;
}

const ListWithBusIcon = <T,>({
    data,
    value,
    keyProp,
    isLoading,
}: ListWithBusIconProps<T>) => {
    return (
        <div className={s.iconBox}>
            <DataLoading loading={isLoading ?? false} data={data}>
                {data?.map((item) => (
                    <Chip
                        key={item[keyProp] as unknown as string}
                        variant="outlined"
                        //@ts-ignore
                        label={item[value]}
                        className={s.chip}
                    />
                ))}
            </DataLoading>
        </div>
    );
};

export default ListWithBusIcon;
