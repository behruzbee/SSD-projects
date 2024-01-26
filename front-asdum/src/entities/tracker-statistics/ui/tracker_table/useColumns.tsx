import {trackerStatisticsStore} from '@entities/tracker-statistics/model';
import {ColumnsType} from 'rc-table/lib/interface';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {ITrackerData} from '@models/tracker_statistics_model';

import {TrackData} from '../TrackData';

export const useColumnsGenerator = () => {
    const {t} = useTranslation();
    const {trackerTableColumns} = trackerStatisticsStore((state) => state);

    const columns = useMemo<ColumnsType<ITrackerData>>(() => {
        const tableColumns: any[] = [
            {
                title: t('garage_numbers'),
                dataIndex: 'gos_no',
                width: 200,
                key: 'gos_no',
            },
        ];

        trackerTableColumns.forEach((item) => {
            if (item !== 'gos_no' && item !== 'id') {
                tableColumns.push({
                    title: item,
                    dataIndex: item,
                    width: 200,
                    key: item,
                    render: (value: number, row: ITrackerData) => {
                        return (
                            <TrackData row={row} key={row.id} value={value} />
                        );
                    },
                });
            }
        });

        return tableColumns;
    }, [trackerTableColumns, t]);

    return {
        columns,
    };
};
