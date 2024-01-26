import {StatusTypes} from '@models/status-types';
import {setStatusIcon} from '@shared/lib/status-color-name/status-icon';

import {GetMonitoringState} from '../lib/store-types';

export const setBusIconAction = (
    busId: number,
    get: GetMonitoringState,
): React.ElementType => {
    const buses = get().normalizedData?.entities.buses;
    const bus = Object.entries(buses ?? {}).find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, b]) => b.id === busId,
    )?.[1];

    if (bus) {
        return setStatusIcon(bus.status as StatusTypes);
    }

    return setStatusIcon('inline');
};
