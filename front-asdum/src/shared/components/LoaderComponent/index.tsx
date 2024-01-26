import {Box, CircularProgress} from '@mui/material';
import React, {FC} from 'react';

interface ILoaderComponent {
    className?: string;
}

const loaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
};
export const LoaderComponent: FC<ILoaderComponent> = ({className}) => {
    return (
        <Box className={className ? className : ''} sx={loaderStyle}>
            <CircularProgress />
        </Box>
    );
};
