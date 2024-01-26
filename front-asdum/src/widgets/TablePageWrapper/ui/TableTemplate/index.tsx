import cx from 'classnames';
import React, {useMemo} from 'react';
import {Column, useBlockLayout, useTable} from 'react-table';
import {FixedSizeList} from 'react-window';

import {useSelectedModel} from '../../model';
import s from './index.module.scss';

interface Props<IData extends object> {
    comingData: IData[];
    columns: Column<IData>[];
}

const TableTemplate = <T extends {col1: number}>({
    comingData,
    columns,
}: Props<T>) => {
    const data = useMemo(
        () =>
            comingData?.map((elem, i) => ({
                ...elem,
                col1: i + 1,
            })),
        [comingData],
    );

    const {toggleCheckbox} = useSelectedModel<T>();

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable<T>({columns, data}, useBlockLayout);

    const RenderRow = React.useCallback(
        ({index, style}: any) => {
            const row = rows[index];

            prepareRow(row);
            return (
                <div
                    className={cx(
                        index % 2 === 0
                            ? ['tr', 'tDouble']
                            : ['tr', 'tNotDouble'],
                    )}
                    {...row.getRowProps({style})}
                >
                    {row.cells.map((cell) => {
                        //@ts-ignore
                        if (cell.column?.show) {
                            return (
                                <div
                                    className={cx('td', [
                                        cell.column.Header !== 'ID' &&
                                            cell.column.Header !== '№' &&
                                            'tPlus',
                                    ])}
                                    {...cell.getCellProps()}
                                >
                                    {cell.render('Cell')}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            );
        },
        [prepareRow, rows, toggleCheckbox],
    );

    return (
        <div className="table__container">
            <div>
                <div className="table" {...getTableProps()}>
                    <div>
                        <div className="thead">
                            {headerGroups.map((headerGroup) => (
                                <div
                                    className={cx('tr', 'tHeadRow')}
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    {headerGroup.headers.map((column) => {
                                        //@ts-ignore
                                        if (column.show) {
                                            return (
                                                <div
                                                    {...column
                                                        .getHeaderProps
                                                        // column?.getSortByToggleProps(),
                                                        ()}
                                                    className={cx(
                                                        'tHeaderStyle',
                                                        s.th,
                                                        [
                                                            column.Header !==
                                                                'ID' &&
                                                                column.Header !==
                                                                    '№' &&
                                                                'tPlus',
                                                        ],
                                                    )}
                                                >
                                                    {column.render('Header')}

                                                    {/* <UpIcon
                                                className={cx(
                                                    column.isSortedDesc &&
                                                        'tUp',
                                                    column.isSorted &&
                                                        'tActive',
                                                    'tUpIcon',
                                                )}
                                            /> */}
                                                </div>
                                            );
                                        } else return null;
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="tbody" {...getTableBodyProps()}>
                        <FixedSizeList
                            height={
                                comingData.length < 10
                                    ? 60 * comingData.length
                                    : 600
                            }
                            itemCount={rows.length}
                            itemSize={60}
                            width="100%"
                        >
                            {RenderRow}
                        </FixedSizeList>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableTemplate;
