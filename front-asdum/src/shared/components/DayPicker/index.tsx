import 'react-day-picker/dist/style.css';

import {useDateTimeModel} from '@widgets/TopBarController';
import cx from 'classnames';
import {ru, uz} from 'date-fns/locale';
import dayjs from 'dayjs';
import React, {FC, useEffect, useMemo} from 'react';
import {DayPicker} from 'react-day-picker';
import OutsideClickHandler from 'react-outside-click-handler';
import shallow from 'zustand/shallow';

import {formatDateInput} from '@shared/helpers/format-date';
import {useLanguageStore} from '@store/language';

import CalendarDateIc from '@images/svgs/CalendarDateIc';

import styles from './index.module.scss';

interface IProps {
    name?: string;
    width?: string | number;
    isLeft?: boolean;
    myDate?: Date;
    setMyDate?: (date: Date) => void;
    disabledDays?: [{from: Date; to: Date}];
    className?: string;
}

const DayPickerComponent: FC<IProps> = ({
    name,
    width,
    isLeft,
    disabledDays,
    myDate,
    className,
    setMyDate,
}) => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = useDateTimeModel(
        (s) => [s.date, s.setDate],
        shallow,
    );
    const locale = useLanguageStore((state) => state.lang.value);

    const toggleDayPicker = () => setOpen((prev) => !prev);

    useEffect(() => {
        myDate && setDate(myDate);
    }, []);

    const dateInputValue = useMemo(
        () => (myDate ? formatDateInput(myDate) : formatDateInput(date)),
        [myDate, date],
    );
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
                        <input
                            className={cx(styles.input, [
                                open && styles.activeInput,
                            ])}
                            value={dateInputValue}
                            onClick={toggleDayPicker}
                            onChange={() => null}
                            name={name}
                            placeholder="Выберите дату"
                        />
                        {open && (
                            <div
                                className={styles.dayPicker}
                                style={isLeft ? {left: 0} : {right: 0}}
                            >
                                <DayPicker
                                    mode="single"
                                    selected={myDate ? myDate : (date as Date)}
                                    onSelect={setMyDate ? setMyDate : setDate}
                                    fromYear={1990}
                                    toYear={dayjs().year() + 200}
                                    disabled={disabledDays}
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

export default React.memo(DayPickerComponent);
