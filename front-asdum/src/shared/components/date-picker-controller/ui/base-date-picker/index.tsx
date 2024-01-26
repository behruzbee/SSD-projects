import {useDateTimeModel} from '@widgets/TopBarController';
import cx from 'classnames';
import {ru, uz} from 'date-fns/locale';
import dayjs from 'dayjs';
import React, {useEffect} from 'react';
import {DateRange, DayPicker, SelectRangeEventHandler} from 'react-day-picker';
import OutsideClickHandler from 'react-outside-click-handler';
import shallow from 'zustand/shallow';

import styles from '@components/DayPicker/index.module.scss';
import {useLanguageStore} from '@store/language';

interface DateProps {
    myDate?: Date;
    name: string;
    handleRangeSelect: SelectRangeEventHandler;
    selectedRange: DateRange | undefined;
    message: string | undefined;
    placeholder?: string;
}

export const BaseDatePicker = ({
    myDate,
    selectedRange,
    handleRangeSelect,
    message,
    placeholder,
    ...field
}: DateProps) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [setDate] = useDateTimeModel((s) => [s.setDate], shallow);
    const locale = useLanguageStore((state) => state.lang.value);

    const toggleDayPicker = () => setOpen((prev) => !prev);

    useEffect(() => {
        myDate && setDate(myDate);
    }, []);
    return (
        <div>
            {/*@ts-ignore*/}
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <div className="baseDatePick">
                    <div className={cx('base__rightSide')}>
                        <input
                            className={cx('baseDatePickInput', [
                                message ? 'datePickerError' : '',
                            ])}
                            {...field}
                            onChange={() => true}
                            onClick={toggleDayPicker}
                            placeholder={placeholder || 'Выберите дату'}
                        />

                        {open && (
                            <div className={styles.dayPicker}>
                                <DayPicker
                                    mode="range"
                                    selected={selectedRange}
                                    onSelect={handleRangeSelect}
                                    fromYear={1990}
                                    toYear={dayjs().year() + 200}
                                    // disabled={disabledDays}
                                    captionLayout="dropdown"
                                    locale={locale === 'ru' ? ru : uz}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};
