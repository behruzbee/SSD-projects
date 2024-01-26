import {CircularProgress} from '@mui/material';
import {useSelectedModel} from '@widgets/TablePageWrapper';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Map, Polygon, YMaps} from 'react-yandex-maps';

import DialogWrapper from '@components/DialogWrapper';
import {InputController} from '@components/InputController';
import SelectController from '@components/SelectController';
import {useDefineSaveLabel, yQuery} from '@shared/helpers';
import {useHandleIsAdmin} from '@shared/hooks/useHandleIsAdmin';
import {defaultMapState} from '@shared/lib';

import s from './index.module.scss';
import {
    garageMapStyle,
    mapModules,
    polygonOptions,
} from './lib/garageMap.config';
import {GarageFormFieldProps} from './model/model';
import {useGarageFormLogic} from './model/useGarageFormLogic';

const GarageFormField: React.FC<GarageFormFieldProps> = ({
    isOpen,
    title,
    onClose,
    selectedGarage,
    saveGarage,
}) => {
    const [mapRef, setMapRef] = useState<any>();
    const {selected, clearSelected} = useSelectedModel();
    const {isSuperAdmin} = useHandleIsAdmin();
    const {t} = useTranslation();

    const {
        control,
        errors,
        regionOptions,
        instanceRef,
        resetPolygon,
        save,
        coordinates,
        isLoading,
    } = useGarageFormLogic(selectedGarage, mapRef, saveGarage);

    useEffect(() => () => clearSelected(), []);
    return (
        <DialogWrapper
            open={isOpen}
            onClose={onClose}
            title={title}
            saveLabel={useDefineSaveLabel<number>(
                selected.col1,
                t('add'),
                t('update'),
            )}
            save={save}
            width={700}
            isLoading={saveGarage.isLoading}
            isForm
        >
            {isLoading ? (
                <div className="loading">
                    <CircularProgress size={40} />
                </div>
            ) : (
                <div className={s.wrapper}>
                    {isSuperAdmin && (
                        <SelectController
                            control={control}
                            name="region_id"
                            placeholder={t('region')}
                            options={regionOptions}
                            errors={errors.region_id?.label?.type}
                            message={errors.region_id?.label?.message}
                        />
                    )}

                    <div style={garageMapStyle}>
                        {/*@ts-ignore*/}
                        <YMaps query={yQuery}>
                            {/*@ts-ignore*/}
                            <Map
                                instanceRef={(ref) => setMapRef(ref)}
                                defaultState={defaultMapState}
                                options={{autoFitToViewport: 'always'}}
                                height="600px"
                                width="100%"
                                modules={mapModules}
                            >
                                {coordinates?.[0]?.length > 0 && (
                                    <>
                                        {/*@ts-ignore*/}
                                        <Button
                                            options={{maxWidth: 200}}
                                            data={{
                                                content: t('delete_polygon'),
                                            }}
                                            onClick={resetPolygon}
                                        />
                                    </>
                                )}
                                {/*@ts-ignore*/}
                                <Polygon
                                    instanceRef={instanceRef}
                                    geometry={coordinates}
                                    options={polygonOptions}
                                />
                            </Map>
                        </YMaps>
                    </div>

                    <InputController
                        name="garage_name"
                        control={control}
                        size={'small'}
                        label={t('garage_name')}
                        message={errors.garage_name?.message}
                    />
                </div>
            )}
        </DialogWrapper>
    );
};

export default React.memo(GarageFormField);
