import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {SvgGenerator} from '@components/SvgGenerator';

import {ReactComponent as EyeIcon} from '@images/common/eye-off-fill.svg';

interface IProps<T> {
    loading: boolean;
    data?: T[];
    noDataImg?: React.ReactNode;
    children?: React.ReactNode;
    padding?: number;
    error?: Promise<Error> | unknown;
    title?: string;
    subTitle?: string;
}

const DataLoading = <T,>({
    loading,
    data,
    children,
    title,
    subTitle,
    padding,
    error,
}: IProps<T>) => {
    const {t} = useTranslation();

    if (error) {
        return (
            <div
                className="center__file"
                style={{padding: !padding ? '20px' : `${padding}px`}}
            >
                {t('error_occured')}
            </div>
        );
    }

    if (loading) {
        return (
            <div
                className="center__file"
                style={{padding: !padding ? '20px' : `${padding}px`}}
            >
                <CircularProgress />
            </div>
        );
    }
    return !data?.length || !data ? (
        <div className="center__file">
            <SvgGenerator Icon={EyeIcon} />
            <h4>{title || t('no_data')}</h4>
            <p className="empty-subtitle">{subTitle}</p>
        </div>
    ) : (
        <>{children}</>
    );
};

export default DataLoading;
