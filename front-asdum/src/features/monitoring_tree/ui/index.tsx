import TreeView from '@mui/lab/TreeView';
import {CircularProgress} from '@mui/material';
import React, {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {
    useAllBusesQuery,
    useBusesMonitoring,
    useRoutesCoordsQuery,
} from '@api/monitoring/hooks';

import ExpandedGrayArrow from '@images/svgs/monitoring/ExpandedGrayArrow';
import GrayArrowIcon from '@images/svgs/monitoring/GrayArrowIcon';

import {useMonitoringTreeModel} from '../model';
import s from './index.module.scss';
import {RenderTree} from './RenderTree';

const TreeViewIcons = {
    defaultCollapseIcon: <ExpandedGrayArrow className={s.treeIcon} />,
    defaultExpandIcon: <GrayArrowIcon className={s.treeIcon} />,
};

export const MonitoringTree: FC = React.memo(() => {
    const [
        filteredMappedData,
        selected,
        routeCoords,
        ids,
        expanded,
        selectedBus,
        handleSelect,
        handleExpand,
        setRoutesCoords,
        setFilteredRoutes,
        setFilteredBuses,
        setFilterdStations,
    ] = useMonitoringTreeModel(
        (s) => [
            s.filteredMappedData,
            s.selected,
            s.routeCoords,
            s.selectedParkRouteId,
            s.expanded,
            s.selectedBus,
            s.handleSelect,
            s.handleExpand,
            s.setRoutesCoords,
            s.setFilteredRoutes,
            s.setFilteredBuses,
            s.setFilterdStations,
        ],
        shallow,
    );
    const {t} = useTranslation();
    const {isLoading} = useBusesMonitoring();
    const routesCoordsQuery = useRoutesCoordsQuery(ids.parkId, ids.routeId);
    const allBusesQuery = useAllBusesQuery();

    useEffect(() => {
        if (routesCoordsQuery.data) {
            setRoutesCoords(routesCoordsQuery.data);
        }
    }, [routesCoordsQuery.data]);

    useEffect(() => {
        setFilteredRoutes();
        setFilterdStations();
    }, [routeCoords, selected]);

    useEffect(() => {
        if (allBusesQuery.data) {
            setFilteredBuses(allBusesQuery.data);
        }
    }, [allBusesQuery.data, selected]);

    return isLoading ? (
        <div className="loading">
            <CircularProgress size={30} />
        </div>
    ) : !filteredMappedData.length ? (
        <div className="loading">
            <h4>{t('no_data')}</h4>
        </div>
    ) : (
        <div className="monitoringTree">
            <TreeView
                {...TreeViewIcons}
                multiSelect
                expanded={expanded}
                selected={[selectedBus?.id?.toString() || '']}
                onNodeToggle={handleExpand}
                onNodeSelect={handleSelect}
            >
                {filteredMappedData.map((elem) => (
                    <RenderTree
                        key={elem.unique_id}
                        nodes={elem}
                        isLoading={routesCoordsQuery.isLoading}
                    />
                ))}
            </TreeView>
        </div>
    );
});
