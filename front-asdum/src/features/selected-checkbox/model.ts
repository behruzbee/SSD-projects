import create from 'zustand';
import shallow from 'zustand/shallow';

import {immer} from '@store/_middlewares/immer';

type Col1 = {col1: number | string};

type SelectModel<T> = {
    selected: T[];
    setSelected: (selected: T[]) => void;
    toggleCheckbox: (row: T) => void;
    isChecked: (row: T) => boolean;
};

export const useStoreBase = create<SelectModel<Col1>>(
    immer((set, get) => ({
        selected: [],
        setSelected: (selected) =>
            set((state) => {
                state.selected = selected;
            }),
        toggleCheckbox: (row) =>
            set(({selected}) => {
                if (!selected.some((item) => item.col1 === row.col1)) {
                    selected.push(row);
                } else {
                    const index = selected.findIndex(
                        (item) => item.col1 === row.col1,
                    );
                    selected.splice(index, 1);
                }
            }),
        isChecked: (row) =>
            get().selected?.some((item) => item.col1 === row.col1),
    })),
);

const useSelectedStore = <Item extends Col1>(
    selector: (state: SelectModel<Item>) => SelectModel<Item>,
) => useStoreBase(selector, shallow);

export const useSelectedCheckbox = <T extends Col1>() =>
    useSelectedStore<T>(
        ({isChecked, selected, setSelected, toggleCheckbox}) => ({
            isChecked,
            selected,
            setSelected,
            toggleCheckbox,
        }),
    );
