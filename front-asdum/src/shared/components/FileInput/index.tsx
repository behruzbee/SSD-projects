import {LoadingButton} from '@mui/lab';
import React, {ChangeEventHandler, useEffect, useRef, useState} from 'react';
import {Control, Controller, Path} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {useValidateSelectedFile} from '@components/FileInput/libs';
import DeleteIcon from '@features/edit-operation/assets/DeleteIcon';
import {SvgGenerator} from '@shared/components';

import {ReactComponent as fileIcon} from './assets/file.svg';
import s from './index.module.scss';

interface IFileInputProps<T> {
    fileTypes?: Array<string>;
    name: Path<T>;
    control: Control<T, Path<T>>;
    fileName?: string | null;
    maxFileSize?: number;
}

export const FileInput = <T,>({
    fileTypes,
    control,
    name,
    fileName,
    maxFileSize = 2,
}: IFileInputProps<T>) => {
    const [file, setFile] = useState<File | null>(null);
    const {validateSelectedFile} = useValidateSelectedFile({
        maxFileSize,
        setFile,
    });
    const {t} = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        validateSelectedFile(file);
    };

    const types = fileTypes ? fileTypes.join(', ') : '';
    const handleClick = () => {
        inputRef?.current?.click();
    };

    const handleDelete = () => {
        setFile(null);
    };
    const selectFile = (
        <div onClick={handleClick} className={s.selectFile}>
            <p>{t('select_file')}</p>
            <p>{t('file_formats')}</p>
        </div>
    );

    const selectedFile = (
        <div className={s.selectedFile}>
            <div className={s.fileInfo}>
                <div>
                    <SvgGenerator
                        style={{width: 30, height: 30}}
                        Icon={fileIcon}
                    />
                </div>
                <div className={s.fileItem}>
                    <p>{file?.name}</p>
                    <p>24.11.2022</p>
                </div>
            </div>
            <LoadingButton onClick={handleDelete}>
                <DeleteIcon />
            </LoadingButton>
        </div>
    );

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({field: {value, onChange, ...field}}) => {
                    useEffect(() => {
                        if (value && fileName) {
                            setFile(new File([], fileName));
                        }
                    }, []);
                    return (
                        <>
                            <input
                                {...field}
                                // value={value?.fileName}
                                accept={types}
                                className={'hidden'}
                                type="file"
                                id={name}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target?.files) {
                                        onChange(e.target.files[0]);
                                    }
                                }}
                                ref={inputRef}
                            />
                            {file ? selectedFile : selectFile}
                        </>
                    );
                }}
            />
        </>
    );
};
