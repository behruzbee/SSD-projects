import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {isEmptyObject} from '@shared/helpers';
import {useDiffNormStore} from '@store/race_fuel';

export const useKoefFormData = () => {
    const {t} = useTranslation();
    const {selectedKoef} = useDiffNormStore((state) => state, shallow);
    const isEdit = isEmptyObject(selectedKoef);
    const title = isEdit ? t('update_koef') : t('add_koef');
    const saveLabel = isEdit ? t('update') : t('add');
    const koefText = useMemo(() => ({title, saveLabel}), [t, selectedKoef]);
    const statusOptions = useMemo(
        () => [
            {label: t('active_main'), value: 1},
            {label: t('inactive'), value: 0},
        ],
        [t],
    );
    return {koefText, statusOptions};
};
