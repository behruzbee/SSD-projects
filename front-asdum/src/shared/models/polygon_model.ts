import {CheckboxProps} from './props';

export interface PolygonSaveModel {
    id: any;
    // name: string;
    color: string;
    coordinates: Coordinate[];
}
export interface PolygonDeleteModel {
    id: string | number;
}

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface IPolygonModel extends CheckboxProps {
    name: string;
    coordinates: any;
    type: string;
    routes: string;
    color: any;
    completed: boolean;
    id: number;
    lastChanged: null;
    kppStation: KppStation;
    lastUser: KppStation;
    col1: number;
}

export interface KppStation {
    id: number;
    name: string;
}
