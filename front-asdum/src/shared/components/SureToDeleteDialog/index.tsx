import {LoadingButton} from '@mui/lab';
import {IconButton} from '@mui/material';
import React, {FC, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

import MuiModal from '@shared/components/Modal';

import ExitCloseIcon from '@images/svgs/ExitCloseIcon';

import DeleteIcon from './assets/DeleteIcon';
import {SvgGenerator} from '..';

type Props = {
    open: boolean;
    loading?: boolean;
    deleteTitle?: string;
    deleteContent?: string;
    children?: ReactNode;
    close: () => void;
    handleDelete: (payload?: unknown) => void;
};

const DeleteDialog: FC<Props> = ({
    open,
    loading,
    close,
    handleDelete,
    deleteContent,
    deleteTitle,
}) => {
    const {t} = useTranslation();

    return (
        <MuiModal open={open} handleClose={close}>
            <div className="modal__container">
                <div className="modal__header">
                    <h3>{deleteTitle || t('are_you_sure_delete')}</h3>
                    <IconButton className="flex__one" onClick={close}>
                        <ExitCloseIcon />
                    </IconButton>
                </div>
                <div className="modal__content">
                    <SvgGenerator Icon={DeleteIcon} />
                    <p>{deleteContent}</p>
                </div>
                <div className="modal__footer">
                    <LoadingButton
                        onClick={handleDelete}
                        color="error"
                        loading={loading}
                        disabled={loading}
                        variant="text"
                    >
                        {t('delete')}
                    </LoadingButton>
                    <LoadingButton
                        onClick={close}
                        color="info"
                        loading={false}
                        disabled={false}
                        variant="contained"
                        style={{backgroundColor: '#606EEA'}}
                    >
                        {t('cancel')}
                    </LoadingButton>
                </div>
            </div>
        </MuiModal>
    );
};

export default DeleteDialog;
