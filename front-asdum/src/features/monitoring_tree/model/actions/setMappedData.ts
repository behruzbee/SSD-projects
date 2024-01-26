import {IBusMonitoring} from '@models/monitoring/monitoring-bus.model';
import {handleOption} from '@shared/helpers/helpers';

import {mapToTree} from '../../lib/mapToTree';
import {getAllChild} from '../lib/getSelected';
import {normalizeData} from '../lib/normalize';
import {GetMonitoringState, SetMonitoringState} from '../lib/store-types';

export const setMappedDataAction = (
    comingData: IBusMonitoring[],
    set: SetMonitoringState,
    get: GetMonitoringState,
) => {
    const mappedData = mapToTree(comingData);
    const normalizedData = normalizeData(mappedData);
    const busesList = handleOption(
        Object.entries(normalizedData.entities.buses ?? {}).map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_, value]) => value,
        ),
    );
    set({busesList, normalizedData});
    if (
        mappedData.length &&
        get().selectedUniqueId.length === 0 &&
        get().mappedData.length === 0
    ) {
        const allChilds = getAllChild(mappedData[0]);
        const ids = allChilds.map((unique) => get().idsStore.get(unique));
        set({
            selectedUniqueId: allChilds,
            selected: ids as number[],
            selectedParkRouteId: {
                parkId: mappedData[0].id,
                routeId: NaN,
            },
        });
    }

    set({mappedData, filteredMappedData: mappedData});
};
