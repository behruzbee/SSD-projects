import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosResponse} from 'axios';
import {useEffect, useMemo, useState} from 'react';
import {Path, useForm, useWatch} from 'react-hook-form';
import {UseMutationResult} from 'react-query';

import {userParkHook} from '@api/access_rights/userParkHook';
import usePark from '@api/park/useParkQuery';
import {useRegionParksQuery} from '@api/park/useRegionParksQuery';
import useRegion from '@api/region/hooks';
import useRoles from '@api/role/hooks';
import {ISaveUser, UserModel} from '@models/users_model';
import {handleOption} from '@shared/helpers/helpers';
import {useHandleIsAdmin} from '@shared/hooks/useHandleIsAdmin';
import {useAuthStore} from '@shared/store/auth';

import {UsersFormData, usersSchema} from '../lib/schema';

export const useFormFieldLogic = (
    selectedUser: UserModel,
    saveMutation: UseMutationResult<AxiosResponse, unknown, ISaveUser>,
) => {
    const [userFormValues, setUserFormValues] = useState<UsersFormData | null>(
        null,
    );

    const {isSuperAdmin} = useHandleIsAdmin();
    const userInfo = useAuthStore((s) => s.userInfo);

    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<UsersFormData, Path<UsersFormData>>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(usersSchema(!!selectedUser?.col1, isSuperAdmin)),
        defaultValues: {is_activated: true},
    });
    const regionValue = useWatch({control, name: 'region'});

    const regionQuery = useRegion();
    const rolesQuery = useRoles();
    const userParksQuery = userParkHook(selectedUser?.id);
    const userRegionParksQuery = useRegionParksQuery(selectedUser?.region?.id);
    const parksQuery = usePark();
    const regionParksQuery = useRegionParksQuery(
        regionValue?.value || userInfo.region?.id || NaN,
    );

    const userRegionParkOptions = useMemo(
        () => handleOption(userRegionParksQuery.data ?? []),
        [userRegionParksQuery.data],
    );
    const parkOptions = useMemo(
        () => handleOption(regionParksQuery.data ?? []),
        [regionParksQuery.data],
    );

    const adminParks = useMemo(
        () => handleOption(parksQuery.data?.list ?? [], 'park', 'park_id'),
        [parksQuery.data],
    );
    const roleOptions = useMemo(
        () => handleOption(rolesQuery.data ?? []),
        [rolesQuery.data],
    );
    const regionOptions = useMemo(
        () => handleOption(regionQuery.data ?? []),
        [regionQuery.data],
    );

    useEffect(() => {
        if (
            selectedUser?.col1 &&
            roleOptions.length &&
            userRegionParkOptions.length &&
            userParksQuery.data &&
            !userFormValues?.fixed_parks?.length
        ) {
            setUserFormValues({
                ...selectedUser,
                role: roleOptions?.find(
                    (el) => el.value === selectedUser.role.id,
                ),
                region: regionOptions?.find(
                    (el) => el.value === selectedUser.region.id,
                ),
                fixed_parks: userRegionParkOptions?.filter((el) =>
                    userParksQuery.data?.some((v) => v.id === el.value),
                ),
            });
        }
    }, [
        selectedUser,
        regionOptions,
        userRegionParkOptions,
        roleOptions,
        userParksQuery.data,
    ]);

    useEffect(() => {
        regionValue?.value &&
            regionValue?.value !== selectedUser?.region?.id &&
            setValue('fixed_parks', []);
    }, [regionValue, selectedUser]);

    useEffect(() => {
        userFormValues &&
            Object.keys(userFormValues).forEach((key: keyof UsersFormData) => {
                setValue(key, userFormValues?.[key]);
            });
    }, [userFormValues]);

    const onSubmit = handleSubmit((data) => {
        const saveData: ISaveUser = {
            id: selectedUser?.id ?? null,
            fullname: data.fullname,
            isActivated: data.is_activated,
            login: data.login,
            parkList: data.fixed_parks?.map((v) => v.value) as number[],
            password: data.password || null,
            regionId: (data.region?.value ?? userInfo.region?.id) as number,
            roleId: data.role?.value as number,
            remark: data.remark,
        };

        saveMutation.mutate(saveData);
    });

    const isLoading =
        userRegionParksQuery.isLoading ||
        regionQuery.isLoading ||
        rolesQuery.isLoading;

    return {
        control,
        errors,
        onSubmit,
        parkOptions: isSuperAdmin ? parkOptions : adminParks,
        regionOptions,
        roleOptions,
        regionValue: regionValue?.value,
        isLoading,
        parksLoading: regionParksQuery.isLoading || userParksQuery.isLoading,
    };
};
