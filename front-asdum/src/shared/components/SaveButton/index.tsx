import {LoadingButton} from '@mui/lab';
import React from 'react';
import {useTranslation} from 'react-i18next';

import s from './index.module.scss';

interface SaveButtonProps {
    save: React.MouseEventHandler<HTMLButtonElement>;
    isLoading?: boolean;
    disabled?: boolean;
    isForm?: boolean;
    saveLabel?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({
    save,
    disabled,
    isLoading,
    isForm,
    saveLabel,
}) => {
    const {t} = useTranslation();

    return (
        <LoadingButton
            type={isForm ? 'submit' : 'button'}
            className={s.btnSave}
            variant="contained"
            onClick={save}
            disabled={disabled || isLoading}
            loading={isLoading}
        >
            {isLoading ? '' : saveLabel ?? t('save')}
        </LoadingButton>
    );
};

export default SaveButton;
