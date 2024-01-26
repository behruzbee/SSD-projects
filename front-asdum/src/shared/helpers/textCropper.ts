export const textCropper = (
    str: string,
    length: number,
    delimeter?: string,
): string => {
    const delim = delimeter || '...';
    if (str) {
        if (str.length > length) {
            return str.slice(0, length).concat(delim);
        } else {
            return str;
        }
    }

    return '';
};
