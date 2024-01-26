import {GetMonitoringState, SetMonitoringState} from '../lib/store-types';
import {setBusCenter} from './setBusCenter';
import {setCheckedSelectedBus} from './setCheckedSelectedBus';
import {setParentNodesChecked} from './setParentNodesChecked';

export const handleBusSelectAction = (
    _: React.SyntheticEvent,
    nodeIds: string[],
    set: SetMonitoringState,
    get: GetMonitoringState,
) => {
    const busId = get().busesList.find(
        (bus) => bus.value === get().idsStore.get(nodeIds[0]),
    )?.value;

    if (busId) {
        const selectedBus = {
            id: busId,
            name: nodeIds[0],
        };
        set({selectedBus});

        setCheckedSelectedBus(busId, set, get);
        setParentNodesChecked(busId, set, get);

        setTimeout(() => {
            setBusCenter(set, get);
        }, 100);
    }
};
