import {CircularProgress} from '@mui/material';
import c from 'classnames';
import React, {ChangeEvent, useState} from 'react';
import {useTranslation} from 'react-i18next';

import SearchIconGray from '@src/images/svgs/SearchIconGray';

import {SelectOptions} from '@models/select_options_model';

import s from './index.module.scss';

interface IStyle {
    wrapper: string;
    baseSideSearch: string;
    inputSearch: string;
    iconBoxSearch: string;
    sideSearch: string;
    activeSearch: string;
    bottomSideSearch: string;
}
interface IProps<T> {
    value: string;
    handleChange: (e: string) => void;
    handleItem: (item: SelectOptions<T>) => void;
    customItemRender?: (
        item: SelectOptions<T>,
        handleItem: (item: SelectOptions<T>) => void,
    ) => JSX.Element;
    placeholder?: string;
    options: Array<SelectOptions<T>>;
    isLoading?: boolean;
    dropDownVisible?: boolean;
    styles?: Partial<IStyle> | any;
}

export const DropdownSearch = <T,>({
    value,
    handleChange,
    handleItem,
    options,
    isLoading,
    styles,
    placeholder,
    customItemRender,
}: IProps<T>) => {
    const {t} = useTranslation();
    const [visible, setVisible] = useState<boolean>(false);
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const valueStr = e.target.value;
        if (value[0] === ' ') {
            handleChange(valueStr.trim());
        } else {
            handleChange(valueStr);
        }
        if (!visible && value[0] !== ' ') {
            setVisible(true);
        }
    };

    return (
        <div className={c(s.wrapper, [styles && styles?.wrapper])}>
            <div className={c(s.baseSide, [styles && styles?.baseSideSearch])}>
                <div className={s.inputWrapper}>
                    <SearchIconGray />
                    <input
                        value={value}
                        onChange={handleChangeInput}
                        placeholder={placeholder || t('search')}
                        className={s.input}
                        type="search"
                    />
                </div>
            </div>
            {value.length > 0 && visible && (
                <div
                    className={c(s.bottomSide, [
                        styles && styles?.bottomSideSearch,
                    ])}
                >
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
                        options?.map((item, i) => {
                            if (customItemRender) {
                                return customItemRender(item, handleItem);
                            }
                            return (
                                <div
                                    onClick={() => {
                                        setVisible(false);
                                        handleItem(item);
                                        handleChange(item.label);
                                    }}
                                    key={i}
                                    className={c(s.item)}
                                >
                                    <p>
                                        <>{item?.label || item?.value}</>
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};
