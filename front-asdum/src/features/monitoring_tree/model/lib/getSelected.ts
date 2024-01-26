import {IMappedTree, ParkRouteId} from '../../lib/types';

function getNodeById(
    nodes: IMappedTree | null,
    unique_id: string,
): IMappedTree | null {
    if (!nodes) return null;

    if (nodes.unique_id === unique_id) return nodes;
    else if (Array.isArray(nodes.children)) {
        for (const node of nodes.children) {
            const result = getNodeById(node, unique_id);
            if (!!result) return result;
        }
    }

    return null;
}

const getParkOrRouteId = (
    parentNode: IMappedTree | null,
    id: number,
): ParkRouteId => {
    const nan = {parkId: NaN, routeId: NaN};

    if (!parentNode) return nan;

    if (parentNode.id === id) {
        return {parkId: parentNode.id, routeId: NaN};
    } else if (Array.isArray(parentNode.children)) {
        for (const child of parentNode.children) {
            if (child.id === id) {
                return {parkId: NaN, routeId: child.id};
            }
        }
    }

    return nan;
};

const getParentNode = (
    tree: IMappedTree[] | null,
    unique_id: string,
): IMappedTree | null => {
    if (!tree) return null;

    function findNode(node: IMappedTree): boolean {
        if (node.unique_id === unique_id) return true;
        if (Array.isArray(node.children)) {
            for (const child of node.children) {
                if (findNode(child)) return true;
            }
        }
        return false;
    }

    return tree.find(findNode) ?? null;
};

export function getAllChild(nodes: IMappedTree | null) {
    let filteredArray: string[] = [];
    if (nodes === null) return [];
    filteredArray.push(nodes.unique_id);
    if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
            if (!filteredArray.includes(node.unique_id)) {
                filteredArray = [...filteredArray, ...getAllChild(node)];
            }
        });
    }
    return filteredArray;
}

export function getSelectedIds(
    uniqueIds: string[],
    idsStore: Map<string, number>,
): number[] {
    const ids = uniqueIds.map((unique) => idsStore.get(unique));
    if (!ids) {
        return [];
    }

    return ids as number[];
}

export function getSelected(
    allData: IMappedTree[] | null,
    id: number,
    curSelected: string[],
    isChecked: boolean,
    unique_id: string,
    idsStore: Map<string, number>,
) {
    const parentNode = getParentNode(allData, unique_id);
    const foundNode = getNodeById(parentNode, unique_id);
    const allChilds = getAllChild(foundNode);

    function canBeId(curSelected: string[]): boolean {
        if (!parentNode) return false;
        if (
            curSelected.includes(parentNode.unique_id) &&
            parentNode?.children?.some((el) => el.unique_id === unique_id)
        ) {
            return false;
        }
        return true;
    }

    const filteredArray = isChecked
        ? [...curSelected, ...allChilds]
        : curSelected.filter((value) => !allChilds.includes(value));

    const checked = filteredArray.includes(unique_id);
    const parkRouteIds = getParkOrRouteId(parentNode, id);
    const canSetId = canBeId(filteredArray);
    const selectedIds = getSelectedIds(filteredArray, idsStore);

    return {filteredArray, checked, canSetId, parkRouteIds, selectedIds};
}
