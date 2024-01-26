import TextField from '@mui/material/TextField';
import cx from 'classnames';
import React from 'react';

import SearchIcon from '@src/images/svgs/SearchIcon';
import Container from '@src/shared/components/container';

import styles from './index.module.scss';

interface IProps {
    text: string;
    placeholder: string;
    styling?: any;
    handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchPage = ({
    text,
    placeholder = 'Поиск по имени, номеру или описанию',
    handleTextChange,
    styling,
}: Partial<IProps>) => {
    return (
        <Container>
            <TextField
                InputProps={{
                    startAdornment: (
                        <div className={styles.searchStyle}>
                            <SearchIcon />
                        </div>
                    ),
                }}
                value={text}
                name="textSearch"
                onChange={handleTextChange}
                placeholder={placeholder}
                className={cx(styles.textField, styling)}
                size="small"
                type="search"
            />
        </Container>
    );
};

export default React.memo(SearchPage);
