import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useTable} from 'react-table';

import {useEtalonStore} from '@src/shared/store/etalon';

import styles from '@styles/components/table.module.scss';

import EditableCell from './EditableCell';

const defaultColumn = {
    Cell: EditableCell,
};

const EtalonTable = () => {
    const {t} = useTranslation();
    const {data, setData} = useEtalonStore((state) => ({...state}));

    const updateMyData = (rowIndex: any, columnId: any, value: any) => {
        setData(
            data.map((row: any, index: number) => {
                if (index === rowIndex) {
                    return {
                        ...data[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            }),
        );
    };
    const makeRowSpan = (key: string) => {
        if (key === 'name') {
            return {
                rowSpan: 2,
                enableRowSpan: true,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: key,
                        displayNone: true,
                        Cell: (props: any) => {
                            return props.value;
                        },
                    },
                ],
            };
        } else {
            return {
                rowSpan: 2,
                enableRowSpan: true,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: key,
                        displayNone: true,
                    },
                ],
            };
        }
    };

    const columns = React.useMemo(() => {
        return [
            {
                Header: t('day'),
                accessor: 'name',
                ...makeRowSpan('name'),
            },

            {
                Header: t('busCountSchedule'),
                columns: [
                    {
                        Header: t('allRaces'),
                        accessor: 'allTransport',
                    },
                    {
                        Header: '6:00',
                        accessor: 'mor6',
                    },
                    {
                        Header: '8:00',
                        accessor: 'mor8',
                    },
                    {
                        Header: '9:00',
                        accessor: 'mor9',
                    },
                    {
                        Header: '14:00',
                        accessor: 'aft14',
                    },
                    {
                        Header: '15:00',
                        accessor: 'aft15',
                    },
                    {
                        Header: '17:00',
                        accessor: 'aft17',
                    },
                    {
                        Header: '19:00',
                        accessor: 'evn19',
                    },
                    {
                        Header: '21:00',
                        accessor: 'evn21',
                    },
                    {
                        Header: '22:00',
                        accessor: 'evn22',
                    },
                    {
                        Header: '23:00',
                        accessor: 'evn23',
                    },
                    {
                        Header: t('norm_fuel'),
                        accessor: 'norm_fuel',
                    },
                ],
            },

            {
                Header: t('plan_and_race'),
                columns: [
                    {
                        Header: '0%',
                        accessor: 'per0',
                    },
                    {
                        Header: '10%',
                        accessor: 'per10',
                        Cell: (props: any) => {
                            const actVal = +props.row.original.per0 - 10;
                            if (actVal <= 0) {
                                return 0;
                            } else {
                                return actVal;
                            }
                        },
                    },
                    {
                        Header: '15%',
                        accessor: 'per15',
                        Cell: (props: any) => {
                            const actVal = +props.row.original.per0 - 15;

                            if (actVal <= 0) {
                                return 0;
                            } else {
                                return actVal;
                            }
                        },
                    },
                    {
                        Header: '20%',
                        accessor: 'per20',
                        Cell: (props: any) => {
                            const actVal = +props.row.original.per0 - 20;

                            if (actVal <= 0) {
                                return 0;
                            } else {
                                return actVal;
                            }
                        },
                    },
                ],
            },
        ];
    }, [t, data]);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data,
            defaultColumn,
            // @ts-ignore
            updateMyData,
        });

    return (
        <div className={styles.container}>
            <table className={styles.table} {...getTableProps()}>
                <thead className={styles.theader}>
                    {headerGroups.map((headerGroup: any) => (
                        <tr
                            className={styles.thRow}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column: any) => {
                                return (
                                    <th
                                        {...column
                                            .getHeaderProps
                                            // column.getSortByToggleProps(),
                                            ()}
                                        rowSpan={`${column.rowSpan ?? 1}`}
                                        style={
                                            column.displayNone
                                                ? {display: 'none'}
                                                : null
                                        }
                                        // active={column.isSorted}
                                        className={cx(styles.th, [
                                            column?.id === 'allTransport' &&
                                                styles.thFirst,
                                        ])}
                                    >
                                        {column.render('Header')}

                                        {/* <UpIcon
                                                className={cx(
                                                    column.isSortedDesc && 'tUp',
                                                    column.isSorted && 'tActive',
                                                    'tUpIcon',
                                                )}
                                            /> */}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>

                <tbody className={styles.tbody} {...getTableBodyProps()}>
                    {rows.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr
                                className={styles.bodyRow}
                                {...row.getRowProps()}
                            >
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td
                                            className={styles.td}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EtalonTable;
