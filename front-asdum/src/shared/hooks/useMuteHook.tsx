import {useAudioStore} from '@shared/store/audio_store';

export const useMuteHook = () => {
    const {isMuted, setIsMuted} = useAudioStore((state) => state);

    const enableMute = () => {
        setIsMuted(true);
    };

    const disableMute = () => {
        setIsMuted(false);
    };
    return {enableMute, disableMute, isMuted};
};
