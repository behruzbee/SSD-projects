import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import c from 'classnames';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Path, useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useEmployees from '@api/employees/hooks';
import useGraphicById, {useGraphList} from '@api/graphic/hooks';
import useOrderMutation from '@api/route_exchange/mutations';
import {InputController} from '@components/InputController';
import SelectController from '@components/SelectController';
import Transition from '@components/Transistion';
import {helper} from '@shared/helpers';
import {useEmployeeStore} from '@store/employee';
import {useOrderStore} from '@store/order';

import CloseIcon from '@images/svgs/CloseIcon';

import styles from './index.module.scss';
import {FormProps, orderScheme} from './schema';

const {getSingle, handleOption} = helper;
const selectStyle = {inpadding: '5px'};
const SaveOrder = () => {
    useGraphicById();
    useGraphList(false);
    const {t} = useTranslation();
    const {handleSave} = useOrderMutation();
    useEmployees(false);
    const employees = useEmployeeStore((s) => s.employees);

    const [
        openS,
        setOpenS,
        orderGarages,
        date,
        routeId,
        setFetchUp,
        fetchCount,
        setGraphId,
        graphic,
        graphList,
        setGraphic,
        stationsList,
    ] = useOrderStore(
        (s) => [
            s.openS,
            s.setOpenS,
            s.orderGarages,
            s.date,
            s.routeId,
            s.setFetchUp,
            s.fetchCount,
            s.setGraphId,
            s.graphic,
            s.graphList,
            s.setGraphic,
            s.stationsList,
        ],
        shallow,
    );

    const optionGarageNumbers = useMemo(
        () => handleOption(orderGarages, 'g', 'id'),
        [orderGarages],
    );

    const employeoptions = useMemo(
        () => handleOption(employees, 'tab_number', 'id'),
        [employees],
    );

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: {errors},
    } = useForm<FormProps, Path<FormProps>>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(orderScheme),
    });

    const onSubmit = (data: FormProps) => {
        const fromTime = data.from_time?.split('-');

        handleSave.mutate({
            ex_id: null,
            driver_id: +data.tab_num?.value,
            from_time: fromTime[0],
            to_time: fromTime[1],
            graph_number: +data.graphic?.value,
            station_id: data?.station_id.value,
            date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
            race: data.race,
            bus_fact: data.graph_number?.value,
            route_id: routeId,
        });
    };

    const graphNumber = useWatch({
        control,
        name: 'graph_number',
    });

    const tabNumber = useWatch({
        control,
        name: 'tab_num',
    });

    const graphicId = useWatch({
        control,
        name: 'graphic',
    });

    const handleClose = useCallback(() => {
        setOpenS(false);
        reset();
    }, []);

    const objFound: any = orderGarages.find(
        (item) => item.id === graphNumber?.value,
    );

    const graphObj: any = useMemo(() => {
        if (employees) {
            return employees.find((item) => item.id === tabNumber?.value);
        } else {
            return undefined;
        }
    }, [employees, tabNumber]);

    useEffect(() => {
        if (objFound) {
            setValue('model', objFound?.model);
            setValue('gos', objFound?.vianum);
        }
    }, [graphNumber]);

    useEffect(() => {
        if (tabNumber) {
            setValue('driver_id', graphObj?.fullname);
        }
    }, [tabNumber]);

    useEffect(() => {
        const dayType = getSingle();
        setValue('even', dayType);
    }, []);

    useEffect(() => {
        if (handleSave.isSuccess) {
            reset({
                graph_number: null,
                model: '',
                gos: '',
            });
            setOpenS(false);
            setFetchUp(fetchCount + 1);
        }

        return () => {
            setGraphId(null);
            setGraphic([]);
        };
    }, [handleSave.isSuccess]);

    useEffect(() => {
        const value = graphicId?.value;

        if (value) {
            console.log('Graphic value: ', value);
            setValue('from_time', '');
            setValue('race', Number(''));
            setValue('station_id', null);
            setGraphId(value);
        }
    }, [graphicId]);

    useEffect(() => {
        if (graphic?.length === 0) {
            setValue('from_time', '');
            setValue('to_time', '');
            setValue('race', 0);
            setValue('station_id', '');
        }

        if (openS && graphic?.length > 0) {
            const {work_begin, work_end, race_count, kpp1, station_id} =
                graphic[0];
            setValue('from_time', work_begin + '-' + work_end);
            setValue('to_time', work_end);
            setValue('race', race_count);
            setValue('station_id', {label: kpp1, value: station_id});
        }
    }, [graphic]);

    const handleCreate = (opt: string) => {
        setValue('graphic', {label: opt, value: opt});
        setGraphId(opt);
    };

    return (
        <Dialog
            open={openS}
            // onClose={handleClose}
            fullWidth
            TransitionComponent={Transition}
            maxWidth="md"
            scroll="body"
            keepMounted
            className={styles.modal}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle className={styles.heading} id="scroll-dialog-title">
                <div className={styles.row}>
                    <p className={styles.title}>{t('add_order')}</p>
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
                                <div className={c('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('graphic')}</p>
                                        <SelectController
                                            control={control}
                                            isCreatable
                                            onCreateOption={handleCreate}
                                            required={true}
                                            selectStyle={selectStyle}
                                            name="graphic"
                                            menuPlacement="bottom"
                                            placeholder={t('graphic')}
                                            options={graphList}
                                            styles={styles.input}
                                            error={
                                                errors.graphic?.label?.message
                                            }
                                            message={
                                                errors.graphic?.label?.message
                                            }
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('time_from')}</p>
                                        <InputController
                                            control={control}
                                            name="from_time"
                                            size="small"
                                            defaultValue={''}
                                            type="text"
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
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('starttime')}</p>
                                        {/* 
                                        <InputController
                                            control={control}
                                            name="station_id"
                                            placeholder={t('starttime')}
                                            size="small"
                                            type="text"
                                            disabled
                                        /> */}
                                        <SelectController
                                            control={control}
                                            required={true}
                                            selectStyle={selectStyle}
                                            name="station_id"
                                            menuPlacement="bottom"
                                            placeholder={t('starttime')}
                                            options={stationsList}
                                            styles={styles.input}
                                            error={
                                                errors.station_id?.label
                                                    ?.message
                                            }
                                            message={
                                                errors.station_id?.label
                                                    ?.message
                                            }
                                        />
                                    </div>
                                </div>

                                <div className={c('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('g_num')}</p>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            name="graph_number"
                                            placeholder={t('g_num')}
                                            menuPlacement="top"
                                            selectStyle={selectStyle}
                                            options={optionGarageNumbers}
                                            styles={styles.input}
                                            error={
                                                errors.graph_number?.label
                                                    ?.message
                                            }
                                            message={
                                                errors.graph_number?.label
                                                    ?.message
                                            }
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

                                <div className={c('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('tab_num')}</p>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            name="tab_num"
                                            menuPlacement="top"
                                            selectStyle={selectStyle}
                                            placeholder={t('tab_num')}
                                            options={employeoptions}
                                            styles={styles.input}
                                            error={
                                                errors.tab_num?.label?.message
                                            }
                                            message={
                                                errors.tab_num?.label?.message
                                            }
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
                    <div className="flex__end">
                        <Button
                            className="btn__secondary"
                            onClick={() => {
                                console.log('Reset');

                                setOpenS(false);
                                reset();
                            }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            className="btn__primary"
                            type="submit"
                            disabled={handleSave.isLoading}
                        >
                            {handleSave.isLoading ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                <span>{t('add').toUpperCase()}</span>
                            )}
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default React.memo(SaveOrder);
