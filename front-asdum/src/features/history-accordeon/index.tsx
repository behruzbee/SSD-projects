import cx from 'classnames';
import React, {FC} from 'react';

import {HistoryAccordeonProps} from '@features/history-accordeon/models/model';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@features/monitoring/monitoring-category-status/ui/StatusAccordion/accordions';

import s from './index.module.scss';

export const HistoryTableAccordeon: FC<HistoryAccordeonProps> = ({
    children,
    title,
}) => {
    return (
        <Accordion>
            <AccordionSummary noexpandicon={'dd'}>
                <div className={cx(s.accordeonTitle)}>{title}</div>
            </AccordionSummary>
            <AccordionDetails className={cx(s.mAccDetails)}>
                <div className={cx(s.accordeonWrap)}>{children}</div>
            </AccordionDetails>
        </Accordion>
    );
};
