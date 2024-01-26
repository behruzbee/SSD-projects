import {Button, Input} from '@mui/material';
import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import DoubleChevronRight from '@src/images/svgs/DoubleChevronRight';
import PaginationIcon from '@src/images/svgs/PaginationIcon';

import styles from './index.module.scss';

interface IProps {
    totalCount: number;
    currentPage: number;
    disabled?: boolean;
    onChange: (int: number) => void;
}

const MuiPagination: React.FC<IProps> = ({
    totalCount,
    currentPage,
    onChange,
    disabled,
}) => {
    const [localPage, setLocalPage] = useState<number | string>(currentPage);

    let timeoutId: any = useRef<any | null>(null);
    const {t} = useTranslation();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as number | string;
        if ((value !== '' && value < 1) || value > totalCount) {
            return;
        }

        setLocalPage(value);

        if (value) {
            timeoutId = setTimeout(() => {
                onChange(Number(value));
            }, 1000);
        }
    };

    useEffect(() => {
        setLocalPage(currentPage);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentPage]);

    const nextPage = () => {
        if (localPage > totalCount) {
            setLocalPage(totalCount);
            onChange(totalCount);
        } else {
            setLocalPage(Number(localPage) + 1);
            onChange(Number(localPage) + 1);
        }
    };

    const prevPage = () => {
        setLocalPage(Number(localPage) - 1);
        onChange(Number(localPage) - 1);
    };

    return (
        <div className={styles.wrapper}>
            <span className="text">{t('page')}</span>
            <Input
                className={styles.input}
                onFocus={() => {
                    setLocalPage('');
                }}
                onBlur={() => {
                    if (!localPage) {
                        setLocalPage(currentPage);
                    }
                }}
                type="number"
                onChange={handleChange}
                value={localPage}
            />
            <span className="text">
                {t('of')} {totalCount}
            </span>
            <Button
                className={styles.button}
                onClick={prevPage}
                disabled={currentPage == 1}
            >
                <PaginationIcon />
            </Button>
            <Button
                disabled={disabled || totalCount === currentPage}
                className={styles.button}
                onClick={nextPage}
            >
                <DoubleChevronRight />
            </Button>
        </div>
    );
};

export default React.memo(MuiPagination);
