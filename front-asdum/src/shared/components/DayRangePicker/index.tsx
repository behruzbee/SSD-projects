import cx from 'classnames';
import {format} from 'date-fns';
import {ru, uz} from 'date-fns/locale';
import dayjs from 'dayjs';
import React, {FC} from 'react';
import {DateRange, DayPicker, SelectRangeEventHandler} from 'react-day-picker';
import OutsideClickHandler from 'react-outside-click-handler';

import {useLanguageStore} from '@shared/store/language';

import CalendarDateIc from '@images/svgs/CalendarDateIc';

import styles from '../DayPicker/index.module.scss';
import s from './index.module.scss';

interface IDayRangePickerProps {
    width?: number | string;
    handleRangeSelect: SelectRangeEventHandler;
    selectedRange: DateRange | undefined;
    name?: string;
    isLeft?: boolean;
    placeholder?: string;
    label?: string;
}

export const DayRangePicker: FC<IDayRangePickerProps> = ({
    isLeft,
    name,
    width,
    selectedRange,
    handleRangeSelect,
    placeholder,
    label,
}) => {
    const [open, setOpen] = React.useState(false);
    const locale = useLanguageStore((state) => state.lang.value);

    const toggleDayPicker = () => setOpen((prev) => !prev);
    return (
        <div style={{width}}>
            {/*@ts-ignore*/}
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <div className={s.dayPickerContainer}>
                    {label && <span className={s.dayPickerLabel}>{label}</span>}
                    <div className="datePickBox">
                        <div
                            className={cx('left__side', [
                                open && styles.active,
                            ])}
                            onClick={toggleDayPicker}
                        >
                            <CalendarDateIc className={styles.icon} />
                        </div>
                        <div className={cx('right__side')}>
                            <input
                                className={cx(styles.input, [
                                    open && styles.activeInput,
                                ])}
                                value={
                                    selectedRange?.from && selectedRange.to
                                        ? `${format(
                                              selectedRange?.from,
                                              'dd.MM.y',
                                          )} - ${format(
                                              selectedRange?.to,
                                              'dd.MM.y',
                                          )}`
                                        : ''
                                }
                                onClick={toggleDayPicker}
                                onChange={() => null}
                                name={name}
                                placeholder={
                                    placeholder || 'Выберите промежуток'
                                }
                            />
                            {open && (
                                <div
                                    className={styles.dayPicker}
                                    style={
                                        isLeft
                                            ? {left: 0}
                                            : {
                                                  right: 0,
                                              }
                                    }
                                >
                                    <DayPicker
                                        mode="range"
                                        selected={selectedRange}
                                        onSelect={handleRangeSelect}
                                        fromYear={1990}
                                        toYear={dayjs().year() + 200}
                                        // disabled={disabledDays}
                                        captionLayout="dropdown"
                                        locale={locale === 'ru' ? ru : uz}
                                        modifiersClassNames={{
                                            selected: s.selected,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};
