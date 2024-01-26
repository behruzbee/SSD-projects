import {Tooltip} from '@mui/material';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {StatusTypes} from '@models/status-types';

import InactiveGarageMapIcon from '@images/svgs/monitoring/InactiveGarageMapIcon';
import IngarageBusIcon from '@images/svgs/monitoring/IngarageBusIcon';
import InlineBusIcon from '@images/svgs/monitoring/InlineBusIcon';
import InRepairMapIcon from '@images/svgs/monitoring/InRepairMapIcon';
import NotActiveBusIcon from '@images/svgs/monitoring/NotActiveBusIcon';
import NotInlineBusIcon from '@images/svgs/monitoring/NotInlineBusIcon';
import NotInlineExitMapIcon from '@images/svgs/monitoring/NotInlineExitMapIcon';
export const setStatusIcon = (status: StatusTypes): React.ElementType => {
    switch (status) {
        case 'inline':
            return InlineBusIcon;
        case 'notinlineexit':
            return NotInlineExitMapIcon;
        case 'inactiveexit':
            return NotActiveBusIcon;
        case 'ingarage':
            return IngarageBusIcon;
        case 'inrepair':
            return InRepairMapIcon;
        case 'inactivegarage':
            return InactiveGarageMapIcon;
        case 'offroute':
            return NotInlineBusIcon;
        default:
            return InlineBusIcon;
    }
};
export const BusStatus = ({status}: {status: StatusTypes}): JSX.Element => {
    const {t} = useTranslation();
    switch (status) {
        case 'inline':
            return (
                <Tooltip placement="top" title={t('in_line')}>
                    <div>
                        <InlineBusIcon />
                    </div>
                </Tooltip>
            );
        case 'notinlineexit':
            return (
                <Tooltip placement="top" title={t('not_in_line')}>
                    <div>
                        <NotInlineExitMapIcon />
                    </div>
                </Tooltip>
            );
        case 'inactiveexit':
            return (
                <Tooltip title={t('not_active')} placement="top">
                    <div>
                        <NotActiveBusIcon />
                    </div>
                </Tooltip>
            );
        case 'ingarage':
            return (
                <Tooltip title={t('in_garage')} placement="top">
                    <div>
                        <IngarageBusIcon />
                    </div>
                </Tooltip>
            );
        case 'inrepair':
            return (
                <Tooltip title={t('in_garage')} placement={'top'}>
                    <div>
                        <InRepairMapIcon />
                    </div>
                </Tooltip>
            );
        case 'inactivegarage':
            return (
                <Tooltip title={t('not_active')} placement={'top'}>
                    <div>
                        <InactiveGarageMapIcon />
                    </div>
                </Tooltip>
            );
        case 'offroute':
            return (
                <Tooltip title={t('out_of_route')} placement={'top'}>
                    <div>
                        <NotInlineBusIcon />
                    </div>
                </Tooltip>
            );
        default:
            return (
                <div>
                    <InlineBusIcon />
                </div>
            );
    }
};
