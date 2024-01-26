import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import SearchPage from '@components/SearchPage';
import {useViolationRoadStore} from '@features/closed-road-violation/model/closed-road-violation.store';
import {TableDataType} from '@features/closed-road-violation/model/closed-road-violation.types';
import {useSearchViolation} from '@features/closed-road/closed-road-table/api/hooks';
import {trimmer} from '@shared/helpers/trimmer';
import useDebounce from '@shared/hooks/useDebounce';

interface IViolationSearch {
    searchKey: keyof TableDataType;
}
export const RoadViolationSearch: FC<IViolationSearch> = ({searchKey}) => {
    const {t} = useTranslation();
    const setSearch = useViolationRoadStore((s) => s.setSearch);
    const [value, setValue] = useState<string>('');
    useSearchViolation();
    const searchValue = useDebounce(value, 1000);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(trimmer(value));
        if (!value) {
            setValue('');
        }
    };
    useEffect(() => {
        setSearch({key: searchKey, value});
    }, [searchValue]);

    return (
        <SearchPage
            handleTextChange={handleSearch}
            text={value}
            placeholder={t('search')}
        />
    );
};
