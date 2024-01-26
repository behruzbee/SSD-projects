import Button from '@mui/material/Button';
import React, {ReactNode} from 'react';

import Container from '../container';
import styles from './index.module.scss';

interface IProps {
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

const BaseButton = ({children, onClick, disabled}: IProps) => {
    return (
        <Container>
            <Button
                className={styles.btn}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </Button>
        </Container>
    );
};

export default BaseButton;
