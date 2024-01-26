import i18next from 'i18next';

import {IFilter} from '@src/shared/models/filter_model';

export let filters: IFilter[] = [
    {
        name: i18next.t('tracker_id'),
        label: 'track_id',
        type: 0,
        isChecked: false,
    },
    {
        name: i18next.t('park'),
        type: 1,
        label: 'park_name',
        isChecked: false,
    },
    {
        name: i18next.t('gos_number'),
        label: 'gos',
        type: 2,
        isChecked: false,
    },
    {
        name: i18next.t('model_autotransports'),
        type: 3,
        label: 'model',
        isChecked: false,
    },
];

i18next.on('languageChanged', function () {
    filters = [
        {
            name: i18next.t('tracker_id'),
            label: 'track_id',
            type: 0,
            isChecked: false,
        },
        {
            name: i18next.t('park'),
            type: 1,
            label: 'park_name',
            isChecked: false,
        },
        {
            name: i18next.t('gos_number'),
            label: 'gos',
            type: 2,
            isChecked: false,
        },
        {
            name: i18next.t('model_autotransports'),
            type: 3,
            label: 'model',
            isChecked: false,
        },
    ];
});
