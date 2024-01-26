import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import {Wrapper} from './style';

interface IProps {
    children: React.ReactChild;
    isOpen: boolean;
    onOutSideClick: () => void;
    maxWidth?: string;
    topInner?: boolean;
}

export const SideBar = ({
    children,
    isOpen,
    onOutSideClick,
    topInner,
    ...props
}: IProps) => {
    return (
        //@ts-ignore
        <OutsideClickHandler onOutsideClick={onOutSideClick}>
            <Wrapper topInner={topInner} {...props} isOpen={isOpen}>
                {children}
            </Wrapper>
        </OutsideClickHandler>
    );
};
