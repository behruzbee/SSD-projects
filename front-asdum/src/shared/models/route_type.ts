import {ComponentType} from 'react';

export interface IRouteType {
    id: number;
    name: string;
    remark: string;
    color: string;
    deleted: boolean;
}

export interface IRoute {
    Icon?: any;
    ActiveIcon?: any;
    text: string;
    path: string;
    navlink: string;
    permission: boolean;
    component: ComponentType;
    index?: boolean;
    parent?: true;
    children?: IRoute[];
}

export type NavLinkType = Pick<
    IRoute,
    'Icon' | 'ActiveIcon' | 'text' | 'navlink' | 'permission'
>;
