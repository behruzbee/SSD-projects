import React from 'react';
export const createGroup = <T,>(
    groupName: unknown,
    options: T[],
    setValue: any,
) => {
    const handle = (value: any) => {
        return value.concat(
            options.filter((grpOpt) => !value.includes(grpOpt)),
        );
    };
    return {
        label: (() => {
            return (
                <div
                    onClick={() => {
                        setValue(handle);
                    }}
                >
                    <>{groupName}</>
                </div>
            );
        })(),
        options: options,
    };
};
