import React from 'react';

interface IProps<T> {
    children: JSX.Element;
    data: T[];
}

export const RenderWithCondition = <T,>({
    children,
    data,
}: IProps<T>): JSX.Element | null => {
    return <>{data?.length ? children : null}</>;
};
