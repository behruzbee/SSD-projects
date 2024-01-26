import {LoadingButton} from '@mui/lab';
import React from 'react';
import {useTranslation} from 'react-i18next';

import DayPickerComponent from '@components/DayPicker';
import MultiSelect from '@components/Select';
import {TimePicker} from '@components/TimePicker';
import ReactMultiSelect from '@components/windowed-multi-select';
import {
    MultiSelectChangeHandle,
    SelectChangeHandle,
    SelectOptions,
} from '@models/select_options_model';

import s from './index.module.scss';
import {mySelectStyles} from './select-styles';

interface TopBarProps {
    title: string;
    hideSelect?: boolean;
    generate: () => void;
    myDate?: Date;
    selectValue: SelectOptions[];
    setSelectValue?: (payload: any) => void;
    options?: SelectOptions[] | any;
    onchange?: SelectChangeHandle;
    multiOnChange?: MultiSelectChangeHandle;
    isLoading?: boolean;
    generateLoading?: boolean;
    selectPlaceholder?: string;
    disabledDays?: [{from: Date; to: Date}];
    defaultSelectValue?: any;
    filter?: JSX.Element;
    search?: JSX.Element;
    hideTime?: boolean;
    isMulti?: boolean;
    closeMenuOnSelect?: boolean;
    selected?: any[];
    setSelected?: (e: any) => void;
}

const TopBar = ({
    title,
    generate,
    options,
    onchange,
    isLoading,
    generateLoading,
    selectPlaceholder,
    disabledDays,
    hideSelect,
    filter,
    search,
    hideTime,
    isMulti,
    selectValue,
    defaultSelectValue,
    closeMenuOnSelect,
    multiOnChange,
}: TopBarProps) => {
    const {t} = useTranslation();

    return (
        <div className={s.wrapper}>
            <span className={s.title}>{title}</span>

            <div className={s.rightSide}>
                {filter}
                {search}
                <DayPickerComponent
                    className={s.topbarDaypicker}
                    disabledDays={disabledDays}
                />

                {!hideTime ? (
                    <>
                        <TimePicker type={'from'} />
                        <TimePicker type={'to'} />
                    </>
                ) : null}

                {!hideSelect ? (
                    <div className={s.generate}>
                        {isMulti && multiOnChange ? (
                            <ReactMultiSelect
                                options={options}
                                isMulti
                                isAllSelect={!!!options[0]?.options}
                                placeholder={selectPlaceholder}
                                width={350}
                                value={selectValue}
                                onChange={multiOnChange}
                            />
                        ) : (
                            <MultiSelect
                                options={options}
                                isLoading={isLoading}
                                onChange={onchange}
                                closeMenuOnSelect={closeMenuOnSelect}
                                defaultValue={defaultSelectValue || options[0]}
                                placeholder={
                                    selectPlaceholder ?? 'Выберите маршрут'
                                }
                                {...mySelectStyles}
                            />
                        )}

                        <LoadingButton
                            className={s.button}
                            onClick={generate}
                            loading={generateLoading}
                        >
                            {generateLoading ? '' : t('view')}
                        </LoadingButton>
                    </div>
                ) : (
                    <div className={s.generate2}>
                        <LoadingButton
                            className={s.button}
                            onClick={generate}
                            loading={generateLoading}
                        >
                            {generateLoading ? '' : 'Генерировать'}
                        </LoadingButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(TopBar);
