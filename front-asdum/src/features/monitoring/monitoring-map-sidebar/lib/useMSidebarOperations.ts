import {FormEvent, useState} from 'react';

import {useModalManageStore} from '@features/edit-operation/modals-manage/model';

export const useMSidebarOperations = () => {
    const [showStatus, setShowStatus] = useState<boolean>(false);
    const {setModalOpen} = useModalManageStore((state) => state);
    const handleCancel = () => {
        setShowStatus(!showStatus);
    };

    const handleEdit = () => {
        setShowStatus(!showStatus);
    };

    const unmount = () => {
        if (showStatus) {
            handleCancel();
        }
    };

    const handleClose = () => {
        setModalOpen('edit', false);
        unmount();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Save');
    };

    return {
        showStatus,
        handleCancel,
        handleEdit,
        handleClose,
        handleSubmit,
    };
};
