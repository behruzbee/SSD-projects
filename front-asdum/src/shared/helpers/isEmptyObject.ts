export const isEmptyObject = (obj: object | null): boolean => {
    let incomingObject = obj;
    if (!incomingObject) {
        incomingObject = {};
    }
    const objKeys = Object.keys(incomingObject);
    return !!objKeys.length;
};
