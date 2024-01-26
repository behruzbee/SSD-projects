import React from 'react';
import {useTranslation} from 'react-i18next';

import useExRouteExchange from '@api/route_exchange/hooks';
import useOrderMutation from '@api/route_exchange/mutations';
import useByRoute from '@api/route_exchange/useByRoute';
import DeleteDialog from '@components/SureToDeleteDialog';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import DataLoading from '@shared/hoc/DataLoading';
import {useOrderStore} from '@shared/store/order';

import {OrdersBox} from '../OrdersBox';

const DailyReinforcement = () => {
    useExRouteExchange(false);
    const {isLoading, isFetching, cardDatas} = useByRoute();

    const {t} = useTranslation();
    const {deleteModalOpen, setModalOpen} = useModalManageStore(
        (state) => state,
    );
    const {handleDelete} = useOrderMutation(() =>
        setModalOpen('delete', false),
    );
    const {selectedOrder} = useOrderStore((state) => state);

    return (
        <DataLoading loading={isLoading || isFetching} data={cardDatas}>
            <OrdersBox data={cardDatas} type={'notlog'} />
            <DeleteDialog
                open={deleteModalOpen}
                loading={handleDelete.isLoading}
                deleteTitle={t('delete_raznaryadka')}
                deleteContent={t('sure_to_delete_raznaryadka')}
                close={() => setModalOpen('delete', false)}
                handleDelete={() => handleDelete.mutate(selectedOrder?.ex_id)}
            />
        </DataLoading>
    );
};

export default DailyReinforcement;
