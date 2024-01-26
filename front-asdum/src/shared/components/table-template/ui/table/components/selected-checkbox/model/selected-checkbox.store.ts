import create from 'zustand';
import shallow from 'zustand/shallow';

import {CheckboxProps} from '@models/props';

import {SelectedModel} from './selected-checkbox.types';

const useStoreBase = create<SelectedModel<CheckboxProps>>((set, get) => ({
    selected: {} as CheckboxProps,
    setSelected: (selected) => set({selected}),
    clearSelected: () => set({selected: {} as CheckboxProps}),
    toggleCheckbox: (row) => {
        console.log('SELECTED: ', get().selected.id, row.id);
        get().selected.id === row.id
            ? get().clearSelected()
            : set({selected: row});
    },
}));

const useSelectedStore = <Item extends CheckboxProps>(
    selector: (state: SelectedModel<Item>) => SelectedModel<Item>,
) => useStoreBase(selector, shallow);

export const useSelectedModel = <T extends CheckboxProps>() =>
    useSelectedStore<T>((state) => state);
