import React from 'react';
import {useTranslation} from 'react-i18next';

import MultiSelect from '@components/Select';
import {useKPIDriverStore} from '@views/alert/drivers-kpi/model';

import {months} from './../../../views/alert/drivers-kpi/model/data';

export type SelectOptions<T = any> = {
    label: string;
    value: T;
};

export const MonthPicker = () => {
    const {t} = useTranslation();

    const [defaultMonth, setDateRange, setSelectedMonth, setTrackerLostData] =
        useKPIDriverStore((s) => [
            s.defaultMonth,
            s.setDateRange,
            s.setSelectedMonth,
            s.setTrackerLostData,
        ]);

    const handleSelect = (e: SelectOptions) => {
        setDateRange(e.value + 1);
        setSelectedMonth(e);
        setTrackerLostData([]);
    };

    return (
        <div>
            <MultiSelect
                defaultValue={defaultMonth}
                options={months}
                onChange={handleSelect}
                value={defaultMonth}
                placeholder={t('select_month')}
                nooptionsmessage={t('no_data')}
            />
        </div>
    );
};
