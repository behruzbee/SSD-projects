import {Button, IconButton} from '@mui/material';
import React, {CSSProperties, FC} from 'react';
import {Control, Path, useFieldArray} from 'react-hook-form';

import WhitePlusIcon from '@src/images/svgs/WhitePlusIcon';
import WhiteTrashIcon from '@src/images/svgs/WhiteTrashIcon';
import {InputController} from '@src/shared/components/InputController';

import {ISubmitStation} from '../lib';
import {styles} from '../lib';

type Props = {
    control: Control<ISubmitStation, Path<ISubmitStation>>;
};

const addRouteWrap: CSSProperties = {
    width: '100%',
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    padding: '8px 12px',
    border: '1px solid #C7C7D2',
    borderRadius: 4,
    boxShadow: '0px 4px 8px rgb(0 0 0 / 10%)',
};
const AddibleRoutes: FC<Props> = ({control}) => {
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'routesInputs',
    });

    return (
        <div style={addRouteWrap}>
            {fields?.map((item, index) => (
                <div className="routeDiv" key={item.id}>
                    <InputController
                        control={control}
                        name={`routesInputs.${index}.route`}
                        sx={styles.routeInput}
                    />
                    <IconButton
                        sx={{padding: 0}}
                        size="small"
                        onClick={() => remove(index)}
                    >
                        <div className="trashDiv">
                            <WhiteTrashIcon className="trashIcon" />
                        </div>
                    </IconButton>
                </div>
            ))}
            <Button className="btnAdd" onClick={() => append({route: ''})}>
                <WhitePlusIcon className="plusIcon" />
            </Button>
        </div>
    );
};

export default AddibleRoutes;
