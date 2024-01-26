import Button from '@mui/material/Button';
import cx from 'classnames';
import React from 'react';

import styles from './index.module.scss';

interface IProps {
    text: string;
    className?: string;
    disabled?: boolean;
    icon?: JSX.Element;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CMButton = ({text, className, icon, onClick, disabled}: IProps) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className={cx(className, styles.baseBtn)}
        >
            {icon}
            {text}
        </Button>
    );
};

export default CMButton;
