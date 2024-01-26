import cx from 'classnames';
import React, {CSSProperties, FC, ReactElement} from 'react';

import s from './index.module.scss';

interface IScrollArea {
    children: ReactElement;
    maxHeight?: number | string;
    className?: string;
    style?: CSSProperties;
}
export const ScrollArea: FC<IScrollArea> = ({
    children,
    maxHeight,
    className,
    style,
}) => {
    return (
        <div
            style={{...style, maxHeight}}
            className={cx(maxHeight ? s.scrolled : '', className)}
        >
            {children}
        </div>
    );
};
