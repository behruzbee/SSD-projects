import {HeaderBar} from '@entities/header-bar';
import {LoadingButton} from '@mui/lab';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import shallow from 'zustand/shallow';

import usePolygonMutate from '@api/polygon/mutation';
import {IPolygonModel} from '@models/polygon_model';
import {usePolygonStore} from '@shared/store/polygon';

interface LocationState {
    state: IPolygonModel;
}
export const PolygonHeader = () => {
    const {fillColor, polygon} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );
    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const query = location as LocationState;
    const cancel = () => navigate(-1);
    const {handleSave} = usePolygonMutate();
    const handleSavePolygon = () => {
        handleSave.mutate({
            id: query.state?.id,
            color: fillColor,
            coordinates: polygon.map((coordinate: any) => ({
                lat: coordinate[0],
                lng: coordinate[1],
            })),
        });
    };

    const Cancel = (
        <LoadingButton
            className="primary_btn"
            style={{height: 40}}
            onClick={cancel}
        >
            {t('cancel')}
        </LoadingButton>
    );

    const Save = (
        <LoadingButton
            className="primary_filled_btn"
            loading={handleSave.isLoading}
            onClick={handleSavePolygon}
            disabled={handleSave.isLoading}
        >
            {t('save')}
        </LoadingButton>
    );

    return (
        <HeaderBar title={t('edit_polygon')} componentArr={[Cancel, Save]} />
    );
};
