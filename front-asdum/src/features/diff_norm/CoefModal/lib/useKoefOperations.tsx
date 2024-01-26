import shallow from 'zustand/shallow';

import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {CoefModel} from '@models/diff_norm_models';
import {useDiffNormStore} from '@store/race_fuel';

export const useKoefOperations = () => {
    const {setModalOpen} = useModalManageStore((state) => state, shallow);
    const {setSelectedKoef} = useDiffNormStore((s) => s, shallow);
    const handleEditCoef = (data: CoefModel) => {
        setSelectedKoef(data);
        setModalOpen('add', true);
    };
    const handleDeleteCoef = (data: CoefModel) => {
        setSelectedKoef(data);
        setModalOpen('delete', true);
    };

    return {handleEditCoef, handleDeleteCoef};
};
