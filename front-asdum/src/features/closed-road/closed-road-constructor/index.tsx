import {LoadingButton} from '@mui/lab';
import React, {FC, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import shallow from 'zustand/shallow';

import {useStations} from '@api/stations_list/hooks';
import {useClosedRoadStore} from '@features/closed-road';
import {useDefineSaveLabel} from '@shared/helpers';

import {MapTool} from '../map-tool';
import {useClosedRoadS} from './api/mutations';
import s from './index.module.scss';
import {IRoadConstructorComponent} from './model/road-constructor.types';
import {ClosedRoadInput} from './ui/closed-road-input';

export const ClosedRoadConstructor: FC<IRoadConstructorComponent> = ({
    edit,
}) => {
    const {data} = useStations();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [setStations, roadData, reset, selected, isValidated] =
        useClosedRoadStore(
            (s) => [
                s.setStations,
                s.closedRoadData,
                s.resetRoadData,
                s.selectedData,
                s.isValidated,
            ],
            shallow,
        );
    useEffect(() => {
        const stations = data?.data.data;
        if (stations) {
            setStations(stations);
        }
    }, [data?.data.data]);
    const saveRoad = useClosedRoadS(() => {
        navigate(-1);
        reset();
    });
    const handleSave = () => {
        if (!selected.id) {
            delete roadData.id;
            console.log('Save: ', roadData);
        } else {
            console.log('Update: ', roadData);
        }
        if (isValidated) {
            saveRoad.mutate(roadData);
        }
    };
    const labelText = useMemo<string>(
        () => useDefineSaveLabel(selected.id, t('save'), t('update')),
        [t, selected],
    );

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);
    return (
        <div className={s.closedRoadContainer}>
            <div className={s.closedRoadConstructor}>
                <div style={{display: 'flex', alignItems: 'stretch', gap: 18}}>
                    <ClosedRoadInput edit={edit} />
                    <MapTool />
                </div>
                <div className={s.closedRoadSaveBtn}>
                    <LoadingButton
                        loading={saveRoad.isLoading}
                        onClick={handleSave}
                        color={'inherit'}
                        disabled={!isValidated}
                    >
                        {labelText}
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
};
