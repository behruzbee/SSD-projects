import cx from 'classnames';
import RCTable from 'rc-table';
import {ColumnsType} from 'rc-table/lib/interface';
import React, {FC} from 'react';

import TFooter from '@components/TF';
import {summator} from '@shared/helpers/summator';

import {fuelStatisticsStore} from '../model';
import s from './index.module.scss';

interface IFuelTable {
    column: ColumnsType<any>;
    data: any[];
}
export const FuelStatisticsTable: FC<IFuelTable> = ({column, data}) => {
    const {dateColumns} = fuelStatisticsStore((state) => state);
    return (
        <RCTable
            className={cx('commonTable', s.fuelStatisticstable)}
            columns={column}
            data={data}
            scroll={{y: 476}}
            rowKey={(r: any) => `${r.name}`}
            sticky
            expandable={{
                expandRowByClick: true,
            }}
            // footer={(currentData) => (
            //     <TFooter
            //         totalSumArr={summator(dateColumns, data)}
            //         text={'Всего'}
            //     />
            // )}
            summary={() => (
                <RCTable.Summary fixed="bottom">
                    <TFooter
                        totalSumArr={summator(dateColumns, data)}
                        text={'Всего'}
                    />
                </RCTable.Summary>
            )}
        />
    );
};
