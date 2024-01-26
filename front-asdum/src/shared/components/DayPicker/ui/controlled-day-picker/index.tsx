import 'react-day-picker/dist/style.css';

import cx from 'classnames';
import {ru, uz} from 'date-fns/locale';
import dayjs from 'dayjs';
import React, {FC, useState} from 'react';
import {DayPicker} from 'react-day-picker';
import {Controller} from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';

import {formatDateInput} from '@shared/helpers/format-date';
import {useLanguageStore} from '@store/language';

import CalendarDateIc from '@images/svgs/CalendarDateIc';

import styles from '../../index.module.scss';

interface IProps {
    name: string;
    width?: string | number;
    isLeft?: boolean;
    defaultValue?: Date;
    control: any;
    errorText: string | undefined;
    setDate?: (date: Date) => void;
    disabledDays?: [{from: Date; to: Date}];
    className?: string;
    register?: any;
}

export const DayPickerController: FC<IProps> = ({
    name,
    width,
    isLeft,
    disabledDays,
    defaultValue,
    className,
    control,
}) => {
    const [open, setOpen] = React.useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [date, setDate] = useState<string | undefined>(
        defaultValue ? formatDateInput(defaultValue) : undefined,
    );
    const locale = useLanguageStore((state) => state.lang.value);

    const toggleDayPicker = () => setOpen((prev) => !prev);

    return (
        <div style={{width}}>
            {/*@ts-ignore*/}
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <div className="datePickBox">
                    <div
                        className={cx(
                            'left__side',
                            [open && styles.active],
                            className,
                        )}
                        onClick={toggleDayPicker}
                    >
                        <CalendarDateIc className={styles.icon} />
                    </div>
                    <div className={cx('right__side', className)}>
                        <Controller
                            name={name}
                            control={control}
                            render={({field}) => {
                                return (
                                    <input
                                        className={cx(styles.input, [
                                            open && styles.activeInput,
                                        ])}
                                        value={formatDateInput(field.value)}
                                        onClick={toggleDayPicker}
                                        name={name}
                                        placeholder="Выберите дату"
                                    />
                                );
                            }}
                        />
                        {open && (
                            <div
                                className={styles.dayPicker}
                                style={isLeft ? {left: 0} : {right: 0}}
                            >
                                <Controller
                                    name={name}
                                    control={control}
                                    defaultValue={formatDateInput(defaultValue)}
                                    render={({field}) => {
                                        setDate(field.value);
                                        return (
                                            <DayPicker
                                                mode="single"
                                                selected={field.value}
                                                onDayClick={(day) => {
                                                    field.onChange(day);

                                                    setDate(
                                                        formatDateInput(day),
                                                    );
                                                }}
                                                fromYear={1990}
                                                toYear={dayjs().year() + 200}
                                                disabled={disabledDays}
                                                captionLayout="dropdown"
                                                locale={
                                                    locale === 'ru' ? ru : uz
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};
