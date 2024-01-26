import React, {CSSProperties} from 'react';

import {ReactComponent as DeleteIcon} from './Delete.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <DeleteIcon className={className} style={style} />;
