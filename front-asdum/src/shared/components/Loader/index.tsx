import React from 'react';

import s from './index.module.scss';

export const Loader = () => {
    return (
        <div className={s.loaderContainer}>
            <img src="assets/Rocket.gif" alt="loading..." />
        </div>
    );
};
