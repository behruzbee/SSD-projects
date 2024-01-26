import produce from 'immer';
import create, {GetState, SetState} from 'zustand';

import {
    AllPermissionRoutes,
    ChildrenPermissions,
    IPermissionModel,
    MainRoutes,
    PermissionsList,
    SavedPermissionType,
    allPermissions,
    permissionObj,
    permissionsList,
} from './mock';

interface IPermission {
    permissionState: PermissionsList[];
    allPermissionState: AllPermissionRoutes[];
    findRoute: (route: string) => string | undefined;
    setPermission: (payload: SavedPermissionType[]) => void;
    parsePermissions: (payload: PermissionsList[]) => SavedPermissionType[];
    state: IPermissionModel | any;
    checkAll: (value: number | string) => void;
    returnToDefault: () => void;
    checkValue: (
        payload: PermissionsList | ChildrenPermissions<MainRoutes> | undefined,
        value: number | string,
    ) => void;
    updatePermissionState: (
        payload: PermissionsList | ChildrenPermissions<MainRoutes>,
        value: number | string,
    ) => void;
}

export const usePermissionStore = create<IPermission>(
    (set: SetState<IPermission>, get: GetState<IPermission>) => ({
        state: permissionObj,
        permissionState: permissionsList.slice(),
        allPermissionState: allPermissions,
        checkValue: (payload, value) => {
            if (typeof value === 'number' && payload) {
                payload.value = [value];
            }
            if (typeof value === 'string' && payload) {
                payload.value = [];
            }
        },
        findRoute: (route) => {
            const allList = get().allPermissionState;
            return allList.find((item) => item?.route === route)?.reference;
        },
        setPermission: (payload) => {
            const newState = produce(get().permissionState, (draft) => {
                payload.forEach((perm) => {
                    const findRef = get().findRoute(perm.url);
                    if (findRef) {
                        const foundedIndex = draft.findIndex(
                            (item) => item.route === findRef,
                        );
                        draft[foundedIndex]?.children?.forEach(
                            (child, index) => {
                                if (child.route === perm.url) {
                                    (
                                        draft[foundedIndex]
                                            .children as ChildrenPermissions<MainRoutes>[]
                                    )[index].value = [perm.permission];
                                }
                            },
                        );
                    } else {
                        draft = draft.map((parent) => {
                            if (parent.route === perm.url) {
                                parent.value = [perm.permission];
                            }
                            return parent;
                        });
                    }
                });
            });
            set({permissionState: newState});
        },
        parsePermissions: (payload) => {
            const savedPermissions: SavedPermissionType[] = [];
            payload.forEach((parent) => {
                const parentValue = parent.value.join('');
                if (parentValue !== '') {
                    savedPermissions.push({
                        url: parent.route,
                        permission: +parentValue,
                    });
                }
                if (parent?.children) {
                    parent.children.forEach((children) => {
                        const childrenValue = children.value.join('');
                        if (childrenValue !== '') {
                            savedPermissions.push({
                                url: children.route,
                                permission: +childrenValue,
                            });
                        }
                    });
                }
            });
            return savedPermissions;
        },
        checkAll: (value) => {
            const newState = produce(get().permissionState, (draft) => {
                draft.forEach((parent) => {
                    get().checkValue(parent, value);
                    if (parent?.children) {
                        parent.children.forEach((child) => {
                            get().checkValue(child, value);
                        });
                    }
                });
            });
            set({permissionState: newState});
        },
        updatePermissionState: (payload, value) => {
            const newState = produce(get().permissionState, (draft) => {
                if (payload?.parent) {
                    const parent = draft.find(
                        (route) => payload.route === route.route,
                    );
                    get().checkValue(parent, value);
                } else {
                    const child = draft
                        .find((parent) => parent.name === payload.reference)
                        ?.children?.find(
                            (child) => child.route === payload.route,
                        );
                    get().checkValue(child, value);
                }
            });
            set({permissionState: newState});
        },
        returnToDefault: () => {
            set({permissionState: permissionsList.slice()});
        },
    }),
);
