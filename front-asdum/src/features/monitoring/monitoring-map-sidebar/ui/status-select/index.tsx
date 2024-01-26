import {LoadingButton} from '@mui/lab';
import {Popover} from '@mui/material';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {useStatusPopup} from '@features/monitoring/monitoring-map-sidebar/ui/status-select/lib/useStatusPopup';
import {useStatusSelectStore} from '@features/monitoring/monitoring-map-sidebar/ui/status-select/model';
import {StatusOption} from '@features/monitoring/monitoring-map-sidebar/ui/status-select/ui/status-option';

export const StatusSelect = () => {
    const {t} = useTranslation();
    const {anchorEl, handleClosePopup, handleClick, id, open} =
        useStatusPopup();
    const {statusData, switchStatus} = useStatusSelectStore(
        (state) => state,
        shallow,
    );
    const handleSelectClick = (id: number) => {
        switchStatus(id);
    };

    console.log(statusData);
    return (
        <div>
            <LoadingButton aria-describedby={id} onClick={handleClick}>
                {t('edit_status')}
            </LoadingButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {statusData.map((item) => (
                    <StatusOption
                        key={item.id}
                        option={item}
                        onClick={handleSelectClick}
                    />
                ))}
            </Popover>
        </div>
    );
};
