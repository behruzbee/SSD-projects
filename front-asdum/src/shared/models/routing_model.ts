import {ComponentType} from 'react';

type SubRouteType = {
    Icon?: any;
    ActiveIcon?: any;
    text: string;
    path: string;
    permission?: string;
    index?: boolean;
    component: ComponentType;
    subRoutes?: Array<SubRouteType>;
};
export interface IRouteData {
    Icon: any;
    ActiveIcon: any;
    text: string;
    path: string;
    permission?: string;
    component: ComponentType;
    index?: boolean;
    subRoutes?: Array<SubRouteType>;
}

export type SubRoutesType = {
    text: string;
    path: string;
    permission: boolean;
};
