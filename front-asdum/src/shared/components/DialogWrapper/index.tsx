import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import React, {FC, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

import CloseIcon from '@images/svgs/CloseIcon';

import SaveButton from '../SaveButton';
import s from './index.module.scss';

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    save: () => void;
    isLoading?: boolean;
    contentClass?: string;
    isForm?: boolean;
    saveLabel?: string;
    width?: string | number;
    noScroll?: boolean;
    children: ReactNode;
}

const DialogWrapper: FC<Props> = ({
    open,
    onClose,
    title,
    save,
    isLoading,
    contentClass,
    isForm,
    saveLabel,
    width,
    noScroll,
    children,
}) => {
    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            maxWidth={false}
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        width: width ? width : 'auto',
                        // maxWidth: width,
                        overflowY: noScroll ? 'initial' : 'auto',
                    },
                },
            }}
        >
            <DialogTitle className={s.modalTitle}>
                <div className={s.header}>
                    <span className={s.title}>{title}</span>
                    <div className={s.icon}>
                        <IconButton onClick={onClose} disabled={isLoading}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>

            <form onSubmit={save}>
                <DialogContent
                    className={contentClass}
                    dividers
                    sx={{
                        overflowY: noScroll ? 'initial' : 'auto',
                    }}
                >
                    {children}
                </DialogContent>

                <DialogActions>
                    <Button
                        className={s.btnCancel}
                        disabled={isLoading}
                        onClick={onClose}
                    >
                        {t('cancel')}
                    </Button>

                    <SaveButton
                        save={save}
                        isLoading={isLoading}
                        isForm={isForm}
                        saveLabel={saveLabel}
                    />
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogWrapper;
