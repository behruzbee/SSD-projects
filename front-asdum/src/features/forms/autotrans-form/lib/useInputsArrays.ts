import {useMemo} from 'react';
import {Path} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {SelectOptions} from '@models/select_options_model';

import {AutoTransFormData, NoSelectAutoTransFormData} from './schema';

type S = SelectOptions<number>[];

interface IUseInputsArray {
    label: string;
    name: Path<AutoTransFormData>;
    options?: S;
    isLeft?: boolean;
}

interface IInputsOnly {
    label: string;
    name: Path<NoSelectAutoTransFormData>;
}

export const useInputsArrays = (
    parkOptions: S,
    busModelOptions: S,
    regionOptions: S,
    isSuperAdmin: boolean,
) => {
    const {t} = useTranslation();

    return useMemo(() => {
        const selectsArray: IUseInputsArray[] = [
            {label: t('region'), name: 'region', options: regionOptions},
            {label: t('parkId'), name: 'park_id', options: parkOptions},
            {
                label: t('model_id'),
                name: 'bus_model_id',
                options: busModelOptions,
            },
        ];

        const inputsArray: IInputsOnly[] = [
            {label: t('garage_number'), name: 'park_no'},
            {label: t('gos_number'), name: 'gos'},
            {label: t('tracker_imei'), name: 'tracker_id'},
            {label: t('sim_number'), name: 'sim_number'},
            {label: t('insurance_number'), name: 'insurance_number'},
        ];

        return {
            selectsArray: isSuperAdmin
                ? selectsArray
                : selectsArray.filter((v) => v.name !== 'region'),
            inputsArray,
        };
    }, [t, regionOptions, parkOptions, busModelOptions]);
};
