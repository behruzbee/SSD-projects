import React from 'react';

export const useStatusPopup = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null,
    );
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleClosePopup = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return {
        anchorEl,
        id,
        handleClosePopup,
        handleClick,
        open,
    };
};
