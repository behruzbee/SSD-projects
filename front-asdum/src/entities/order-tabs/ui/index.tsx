import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, {FC} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {IOrderTab, LinkTabProps, StyledTabsProps} from '../model.ts/models';
import s from './index.module.scss';

function LinkTab(props: LinkTabProps) {
    const navigate = useNavigate();
    return (
        <Tab
            component="a"
            onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
            ) => {
                event.preventDefault();
                navigate(props.href);
            }}
            {...props}
        />
    );
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
        }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        height: 3,
        width: '100%',
        backgroundColor: '#4455EA',
        borderRadius: '2px 2px 0px 0px',
    },
});

export const OrderTab: FC<IOrderTab> = ({data}) => {
    const location = useLocation();
    const locationArr = location.pathname.split('/');
    const pathName = locationArr[locationArr.length - 1];
    const defined = data.findIndex((elem) => elem.path.includes(pathName));
    const [value, setValue] = React.useState(defined);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box
                className={s.tabWrap}
                sx={{borderBottom: 1, borderColor: 'divider'}}
            >
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    {data.map(({path, title}, i) => (
                        <LinkTab key={i} href={path} label={title} />
                    ))}
                </StyledTabs>
            </Box>
        </div>
    );
};
