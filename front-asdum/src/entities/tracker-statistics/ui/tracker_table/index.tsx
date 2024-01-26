import {trackerStatisticsStore} from '@entities/tracker-statistics/model';
import cx from 'classnames';
import RCTable from 'rc-table';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {useTrackerTableData} from '@api/tracker-statistics/hook';
import {ITrackerData} from '@models/tracker_statistics_model';
import DataLoading from '@shared/hoc/DataLoading';

import s from './index.module.scss';
import {useColumnsGenerator} from './useColumns';

export const Trackertable = () => {
    const {t} = useTranslation();
    const {isFetching} = useTrackerTableData();
    const {trackerLostData, selectedParkData} = trackerStatisticsStore(
        (state) => state,
    );
    const {columns} = useColumnsGenerator();

    return (
        <DataLoading loading={isFetching} data={trackerLostData}>
            <div className={cx(s.trackerTable)}>
                <div className={cx(s.trackerEvents)}>
                    <p>
                        <span className={cx(s.trackerEventType)}>
                            {t('total_disabled_count')}:{' '}
                        </span>{' '}
                        <span className={cx(s.trackerEventValue)}>
                            {selectedParkData?.total_count}
                        </span>
                    </p>
                    <p>
                        <span className={cx(s.trackerEventType)}>
                            {t('total_disabled_duration')}:{' '}
                        </span>{' '}
                        <span className={cx(s.trackerEventValue)}>
                            {selectedParkData?.total_duration}
                        </span>
                    </p>
                    <p>
                        <span className={cx(s.trackerEventType)}>
                            {t('total_disabled_average_duration')}:{' '}
                        </span>{' '}
                        <span className={cx(s.trackerEventValue)}>
                            {selectedParkData?.average_duration}
                        </span>
                    </p>
                </div>
                <RCTable
                    className={cx('commonTable')}
                    columns={columns}
                    data={trackerLostData}
                    scroll={{y: 500}}
                    rowKey={(r: ITrackerData) => `${r.id}`}
                    expandable={{
                        expandRowByClick: true,
                    }}
                />
            </div>
        </DataLoading>
    );
};
