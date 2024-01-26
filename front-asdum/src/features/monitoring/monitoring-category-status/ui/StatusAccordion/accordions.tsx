import styled from '@emotion/styled';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import React from 'react';

import ArrowIcon from '@images/svgs/monitoring/ArrowIcon';

export const Accordion = styled((props: AccordionProps) => {
    return <MuiAccordion disableGutters elevation={0} square {...props} />;
})(() => ({
    border: `1px solid #E9EAED`,
    background: '#fff',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    boxShadow: '0px 0.843868px 0px #E8EAED',
}));

export const AccordionSummary = styled(
    (props: AccordionSummaryProps & {noexpandicon?: string}) => {
        return props.children ? (
            <MuiAccordionSummary
                expandIcon={
                    props?.noexpandicon ? (
                        <ArrowIcon style={{width: 8, height: 8}} />
                    ) : null
                }
                {...props}
            />
        ) : null;
    },
)(() => {
    return {
        flexDirection: 'row',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(180deg)',
        },
        '& .MuiAccordionSummary-content': {},
    };
});

export const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 36,
    background: '#FBFBFB',
}));
