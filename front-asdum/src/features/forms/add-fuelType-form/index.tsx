import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import cx from 'classnames';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {useFuelTypeMutationS} from '@api/bus_model/mutations';
import {InputController} from '@components/InputController';
import {UpdateVehicleModelProps} from '@features/forms/update-busModel-form/model/schema';

import CloseIcon from '@images/svgs/CloseIcon';

import styles from './index.module.scss';
import {useAddFuelForm} from './lib/useAddFuelForm';
import {AddFuelProps} from './model/fuel-type.model';

const AddFuelType: FC<AddFuelProps> = ({setModal, modalOpen}) => {
    const {t} = useTranslation();

    const fuelTypeMutateS = useFuelTypeMutationS();

    const onSubmit = (data: UpdateVehicleModelProps) => {
        setTimeout(() => {
            fuelTypeMutateS.mutate({
                nameUz: data?.name,
                nameRu: data?.name,
                nameEn: data?.name,
                remark: data?.remark,
                code: data?.name,
            });
        }, 100);
    };

    const {errors, handleSubmit, control, handleClose} = useAddFuelForm(
        fuelTypeMutateS,
        setModal,
    );

    return (
        <>
            {modalOpen && (
                <Dialog
                    open={modalOpen}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                    scroll="paper"
                    keepMounted
                    className={styles.modal}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle
                        className={styles.heading}
                        id="scroll-dialog-title"
                    >
                        <div className="row">
                            <p className={styles.title}>{t('add_fuel_type')}</p>
                            <div className="flex__end">
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </div>
                    </DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent
                            className={styles.content}
                            dividers={true}
                        >
                            <div className={styles.contentBlock}>
                                <div className={styles.block}>
                                    <div className={styles.subBlock}>
                                        <InputController
                                            control={control}
                                            name="name"
                                            placeholder={t('name')}
                                            size="small"
                                            label={t('name')}
                                            type="text"
                                            styles={styles.input}
                                            errors={errors.name?.type}
                                            message={errors.name?.message}
                                        />

                                        <InputController
                                            control={control}
                                            name="remark"
                                            placeholder={t('description')}
                                            size="small"
                                            label={t('description')}
                                            type="text"
                                            styles={styles.input}
                                            message={errors.remark?.message}
                                            errors={errors.remark?.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                className="btn__secondary"
                                onClick={handleClose}
                            >
                                {t('cancel')}
                            </Button>
                            <Button
                                variant="contained"
                                className={cx('btn__primary', styles?.formBtn, [
                                    fuelTypeMutateS.isLoading
                                        ? 'btn__disabled'
                                        : '',
                                ])}
                                type="submit"
                                fullWidth={false}
                                disabled={fuelTypeMutateS.isLoading}
                            >
                                {t('save')}
                                {fuelTypeMutateS.isLoading && (
                                    <CircularProgress size={15} />
                                )}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            )}
        </>
    );
};

export default React.memo(AddFuelType);