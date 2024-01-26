import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import cx from 'classnames';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import CloseIcon from '@src/images/svgs/CloseIcon';
import TrashIcon from '@src/images/svgs/TrashIcon';
import {useGraphList} from '@src/shared/api/graphic/hooks';
import useOrderMutation from '@src/shared/api/route_exchange/mutations';
import {InputController} from '@src/shared/components/InputController';
import SelectController from '@src/shared/components/SelectController';
import Transition from '@src/shared/components/Transistion';
import {RouteExchangeOrder} from '@src/shared/models/route_exchange_model';
import {useEmployeeStore} from '@src/shared/store/employee';
import {useOrderStore} from '@src/shared/store/order';

import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {helper} from '@shared/helpers';

import styles from './index.module.scss';
import {FormProps, orderScheme} from './schema';

const {getSingle, handleOption} = helper;
const selectStyle = {inpadding: '5px'};
const EditOrder = () => {
    useGraphList(false);
    const {t} = useTranslation();
    const employees = useEmployeeStore((s) => s.employees);
    const [editModalOpen, setModalOpen] = useModalManageStore(
        (s) => [s.editModalOpen, s.setModalOpen],
        shallow,
    );
    const [
        openM,
        setOpenM,
        selectedOrder,
        date,
        routeId,
        orderGarages,
        setFetchUp,
        graphic,
        fetchCount,
        setGraphId,
        graphList,
        setGraphic,
    ] = useOrderStore(
        (s) => [
            s.openM,
            s.setOpenM,
            s.selectedOrder,
            s.date,
            s.routeId,
            s.orderGarages,
            s.setFetchUp,
            s.graphic,
            s.fetchCount,
            s.setGraphId,
            s.graphList,
            s.setGraphic,
        ],
        shallow,
    );
    const employeoptions = useMemo(
        () => handleOption(employees, 'tab_number', 'id'),
        [employees],
    );

    const {handleSave, handleDelete} = useOrderMutation();

    const optionGarageNumbers = useMemo(
        () => handleOption(orderGarages, 'g', 'id'),
        [orderGarages],
    );

    const {control, handleSubmit, reset, setValue} = useForm<FormProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(orderScheme),
    });

    const onSubmit = (data: FormProps) => {
        const fromTime = data.from_time?.split('-');
        handleSave.mutate({
            ex_id: selectedOrder?.ex_id,
            driver_id: data.tab_num?.value,
            from_time: fromTime[0],
            to_time: data.to_time,
            graph_number: data.graph_number?.value,
            station_id: data.station_id?.value,
            date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
            race: data.race,
            bus_fact: data.garage_number?.value,
            route_id: routeId,
        });
    };

    const handleClose = useCallback(() => {
        setModalOpen('edit', false);
    }, []);

    const tabNumber = useWatch({
        control,
        name: 'tab_num',
    });

    const graphicId = useWatch({
        control,
        name: 'graphic',
    });

    const garageNumber = useWatch({
        control,
        name: 'garage_number',
    });
    const objFound: any = orderGarages.find(
        (item) => item.g === garageNumber?.label,
    );

    useEffect(() => {
        setValue('model', objFound?.model);
        setValue('gos', objFound?.vianum);
    }, [garageNumber]);

    const graphObj: any = employees.find(
        (item) => item.id === tabNumber?.value,
    );

    useEffect(() => {
        if (graphObj?.fullname) {
            setValue('driver_id', graphObj?.fullname);
        }
    }, [tabNumber]);

    useEffect(() => {
        const dayType = getSingle();
        setValue('even', dayType);
    }, []);

    useEffect(() => {
        if (openM && graphic?.length > 0) {
            const {work_begin, work_end, race_count, kpp1} = graphic[0];
            setValue('from_time', work_begin + '-' + work_end);
            setValue('to_time', work_end);
            setValue('race', race_count);
            setValue('station_id', kpp1);
        }
    }, [graphic]);

    useEffect(() => {
        if (selectedOrder?.driver_name && openM) {
            console.log('Use effect');

            const garage_num: RouteExchangeOrder | any = orderGarages?.find(
                (item) => item.model === selectedOrder.model,
            );

            setValue('station_id', selectedOrder.station);

            setValue('garage_number', {
                value: garage_num?.id,
                label: selectedOrder.garage_number,
            });

            setValue(
                'from_time',
                selectedOrder?.from_time + '-' + selectedOrder?.to_time,
            );
            setValue('model', selectedOrder.model);
            console.log('Gos: ', selectedOrder);

            setValue('gos', selectedOrder.gos);
            setValue('to_time', selectedOrder?.to_time);
            setValue('race', selectedOrder.race);
            setValue('tab_num', {
                label: selectedOrder.tab_number,
                value: selectedOrder.bus_id,
            });
            setValue('driver_id', selectedOrder.driver_name);
        }

        if (selectedOrder?.graph_id) {
            setValue('graphic', {
                label: selectedOrder.graph_id,
                value: selectedOrder.graph_id,
            });
        }
    }, [selectedOrder, openM]);

    useEffect(() => {
        if (handleSave.isSuccess || handleDelete.isSuccess) {
            reset({});
            setOpenM(false);
            setFetchUp(fetchCount + 1);
            setModalOpen('edit', false);
        }
    }, [handleSave.isSuccess, handleDelete.isSuccess]);

    useEffect(() => {
        const value = graphicId?.value;
        if (value) {
            setGraphId(value);
        }

        return () => {
            setGraphId(null);
            setGraphic([]);
        };
    }, [graphicId]);

    return (
        <Dialog
            open={editModalOpen}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="md"
            scroll="paper"
            keepMounted
            className={styles.modal}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle className={styles.heading} id="scroll-dialog-title">
                <div className={styles.row}>
                    <p className={styles.title}>{t('edit_order')}</p>
                    <div className="flex__end">
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={styles.content} dividers={true}>
                    <div className={styles.contentBlock}>
                        <div className={styles.block}>
                            <div className={styles.subBlock}>
                                <div className={cx('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('graphic')}</p>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            isDisabled
                                            name="graphic"
                                            placeholder={t('graphic')}
                                            selectStyle={selectStyle}
                                            options={graphList}
                                            menuPlacement={'bottom'}
                                            styles={styles.input}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('time_from')}</p>
                                        <InputController
                                            control={control}
                                            name="from_time"
                                            size="small"
                                            type="text"
                                            disabled={true}
                                            placeholder="00:00-00:00"
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('race')}</p>
                                        <InputController
                                            control={control}
                                            name="race"
                                            placeholder={t('race')}
                                            size="small"
                                            type="text"
                                            disabled
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('starttime')}</p>

                                        <InputController
                                            control={control}
                                            name="station_id"
                                            placeholder={t('starttime')}
                                            size="small"
                                            type="text"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className={cx('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('g_num')}</p>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            name="garage_number"
                                            placeholder={t('g_num')}
                                            options={optionGarageNumbers}
                                            selectStyle={selectStyle}
                                            styles={() => ({
                                                input: {
                                                    backgroundColor: '#000000',
                                                },
                                            })}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('model_ts')}</p>
                                        <InputController
                                            control={control}
                                            name="model"
                                            size="small"
                                            disabled
                                            placeholder={t('model_ts')}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('gos_number')}</p>
                                        <InputController
                                            control={control}
                                            name="gos"
                                            size="small"
                                            disabled
                                            placeholder={t('gos_number')}
                                        />
                                    </div>
                                </div>

                                <div className={cx('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('tab_num')}</p>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            name="tab_num"
                                            placeholder={t('tab_num')}
                                            options={employeoptions}
                                            styles={styles.input}
                                            selectStyle={selectStyle}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('driver_name')}</p>

                                        <InputController
                                            control={control}
                                            name="driver_id"
                                            size="small"
                                            disabled
                                            placeholder={t('driver_name')}
                                        />
                                    </div>
                                    <div className="form__item__order">
                                        <p>{t('days_ch')}</p>
                                        <InputController
                                            control={control}
                                            name="even"
                                            size="small"
                                            disabled
                                            placeholder={t('days_ch')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className={cx('flex__end', 'gap_12')}>
                        <Button
                            className="btn__secondary"
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            className="btn__danger"
                            onClick={() => {
                                handleDelete.mutate(selectedOrder?.ex_id);
                            }}
                            disabled={handleDelete.isLoading}
                            startIcon={<TrashIcon className="f_16" />}
                        >
                            {handleDelete.isLoading ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                <span>{t('delete').toUpperCase()}</span>
                            )}
                        </Button>
                        <Button
                            className="btn__primary"
                            type="submit"
                            disabled={handleSave.isLoading}
                        >
                            {handleSave.isLoading ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                <span>{t('update').toUpperCase()}</span>
                            )}
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default React.memo(EditOrder);
