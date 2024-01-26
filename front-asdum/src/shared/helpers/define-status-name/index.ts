import {useTranslation} from 'react-i18next';

import {MainStatusType} from '@models/monitoring';

export const defineStatusName = (type: MainStatusType): string => {
    const {t} = useTranslation();
    switch (type) {
        case 'inline':
            return t('in_line');
        case 'notinlineexit':
            return t('not_inline_exit');
        case 'inactiveexit':
            return t('inactive_exit');
        case 'ingarage':
            return t('in_garage');
        case 'inrepair':
            return t('in_repair');
        case 'inactivegarage':
            return t('inactive_garage');
        default:
            return t('out_of_route');
    }
};
