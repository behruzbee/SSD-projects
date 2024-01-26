import {AxiosResponse} from 'axios';
import React, {ReactNode, useEffect, useMemo} from 'react';
import {UseMutationResult} from 'react-query';

import CustomTopBar, {IConfigProps} from '@components/CustomTopBar';
import MuiPagination from '@components/Pagination';
import {TableTemplateComponent} from '@components/table-template';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {CustomColumn} from '@models/table.model';
import {calculateTotalPage} from '@shared/helpers/calculateTotalPage';
import DataLoading from '@shared/hoc/DataLoading';

import TableTemplate from './TableTemplate';

interface Props<T extends object, IDelete> {
    title: string;
    comingData: T[];
    columns: CustomColumn<T>[];
    isLoading: boolean;
    deleteData?: IDelete;
    deleteMutation?: UseMutationResult<AxiosResponse, unknown, IDelete>;
    onEdit?: () => void;
    rightSideChildren?: ReactNode;
    sideBarNoDisplayKeys?: (keyof T)[];
    hideEdit?: boolean;
    hideDelete?: boolean;
    searchTerm?: string;
    totalCount?: number;
    page?: number;
    setPage?: (page: number) => void;
    addLabel?: string;
    totalCountLoading?: boolean;
    setSearchTerm?: (value: string) => void;
    searchPlaceholder?: string;
    noSearch?: boolean;
    noPagination?: boolean;
    onAdd?: () => void;
    withActions?: {mark?: boolean; edit?: boolean; delete?: boolean};
    filter?: ReactNode;
    children?: ReactNode;
    hideAddButton?: boolean;
    isNotVirtual?: boolean;
    generateButtonLabel?: string;
    onGenerate?: () => void;
    configs?: IConfigProps;
    disabledDays?: [{from: Date; to: Date}];
    components?: React.ReactElement[];
}

const TablePageWrapper = <T extends {col1: number}, D>({
    title,
    isLoading,
    searchTerm = '',
    totalCount,
    page = NaN,
    setPage = () => null,
    addLabel,
    comingData,
    columns,
    searchPlaceholder,
    totalCountLoading = false,
    setSearchTerm,
    noPagination = false,
    onAdd,
    children,
    isNotVirtual,
    generateButtonLabel,
    onGenerate,
    configs,
    disabledDays,
    components,
    withActions,
}: Props<T, D>) => {
    const {closeAllModal} = useModalManageStore((state) => state);
    const totalPages = useMemo(
        () => (totalCount ? calculateTotalPage(10, totalCount) : 0),
        [totalCount],
    );

    useEffect(() => {
        closeAllModal();
    }, []);

    return (
        <>
            <div className="main__container">
                <CustomTopBar
                    title={title}
                    components={components}
                    isLoading={isLoading}
                    onAdd={onAdd}
                    generateButtonLabel={generateButtonLabel}
                    onGenerate={onGenerate}
                    addLabel={addLabel}
                    configs={configs}
                    searchPlaceholder={searchPlaceholder}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    disabledDays={disabledDays}
                />

                {children}

                <div className="file">
                    <DataLoading
                        loading={isLoading || totalCountLoading}
                        data={comingData}
                    >
                        {!isNotVirtual ? (
                            <TableTemplate
                                comingData={comingData}
                                columns={columns as any}
                            />
                        ) : (
                            <TableTemplateComponent
                                columns={columns as any}
                                data={comingData as any}
                                withActions={withActions}
                                withPagination={{
                                    page,
                                    setPage,
                                    size: 10,
                                    totalCount: totalCount as number,
                                }}
                            />
                        )}
                    </DataLoading>

                    {!noPagination &&
                    !searchTerm &&
                    totalPages &&
                    !isLoading &&
                    !isNotVirtual ? (
                        <div className="pageWrapper">
                            <MuiPagination
                                onChange={setPage}
                                totalCount={totalPages}
                                currentPage={page}
                                disabled={totalPages == page}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default TablePageWrapper;
