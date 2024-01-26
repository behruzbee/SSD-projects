import React, {useState} from 'react';
import {RgbaColorPicker} from 'react-colorful';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {usePolygonStore} from '@shared/store/polygon';

import styles from './index.module.scss';

const PolygonColor = () => {
    const [displayColorPicker, setDisplayColorPicker] =
        useState<boolean>(false);
    const handleHide = () => {
        setDisplayColorPicker(false);
    };
    const {color, setColor} = usePolygonStore((state) => ({...state}), shallow);
    const handleClick = () => {
        setDisplayColorPicker(true);
    };
    const {t} = useTranslation();

    return (
        <div className={styles.body}>
            <div className={styles.row}>
                <button className={styles.colorBtn} onClick={handleClick}>
                    {t('choose_color')}
                </button>

                {displayColorPicker ? (
                    <div className={styles.cover}>
                        <div className={styles.popper} onClick={handleHide} />
                        <RgbaColorPicker color={color} onChange={setColor} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default React.memo(PolygonColor);
