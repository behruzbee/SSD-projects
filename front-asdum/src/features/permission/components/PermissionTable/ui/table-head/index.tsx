import Radio from '@mui/material/Radio';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {usePermissionStore} from '@shared/store/permission';

import styles from '../../index.module.scss';

export const TableHead = () => {
    const {t} = useTranslation();
    const [permissionState, checkAll] = usePermissionStore(
        (s) => [s.permissionState, s.checkAll],
        shallow,
    );
    return (
        <thead>
            <tr>
                <th className={styles.tableTh}>{t('section')}</th>
                <th className={styles.tableTh}>
                    {t('readOnly')}

                    <div className={styles.wrapRadio}>
                        <Radio
                            onChange={() => checkAll(1)}
                            checked={permissionState.every(
                                (perm) => perm.value.join('') == '1',
                            )}
                        />
                    </div>
                </th>
                <th className={styles.tableTh}>
                    {t('edit')}

                    <div className={styles.wrapRadio}>
                        <Radio
                            onChange={() => checkAll(2)}
                            checked={permissionState.every(
                                (perm) => perm.value.join('') == '2',
                            )}
                        />
                    </div>
                </th>
                <th className={styles.tableTh}>
                    {t('accessAll')}
                    <div className={styles.wrapRadio}>
                        <Radio
                            onChange={() => checkAll(3)}
                            checked={permissionState.every(
                                (perm) => perm.value.join('') == '3',
                            )}
                        />
                    </div>
                </th>
                <th className={styles.tableTh}>
                    {t('notAccess')}
                    <div className={styles.wrapRadio}>
                        <Radio
                            onChange={() => checkAll('')}
                            checked={permissionState.every(
                                (perm) => perm.value.join('') == '',
                            )}
                        />
                    </div>
                </th>
            </tr>
        </thead>
    );
};
