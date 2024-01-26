import Modal from '@mui/material/Modal';
import cl from 'classnames';
import React from 'react';
interface IProps {
    open: boolean;
    children: React.ReactNode | any;
    stylesModal?: any;
    handleClose: () => void;
    onClick?: () => void;
}

const MuiModal = ({
    open,
    children,
    handleClose,
    onClick,
    stylesModal,
}: IProps) => {
    return (
        <Modal
            open={open}
            onClick={onClick}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={cl('main__modal', stylesModal)}
        >
            {children}
        </Modal>
    );
};

export default MuiModal;
