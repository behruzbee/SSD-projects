import React, {FC} from 'react';

import {IHeaderProps} from './model/model';

const headerStyle = {
    display: 'flex',
    gap: 24,
};
export const HeaderBar: FC<IHeaderProps> = ({title, componentArr}) => {
    return (
        <header className="header">
            <h3 className="headerText">{title}</h3>
            <div className="header__bar" style={headerStyle}>
                {componentArr.map((component, index) => (
                    <div key={index}>{component}</div>
                ))}
            </div>
        </header>
    );
};
