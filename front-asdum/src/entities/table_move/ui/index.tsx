import cx from 'classnames';
import RCTable from 'rc-table';
import {ColumnsType} from 'rc-table/lib/interface';
import React, {useMemo} from 'react';

import TFooter from '@shared/components/TF';

import {tableMoveStore} from '../model';
import {IMoveTableData} from '../types';

export const TableMove = () => {
    const {moveTableData, totalSum} = tableMoveStore((state) => state);

    const column = useMemo<ColumnsType<IMoveTableData>>(() => {
        return [
            {
                title: '',
                children: [
                    {
                        title: 'Парк',
                        dataIndex: 'name',
                        ellipsis: true,
                        width: 180,
                        fixed: 'left',
                    },
                ],
            },
            {
                title: '06:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h6plan',
                        key: 'h6plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h6fact',
                        key: 'h6fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h6diff',
                        key: 'h6diff',
                        width: 80,
                    },
                ],
            },
            {
                title: '08:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h8plan',
                        key: 'h8plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h8fact',
                        key: 'h8fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h8diff',
                        key: 'h8diff',
                        width: 80,
                    },
                ],
            },
            {
                title: '09:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h9plan',
                        key: 'h9plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h9fact',
                        key: 'h9fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h9diff',
                        key: 'h9diff',
                        width: 80,
                    },
                ],
            },
            {
                title: '14:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h14plan',
                        key: 'h14plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h14fact',
                        key: 'h14fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h14diff',
                        key: 'h14diff',
                        width: 80,
                    },
                ],
            },
            {
                title: '15:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h15plan',
                        key: 'h15plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h15fact',
                        key: 'h15fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h15diff',
                        key: 'h15diff',
                        width: 80,
                    },
                ],
            },
            {
                title: '17:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h17plan',
                        key: 'h17plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h17fact',
                        key: 'h17fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h17diff',
                        key: 'h17diff',
                        width: 80,
                    },
                ],
            },
            {
                title: '19:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h19plan',
                        key: 'h19plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h19fact',
                        key: 'h19fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h19diff',
                        key: 'h19diff',
                        width: 80,
                    },
                ],
            },
            {
                title: '21:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h21plan',
                        key: 'h21plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h21fact',
                        key: 'h21fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h21diff',
                        key: 'h21diff',
                        width: 80,
                    },
                ],
            },
            {
                title: '22:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h22plan',
                        key: 'h22plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h22fact',
                        key: 'h22fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h22diff',
                        key: 'h22diff',
                        width: 80,
                    },
                ],
            },
            {
                title: '23:00',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'h23plan',
                        key: 'h23plan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'h23fact',
                        key: 'h23fact',
                        width: 80,
                    },
                    {
                        title: 'Разница',
                        dataIndex: 'h23diff',
                        key: 'h23diff',
                        width: 80,
                    },
                ],
            },
            {
                title: 'Рейсы',
                children: [
                    {
                        title: 'План',
                        dataIndex: 'reysPlan',
                        key: 'reysPlan',
                        width: 80,
                    },
                    {
                        title: 'Факт',
                        dataIndex: 'reysFact',
                        key: 'reysFact',
                        width: 80,
                    },
                ],
            },
        ];
    }, [moveTableData]);

    return (
        <RCTable
            className={cx('commonTable')}
            columns={column}
            data={moveTableData}
            rowKey={(r: IMoveTableData) => `${r.name}`}
            expandable={{
                expandRowByClick: true,
            }}
            summary={() => <TFooter totalSumArr={totalSum} text={'Всего'} />}
        />
    );
};
