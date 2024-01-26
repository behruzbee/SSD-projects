import {Typography} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import cx from 'classnames';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {useTrackerDataWithdetail} from '@api/tracker-statistics/hook';
import {timeParser} from '@shared/helpers/timeParser';
import DataLoading from '@shared/hoc/DataLoading';

import DriverIcon from '@images/svgs/statistics/DriverIcon';
import IntervalIcon from '@images/svgs/statistics/IntervalIcon';
import PassportIcon from '@images/svgs/statistics/PassportIcon';

import s from './index.module.scss';

interface ITrackerMenu {
    anchorEl: null | HTMLElement;
    setAnchorEl: (payload: null | HTMLElement) => void;
    value: number;
}
export const TrackDataMenu: FC<ITrackerMenu> = ({
    anchorEl,
    setAnchorEl,
    value,
}) => {
    const {isLoading, data} = useTrackerDataWithdetail();
    const open = Boolean(anchorEl);
    const {t} = useTranslation();
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    background: '#FCFCFC',
                    padding: '0 20px',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: '50%',
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform:
                            'translateY(-50%) translateX(50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{
                horizontal: 'center',
                vertical: 'top',
            }}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
            }}
        >
            <MenuItem>
                <DataLoading loading={isLoading} data={Object.keys(data || {})}>
                    <div className={cx(s.menuWrap)}>
                        <Typography className={cx(s.trackerMenuTitle)}>
                            {t('more_detail')}
                        </Typography>
                        <div className={cx(s.menuItem)}>
                            <DriverIcon />
                            <Typography>{data?.driver_name}</Typography>
                        </div>
                        <div className={cx(s.menuItem)}>
                            <PassportIcon />
                            <Typography>{data?.tabel_number}</Typography>
                        </div>
                        <div className={cx(s.menuItem)}>
                            <IntervalIcon />
                            <Typography>
                                {timeParser(value, 'HH:mm:ss')}
                            </Typography>
                        </div>
                    </div>
                </DataLoading>
            </MenuItem>
        </Menu>
    );
};
