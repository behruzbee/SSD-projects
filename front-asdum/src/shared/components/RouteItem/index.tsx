import cx from 'classnames';
import React from 'react';

import styles from './index.module.scss';

interface IProps {
    name: string | number;
    id: number;
    selected: boolean;
    handleId: () => void;
}

const RouteItem = ({name, id, selected, handleId}: IProps) => {
    return (
        <div
            onClick={handleId}
            className={cx([styles.container, selected && styles.selected])}
            key={id}
        >
            <p>{name}</p>
        </div>
    );
};

export default React.memo(RouteItem);
