import {Chip} from '@entities/chip';
import {useSelectedModel} from '@widgets/TablePageWrapper';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import shallow from 'zustand/shallow';

import {DefineActive} from '@components/define-active';
import {DeleteOperation, EditOperation} from '@features/edit-operation';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {PolygonPermissions} from '@shared/constants/permissions/manage.permissions';
import {helper} from '@shared/helpers';
import {permissionChecker} from '@shared/helpers/permission';
import {CheckPermissionComponent} from '@shared/hoc/check-permission-component';
import {useAuthStore} from '@shared/store/auth';
import {usePolygonStore} from '@store/polygon';

const {parsedColorText, stringToRgba} = helper;

const useData = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {toggleCheckbox} = useSelectedModel();
    const {setModalOpen} = useModalManageStore((state) => state);
    const {setColor, setOpenSide, transformToArr} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );
    const userInfo = useAuthStore((state) => state.userInfo);

    const openDelete = () => setModalOpen('delete', true);

    const columns: any = React.useMemo(
        () => [
            {
                Header: t('final_stop'),
                accessor: 'name',
                show: true,
                Cell: (params: any) => {
                    return (
                        <div className="p_12">
                            <p className="table_td">{params.value}</p>
                        </div>
                    );
                },
            },
            {
                Header: t('marshrut'),
                accessor: 'routes',
                show: true,
                Cell: (params: any) => {
                    return (
                        <Chip
                            maxWidth={500}
                            data={transformToArr(params.value)}
                        />
                    );
                },
            },
            {
                Header: t('status'),
                accessor: 'completed',
                show: true,
                Cell: (params: any) => {
                    if (params.value) {
                        return <DefineActive isActive={true} />;
                    } else {
                        return <DefineActive isActive={false} />;
                    }
                },
            },
            {
                Header: t('actions'),
                accessor: 'operations',
                show:
                    permissionChecker(
                        PolygonPermissions.POLYGON_UPDATE,
                        userInfo?.permissions,
                    ) ||
                    permissionChecker(
                        PolygonPermissions.POLYGON_DELETE,
                        userInfo?.permissions,
                    ),
                Cell: (params: any) => {
                    const handleIcon = (edit: boolean) => {
                        const {color} = params.row.original;

                        if (edit) {
                            navigate('edit', {
                                state: {...params.row.original},
                            });
                            setOpenSide(true);
                            setColor(
                                stringToRgba(
                                    parsedColorText(
                                        color || 'rgba(0, 0, 0, 0.5)',
                                    ),
                                ),
                            );
                        } else {
                            navigate('save', {
                                state: {...params.row.original},
                            });
                        }
                    };

                    return (
                        <div>
                            <CheckPermissionComponent
                                permission={PolygonPermissions.POLYGON_UPDATE}
                                component={
                                    <EditOperation
                                        onClick={() => handleIcon(true)}
                                    />
                                }
                            />
                            <CheckPermissionComponent
                                permission={PolygonPermissions.POLYGON_DELETE}
                                component={
                                    <DeleteOperation
                                        onClick={() => {
                                            openDelete();
                                            toggleCheckbox(params.row.original);
                                        }}
                                    />
                                }
                            />
                        </div>
                    );
                },
            },
        ],
        [t],
    );

    return {columns};
};

export default useData;
