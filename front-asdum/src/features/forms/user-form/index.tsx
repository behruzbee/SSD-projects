import {CircularProgress, Switch} from '@mui/material';
import {AxiosResponse} from 'axios';
import cx from 'classnames';
import React, {FC, useState} from 'react';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {UseMutationResult} from 'react-query';

import DialogWrapper from '@components/DialogWrapper';
import {InputController} from '@components/InputController';
import MultiSelectWithCheckbox from '@components/MultiSelectWithCheckbox';
import PasswordStatus from '@components/PasswordStatus';
import SelectController from '@components/SelectController';
import {ISaveUser, UserModel} from '@models/users_model';
import {useHandleIsAdmin} from '@shared/hooks/useHandleIsAdmin';

import styles from './index.module.scss';
import {useFormFieldLogic} from './model/useFormFieldLogic';

interface UserFormFieldProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    selectedUser: UserModel;
    saveMutation: UseMutationResult<AxiosResponse, unknown, ISaveUser>;
}

export const UserFormField: FC<UserFormFieldProps> = ({
    title,
    isOpen,
    onClose,
    selectedUser,
    saveMutation,
}) => {
    const [showP, setShowP] = useState(false);
    const [showPC, setShowPC] = useState(false);

    const {t} = useTranslation();
    const {isSuperAdmin} = useHandleIsAdmin();

    const {
        control,
        errors,
        onSubmit,
        parkOptions,
        regionOptions,
        roleOptions,
        regionValue,
        isLoading,
        parksLoading,
    } = useFormFieldLogic(selectedUser, saveMutation);

    return (
        <DialogWrapper
            open={isOpen}
            onClose={onClose}
            title={title}
            save={onSubmit}
            width={500}
            isLoading={saveMutation.isLoading}
            isForm
        >
            {isLoading ? (
                <div className="loading">
                    <CircularProgress size={40} />
                </div>
            ) : (
                <div className={styles.block}>
                    <div className="row" style={{alignItems: 'start'}}>
                        <InputController
                            name="fullname"
                            control={control}
                            size="small"
                            label={t('person_name')}
                            message={errors.fullname?.message}
                        />

                        <InputController
                            name="login"
                            control={control}
                            size="small"
                            label={t('login')}
                            message={errors.login?.message}
                        />
                    </div>

                    <InputController
                        name="password"
                        control={control}
                        size="small"
                        type={!showP ? 'password' : 'text'}
                        endAdornment={
                            <PasswordStatus show={showP} setShow={setShowP} />
                        }
                        label={t('password')}
                        message={errors.password?.message}
                    />
                    <InputController
                        name="confirmPassword"
                        type={!showPC ? 'password' : 'text'}
                        control={control}
                        endAdornment={
                            <PasswordStatus show={showPC} setShow={setShowPC} />
                        }
                        size="small"
                        message={errors.confirmPassword?.message}
                        label={t('confirm_password')}
                    />

                    {isSuperAdmin && (
                        <SelectController
                            control={control}
                            name="region"
                            placeholder={t('region')}
                            options={regionOptions}
                            errors={errors.region?.label?.type}
                            message={errors.region?.label?.message}
                        />
                    )}

                    <Controller
                        name="fixed_parks"
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <MultiSelectWithCheckbox
                                onChange={onChange}
                                selected={value ?? []}
                                isLoading={parksLoading}
                                options={parkOptions}
                                label={t('fixed_parks')}
                                // @ts-ignore
                                errorText={errors?.fixed_parks?.message}
                                noOptionsText={
                                    !regionValue
                                        ? 'Выберите регион'
                                        : t('no_options')
                                }
                            />
                        )}
                    />

                    <SelectController
                        control={control}
                        name="role"
                        placeholder={t('role')}
                        options={roleOptions}
                        errors={errors.role?.label?.type}
                        message={errors.role?.label?.message}
                    />

                    <InputController
                        name="remark"
                        control={control}
                        label={t('remark')}
                        multiline
                    />

                    <div className={styles.bottomContainer}>
                        <p className={styles.switchTitle}>{t('status_user')}</p>
                        <div className={styles.switchBlock}>
                            <p className={cx('text_field', styles.activeText)}>
                                {t('active')}
                            </p>
                            <Controller
                                control={control}
                                name="is_activated"
                                render={({field}) => (
                                    <Switch {...field} checked={field.value} />
                                )}
                            />
                        </div>
                    </div>
                </div>
            )}
        </DialogWrapper>
    );
};
