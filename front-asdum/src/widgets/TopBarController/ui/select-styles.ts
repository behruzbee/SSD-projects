import {selectStyles, selectStyles2} from '@styles/components/helperStyles';

export const mySelectStyles = {
    ...selectStyles,
    selectStyle: {
        ...selectStyles.selectStyle,
        borderRadius: '4px 0px 0px 4px',
    },
    height: '40px',
    placeHolder: {
        color: '#475366',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '16px',
    },
};

export const mySelectStyles2 = {
    ...selectStyles2,
    selectStyle: {
        ...selectStyles2.selectStyle,
        borderRadius: '4px 4px 4px 4px',
    },
    height: '40px',
    placeHolder: {
        color: '#475366',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '16px',
    },
};

export const reportSelectStyles = {
    ...mySelectStyles,
    minWidth: 300,
};
