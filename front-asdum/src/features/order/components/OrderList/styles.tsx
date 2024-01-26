import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import {styled} from '@mui/material/styles';
import React from 'react';

import ArrowForward from '@src/images/svgs/ArrowForward';

export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} {...props} />
))(() => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },

    '& .css-7fb0v8-MuiPaper-root-MuiAccordion-root': {
        backgroundColor: 'transparent',
    },
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForward />} {...props} />
))(({theme}) => ({
    backgroundColor: '#fff',
    color: '#191A1D !important',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '17px',
    lineHeight: '32px',
    borderBottom: '1px solid #E8EAED',

    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(-90deg)',
        color: '#C7C7D2',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 16px 0',
    background: 'transparent !important',
}));
