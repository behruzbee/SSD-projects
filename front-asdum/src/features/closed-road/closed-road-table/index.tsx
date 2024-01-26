import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {CellProps} from 'react-table';
import shallow from 'zustand/shallow';

import DeleteDialog from '@components/SureToDeleteDialog';
import {
    TableTemplateComponent,
    useSelectedModel,
} from '@components/table-template';
import {useModalManageStore} from '@features/edit-operation';
import {StatisticsPermission} from '@shared/constants/permissions/statistics.permission';
import {permissionChecker} from '@shared/helpers/permission';
import {useAuthStore} from '@shared/store/auth';

import {useClosedRoadStore} from '../closed-road-constructor/model/road-constructor.store';
import {useClosedRoadD} from './api/mutations';
import s from './index.module.scss';
import {useColumns} from './libs/columns';
import {useCRoadTbStore} from './model/closedRTbData.store';
import {ICRoadTbData} from './model/closedRTbData.types';

export const ClosedRoadTable = () => {
    const columns = useColumns();
    const {t} = useTranslation();
    const navigation = useNavigate();
    const [data, draw, totalCount, page, setPage, deleted, setDeleted] =
        useCRoadTbStore(
            (s) => [
                s.tableData,
                s.drawElements,
                s.totalCount,
                s.page,
                s.setPage,
                s.deletedId,
                s.setDeletedId,
            ],
            shallow,
        );
    const [openModal, setModal] = useModalManageStore((s) => [
        s.deleteModalOpen,
        s.setModalOpen,
    ]);
    const setSelected = useClosedRoadStore((s) => s.setSelectedData);
    const {selected} = useSelectedModel();
    useEffect(() => {
        draw(selected as ICRoadTbData);
    }, [selected]);

    const handleClick = (props: CellProps<ICRoadTbData>) => {
        navigation('edit', {state: props.row.original});
    };

    const deleteRoad = useClosedRoadD(() => setModal('delete', false));
    const handleDelete = ({row}: CellProps<ICRoadTbData>) => {
        setDeleted(row.original.id);
        setModal('delete', true);
    };
    const userInfo = useAuthStore((state) => state.userInfo);
    return (
        <div className={s.closedRoadTableContainer}>
            <TableTemplateComponent
                data={data}
                withPagination={{
                    page,
                    setPage,
                    totalCount,
                    size: 5,
                }}
                handleClick={handleClick}
                columns={columns}
                handleDelete={handleDelete}
                withActions={{
                    mark: true,
                    edit: permissionChecker(
                        StatisticsPermission.CLOSED_ROAD_UPDATE,
                        userInfo?.permissions,
                    ),
                    delete: permissionChecker(
                        StatisticsPermission.CLOSED_ROAD_DELETE,
                        userInfo?.permissions,
                    ),
                }}
                setSelected={setSelected}
            />
            <DeleteDialog
                deleteContent={t('delete_street')}
                open={openModal}
                loading={deleteRoad.isLoading}
                handleDelete={() => deleteRoad.mutate(deleted as number)}
                deleteTitle={t('are_you_sure_delete')}
                close={() => setModal('delete', false)}
            />
        </div>
    );
};
