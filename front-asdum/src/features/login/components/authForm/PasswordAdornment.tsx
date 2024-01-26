import {Visibility, VisibilityOff} from '@mui/icons-material';
import {IconButton, InputAdornment} from '@mui/material';
import React, {useCallback} from 'react';

import {useAuthStore} from '@src/shared/store/auth';

const PasswordAdornment = () => {
    const showPassword = useAuthStore((state) => state.showPassword);
    const setShowPassword = useAuthStore((state) => state.setShowPassword);
    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    );
};

export default React.memo(PasswordAdornment);
