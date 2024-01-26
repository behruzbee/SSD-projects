import create from 'zustand';

export type statusOption = {name: string; enabled: boolean; id: number};

interface IStatusSelect {
    statusData: Array<statusOption>;
    switchStatus: (payload: number) => void;
}

export const useStatusSelectStore = create<IStatusSelect>((set, get) => ({
    statusData: [
        {name: 'В ремонте', enabled: false, id: 1},
        {name: 'Не активный', enabled: false, id: 2},
    ],
    switchStatus: (payload) => {
        const disableAll = (item: statusOption) => {
            item.enabled = false;
            return item;
        };
        const defineActive = (item: statusOption) => {
            if (payload === item.id) {
                item.enabled = true;
            }

            return item;
        };
        const filtered = get().statusData.map(disableAll).map(defineActive);
        set({statusData: filtered});
    },
}));
