import React from 'react';
import {useTranslation} from 'react-i18next';

import SearchPage from '@components/SearchPage';

export function DefaultColumnFilter({column: {filterValue, setFilter}}: any) {
    const {t} = useTranslation();
    return (
        <SearchPage
            handleTextChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            text={filterValue || ''}
            placeholder={t('search')}
        />
    );
}
