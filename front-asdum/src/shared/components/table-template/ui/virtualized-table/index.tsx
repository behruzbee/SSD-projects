import cx from 'classnames';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
    CellProps,
    Column,
    useBlockLayout,
    useFilters,
    useTable,
} from 'react-table';

import MuiPagination from '@components/Pagination';
import {OrdinaryTable} from '@components/table-template/ui/virtualized-table/components/ordinaryTable';
import {VirtualizedTable} from '@components/table-template/ui/virtualized-table/components/virtualizedTable';
import {DeleteOperation, EditOperation} from '@features/edit-operation';
import {CheckboxProps} from '@models/props';
import {setOrderNumber} from '@shared/helpers';
import {calculateTotalPage} from '@shared/helpers/calculateTotalPage';

import {DefaultColumnFilter} from '../table/components/default-columns-filter';
import {SelectedCheckbox} from '../table/components/selected-checkbox';
import {useSelectedModel} from '../table/components/selected-checkbox/model/selected-checkbox.store';
import s from './index.module.scss';

interface ITableTemplate<T extends object> {
    data: T[];
    columns: Column<T>[];
    disabled?: boolean;
    loading?: boolean;
    setSelected?: (e: T) => void;
    withFilter?: boolean;
    isVirtualized?: boolean;
    withPagination?:
        | {
              setPage: (int: number) => void;
              page: number;
              size: number;
              totalCount: number;
          }
        | false;
    withActions?: {mark?: boolean; edit?: boolean; delete?: boolean};
    virtualizedProps?: {
        height?: number;
        itemCount?: number;
        width?: number;
        itemSize?: number;
    };
    handleClick?: (props: CellProps<T>) => void;
    handleCheckboxClick?: (props: CellProps<T>, checked: boolean) => void;
    handleDelete?: (props: CellProps<T>) => void;
}

type ColumnProps<T extends object> = React.PropsWithChildren<
    CellProps<T, string>
>;

export const VirtualizedTableTemplateComponent = <T extends CheckboxProps>({
    columns,
    data,
    setSelected,
    withActions,
    handleClick,
    withPagination,
    handleDelete,
    handleCheckboxClick,
    disabled,
    loading,
    withFilter,
    isVirtualized,
    virtualizedProps,
}: ITableTemplate<T>) => {
    const {t} = useTranslation();
    const {toggleCheckbox, clearSelected} = useSelectedModel<T>();
    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        [],
    );
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable(
            {
                //@ts-ignore
                columns,
                data,
                defaultColumn,
            },
            withFilter ? (hooks) => useFilters(hooks) : () => null,
            (hooks) => {
                hooks.visibleColumns.push((columns) => {
                    const editRow = {
                        id: 'edit',
                        Header: () => <div>{t('edit')}</div>,
                        Cell: (props: ColumnProps<T>) => (
                            <div>
                                <EditOperation
                                    onClick={() => {
                                        setSelected &&
                                            setSelected(props.row.original);
                                        handleClick && handleClick(props);
                                    }}
                                />
                            </div>
                        ),
                    };
                    const pickRow = {
                        id: 'pick',
                        Header: () => <div>{t('mark')}</div>,
                        Cell: (props: ColumnProps<T>) => (
                            <div>
                                <SelectedCheckbox
                                    onClick={async (checked) => {
                                        await toggleCheckbox(
                                            props.row.original,
                                        );
                                        handleCheckboxClick &&
                                            handleCheckboxClick(props, checked);
                                    }}
                                    id={props.row.original.id}
                                />
                            </div>
                        ),
                    };
                    const cols = [...columns];

                    if (withPagination) {
                        cols.unshift(
                            //@ts-ignore
                            {
                                Header: '№',
                                id: 'number',
                                //@ts-ignore
                                Cell: ({row}: ColumnProps<T>) =>
                                    setOrderNumber(
                                        row.index + 1,
                                        withPagination?.page as number,
                                        withPagination?.size || 10,
                                    ),
                            },
                        );
                    }

                    const deleteRow = {
                        id: 'delete',
                        Header: () => <div>{t('delete')}</div>,
                        Cell: (props: ColumnProps<T>) => (
                            <div>
                                <DeleteOperation
                                    onClick={() => {
                                        setSelected &&
                                            setSelected(props.row.original);
                                        handleDelete && handleDelete(props);
                                    }}
                                />
                            </div>
                        ),
                    };

                    if (withActions?.mark) {
                        //@ts-ignore
                        cols.push(pickRow);
                    }

                    if (withActions?.edit) {
                        //@ts-ignore
                        cols.push(editRow);
                    }

                    if (withActions?.delete) {
                        //@ts-ignore
                        cols.push(deleteRow);
                    }

                    return cols;
                });
            },
            isVirtualized && useBlockLayout,
        );

    useEffect(
        () => () => clearSelected(),
        [withPagination ? withPagination?.page : null],
    );

    return (
        <div className={cx(s.tabletemplateWrapper)}>
            {disabled && <div className={s.disabled} />}
            {loading && <div className={s.disabled} />}
            <div className={s.tableContainer}>
                {isVirtualized ? (
                    <VirtualizedTable
                        getTableProps={getTableProps}
                        headerGroups={headerGroups}
                        prepareRow={prepareRow}
                        rows={rows}
                        getTableBodyProps={getTableBodyProps}
                        virtualizedProps={virtualizedProps}
                    />
                ) : (
                    <OrdinaryTable
                        getTableProps={getTableProps}
                        headerGroups={headerGroups}
                        prepareRow={prepareRow}
                        rows={rows}
                        getTableBodyProps={getTableBodyProps}
                    />
                )}
            </div>
            <div className={s.tablePagination}>
                {withPagination ? (
                    <MuiPagination
                        onChange={withPagination.setPage}
                        totalCount={calculateTotalPage(
                            withPagination.size,
                            withPagination.totalCount,
                        )}
                        currentPage={withPagination.page}
                    />
                ) : null}
            </div>
        </div>
    );
};
