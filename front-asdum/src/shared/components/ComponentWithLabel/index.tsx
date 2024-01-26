import React, {ReactNode} from 'react';

import s from './index.module.scss';

interface Props {
    label: string;
    children: ReactNode;
}

const ComponentWithLabel: React.FC<Props> = ({label, children}) => {
    return (
        <div className={s.inputWrapper}>
            <span className={s.inputLabel}>{label}</span>
            {children}
        </div>
    );
};

export default ComponentWithLabel;
