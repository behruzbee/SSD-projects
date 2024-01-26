export type SelectOptions<T = any> = {
    label: string;
    value: T;
};

export type MultiSelectChangeHandle = (option: SelectOptions[]) => void;
export type SelectChangeHandle = (option: SelectOptions) => void;
