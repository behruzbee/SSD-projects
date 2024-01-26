import {CommonStatusType} from '@models/status-types';

export const setStatusColor = (status: CommonStatusType) => {
    switch (status) {
        case 'inline':
            return '#06c270';
        case 'notinline':
            return '#a4adb9';
        case 'notactive':
            return '#ff3b3b';
        case 'ingarage':
            return '#EED23D';
        case 'inrepair':
            return '#484EF1';
        default:
            return;
    }
};
