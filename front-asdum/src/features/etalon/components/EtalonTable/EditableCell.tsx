import React from 'react';

import styles from '@styles/components/table.module.scss';

const EditableCell = ({
    value: initialValue,
    row: {index},
    column: {id},
    updateMyData, // This is a custom function that we supplied to our table instance
}: any) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e: any) => {
        if (e.target.value[0] === '0') {
            setValue(e.target.value.substring(1));
        } else {
            setValue(e.target.value);
        }
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
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

export default EditableCell;
