import {useDateTimeModel} from '@widgets/TopBarController';
import dayjs from 'dayjs';
import {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {useHistory} from '@api/history/hooks';
import {notifyWarning} from '@shared/helpers/local_notification';
import {useBusListStore, useHistoryDataStore} from '@store/history';

export const useHistoryOperation = () => {
    const {t} = useTranslation();

    const {clearDataStore, selectedBus, setSelectedBus, setHistoryFetched} =
        useHistoryDataStore((state) => state);

    const {busListData} = useBusListStore((state) => state);

    const [date, time] = useDateTimeModel(
        (state) => [state.date, state.time],
        shallow,
    );

    const handleGetBusId = (option: any) => {
        setSelectedBus(option);
    };

    const generate = () => {
        console.log('Generate: ', selectedBus);
        if (Object.keys(selectedBus).length) {
            clearDataStore();
            refetch();
        } else {
            notifyWarning(t('please_select_route'));
        }
    };

    const param = useMemo(() => {
        const historyDate = dayjs(date).format('YYYY-MM-DD') + ' ';
        return {
            bus_id: selectedBus?.value,
            from_time: historyDate + time.from + ':00',
            to_time: historyDate + time.to + ':00',
        };
    }, [busListData, selectedBus, date, time]);

    const {
        refetch,
        isLoading: historyLoading,
        isFetched,
        isFetching,
        error,
    } = useHistory(param);

    useEffect(() => {
        setHistoryFetched(isFetched);
    }, [isFetched]);

    return {
        generate,
        handleGetBusId,
        historyLoading,
        busListData,
        error,
        isFetching,
        selectedBus,
    };
};
