import {LoadingButton, LoadingButtonProps} from '@mui/lab';
import React from 'react';

interface IProps extends LoadingButtonProps {
    text: string;
}

const MButton = ({
    text,
    variant,
    loading,
    type,
    fullWidth,
    className,
}: IProps) => {
    return (
        <LoadingButton
            type={type}
            loading={loading}
            fullWidth={fullWidth}
            variant={variant}
            className={className}
        >
            {text}
        </LoadingButton>
    );
};

export default React.memo(MButton);
