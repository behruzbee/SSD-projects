import {PolylineDto, PolylineType} from '../model/road-constructor.types';

export const polylineMapper = (
    polyline: PolylineType | undefined,
): PolylineDto => {
    if (!polyline) {
        return [];
    }

    return polyline.map(({lat, lng}, i) => ({lat, lng, pointOrder: i}));
};
