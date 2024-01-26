import {LoadingButton} from '@mui/lab';
import React from 'react';
import {useTranslation} from 'react-i18next';

import BaseButton from '@components/BaseButton';
import DayPickerComponent from '@components/DayPicker';
import SearchPage from '@components/SearchPage';
import {TimePicker} from '@components/TimePicker';
import s from '@shared/components/CustomTopBar/index.module.scss';
import {trimmer} from '@shared/helpers/trimmer';
import {useMainStore} from '@store/main';

import AddPrimaryIcon from '@images/svgs/AddPrimaryIcon';

export interface IConfigProps {
    withSearch?: boolean;
    withAddBtn?: boolean;
    withDayPicker?: boolean;
    withTimePicker?: boolean;
    withGenerateBtn?: boolean;
}

interface ITopBarProps {
    title: string;
    searchTerm?: string;
    searchPlaceholder?: string;
    addLabel?: string;
    generateButtonLabel?: string;
    disabledDays?: [{from: Date; to: Date}];
    setSearchTerm?: (value: string) => void;
    onAdd?: () => void;
    onGenerate?: () => void;
    isLoading?: boolean;
    generateDisabled?: boolean;
    configs?: IConfigProps;
    components?: React.ReactElement[];
}

const CustomTopBar = ({
    title,
    disabledDays,
    setSearchTerm,
    searchTerm,
    searchPlaceholder,
    onAdd,
    addLabel,
    components,
    onGenerate,
    generateButtonLabel,
    isLoading,
    generateDisabled = false,
    configs = {
        withSearch: false,
        withAddBtn: false,
        withDayPicker: false,
        withTimePicker: false,
        withGenerateBtn: false,
    },
}: ITopBarProps) => {
    const {t} = useTranslation();

    const {
        withDayPicker,
        withSearch,
        withAddBtn,
        withTimePicker,
        withGenerateBtn,
    } = configs;

    const [handleTap] = useMainStore((s) => [s.handleTap]);

    return (
        <div className={s.wrapper}>
            <span className={s.title}>{title}</span>

            <div className={s.rightSide}>
                {withDayPicker && (
                    <DayPickerComponent
                        className={s.topbarDaypicker}
                        disabledDays={disabledDays}
                    />
                )}

                {withTimePicker && (
                    <div style={{display: 'flex', gap: 12}}>
                        <TimePicker type={'from'} />
                        <TimePicker type={'to'} />
                    </div>
                )}

                {withSearch && (
                    <SearchPage
                        handleTextChange={(e) =>
                            setSearchTerm &&
                            setSearchTerm(trimmer(e.target.value))
                        }
                        text={searchTerm}
                        placeholder={searchPlaceholder ?? t('search')}
                    />
                )}
                {components?.map((component, index) => (
                    <div key={index}>{component}</div>
                ))}

                {withAddBtn && (
                    <BaseButton onClick={onAdd ? onAdd : () => handleTap(true)}>
                        <AddPrimaryIcon />
                        {addLabel ? addLabel : t('add')}
                    </BaseButton>
                )}

                {withGenerateBtn && (
                    <div className={s.generate}>
                        <LoadingButton
                            disabled={generateDisabled}
                            onClick={onGenerate}
                            loading={isLoading}
                            className={s.button}
                        >
                            {isLoading ? '' : generateButtonLabel}
                        </LoadingButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(CustomTopBar);
