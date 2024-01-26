import Radio from '@mui/material/Radio';
import cx from 'classnames';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import styles from '@features/permission/components/PermissionTable/index.module.scss';
import {notifyWarning} from '@shared/helpers/local_notification';
import {usePermissionStore} from '@shared/store/permission';
import {
    ChildrenPermissions,
    MainRoutes,
    PermissionsList,
} from '@store/permission/mock';

import {ExpandableButton} from '../expandable-button';
import s from './index.module.scss';

interface IExpandableRow {
    row: PermissionsList | ChildrenPermissions<MainRoutes>;
}
export const ExpandableRow = ({row}: IExpandableRow) => {
    const [open, setOpen] = useState(false);
    const updatePermissionState = usePermissionStore(
        (s) => s.updatePermissionState,
    );
    const handleClick = (
        row: PermissionsList | ChildrenPermissions<MainRoutes>,
    ) => {
        if (!!row.value.join('')) {
            setOpen(!open);
        } else {
            notifyWarning('Необходимо изменить значение доступа!');
        }
    };

    const {t} = useTranslation();
    const expandButton = (
        <ExpandableButton onClick={() => handleClick(row)} open={open} />
    );

    console.log(!!row.value.join(''));

    return (
        <>
            <tr
                className={cx(
                    styles.tableTd,
                    //@ts-ignore
                    row?.parent ? s.expandableRow : '',
                    [open ? s.activeRow : ''],
                )}
            >
                <td>
                    <div className={s.expandableCell}>
                        <span>{t(row.name)}</span>
                        {(row as PermissionsList)?.children && expandButton}
                    </div>
                </td>
                <td className={styles.tableTd}>
                    <Radio
                        onChange={() => updatePermissionState(row, 1)}
                        checked={row?.value?.join('') == '1'}
                    />
                </td>
                <td className={styles.tableTd}>
                    <div className={styles.wrapRadio}>
                        <Radio
                            onChange={() => updatePermissionState(row, 2)}
                            checked={row?.value?.join('') == '2'}
                        />
                    </div>
                </td>

                <td className={styles.tableTd}>
                    <Radio
                        onChange={() => updatePermissionState(row, 3)}
                        checked={row?.value?.join('') == '3'}
                    />
                </td>

                <td className={styles.tableTd}>
                    <Radio
                        onChange={() => {
                            updatePermissionState(row, '');
                            setOpen(false);
                        }}
                        checked={row?.value?.join('') == ''}
                    />
                </td>
            </tr>
            {/* @ts-ignore */}
            {open && row?.children && !!row.value.join('')
                ? // @ts-ignore
                  row?.children.map((child) => (
                      <ExpandableRow key={child.route} row={child} />
                  ))
                : null}
        </>
    );
};
