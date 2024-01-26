import {useSelectedModel} from '@widgets/TablePageWrapper';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import DialogWrapper from '@src/shared/components/DialogWrapper';

import useRoleMutate from '@api/role/mutations';
import PermissionTable from '@features/permission/components/PermissionTable';
import {RoleModel} from '@models/role_model';
import {usePermissionStore} from '@store/permission';

import s from './index.module.scss';

type Props = {
    open: boolean;
    handleClose: () => void;
};

const UpdatePerms = ({open, handleClose}: Props) => {
    const {t} = useTranslation();
    const {handleSavePermissionRole} = useRoleMutate();
    const {clearSelected, selected} = useSelectedModel<RoleModel>();
    const [permissions, parsePermissions, setPermission, returnToDefault] =
        usePermissionStore((s) => [
            s.permissionState,
            s.parsePermissions,
            s.setPermission,
            s.returnToDefault,
        ]);

    const handlePermissions = () => {
        const savedPermissions = parsePermissions(permissions);

        handleSavePermissionRole.mutate({
            roleId: selected?.id,
            permissions: savedPermissions,
        });
    };

    useEffect(() => {
        if (handleSavePermissionRole.isSuccess) {
            handleClose();
        }
    }, [handleSavePermissionRole.isSuccess]);

    useEffect(() => {
        setPermission(selected.permissions);
        return () => {
            returnToDefault();
            clearSelected();
        };
    }, []);

    return (
        <DialogWrapper
            title={t('permissions')}
            open={open}
            onClose={handleClose}
            save={handlePermissions}
            width="800px"
            isLoading={handleSavePermissionRole.isLoading}
        >
            <div className={s.bodyWrapper}>
                <PermissionTable />
            </div>
        </DialogWrapper>
    );
};

export default UpdatePerms;
