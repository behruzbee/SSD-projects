import React, {CSSProperties, ReactElement} from 'react';

interface ISvgProps {
    Icon: any;
    style?: CSSProperties;
    className?: string;
}
export const SvgGenerator = ({
    Icon,
    style,
    className,
}: ISvgProps): ReactElement => <Icon className={className} style={style} />;
