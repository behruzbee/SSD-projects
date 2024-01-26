import cx from 'classnames';
import * as FileSaver from 'file-saver';
import React from 'react';
import {useTranslation} from 'react-i18next';
import * as XLSX from 'xlsx';
import shallow from 'zustand/shallow';

import PrintIcon from '@src/images/svgs/PrintIcon';
import CMButton from '@src/shared/components/CMButton';
import {useOrderStore} from '@src/shared/store/order';

import {constants, helper} from '@shared/helpers';

const {FILE_TYPE} = constants;
const {getDayCh} = helper;

export const ExportXLSX = ({fileName}: any) => {
    const {t} = useTranslation();
    const {orders} = useOrderStore((state) => ({...state}), shallow);

    const fileType = FILE_TYPE.type;
    const fileExtension = FILE_TYPE.extension;

    const fData = orders.map((key, i) => ({
        [t('id')]: i + 1,
        [t('time')]: key.from_time + '-' + key.to_time,
        [t('race')]: key.race,
        [t('gos_number')]: key.gos,
        [t('g_num')]: key.tab_number,
        [t('bus_name')]: key.model,
        [t('kpp1')]: key.station,
        [t('tab_name')]: key.tab_num_con,
        [t('days_ch')]: getDayCh(key.even),
        [t('driver_name')]: key.driver_name,
    }));

    const exportToCSV = () => {
        if (orders.length === 0) {
            return;
        } else {
            const ws = XLSX.utils.json_to_sheet(fData);
            const wb = {Sheets: {data: ws}, SheetNames: ['data']};
            const excelBuffer = XLSX.write(wb, {
                bookType: 'xlsx',
                type: 'array',
            });
            const dataN = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(dataN, fileName + fileExtension);
        }
    };

    return (
        <CMButton
            className={cx('f_12', 'btn__gray')}
            icon={<PrintIcon className="f_16" />}
            text={t('print')}
            onClick={exportToCSV}
        />
    );
};
