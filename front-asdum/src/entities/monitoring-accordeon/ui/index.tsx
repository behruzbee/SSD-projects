import cx from 'classnames';
import React, {useState} from 'react';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@features/monitoring/monitoring-category-status/ui/StatusAccordion/accordions';

import {IMProps} from '../model/model';
import s from './index.module.scss';

export const MonitoringAccordeon = <T extends []>({
    children,
    title,
}: IMProps<T>) => {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Accordion expanded={open}>
            <AccordionSummary onClick={handleClick} noexpandicon={'dd'}>
                <div className={cx(s.accordeonTitle)}>{title}</div>
            </AccordionSummary>
            <AccordionDetails className={cx(s.mAccDetails)}>
                <div className={cx(s.accordeonWrap)}>{children}</div>
            </AccordionDetails>
        </Accordion>
    );
};
