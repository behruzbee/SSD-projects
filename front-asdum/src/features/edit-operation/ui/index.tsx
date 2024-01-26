import {Button, Tooltip} from '@mui/material';
import cx from 'classnames';
import React, {FC} from 'react';

import {SvgGenerator} from '@components/SvgGenerator';

import {ReactComponent as AddIcon} from '../assets/Add icon.svg';
import DeleteIcon from '../assets/DeleteIcon';
import EditIcon from '../assets/EditIcon';
import {IEProps} from '../model/model';
import s from './index.module.scss';

export const EditOperation: FC<IEProps> = ({onClick, tooltipTitle}) => {
    return (
        <Tooltip title={tooltipTitle || ''} placement={'top'}>
            <Button className={cx(s.operation)} onClick={onClick}>
                <SvgGenerator Icon={EditIcon} />
            </Button>
        </Tooltip>
    );
};

export const DeleteOperation: FC<IEProps> = ({onClick, tooltipTitle}) => {
    return (
        <Tooltip title={tooltipTitle || ''} placement={'top'}>
            <Button className={cx(s.operation)} onClick={onClick}>
                <SvgGenerator Icon={DeleteIcon} />
            </Button>
        </Tooltip>
    );
};

export const AddOperation: FC<IEProps> = ({onClick, tooltipTitle}) => {
    return (
        <Tooltip title={tooltipTitle || ''} placement={'top'}>
            <Button className={cx(s.operation)} onClick={onClick}>
                <SvgGenerator Icon={AddIcon} />
            </Button>
        </Tooltip>
    );
};
