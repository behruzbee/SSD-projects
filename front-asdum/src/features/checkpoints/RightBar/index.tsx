import {Button} from '@mui/material';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {InputController} from '@components/InputController';
import SelectController from '@components/SelectController';
import {SideBar} from '@components/SideBar';
import RightSideWrapper from '@features/RightSideWrapper';
import {useMainStore} from '@store/main';
import {useStationsListStore} from '@store/stations_list';

import {styles} from '../lib';
import stationImg from './assets/eco-station.jpg';
import s from './index.module.scss';
import {useRightBarLogic} from './model';
import {RoutesWrapper} from './ui';

const {bstopStyles, idInput, psInput, selectStyles} = styles;

const RightBar = () => {
    const {t} = useTranslation();
    const openSide = useMainStore((state) => state.openSide);
    const {
        isEditable,
        station,
        draggableStation,
        setEditable,
        setDraggableStation,
    } = useStationsListStore((state) => state, shallow);
    const {
        control,
        typeOptions,
        handleSubmit,
        handleClose,
        handleCancel,
        onSubmit,
        deleteStation,
        saveStation,
        onDeleteSuccess,
    } = useRightBarLogic();

    const isLocation = draggableStation?.lat
        ? draggableStation.lat !== station.lat ||
          draggableStation.lng !== station.lng
        : false;

    return (
        <SideBar
            topInner
            maxWidth="410px"
            onOutSideClick={() => null}
            isOpen={openSide}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <RightSideWrapper
                    title={t('point_info')}
                    onEdit={() => setEditable(true)}
                    handleClose={handleClose}
                    isEditable={isEditable}
                    handleCancel={handleCancel}
                    isLoading={saveStation.isLoading}
                    deleteMutation={deleteStation}
                    deleteData={{id: station?.id}}
                    onDeleteSuccess={onDeleteSuccess}
                >
                    {!isEditable ? (
                        <div className={s.stationImg}>
                            <img src={stationImg} alt="Station" />
                        </div>
                    ) : null}

                    <div className={s.element}>
                        <span className={s.elementTitle}>
                            {t('field_name')}
                        </span>
                        {isEditable ? (
                            <InputController
                                control={control}
                                name="name"
                                placeholder={t('name')}
                                sx={bstopStyles}
                            />
                        ) : (
                            <div className="roundedBlue">
                                <span>{station?.name}</span>
                            </div>
                        )}
                    </div>
                    <div className={s.element}>
                        <span className={s.elementTitle}>{t('unique_id')}</span>
                        {isEditable ? (
                            <InputController
                                control={control}
                                name="stat_uniq_id"
                                type="number"
                                placeholder={t('id')}
                                sx={idInput}
                            />
                        ) : (
                            <div className="roundedBlue">
                                <span>{station?.stat_uniq_id || '-'}</span>
                            </div>
                        )}
                    </div>
                    <div className={s.element}>
                        <span className={s.elementTitle}>{t('longitude')}</span>
                        <div className="roundedBlue">
                            <span>
                                {!draggableStation?.lng
                                    ? station?.lng || '-'
                                    : draggableStation.lng}
                            </span>
                        </div>
                    </div>
                    <div className={s.element}>
                        <span className={s.elementTitle}>{t('latitude')}</span>
                        <div className="roundedBlue">
                            <span>
                                {!draggableStation?.lat
                                    ? station?.lat || '-'
                                    : draggableStation.lat}
                            </span>
                        </div>
                    </div>
                    <div className={s.element}>
                        <span className={s.elementTitle}>{t('type')}</span>
                        {isEditable ? (
                            <SelectController
                                control={control}
                                name="station_type"
                                options={typeOptions}
                                placeholder={t('type')}
                                nooptionsmessage={t('no_options')}
                                {...selectStyles}
                            />
                        ) : (
                            <div className="roundedBlue">
                                <span>
                                    {typeOptions?.find(
                                        (item) =>
                                            item.value ===
                                            station?.station_type,
                                    )?.label || '-'}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={s.element}>
                        <span className={s.elementTitle}>
                            {t('remark_user')}
                        </span>
                        {isEditable ? (
                            <InputController
                                control={control}
                                name="remark"
                                placeholder={t('description')}
                                size="small"
                                type="textarea"
                                multiline
                                sx={psInput}
                            />
                        ) : (
                            <div className="roundedBlue">
                                <span style={{lineHeight: '25px'}}>
                                    {station?.remark?.split(',')?.join(', ') ||
                                        '-'}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={s.element}>
                        <span className={s.elementTitle}>{t('routes')}</span>
                        <RoutesWrapper control={control} />
                    </div>

                    {isEditable && (
                        <div className={s.element}>
                            <Button
                                variant="contained"
                                onClick={() => setDraggableStation(station)}
                            >
                                {!isLocation
                                    ? 'Изменить локацию'
                                    : 'Вернуть прежнную локацию'}
                            </Button>
                        </div>
                    )}
                </RightSideWrapper>
            </form>
        </SideBar>
    );
};

export default React.memo(RightBar);
