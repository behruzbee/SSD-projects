import {TablePageWrapper} from '@widgets/TablePageWrapper';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {useCoefList} from '@api/diff_norm/hooks';
import {useDeleteCoef} from '@api/diff_norm/mutations';
import DeleteDialog from '@components/SureToDeleteDialog';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {DiffNormPermission} from '@shared/constants/permissions/manage.permissions';
import {permissionChecker} from '@shared/helpers/permission';
import {useAuthStore} from '@shared/store/auth';
import {useDiffNormStore} from '@store/race_fuel';

import {useColumns} from './lib/useColumns';

const CoefTable = () => {
    const {isFetching} = useCoefList();
    const {t} = useTranslation();
    const {coefList, selectedKoef} = useDiffNormStore((s) => s, shallow);
    const {setModalOpen, deleteModalOpen} = useModalManageStore(
        (state) => state,
    );
    const handleCloseDeleteModal = () => setModalOpen('delete', false);
    const deleteKoef = useDeleteCoef(handleCloseDeleteModal);
    const {columns} = useColumns();
    const userInfo = useAuthStore((state) => state.userInfo);

    return (
        <TablePageWrapper
            title={t('koefficients')}
            onAdd={() => setModalOpen('add', true)}
            configs={{
                withAddBtn: permissionChecker(
                    DiffNormPermission.KOEFFICIENT_ADD,
                    userInfo?.permissions,
                ),
            }}
            comingData={coefList}
            columns={columns as any}
            isLoading={isFetching}
            noSearch={true}
        >
            {deleteModalOpen && (
                <DeleteDialog
                    open={deleteModalOpen}
                    close={handleCloseDeleteModal}
                    loading={deleteKoef.isLoading}
                    handleDelete={() =>
                        deleteKoef.mutate({ids: [selectedKoef.id]})
                    }
                    deleteTitle={t('delete_koef')}
                    deleteContent={t('sure_to_delete_koef')}
                />
            )}
        </TablePageWrapper>
    );
};

export default React.memo(CoefTable);
