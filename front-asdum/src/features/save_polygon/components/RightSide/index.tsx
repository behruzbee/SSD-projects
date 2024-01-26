import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import React, {useState} from 'react';
import {RgbaColorPicker} from 'react-colorful';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import ExitCloseIcon from '@src/images/svgs/ExitCloseIcon';
import usePolygonMutate from '@src/shared/api/polygon/mutation';
import {usePolygonStore} from '@src/shared/store/polygon';

import styles from './index.module.scss';

const RightSide = () => {
    const {t} = useTranslation();
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const {setOpenSide, fillColor, color, setColor, polygon} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );
    const {handleSave} = usePolygonMutate();

    const handleClose = () => {
        setOpenSide(false);
    };

    const handleHide = () => {
        setDisplayColorPicker(false);
    };

    const handleClick = () => {
        setDisplayColorPicker(true);
    };

    const handleSavePolygon = () => {
        console.log(fillColor, polygon, 'fill color');
        handleSave.mutate({
            id: null,
            color: fillColor,
            coordinates: polygon.map((coordinate: any) => ({
                lat: coordinate[0],
                lng: coordinate[1],
            })),
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.topSide}>
                <div className={styles.header}>
                    <h3>{t('add_polygon')}</h3>
                    <IconButton onClick={handleClose}>
                        <ExitCloseIcon />
                    </IconButton>
                </div>
                <div className={styles.body}>
                    <div className={styles.row}>
                        <p>{t('color')}</p>
                        <Button className="btn__primary" onClick={handleClick}>
                            {t('choose_color')}
                        </Button>

                        {displayColorPicker ? (
                            <div className={styles.cover}>
                                <div
                                    className={styles.popper}
                                    onClick={handleHide}
                                />
                                <RgbaColorPicker
                                    color={color}
                                    onChange={setColor}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className={styles.bottomSide}>
                <Button
                    fullWidth
                    onClick={handleSavePolygon}
                    disabled={handleSave.isLoading}
                    className="btn__primary"
                >
                    {handleSave.isLoading ? (
                        <CircularProgress color="inherit" size={25} />
                    ) : (
                        t('save')
                    )}
                </Button>
            </div>
        </div>
    );
};

export default RightSide;
