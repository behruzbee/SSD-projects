import React from 'react';

import NavigationBar from '@components/NavigationBar';
import {SubRoutesType} from '@models/routing_model';

interface IProps {
    children?: any;
    list?: SubRoutesType[];
}

const Innerlayout = ({list, children}: IProps) => {
    return (
        <div className="page__wrapper">
            <NavigationBar list={list} />
            {children}
        </div>
    );
};

export default Innerlayout;
