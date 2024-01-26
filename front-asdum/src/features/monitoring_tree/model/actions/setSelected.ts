import {IMappedTree} from '../../lib/types';
import {getSelected} from '../lib/getSelected';
import {GetMonitoringState, SetMonitoringState} from '../lib/store-types';
import {setParentNodesChecked} from './setParentNodesChecked';

export const setSelectedAction = (
    isChecked: boolean,
    currentNode: IMappedTree,
    set: SetMonitoringState,
    get: GetMonitoringState,
) => {
    const curParkRouteIds = get().selectedParkRouteId;
    const busesList = get().busesList;
    const normalizedData = get().normalizedData;
    const parks = normalizedData?.entities?.parks;
    const {
        filteredArray,
        checked,
        canSetId,
        parkRouteIds: {parkId, routeId},
        selectedIds,
    } = getSelected(
        get().mappedData,
        currentNode?.id,
        get().selectedUniqueId,
        isChecked,
        currentNode.unique_id,
        get().idsStore,
    );

    set({selected: selectedIds, selectedUniqueId: filteredArray});
    if (busesList.some((bus) => bus.value === currentNode.id)) {
        setParentNodesChecked(currentNode.id, set, get);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parentPark = Object.entries(parks ?? {})?.find(([_, park]) =>
        park.children?.some((v) => v === currentNode.id),
    )?.[1];
    if (parentPark) {
        const newSelected = get().selected.concat([parentPark.id]);
        set({selected: newSelected});
    }
    if (
        checked &&
        canSetId &&
        (parkId || routeId) &&
        parkId !== curParkRouteIds.parkId &&
        routeId !== curParkRouteIds.routeId
    ) {
        set({selectedParkRouteId: {parkId, routeId}});
    }
};
