import {SelectOptions} from '@models/select_options_model';

import {GetMonitoringState, SetMonitoringState} from '../lib/store-types';
import {getParentRouteAndPark} from './getParentRouteAndPark';
import {setBusCenter} from './setBusCenter';
import {setCheckedSelectedBus} from './setCheckedSelectedBus';
import {setParentNodesChecked} from './setParentNodesChecked';

export const setSearchBusValueAction = (
    searchBusValue: SelectOptions<number>,
    set: SetMonitoringState,
    get: GetMonitoringState,
) => {
    const busId = searchBusValue.value;

    const selectedBus = {
        id: busId,
        name: searchBusValue.label,
    };
    set({searchBusValue, selectedBus});

    setCheckedSelectedBus(busId, set, get);
    setParentNodesChecked(busId, set, get);
    setTimeout(() => {
        setBusCenter(set, get);
    }, 100);

    const {parentRoute, parentPark} = getParentRouteAndPark(busId, get);

    if (parentRoute && parentPark) {
        const expanded = [parentRoute.unique_id, parentPark.unique_id];
        set({expanded});
    }

    setTimeout(() => {
        const section = document.querySelector(`#id${busId}`);
        section?.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
        });
    }, 1000);
};
