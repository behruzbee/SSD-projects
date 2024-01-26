import create from 'zustand';

import {IModalManage} from './model';

export const useModalManageStore = create<IModalManage>((set) => ({
    addModalOpen: false,
    editModalOpen: false,
    deleteModalOpen: false,
    sidebarOpen: false,
    setModalOpen: (type, value) => {
        console.log('Modal: ', type, value);
        switch (type) {
            case 'add':
                set({addModalOpen: value});
                break;
            case 'edit':
                set({editModalOpen: value});
                break;
            case 'delete':
                set({deleteModalOpen: value});
                break;
            case 'sidebar':
                set({sidebarOpen: value});
                break;
        }
    },
    closeAllModal: () => {
        set({
            addModalOpen: false,
            editModalOpen: false,
            deleteModalOpen: false,
            sidebarOpen: false,
        });
    },
}));
