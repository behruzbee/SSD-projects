import {CSSObjectWithLabel} from 'react-select';

import {SelectOptions} from '@models/select_options_model';

type cssProp = string | number;

type Icon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
export type Placement = 'top' | 'bottom' | 'auto';
export interface Props {
    inputWidth?: cssProp;
    isStatic?: boolean;
    defaultValue?: SelectOptions;
    isDisabled?: boolean;
    isLoading?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    menuPlacement?: Placement;
    name?: string;
    menuPortalTarget?: HTMLElement | null;
    options?: SelectOptions[];
    isMulti?: boolean;
    isBranchHeight?: boolean;
    isCreatable?: boolean;
    error?: boolean;
    autoFocus?: boolean;
    className?: string;
    fontSize?: cssProp;
    fontWeight?: cssProp;
    lineHeight?: cssProp;
    color?: string;
    dataCy?: any;
    onChange?: (option: SelectOptions) => void;
    placeholder?: string;
    ref?: HTMLElement | null;
    nooptionsmessage?: string;
    value?: SelectOptions;
    label?: string;
    closeMenuOnSelect?: boolean;
    labelStyle?: {
        color?: string;
        weight?: cssProp;
        fontSize?: {
            mobile?: number;
            planshet?: number;
            laptop?: number;
            desktop?: number;
        };
    };
    lmargin?: {
        mobile?: number;
        planshet?: number;
        laptop?: number;
        desktop?: number;
    };
    menuListStyle?: {
        padding?: cssProp;
    };
    valuePadding?: cssProp;
    indicatorPadding?: cssProp;
    menu?: CSSObjectWithLabel;
    selectStyle?: {
        maxHeight?: cssProp;
        color?: string;
        bgcolor?: string;
        inputColor?: string;
        weight?: cssProp;
        lineHeight?: cssProp;
        margin?: string;
        border?: string;
        borderRadius?: cssProp;
        borderbottom?: string;
        shadow?: string;
        radius?: number;
        deleteColor?: string;
        deleteBgColor?: string;
        inpadding?: string;
        fontSize?: {
            mobile?: number;
            planshet?: number;
            laptop?: number;
            desktop?: number;
        };
        inputFontSize?: cssProp;
        valuebgcolor?: string;
        height?: {
            mobile?: number;
            planshet?: number;
            laptop?: number;
            desktop?: number;
        };
        placeholdercolor?: string;
        placewieght?: string;
        boxShadow?: string;
    };
    placeHolder?: CSSObjectWithLabel;
    IconDown?: Icon;
    minWidth?: cssProp;
    width?: {
        maxwidth?: number;
        minwidth?: number;
        width?: string;
    };
    height?: cssProp;
    margin?: {
        mobile?: string;
        planshet?: string;
        laptop?: string;
        desktop?: string;
    };
    message?: string;
    field?: any;
    iconmargin?: string;
    icon?: Icon;
    iconleft?: string;
    iconright?: string;
    icondowncolor?: string;
    isOptionDisabled?: boolean;
    indicatorSeparator?: CSSObjectWithLabel;
}
