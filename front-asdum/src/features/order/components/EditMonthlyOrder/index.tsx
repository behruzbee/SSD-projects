import {yupResolver} from '@hookform/resolvers/yup';
import {
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {default as c, default as cx} from 'classnames';
import React, {useEffect, useMemo} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {useMonthlyGraphic} from '@api/graphic/hooks';
import {
    useMonthlyExchangeD,
    useMonthlyExchangeS,
} from '@api/route_exchange/mutations';
import {DayRangePicker} from '@components/DayRangePicker';
import {InputController} from '@components/InputController';
import SelectController from '@components/SelectController';
import Transition from '@components/Transistion';
import {FormProps} from '@features/schedule/components/Form/schema';
import {RouteExchangeOrder} from '@models/route_exchange_model';
import {helper} from '@shared/helpers';
import {useEmployeeStore} from '@shared/store/employee';
import {useOrderStore} from '@shared/store/order';

import CloseIcon from '@images/svgs/CloseIcon';
import TrashIcon from '@images/svgs/TrashIcon';

import {editJsonObjectMaker} from '../SaveMonthlyOrder/jsonObjectMaker';
import styles from '../SaveOrder/index.module.scss';
import {monthlyOrderScheme} from '../SaveOrder/schema';

const {handleOption} = helper;

export const EditMonthlyOrder = () => {
    const {t} = useTranslation();
    useMonthlyGraphic();
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
    } = useForm<any>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(monthlyOrderScheme),
    });
    const [
        orderGarages,
        routeId,
        selectedMonthlyOrder,
        monthlyGraphNumbers,
        openEditMonthlyM,
        setMOrder,
        editSelectedRange,
        setEditSelectedRange,
        setOpenEditMonthlyM,
    ] = useOrderStore(
        (s) => [
            s.monthlyOrderGarages,
            s.routeId,
            s.selectedMonthlyOrder,
            s.monthlyGraphNumbers,
            s.openEditMonthlyM,
            s.setMOrder,
            s.editSelectedRange,
            s.setEditSelectedRange,
            s.setOpenEditMonthlyM,
        ],
        shallow,
    );
    const monthlyExchS = useMonthlyExchangeS(() => {
        setOpenEditMonthlyM(false);
    });

    const handleDelete = useMonthlyExchangeD(() => {
        setOpenEditMonthlyM(false);
    });
    const {employees} = useEmployeeStore((state) => ({...state}), shallow);
    const optionGarageNumbers = useMemo(
        () => handleOption(orderGarages, 'g', 'id'),
        [orderGarages],
    );
    const employeoptions = useMemo(
        () => handleOption(employees, 'tab_number', 'id'),
        [employees],
    );

    const handleClose = () => {
        reset();
        setOpenEditMonthlyM(false);
    };

    const onSubmit = (data: FormProps) => {
        console.log('PROPS: ', data);
        console.log('SELECTED: ', selectedMonthlyOrder);
        const monthlyArr = [];

        monthlyArr.push(
            editJsonObjectMaker(
                selectedMonthlyOrder,
                routeId,
                'firstDriver',
                data,
                editSelectedRange,
            ),
        );
        monthlyArr.push(
            editJsonObjectMaker(
                selectedMonthlyOrder,
                routeId,
                'secondDriver',
                data,
                editSelectedRange,
            ),
        );

        console.log('UPDATE: ', monthlyArr);

        monthlyExchS.mutate(monthlyArr[0]);
        monthlyExchS.mutate(monthlyArr[1]);
    };

    const tabNumber = useWatch({
        control,
        name: 'tab_num',
    });

    const tabNumber2 = useWatch({
        control,
        name: 'tab_num2',
    });

    const garageNumber = useWatch({
        control,
        name: 'graph_number',
    });

    const objFound: any = orderGarages.find(
        (item) => item.id === garageNumber?.value,
    );

    const graphObj: any = employees.find(
        (item) => item.tab_number == tabNumber?.label,
    );

    const graphObj2: any = employees.find(
        (item) => item.tab_number == tabNumber2?.label,
    );

    useEffect(() => {
        setValue('model', objFound?.model);
        setValue('gos', objFound?.vianum);
    }, [garageNumber]);

    useEffect(() => {
        if (tabNumber) {
            setValue('driver_id', graphObj?.fullname);
        }
    }, [tabNumber]);

    useEffect(() => {
        if (tabNumber2) {
            setValue('driver_id2', graphObj2?.fullname);
        }
    }, [tabNumber2]);

    useEffect(() => {
        if (selectedMonthlyOrder) {
            const garage_num: RouteExchangeOrder | any = orderGarages?.find(
                (item) => item.model === selectedMonthlyOrder.model,
            );

            setValue('graphic', {
                label: selectedMonthlyOrder.graph_id,
                value: selectedMonthlyOrder.graph_id,
            });

            setValue('graph_number', {
                label: selectedMonthlyOrder.garage_number,
                value: garage_num?.id,
            });

            setValue('model', selectedMonthlyOrder.model);
            setValue('gos', selectedMonthlyOrder.gos);

            setValue('tab_num', {
                label: selectedMonthlyOrder.first_tab_number,
                value: employees.filter(
                    (item) =>
                        item.tab_number ==
                        selectedMonthlyOrder.first_tab_number,
                )[0].id,
            });

            setValue('tab_num2', {
                label: selectedMonthlyOrder.second_tab_number,
                value: employees.filter(
                    (item) =>
                        item.tab_number ==
                        selectedMonthlyOrder.second_tab_number,
                )[0].id,
            });
        }

        return () => {
            if (openEditMonthlyM) {
                setMOrder(null);
                setEditSelectedRange({from: undefined, to: undefined});
            }
        };
    }, [openEditMonthlyM, selectedMonthlyOrder]);

    return (
        <Dialog
            open={openEditMonthlyM}
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
                    <p className={styles.title}>{t('edit_monthly_order')}</p>
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
                                            required={true}
                                            name="graphic"
                                            // defaultValue={defGraphSelVal}
                                            placeholder={t('graphic')}
                                            options={monthlyGraphNumbers}
                                            styles={styles.input}
                                            errors={errors.graphic?.type}
                                            message={errors.graphic?.message}
                                        />
                                    </div>
                                    <div className="form__item__order">
                                        <p>{t('interval')}</p>
                                        <DayRangePicker
                                            width={250}
                                            selectedRange={editSelectedRange}
                                            handleRangeSelect={
                                                setEditSelectedRange
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
                                            // defaultValue={defGraphSelVal}
                                            placeholder={t('g_num')}
                                            options={optionGarageNumbers}
                                            styles={styles.input}
                                            errors={errors.graph_number?.type}
                                            message={
                                                errors.graph_number?.message
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
                                            // errors={errors.garage_end_time?.type}
                                            // message={errors.garage_end_time?.message}
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
                                            // errors={errors.garage_end_time?.type}
                                            // message={errors.garage_end_time?.message}
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
                                            // defaultValue={defTabSelVal}
                                            placeholder={t('tab_num')}
                                            options={employeoptions}
                                            styles={styles.input}
                                            errors={errors.tab_num?.type}
                                            message={errors.tab_num?.message}
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
                                            // errors={errors.garage_end_time?.type}
                                            // message={errors.garage_end_time?.message}
                                        />
                                    </div>
                                    <div className="form__item__order">
                                        <p>{t('days_ch')}</p>
                                        <InputController
                                            control={control}
                                            name="day_type"
                                            size="small"
                                            disabled
                                            placeholder={'Чёт'}
                                        />
                                    </div>
                                </div>

                                <div className={c('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('tab_num')} 2</p>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            name="tab_num2"
                                            // defaultValue={defTabSelVal}
                                            placeholder={t('tab_num')}
                                            options={employeoptions}
                                            styles={styles.input}
                                            errors={errors.tab_num2?.type}
                                            message={errors.tab_num2?.message}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('driver_name')} 2</p>

                                        <InputController
                                            control={control}
                                            name="driver_id2"
                                            size="small"
                                            disabled
                                            placeholder={t('driver_name')}
                                            // errors={errors.garage_end_time?.type}
                                            // message={errors.garage_end_time?.message}
                                        />
                                    </div>
                                    <div className="form__item__order">
                                        <p>{t('days_ch')}</p>
                                        <InputController
                                            control={control}
                                            name="day_type2"
                                            size="small"
                                            disabled
                                            placeholder={'Нечёт'}
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
                                setOpenEditMonthlyM(false);
                            }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            className="btn__danger"
                            onClick={() => {
                                handleDelete.mutate({
                                    ex_id: selectedMonthlyOrder?.first_ex_id,
                                });
                                handleDelete.mutate({
                                    ex_id: selectedMonthlyOrder?.second_ex_id,
                                });
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
                            // onClick={() => {
                            //     setOpenS(false);
                            // }}
                            disabled={monthlyExchS.isLoading}
                        >
                            {monthlyExchS.isLoading ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                <span>{t('save').toUpperCase()}</span>
                            )}
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};
