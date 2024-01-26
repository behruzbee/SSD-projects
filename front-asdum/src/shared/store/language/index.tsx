import create, {SetState} from 'zustand';
import {persist} from 'zustand/middleware';

import {VERSION} from '@src/shared/constants';

interface ILanguage {
    lang: any;
    setLang: (payload: any) => void;
}

export const useLanguageStore = create<ILanguage>(
    persist(
        (set: SetState<ILanguage>) => ({
            lang: {
                label: 'Русский',
                value: 'ru',
            },
            setLang: (payload: any) =>
                set((state) => ({...state, lang: payload})),
        }),
        {
            name: 'language',
            version: VERSION.V1,
        },
    ),
);
