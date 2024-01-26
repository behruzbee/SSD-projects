import cn from 'classnames';
import i18next from 'i18next';
import React from 'react';

import ListWithBusIcon from '@components/ListWithBusIcon';

import s from './index.module.scss';

interface Props<T> {
    title?: string;
    isLoading?: boolean;
    data: T[];
    value: keyof T;
    keyProp: keyof T;
}

const ListWithBusIconWrapper = <T,>({
    title = i18next.t('fixed_parks'),
    data,
    value,
    keyProp,
    isLoading,
}: Props<T>) => {
    return (
        <div className={s.wrapper}>
            <div className={cn('card__item', s.cardItem)}>
                <p className="keyTitle">{title}</p>
                <ListWithBusIcon
                    data={data}
                    isLoading={isLoading}
                    value={value}
                    keyProp={keyProp}
                />
            </div>
        </div>
    );
};

export default ListWithBusIconWrapper;
