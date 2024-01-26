import create, {GetState, SetState} from 'zustand';
import {StoreApiWithPersist, persist} from 'zustand/middleware';

import {VERSION} from '@src/shared/constants';

import {IPermit} from './scheme';

interface IAuthState {
    authed: boolean;
    showPassword: boolean;
    userInfo: Partial<IPermit>;
}

interface IAuthActions {
    setUserInfo: (userInfo: IPermit) => void;
    setShowPassword: (payload: boolean) => void;
    loggedIn: (payload: boolean) => void;
    reset: () => void;
}

type IAuthStore = IAuthState & IAuthActions;
const initial: IAuthState = {
    authed: false,
    showPassword: false,
    userInfo: {},
};

export const useAuthStore = create<
    IAuthStore,
    SetState<IAuthStore>,
    GetState<IAuthStore>,
    StoreApiWithPersist<IAuthStore>
>(
    persist(
        (set) => ({
            ...initial,
            setUserInfo: (userInfo: IPermit) => {
                set({
                    userInfo: userInfo,
                });
            },
            setShowPassword: (payload: any): void => {
                set({showPassword: payload});
            },
            loggedIn: (payload: any): void => {
                set({authed: payload});
            },
            reset: () => {
                set({...initial});
            },
        }),
        {
            name: 'auth',
            version: VERSION.V1,
        },
    ),
);
