import React from 'react';

import {TextCropper} from '@components/text-cropper';

import s from './index.module.scss';

export const OrderChip = ({
    title,
    subtitle,
    maxLength,
}: {
    title: string;
    subtitle: string;
    maxLength?: number;
}) => {
    return (
        <div className={s.orderChip}>
            <p className={s.orderChipTitle}>{title}</p>
            {maxLength ? (
                <TextCropper
                    className={s.orderChipSubtitle}
                    text={subtitle}
                    maxLength={maxLength}
                    withTooltip
                />
            ) : (
                <p className={s.orderChipSubtitle}>{subtitle}</p>
            )}
        </div>
    );
};
