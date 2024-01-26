import FilterAlt from '@mui/icons-material/FilterAlt';
import {Checkbox, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {IFilter} from '@models/filter_model';

import BaseButton from '../BaseButton';
import styles from './index.module.scss';

interface IProps {
    filters?: IFilter[];
    setFilters?: any;
    multiple?: boolean;
    handleChangeFilter?: (e: any) => void;
}

const Filter = ({
    filters,
    setFilters,
    multiple = false,
    handleChangeFilter,
}: IProps) => {
    const [openPop, setOpenPop] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(openPop);

    const {t} = useTranslation();

    const handlePopoverClose = () => {
        setOpenPop(null);
    };

    const handlePop = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPop(event.currentTarget);
    };

    const handleChecked = (e: any, filter: IFilter) => {
        const {checked}: {checked: boolean} = e.target;
        handleChangeFilter ? handleChangeFilter(filter) : null;
        setFilters(checked, filter);
    };

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const filter = filters?.find((f) => f.label === event.target.value);
        const filterChecked = filters?.find((f) => f.isChecked);
        const checked = filters?.some((item) => item.isChecked);
        handleChangeFilter ? handleChangeFilter(filter) : null;

        if (checked) {
            await setFilters(false, filterChecked);
            await setFilters(true, filter);
        } else {
            setFilters(true, filter);
        }
    };

    const value = filters
        ?.filter((filter) => filter.isChecked)
        .map((filter) => filter.label);

    return (
        <div className={styles.wrapper}>
            <div className={styles.chipContainer}>
                {filters?.map((filter) => {
                    if (filter.isChecked) {
                        return (
                            <Chip
                                key={filter.name}
                                label={filter.name}
                                onDelete={() =>
                                    handleChecked(
                                        {
                                            target: {checked: false},
                                        },
                                        filter,
                                    )
                                }
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>

            <BaseButton onClick={handlePop}>
                <FilterAlt />
                {t('filter')}
            </BaseButton>

            <Popover
                id="filter-popover"
                open={open}
                anchorEl={openPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
            >
                <div className={styles.content}>
                    {multiple ? (
                        filters?.map((filter) => {
                            return (
                                <div
                                    className={styles.wrapItem}
                                    key={filter.name}
                                >
                                    <Checkbox
                                        checked={filter.isChecked}
                                        onClick={(e) =>
                                            handleChecked(e, filter)
                                        }
                                    />
                                    <p className={styles.name}>{filter.name}</p>
                                </div>
                            );
                        })
                    ) : (
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            {filters?.map((filter) => {
                                return (
                                    <FormControlLabel
                                        key={filter.name}
                                        value={filter.label}
                                        control={<Radio />}
                                        label={filter.name}
                                    />
                                );
                            })}
                        </RadioGroup>
                    )}
                </div>
            </Popover>
        </div>
    );
};

export default React.memo(Filter);
