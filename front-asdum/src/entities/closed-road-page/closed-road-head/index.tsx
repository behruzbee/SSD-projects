import React, {FC, ReactNode} from 'react';

import s from './index.module.scss';

export const ClosedRoadHead: FC<{children: ReactNode}> = ({children}) => {
    return <header className={s.closedRoadHead}>{children}</header>;
};
