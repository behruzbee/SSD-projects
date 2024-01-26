import Button from '@mui/material/Button';
import cx from 'classnames';
import React, {FC} from 'react';

import s from './index.module.scss';

interface IExpandableButton {
    open: boolean;
    onClick: () => void;
}
export const ExpandableButton: FC<IExpandableButton> = ({open, onClick}) => {
    return (
        <div className={cx(s.expandableButton, [open ? s.active : ''])}>
            <Button onClick={onClick} size="small" color="inherit">
                <span>&#9660;</span>
            </Button>
        </div>
    );
};
