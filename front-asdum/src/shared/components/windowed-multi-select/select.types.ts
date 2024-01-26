import {SelectOptions} from '@models/select_options_model';

export type OptionType = Array<SelectOptions>;
export type OptionsType = Array<OptionType>;
export interface GroupType {
    label: unknown;
    options: OptionsType;
}
export type ValueType = Array<GroupType> & OptionType;
export type CommonProps = {
    isMulti?: boolean;
    isAllSelect?: boolean;
    options: ValueType;
    width?: number;
    onChange: (options: ValueType) => void;
    value: OptionType;
    placeholder?: string;
};
