import {Tooltip} from '@mui/material';
import cx from 'classnames';
import React, {FC} from 'react';

import {textCropper} from '@shared/helpers';

import s from './index.module.scss';

interface ITextCropper {
    text: string;
    withTooltip?: boolean;
    maxLength?: number;
    className?: string;
}
export const TextCropper: FC<ITextCropper> = ({
    text,
    withTooltip,
    maxLength,
    className,
}) => {
    const length = maxLength ? maxLength : 16;
    let croppedText = text;
    if (text && maxLength && text.length >= maxLength) {
        croppedText = textCropper(text, length);
    }

    if (withTooltip) {
        return (
            <Tooltip title={text}>
                <span className={cx(s.croppedText, className)}>
                    {croppedText}
                </span>
            </Tooltip>
        );
    }
    return <div className={className && ''}>{croppedText}</div>;
};
