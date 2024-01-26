import React, {CSSProperties} from 'react';

import {ReactComponent as EditIcon} from './Edit.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <EditIcon className={className} style={style} />;
