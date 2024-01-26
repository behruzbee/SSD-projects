import {trackerStatisticsStore} from '@entities/tracker-statistics/model';
import {months} from '@entities/tracker-statistics/model/data';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import MultiSelect from '@components/Select';
import {SelectOptions} from '@models/select_options_model';

export const TrackerMonth = () => {
    const {t} = useTranslation();
    const {defaultMonth, setSelectedMonth, setDateRange, setTrackerLostData} =
        trackerStatisticsStore((state) => state, shallow);
    const handleSelect = (e: SelectOptions) => {
        setDateRange(e.value + 1);
        setSelectedMonth(e);
        setTrackerLostData([]);
    };

    useEffect(() => {
        setSelectedMonth(
            months.filter(
                (item: SelectOptions) => item.value === defaultMonth.value,
            )[0],
        );
    }, [t]);
    return (
        <div>
            <MultiSelect
                defaultValue={defaultMonth}
                options={months}
                onChange={handleSelect}
                value={defaultMonth}
                placeholder={t('select_date')}
                nooptionsmessage={t('no_data')}
            />
        </div>
    );
};
