import React, {useState} from 'react';

import styles from './index.module.scss';

const EditableCell = ({
    value: initialValue,
    row: {index},
    column: {id},
    updateMyData,
}: any) => {
    const [value, setValue] = useState(initialValue || '0');

    const onBlur = () => {
        updateMyData(index, id, value);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value[0] === '0'
            ? setValue(e.target.value.substring(1))
            : setValue(e.target.value);
    };

    React.useEffect(() => {
        setValue(initialValue || '0');
    }, [initialValue]);

    return (
        <input
            className={styles.inputData}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type="number"
            min="0"
        />
    );
};

export default React.memo(EditableCell);
