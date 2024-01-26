import {useTranslation} from 'react-i18next';

import {notifyWarning} from '@shared/helpers/local_notification';

interface IValidateSelectedFileProps {
    maxFileSize: number;
    setFile: (el: File) => void;
}

export const useValidateSelectedFile = ({
    maxFileSize,
    setFile,
}: IValidateSelectedFileProps) => {
    const {t} = useTranslation();

    const validateSelectedFile = (el: File | null) => {
        if (!el) {
            notifyWarning(t('choose_file'));
            return;
        }

        const fileSizeKiloBytes = el.size / 1024;

        if (fileSizeKiloBytes > maxFileSize * 1024) {
            notifyWarning(t('file_size_limit_exceeded'));
            return;
        }

        setFile(el);
    };

    return {
        validateSelectedFile,
    };
};
