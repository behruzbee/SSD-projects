import React from 'react';

import LogoIcon from '@src/images/svgs/LogoIcon';

import styles from './index.module.scss';

const LogoHead = () => {
    return (
        <div className={styles.logoContainer}>
            <LogoIcon className={styles.logo} />
            <div className={styles.logoTextWrapper}>
                <h4 className={styles.logoTitle}>ASDUM</h4>
                <p className={styles.logoSub}>gps monitoring company</p>
            </div>
        </div>
    );
};

export default React.memo(LogoHead);
