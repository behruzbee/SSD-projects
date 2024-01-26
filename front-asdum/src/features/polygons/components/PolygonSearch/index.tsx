import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import usePolygonSearch from '@src/shared/api/polygon/usePolygonSearch';
import {usePolygonStore} from '@src/shared/store/polygon';

import SearchPage from '@components/SearchPage';

import styles from './index.module.scss';

const PolygonSearch = () => {
    const {t} = useTranslation();
    usePolygonSearch();
    const [routeName, setRouteName, setRouteType] = usePolygonStore(
        (s) => [s.routeName, s.setRouteName, s.setRouteType],
        shallow,
    );

    const handleSearch = (e: any) => {
        const value = e.target.value;
        if (parseInt(value[0])) {
            setRouteType(1);
        } else {
            setRouteType(2);
        }
        setRouteName(value);
    };

    return (
        <div className={styles.wrapper}>
            <SearchPage
                handleTextChange={handleSearch}
                text={routeName}
                placeholder={t('search')}
            />
        </div>
    );
};

export default PolygonSearch;
