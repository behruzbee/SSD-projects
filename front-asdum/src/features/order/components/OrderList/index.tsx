import Typography from '@mui/material/Typography';
import cx from 'classnames';
import React from 'react';
import shallow from 'zustand/shallow';

import {useOrderStore} from '@src/shared/store/order';
import {useParkStore} from '@src/shared/store/park';

import ArrowIcon from '@images/svgs/monitoring/ArrowIcon';

import RouteList from '../RouteList';
import styles from './index.module.scss';
import {Accordion, AccordionDetails, AccordionSummary} from './styles';

const OrderList = () => {
    const parks = useParkStore((s) => s.parks);
    const [expanded, setExpanded, setParkId] = useOrderStore(
        (s) => [s.expanded, s.setExpanded, s.setParkId],
        shallow,
    );

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            console.log('Panel: ', panel);
            setExpanded(isExpanded ? panel : false);
            setParkId(+panel);
        };

    return (
        <div className={styles.container}>
            {parks.map((item) => (
                <Accordion
                    key={item.park_id}
                    expanded={expanded === item.park_id?.toString()}
                    onChange={handleChange(item?.park_id?.toString())}
                    className={cx([
                        expanded === item.park_id.toString() && 'expanded',
                    ])}
                >
                    <AccordionSummary
                        expandIcon={<ArrowIcon style={{width: 8, height: 8}} />}
                        aria-controls={item.park}
                        id={item.park}
                    >
                        <Typography>{item.license_number}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <RouteList />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default React.memo(OrderList);
