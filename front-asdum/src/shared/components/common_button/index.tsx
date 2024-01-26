import {Button} from '@mui/material';
import cx from 'classnames';
import React from 'react';

import s from './index.module.scss';

interface IGeneralButton {
    onClick?: () => void;
    isLoading?: boolean;
    element?: JSX.Element;
    title?: string;
    bgColor?: string;
    textColor?: string;
    IconOrder?: number;
    disabled?: boolean;
}
export const GeneralButton = ({
    onClick,
    element,
    title,
    bgColor,
    textColor,
    IconOrder,
    disabled,
}: IGeneralButton): JSX.Element => {
    return (
        <Button
            onClick={onClick}
            style={{backgroundColor: bgColor, color: textColor}}
            className={cx(s.generalBtn)}
            disabled={disabled}
        >
            <span
                style={{
                    order: IconOrder !== 1 ? 1 : 2,
                    margin: IconOrder === 1 ? '0 0 0 7px' : '0 7px 0 0',
                }}
            >
                {title}
            </span>
            <div style={{order: IconOrder !== 1 ? 2 : 1}}>{element}</div>
        </Button>
    );
};
