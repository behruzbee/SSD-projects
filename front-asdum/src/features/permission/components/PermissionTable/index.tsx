import React from 'react';

import {ScrollArea} from '@components/scroll-area';
import {usePermissionStore} from '@store/permission';

import styles from './index.module.scss';
import {ExpandableRow} from './ui/expandable-row';
import {TableHead} from './ui/table-head';

const PermissionTable = () => {
    const permissionState = usePermissionStore((s) => s.permissionState);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <ScrollArea maxHeight={338}>
                    <table className={styles.table}>
                        <TableHead />
                        <tbody>
                            {permissionState.map((permission) => (
                                <ExpandableRow
                                    key={permission.route}
                                    row={permission}
                                />
                            ))}
                        </tbody>
                    </table>
                </ScrollArea>
            </div>
        </div>
    );
};

export default PermissionTable;
