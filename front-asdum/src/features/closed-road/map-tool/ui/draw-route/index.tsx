import 'leaflet-draw/dist/leaflet.draw.css';

import React from 'react';
import {FeatureGroup} from 'react-leaflet';
import {EditControl} from 'react-leaflet-draw';

export const DrawRoute = () => {
    return (
        <FeatureGroup>
            {/*@ts-ignore*/}
            <EditControl
                edit={true}
                position="topright"
                draw={{
                    polyline: {
                        shapeOptions: {
                            color: 'red',
                            weight: 4,
                        },
                    },
                    circlemarker: false,
                    polygon: false,
                    circle: false,
                    rectangle: false,
                    marker: false,
                }}
            />
        </FeatureGroup>
    );
};
