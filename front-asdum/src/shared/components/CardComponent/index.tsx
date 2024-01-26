import React, {CSSProperties, FC, ReactNode} from 'react';

import s from './index.module.scss';

interface ICardComponent {
    styles?: CSSProperties;
    children: ReactNode;
}
export const CardComponent: FC<ICardComponent> = ({children, styles}) => {
    return (
        <div style={styles} className={s.card}>
            {children}
        </div>
    );
};
