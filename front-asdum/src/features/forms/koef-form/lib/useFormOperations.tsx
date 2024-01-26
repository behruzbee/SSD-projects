import {useSaveCoef} from '@api/diff_norm/mutations';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';

export const useFormOperations = () => {
    const {setModalOpen} = useModalManageStore((state) => state);
    const handleCloseModal = () => setModalOpen('add', false);
    const saveKoef = useSaveCoef();
    return {handleCloseModal, saveKoef};
};
