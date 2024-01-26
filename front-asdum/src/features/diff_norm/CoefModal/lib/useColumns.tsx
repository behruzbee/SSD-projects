import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Column} from 'react-table';

import {useKoefOperations} from '@features/diff_norm/CoefModal/lib/useKoefOperations';
import {DeleteOperation, EditOperation} from '@features/edit-operation';
import {CoefModel} from '@models/diff_norm_models';
import {DiffNormPermission} from '@shared/constants/permissions/manage.permissions';
import {CheckPermissionComponent} from '@shared/hoc/check-permission-component';

export const useColumns = () => {
    const {t} = useTranslation();

    const {handleEditCoef, handleDeleteCoef} = useKoefOperations();
    const columns: Column<CoefModel>[] = useMemo(
        () => [
            {
                Header: t('name'),
                accessor: 'coefficient',
                show: true,
            },
            {Header: t('coef_full'), accessor: 'amount', show: true},
            {Header: t('username'), accessor: 'last_user', show: true},
            {Header: t('change_date'), accessor: 'last_date', show: true},
            {
                Header: t('actions') as string,
                accessor: 'actions',
                Cell: (props) => (
                    <div>
                        <CheckPermissionComponent
                            permission={DiffNormPermission.KOEFFICIENT_UPDATE}
                            component={
                                <EditOperation
                                    onClick={() =>
                                        handleEditCoef(props.row.original)
                                    }
                                />
                            }
                        />
                        <CheckPermissionComponent
                            permission={DiffNormPermission.KOEFFICIENT_DELETE}
                            component={
                                <DeleteOperation
                                    onClick={() =>
                                        handleDeleteCoef(props.row.original)
                                    }
                                />
                            }
                        />
                    </div>
                ),
            },
        ],
        [t],
    );

    return {columns};
};
