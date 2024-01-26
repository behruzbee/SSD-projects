import cn from 'classnames';
import React from 'react';

import {DefineBusStatus} from '@shared/components';
import {defineStatusName} from '@shared/helpers';

import {StatusesTypes} from '../../model/monitoring-statuses.model';
import {Accordion, AccordionDetails, AccordionSummary} from './accordions';
import s from './index.module.scss';

interface StatusAccordionProps {
    data: Array<StatusesTypes>;
}

const BusStatusAccordion: React.FC<StatusAccordionProps> = ({data}) => {
    return (
        <>
            {data.map((parent, index) => {
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            className={cn(s.statusAccSummary)}
                            noexpandicon={parent.type}
                        >
                            <div className={cn(s.statusTitle)}>
                                {defineStatusName(parent.type)}
                            </div>
                            <div className={cn(s.statusCount)}>
                                {parent.count}
                            </div>
                        </AccordionSummary>
                        {parent.children.map((child) => {
                            return (
                                <AccordionDetails
                                    className={cn(s.statusDetail)}
                                    key={child.type}
                                >
                                    <div className={cn(s.statusInfo)}>
                                        <div>
                                            <DefineBusStatus
                                                type={child.type}
                                            />
                                        </div>
                                        <div className={cn(s.statusSubtitle)}>
                                            {defineStatusName(child.type)}
                                        </div>
                                    </div>
                                    <div className={cn(s.statusValue)}>
                                        {child.count}
                                    </div>
                                </AccordionDetails>
                            );
                        })}
                    </Accordion>
                );
            })}
        </>
    );
};

export default BusStatusAccordion;
