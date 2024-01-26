import cx from 'classnames';
import React, {useEffect, useState} from 'react';

import styles from './index.module.scss';

const Clock = ({className}: any) => {
    const [date, setDate] = useState(new Date());

    function refreshClock() {
        setDate(new Date());
    }
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);
    return (
        <p className={cx(className, styles.time)}>
            {date.toLocaleTimeString()}
        </p>
    );
};
export default React.memo(Clock);
