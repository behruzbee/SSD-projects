import {LoadingButton} from '@mui/lab';
import {Button, IconButton} from '@mui/material';
import {AxiosResponse} from 'axios';
import React, {ReactNode, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {UseMutationResult} from 'react-query';

import DeleteDialog from '@components/SureToDeleteDialog';
import {StationPermissions} from '@shared/constants/permissions/manage.permissions';
import {permissionChecker} from '@shared/helpers/permission';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useAuthStore} from '@shared/store/auth';

import EditIcon from '@images/svgs/EditIcon';
import ExitCloseIcon from '@images/svgs/ExitCloseIcon';
import TrashIcon from '@images/svgs/TrashIcon';

import s from './index.module.scss';

interface Props<IDelete> {
    title: string;
    onEdit?: () => void;
    editText?: string;
    handleClose: () => void;
    deleteData?: IDelete;
    deleteMutation?: UseMutationResult<AxiosResponse, unknown, IDelete>;
    onDeleteSuccess?: () => void;
    children?: ReactNode;
    hideEdit?: boolean;
    hideDelete?: boolean;
    isEditable?: boolean;
    handleCancel?: () => void;
    isLoading?: boolean;
}

const RightSideWrapper = <T,>({
    title,
    onEdit,
    handleClose,
    deleteMutation,
    deleteData,
    onDeleteSuccess,
    hideEdit,
    hideDelete,
    isEditable,
    handleCancel,
    isLoading,
    children,
    editText,
}: Props<T>) => {
    const [openDelete, setOpenDelete] = useState(false);

    const {t} = useTranslation();
    const {canEdit, canDelete} = useLocationPermission();
    const userInfo = useAuthStore((state) => state.userInfo);

    const toggleDeleteModal = () => setOpenDelete(!openDelete);

    useEffect(() => {
        if (deleteMutation?.isSuccess) {
            setOpenDelete(false);
            if (onDeleteSuccess) onDeleteSuccess();
        }
    }, [deleteMutation?.isSuccess]);

    return (
        <>
            <div className={s.container}>
                <div>
                    <div className={s.header}>
                        <span className={s.title}>{title}</span>
                        <IconButton size="small" onClick={handleClose}>
                            <ExitCloseIcon className={s.exitIcon} />
                        </IconButton>
                    </div>

                    {children}
                </div>
                {!isEditable ? (
                    <div className={s.footer}>
                        {onEdit &&
                            canEdit &&
                            !hideEdit &&
                            permissionChecker(
                                StationPermissions.STATION_UPDATE,
                                userInfo?.permissions,
                            ) && (
                                <Button
                                    onClick={onEdit}
                                    fullWidth
                                    className={s.editBtn}
                                >
                                    <EditIcon />
                                    {editText || t('alternate')}
                                </Button>
                            )}
                        {canDelete &&
                            !hideDelete &&
                            permissionChecker(
                                StationPermissions.STATION_DELETE,
                                userInfo?.permissions,
                            ) && (
                                <Button
                                    onClick={toggleDeleteModal}
                                    fullWidth
                                    variant="contained"
                                    className={s.deleteBtn}
                                    color="error"
                                >
                                    <TrashIcon />
                                    {t('delete')}
                                </Button>
                            )}
                    </div>
                ) : (
                    <div className={s.footer}>
                        <Button
                            className={s.cancelBtn}
                            fullWidth
                            onClick={handleCancel}
                            disabled={isLoading}
                        >
                            {t('cancel')}
                        </Button>
                        <LoadingButton
                            className={s.saveBtn}
                            fullWidth
                            type="submit"
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            {isLoading ? '' : t('save')}
                        </LoadingButton>
                    </div>
                )}
            </div>

            {openDelete && deleteMutation && deleteData && (
                <DeleteDialog
                    open={openDelete}
                    close={toggleDeleteModal}
                    handleDelete={() => deleteMutation.mutate(deleteData)}
                    loading={deleteMutation.isLoading}
                />
            )}
        </>
    );
};

export default RightSideWrapper;
