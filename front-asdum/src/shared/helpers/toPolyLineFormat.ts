export const toPolylineFormat = (arr: any) => {
    return arr.map((item: any) => [item.lat, item.lng]);
};

export const toViolationPolylineFormat = (arr: any) => {
    return arr.map((item: any) => item.coordinates);
};

export const planStationsLocation = (arr: any) => {
    return arr.filter((item: any) =>
        item.id ? {name: item.name, coordinates: [item.lat, item.lng]} : null,
    );
};
