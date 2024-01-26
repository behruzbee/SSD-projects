import {Visibility, VisibilityOff} from '@mui/icons-material';
import {IconButton, InputAdornment} from '@mui/material';
import React, {useCallback} from 'react';

interface IProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const PasswordStatus = ({show, setShow}: IProps) => {
    const handleClickShowPassword = useCallback(() => {
        setShow(!show);
    }, [show]);
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
            >
                {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    );
};

export default React.memo(PasswordStatus);
