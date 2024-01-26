import React, {FC, ReactElement} from 'react';

import {SvgGenerator} from '@components/index';
import {MainStatusType} from '@models/monitoring';

import {ReactComponent as inactiveexit} from '@images/Monitoring/inactiveexit.svg';
import {ReactComponent as inactivegarage} from '@images/Monitoring/inactivegarage.svg';
import {ReactComponent as ingarage} from '@images/Monitoring/ingarage.svg';
import {ReactComponent as inline} from '@images/Monitoring/inline.svg';
import {ReactComponent as inrepair} from '@images/Monitoring/inrepair.svg';
import {ReactComponent as notinlineexit} from '@images/Monitoring/notinlineexit.svg';
import {ReactComponent as offroute} from '@images/Monitoring/off-route.svg';

type DefineBusStatusType = {type: MainStatusType};
export const DefineBusStatus: FC<DefineBusStatusType> = ({
    type,
}): ReactElement => {
    switch (type) {
        case 'inline':
            return <SvgGenerator Icon={inline} />;
        case 'notinlineexit':
            return <SvgGenerator Icon={notinlineexit} />;
        case 'inactiveexit':
            return <SvgGenerator Icon={inactiveexit} />;
        case 'ingarage':
            return <SvgGenerator Icon={ingarage} />;
        case 'inrepair':
            return <SvgGenerator Icon={inrepair} />;
        case 'inactivegarage':
            return <SvgGenerator Icon={inactivegarage} />;
        default:
            return <SvgGenerator Icon={offroute} />;
    }
};
