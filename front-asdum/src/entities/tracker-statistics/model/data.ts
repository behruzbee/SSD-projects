import i18next from 'i18next';

export let months: any = [
    {
        label: i18next.t('january'),
        value: 0,
    },
    {
        label: i18next.t('february'),
        value: 1,
    },
    {
        label: i18next.t('march'),
        value: 2,
    },
    {
        label: i18next.t('april'),
        value: 3,
    },
    {
        label: i18next.t('may'),
        value: 4,
    },
    {
        label: i18next.t('june'),
        value: 5,
    },
    {
        label: i18next.t('july'),
        value: 6,
    },
    {
        label: i18next.t('august'),
        value: 7,
    },
    {
        label: i18next.t('september'),
        value: 8,
    },
    {
        label: i18next.t('october'),
        value: 9,
    },
    {
        label: i18next.t('november'),
        value: 10,
    },
    {
        label: i18next.t('december'),
        value: 11,
    },
];

i18next.on('languageChanged', function () {
    months = [
        {
            label: i18next.t('january'),
            value: 0,
        },
        {
            label: i18next.t('february'),
            value: 1,
        },
        {
            label: i18next.t('march'),
            value: 2,
        },
        {
            label: i18next.t('april'),
            value: 3,
        },
        {
            label: i18next.t('may'),
            value: 4,
        },
        {
            label: i18next.t('june'),
            value: 5,
        },
        {
            label: i18next.t('july'),
            value: 6,
        },
        {
            label: i18next.t('august'),
            value: 7,
        },
        {
            label: i18next.t('september'),
            value: 8,
        },
        {
            label: i18next.t('october'),
            value: 9,
        },
        {
            label: i18next.t('november'),
            value: 10,
        },
        {
            label: i18next.t('december'),
            value: 11,
        },
    ];
});
