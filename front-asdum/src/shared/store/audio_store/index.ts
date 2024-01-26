import create, {GetState, SetState} from 'zustand';
import {StoreApiWithPersist, persist} from 'zustand/middleware';

import {VERSION} from '@shared/constants';

interface IAudioStoreProps {
    isMuted: boolean;
    setIsMuted: (payload: boolean) => void;
}

export const useAudioStore = create<
    IAudioStoreProps,
    SetState<IAudioStoreProps>,
    GetState<IAudioStoreProps>,
    StoreApiWithPersist<IAudioStoreProps>
>(
    persist(
        (set) => ({
            isMuted: true,
            setIsMuted: (payload) => {
                set({isMuted: payload});
            },
        }),
        {
            name: 'audioMuting',
            version: VERSION.V1,
        },
    ),
);
