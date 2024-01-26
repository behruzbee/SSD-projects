import {FC, useEffect} from 'react';

import {useMuteHook} from '@shared/hooks/useMuteHook';

interface IAlert {
    children: JSX.Element;
    isPlay: boolean;
    audioSrc: string;
    cb?: () => void;
}
export const AlertWithAlarm: FC<IAlert> = ({
    children,
    isPlay,
    audioSrc,
    cb,
}) => {
    const {isMuted} = useMuteHook();
    const audio = new Audio(audioSrc);
    audio.muted = isMuted;
    useEffect(() => {
        if (isPlay) {
            new Audio(audioSrc);
            cb && cb();
        }
    }, [isPlay]);
    return children;
};
