import create from 'zustand';
import shallow from 'zustand/shallow';

type Col1 = {col1: number};

interface SelectModel<T extends Col1> {
    selected: T;
    setSelected: (selected: T) => void;
    toggleCheckbox: (row: T) => void;
    clearSelected: () => void;
}

const useStoreBase = create<SelectModel<Col1>>((set, get) => ({
    selected: {} as Col1,
    setSelected: (selected) => set({selected}),
    clearSelected: () => set({selected: {} as Col1}),
    toggleCheckbox: (row) => {
        if (get().selected.col1 !== row.col1) {
            set({selected: row});
        }
        // get().selected.col1 === row.col1
        //     ? get().clearSelected()
        //     : set({selected: row});
    },
}));

const useSelectedStore = <Item extends Col1>(
    selector: (state: SelectModel<Item>) => SelectModel<Item>,
) => useStoreBase(selector, shallow);

export const useSelectedModel = <T extends Col1>() =>
    useSelectedStore<T>((state) => state);
