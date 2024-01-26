import {CircularProgress} from '@mui/material';
import c from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import SearchIconGray from '@src/images/svgs/SearchIconGray';

import s from './index.module.scss';

interface IProps {
    activeSide: number;
    value: string;
    handleChange: (e: any) => void;
    handleActive: (value: number) => void;
    handleItem: (item: any) => void;
    options: any;
    isLoading: boolean;
    firstText: string;
    secondText: string;
    visible?: boolean;
}

const SearchComponent = ({
    value,
    handleChange,
    handleItem,
    options,
    isLoading,
    visible = true,
}: IProps) => {
    const {t} = useTranslation();

    return (
        <div className={c(s.wrapper)}>
            <div className={c(s.baseSide)}>
                <div className={s.inputWrapper}>
                    <SearchIconGray />
                    <input
                        value={value}
                        onChange={handleChange}
                        placeholder={t('search')}
                        className={s.input}
                        type="search"
                    />
                </div>
            </div>
            {value.length > 0 && visible && (
                <div className={c(s.bottomSide)}>
                    {isLoading ? (
                        <div className={c('center__file', s.loading)}>
                            <CircularProgress size={20} />
                        </div>
                    ) : options?.length === 0 || !options ? (
                        <div className="center">
                            <p className={s.noResult}>{t('no_data')}</p>
                        </div>
                    ) : (
                        options?.length > 0 &&
                        options?.map((item: any) => {
                            return (
                                <div
                                    onClick={() => handleItem(item)}
                                    key={item.id}
                                    className={c(s.item)}
                                >
                                    <p>{item?.label || item?.name}</p>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
