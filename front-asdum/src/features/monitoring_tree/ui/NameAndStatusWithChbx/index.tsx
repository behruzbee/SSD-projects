import {Checkbox} from '@mui/material';
import React from 'react';
import shallow from 'zustand/shallow';

import {BusStatus} from '@shared/lib/status-color-name/status-icon';

import {IMappedTree} from '../../lib/types';
import {useMonitoringTreeModel} from '../../model';
import NameAndStatusCounts from '../NameAndStatusCounts';
import s from './index.module.scss';

interface Props {
    nodes: IMappedTree;
    isLoading: boolean;
}

function getStatus(nodes: IMappedTree) {
    return typeof nodes?.status === 'string' ? null : nodes?.status ?? null;
}

const NameAndStatusWithChbx: React.FC<Props> = ({nodes, isLoading}) => {
    const [setSelected, selectedUniqueId, ref, setRef, map, clearBusCoords] =
        useMonitoringTreeModel(
            (s) => [
                s.setSelected,
                s.selectedUniqueId,
                s.selectedRef,
                s.setSelectedRef,
                s.map,
                s.clearBusCoords,
            ],
            shallow,
        );

    return (
        <div className={s.statusWrapper}>
            <NameAndStatusCounts
                statusData={getStatus(nodes)}
                name={nodes?.name}
            />

            <div className={s.chbxStatus}>
                <Checkbox
                    checked={selectedUniqueId.includes(nodes?.unique_id)}
                    disabled={isLoading}
                    onChange={({currentTarget: {checked}}) => {
                        if (!checked) {
                            if (ref && map) {
                                ref.removeFrom(map);
                                clearBusCoords();
                            }
                            setRef(null);
                        }
                        setSelected(checked, nodes);
                    }}
                    onClick={(e) => e.stopPropagation()}
                />

                {!nodes?.children && typeof nodes?.status === 'string' && (
                    <div className={s.busStatus}>
                        <BusStatus status={nodes.status} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NameAndStatusWithChbx;
