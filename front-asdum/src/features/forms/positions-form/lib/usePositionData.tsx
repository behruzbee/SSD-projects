import {useSelectedModel} from '@widgets/TablePageWrapper';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {isEmptyObject} from '@shared/helpers';
import {usePositionsStore} from '@views/manage/positions/model/store';
import {useColumns} from '@views/manage/positions/model/useColumns';

export const usePositionData = () => {
    const {t} = useTranslation();
    const {positions, selectedPosition} = usePositionsStore(
        (state) => state,
        shallow,
    );
    const isEdit = isEmptyObject(selectedPosition);
    const {columns} = useColumns();
    const {selected} = useSelectedModel();
    const title = isEdit ? t('update_position') : t('add_position');
    const saveLabel = isEdit ? t('update') : t('add');
    const positionText = useMemo(
        () => ({title, saveLabel}),
        [t, selectedPosition],
    );
    return {positions, selected, columns, selectedPosition, positionText};
};
