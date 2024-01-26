import {TypeProps} from '@features/edit-operation';

export type AddFuelProps = {
    setModal: (type: TypeProps, value: boolean) => void;
    modalOpen: boolean;
};
