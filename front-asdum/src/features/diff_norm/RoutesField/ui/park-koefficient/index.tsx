import {LoadingButton} from '@mui/lab';
import cx from 'classnames';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {useGetAppliedCoefList} from '@api/diff_norm/hooks';
import {DayRangePicker} from '@components/DayRangePicker';
import MultiSelect from '@components/Select';
import {SvgGenerator} from '@shared/components';
import {useDiffNormStore} from '@store/race_fuel';

import {ReactComponent as resetIcon} from './assets/reset.svg';
import s from './index.module.scss';
import {useApplyCoef} from './libs/useApplyCoef';

const selectStyle = {width: 220};
const parentStyle = {padding: 0};
export const ParkKoefficient = () => {
    const {data} = useGetAppliedCoefList();
    const {applyCoefS, denyCoef, handleApplyCoef, handleDeny} = useApplyCoef();
    const classnames = ['card__wrapper', s.parkKoefficient];
    if (data?.status === 'applied') {
        classnames.push(s.activeCoefficient);
    }

    if (data?.status === 'out_of_date') {
        classnames.push(s.inactiveCoefficient);
    }

    const {t} = useTranslation();
    const [
        date,
        setDate,
        options,
        selectedPark,
        handleChangeKoef,
        selectedOption,
        reset,
    ] = useDiffNormStore(
        (s) => [
            s.coefDateRange,
            s.setCoefDateRange,
            s.koefficientOptions,
            s.selectedPark,
            s.handleChangeKoef,
            s.selectedKoefOption,
            s.reset,
        ],
        shallow,
    );

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    return (
        <div
            style={parentStyle}
            className={cx('card__wrapper', s.parkKoefficient)}
        >
            <div className={classnames.join(' ')}>
                <h2 className={cx('koefficientHeaderTitle')}>
                    {selectedPark.park}
                </h2>
                <div className={cx(s.parkKoefficientItems)}>
                    <DayRangePicker
                        label={'Период'}
                        width={250}
                        placeholder={'Выберите период'}
                        handleRangeSelect={setDate}
                        selectedRange={date}
                    />
                    <div style={selectStyle}>
                        <MultiSelect
                            options={options}
                            value={selectedOption}
                            label={'Список коэффициентов'}
                            placeholder={'Выбрать'}
                            onChange={handleChangeKoef}
                        />
                    </div>
                    <div>
                        <LoadingButton
                            loading={denyCoef.isLoading}
                            className={cx(
                                s.koefficientBtn,
                                s.koefficientResetBtn,
                            )}
                            onClick={handleDeny}
                        >
                            <SvgGenerator Icon={resetIcon} />
                        </LoadingButton>
                    </div>
                    <div>
                        <LoadingButton
                            loading={applyCoefS.isLoading}
                            className={cx(s.koefficientBtn)}
                            type={'submit'}
                            disabled={
                                !(!!date?.from && !!selectedOption?.value)
                            }
                            onClick={handleApplyCoef}
                        >
                            {t('apply')}
                        </LoadingButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
