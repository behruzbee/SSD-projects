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
import c from 'classnames';
import React, {useEffect, useMemo} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {useMonthlyGraphic} from '@api/graphic/hooks';
import {useMonthlyExchangeS} from '@api/route_exchange/mutations';
import {InputController} from '@components/InputController';
import SelectController from '@components/SelectController';
import Transition from '@components/Transistion';
import {FormProps} from '@features/schedule/components/Form/schema';
import {helper} from '@shared/helpers';
import {useEmployeeStore} from '@shared/store/employee';
import {useOrderStore} from '@shared/store/order';

import CloseIcon from '@images/svgs/CloseIcon';

import styles from '../SaveOrder/index.module.scss';
import {monthlyOrderScheme} from '../SaveOrder/schema';
import {jsonObjectMaker} from './jsonObjectMaker';

const {handleOption} = helper;
const selectStyle = {inpadding: '5px'};
export const SaveMonthlyOrder = () => {
    console.log('Save Monthly order');

    const {t} = useTranslation();
    useMonthlyGraphic();
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
    } = useForm({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(monthlyOrderScheme),
    });
    const [
        orderGarages,
        routeId,
        selectedRange,
        monthlyGraphNumbers,
        openMonthlyM,
        setOpenMonthlyM,
    ] = useOrderStore(
        (s) => [
            s.monthlyOrderGarages,
            s.routeId,
            s.selectedRange,
            s.monthlyGraphNumbers,
            s.openMonthlyM,
            s.setOpenMonthlyM,
        ],
        shallow,
    );
    const monthlyExchS = useMonthlyExchangeS(() => {
        setOpenMonthlyM(false);
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
        setOpenMonthlyM(false);
    };

    const onSubmit = (data: FormProps) => {
        const monthlyArr = [];
        monthlyArr.push(
            jsonObjectMaker(data, routeId, selectedRange, 'firstDriver'),
        );
        monthlyArr.push(
            jsonObjectMaker(data, routeId, selectedRange, 'secondDriver'),
        );
        monthlyExchS.mutate(monthlyArr[0]);
        monthlyExchS.mutate(monthlyArr[1]);
    };

    const graphNumber = useWatch({
        control,
        name: 'graph_number',
    });

    const tabNumber = useWatch({
        control,
        name: 'tab_num',
    });

    const tabNumber2 = useWatch({
        control,
        name: 'tab_num2',
    });

    const objFound: any = orderGarages.find(
        (item) => item.id === graphNumber?.value,
    );

    const graphObj: any = employees.find(
        (item) => item.id === tabNumber?.value,
    );

    const graphObj2: any = employees.find(
        (item) => item.id === tabNumber2?.value,
    );

    useEffect(() => {
        setValue('model', objFound?.model);
        setValue('gos', objFound?.vianum);
    }, [graphNumber]);

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

    console.log('ERR: ', errors);

    return (
        <Dialog
            open={openMonthlyM}
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
                    <p className={styles.title}>{t('add_monthly_order')}</p>
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
                                            menuPlacement={'bottom'}
                                            required={true}
                                            name="graphic"
                                            // defaultValue={defGraphSelVal}
                                            placeholder={t('graphic')}
                                            options={monthlyGraphNumbers}
                                            defaultValue={''}
                                            selectStyle={selectStyle}
                                            styles={styles.input}
                                            errors={errors.graphic?.type}
                                            message={errors.graphic?.message}
                                        />
                                    </div>
                                </div>

                                <div className={c('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('g_num')}</p>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            selectStyle={selectStyle}
                                            name="graph_number"
                                            // defaultValue={defGraphSelVal}
                                            placeholder={t('g_num')}
                                            options={optionGarageNumbers}
                                            defaultValue={''}
                                            menuPlacement={'bottom'}
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
                                            menuPlacement={'top'}
                                            selectStyle={selectStyle}
                                            placeholder={t('tab_num')}
                                            options={employeoptions}
                                            defaultValue={''}
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
                                            menuPlacement={'top'}
                                            selectStyle={selectStyle}
                                            placeholder={t('tab_num')}
                                            options={employeoptions}
                                            defaultValue={''}
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
                                        />
                                    </div>
                                    <div className="form__item__order">
                                        <p>{t('days_ch')}</p>
                                        <InputController
                                            control={control}
                                            name="day_type"
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
                    <div className="flex__end">
                        <Button
                            className="btn__secondary"
                            onClick={() => {
                                setOpenMonthlyM(false);
                                reset();
                            }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            className="btn__primary"
                            type="submit"
                            disabled={monthlyExchS.isLoading}
                        >
                            {monthlyExchS.isLoading ? (
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
