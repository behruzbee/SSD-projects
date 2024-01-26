import styled from '@emotion/styled';

type WrapperProps = {isOpen: boolean};

export const Wrapper = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    top: 56px;
    max-width: 410px;
    width: 100%;
    overflow: scroll;
    overflow-x: hidden;
    background-color: #ffffff;
    z-index: 99999;
    transition: 200ms all;
    transform: ${({isOpen}: WrapperProps) =>
        isOpen ? 'translateX(0)' : 'translateX(100%)'};
`;

const instance = {
    '& .MuiOutlinedInput-root': {
        padding: '0px',
        '& > fieldset': {
            border: 'none',
        },
    },
    '& .MuiInputBase-input': {
        padding: '10px',
        background: '#ced3ff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        textTransform: 'uppercase',
    },
};

export const bstopStyles = {
    maxWidth: '181px',
    ...instance,
};

export const idInput = {
    maxWidth: '68px',
    ...instance,
};

export const psInput = {
    maxWidth: '214px',
    ...instance,
    '& .MuiInputBase-input': {
        ...instance['& .MuiInputBase-input'],
        height: '71px',
    },
};

export const selectStyles = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    height: '40px',
    width: {width: '186px'},
    indicatorSeparator: {display: 'none'},
    selectStyle: {
        bgcolor: '#CED3FF',
        border: '1px solid #C6CAD8',
        boxSizing: 'borderBox',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        inputColor: '#F2F3F4',
        inputFontSize: '12px',
        weight: 'normal',
        lineHeight: '16px',
        color: '#475366',
        inpadding: '6px',
        textTransform: 'uppercase',
    },
    menuListStyle: {
        padding: '16px',
    },
};

export const modalSelect = {
    ...selectStyles,
    width: {width: undefined},
    selectStyle: {...selectStyles.selectStyle, bgcolor: '#EFF0FD'},
};

export const routeInput = {
    '& .MuiOutlinedInput-root': {
        '& .MuiOutlinedInput-input': {
            padding: 0,
            color: '#191A1D',
            fontSize: 14,
            textTransform: 'uppercase',
        },
        '& > fieldset': {
            border: 'none',
        },
    },
};
