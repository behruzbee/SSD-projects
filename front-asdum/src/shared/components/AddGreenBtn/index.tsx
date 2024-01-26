import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import CMButton from '../CMButton';
import s from './index.module.scss';

interface AddGreenBtnProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    mode?: 'success' | 'primary';
}

const AddGreenBtn: React.FC<AddGreenBtnProps> = ({onClick, disabled, mode}) => {
    const {t} = useTranslation();
    const className = mode
        ? mode === 'primary'
            ? 'btn__primary'
            : 'btn__success'
        : 'btn__success';
    return (
        <CMButton
            disabled={disabled}
            className={cx(className, s.font)}
            icon={<AddCircleOutlineRoundedIcon />}
            text={t('add')}
            onClick={onClick}
        />
    );
};

export default AddGreenBtn;
