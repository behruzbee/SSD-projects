import i18next from 'i18next';

import {IReportFilter} from '@src/shared/models/filter_model';

export let reportTypeFilters: IReportFilter[] = [
    {
        name: i18next.t('speedOver_report'),
        label: 'speed_over',
        type: 'speedOver',
        isChecked: false,
    },
    {
        name: i18next.t('idle_report'),
        type: 'idle',
        label: 'idle',
        isChecked: false,
    },
    {
        name: i18next.t('type1_report'),
        label: 'type_1',
        type: 'formTypeOne',
        isChecked: false,
    },
    {
        name: i18next.t('mileage_report'),
        type: 'mileage',
        label: 'mileage',
        isChecked: false,
    },
    {
        name: i18next.t('driverRace_report'),
        type: 'driverRace',
        label: 'driverRace',
        isChecked: false,
    },
    {
        name: i18next.t('parkRace_report'),
        type: 'parkRace',
        label: 'parkRace',
        isChecked: false,
    },
    {
        name: i18next.t('routeRace_report'),
        type: 'routeRace',
        label: 'routeRace',
        isChecked: false,
    },
];

i18next.on('languageChanged', function () {
    reportTypeFilters = [
        {
            name: i18next.t('speedOver_report'),
            label: 'speed_over',
            type: 'speedOver',
            isChecked: false,
        },
        {
            name: i18next.t('idle_report'),
            type: 'idle',
            label: 'idle',
            isChecked: false,
        },
        {
            name: i18next.t('type1_report'),
            label: 'type_1',
            type: 'type1',
            isChecked: false,
        },
        {
            name: i18next.t('mileage_report'),
            type: 'mileage',
            label: 'mileage',
            isChecked: false,
        },
        {
            name: i18next.t('driverRace_report'),
            type: 'driverRace',
            label: 'driverRace',
            isChecked: false,
        },
        {
            name: i18next.t('parkRace_report'),
            type: 'parkRace',
            label: 'parkRace',
            isChecked: false,
        },
        {
            name: i18next.t('routeRace_report'),
            type: 'routeRace',
            label: 'routeRace',
            isChecked: false,
        },
    ];
});
