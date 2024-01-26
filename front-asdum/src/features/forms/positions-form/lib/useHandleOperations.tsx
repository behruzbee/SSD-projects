import shallow from 'zustand/shallow';

import {useDeletePositions, useSavePositions} from '@api/positions/mutations';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {usePositionsStore} from '@views/manage/positions/model/store';

export const usePositionOperations = () => {
    const savePosition = useSavePositions();
    const {setModalOpen, closeAllModal} = useModalManageStore(
        (state) => state,
        shallow,
    );
    const {clearPosition} = usePositionsStore((state) => state, shallow);
    const handleAddModal = () => setModalOpen('add', true);
    const handleEditModal = () => setModalOpen('edit', true);
    const handleCloseModal = () => closeAllModal();
    const deletePosition = useDeletePositions(handleCloseModal);

    return {
        handleAddModal,
        handleCloseModal,
        handleEditModal,
        savePosition,
        deletePosition,
        clearPosition,
    };
};
