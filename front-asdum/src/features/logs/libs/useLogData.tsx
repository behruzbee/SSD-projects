import cl from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {ACTIONS, ACTION_STATUS} from '@shared/constants';
import {useLogsStore} from '@shared/store/logs';

const useLogData = () => {
    const {t} = useTranslation();
    const {logData} = useLogsStore((state) => state);
    console.log('Log data: ', logData);

    const handleAction = (val: any) => {
        const {action}: {action: string} = val.row.values;
        return ACTIONS[action];
    };

    const columns: any = React.useMemo(
        () => [
            {
                Header: '№',
                accessor: 'index',
            },
            {
                Header: t('users'),
                accessor: 'userName',
            },
            {
                Header: t('time'),
                accessor: 'timestamp',
            },
            {
                Header: 'IP',
                accessor: 'host',
            },
            {
                Header: t('action'),
                accessor: 'action',
                Cell: (props: any) => {
                    const {time, name, action} = props.row.original;
                    return (
                        <div>
                            {name}{' '}
                            <span
                                className={cl([
                                    ACTION_STATUS[action],
                                    'logStatus',
                                ])}
                            >
                                {handleAction(props)}
                            </span>{' '}
                            {name} {time}
                        </div>
                    );
                },
            },
            {
                Header: t('entity_type'),
                accessor: 'entityType',
            },
        ],
        [t],
    );

    return {
        columns,
        logData,
    };
};

export default useLogData;
