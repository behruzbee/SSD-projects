import dayjs from 'dayjs';

import {SelectOptions} from '@models/select_options_model';

import {EVEN_DAY} from './constants';

export const handleTotal = (totalCount: number) => {
    return totalCount % 10 === 0
        ? totalCount / 10
        : parseInt((totalCount / 10).toString()) + 1;
};

export const handleOption = <T, V extends keyof T>(
    options: T[] | any[],
    label?: keyof T,
    value?: V,
): SelectOptions<T extends {id: number | string} ? T['id'] : T[V]>[] => {
    if (label && value) {
        if (Array.isArray(value)) {
            return options?.map((option) => ({
                label: option[label],
                value: option[value[0]],
            }));
        }
        return options?.map((option) => ({
            label: option[label],
            value: option[value],
        }));
    }

    return options?.map(({name, id}) => ({
        label: name,
        value: id,
    }));
};

export const memoize = (func: any) => {
    // Create a new cache, just for this function
    const cache = new Map();

    const memoized = function (this: any, ...args: any[]) {
        // Use the first argument as the cache key.
        // If your function takes multiple args, you may
        // want to come up with a more complex scheme
        const key = args[0];

        // Return the cached value if one exists
        if (cache.has(key)) {
            return cache.get(key);
        }

        // Otherwise, compute the result and save it
        // before returning it.
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };

    return memoized;
};

export const handleDay = (stepN: number) => {
    if (stepN === 0) {
        return 'pon';
    } else if (stepN === 1) {
        return 'bud';
    } else if (stepN === 2) {
        return 'sub';
    } else {
        return 'vos';
    }
};

export const handleSecondDay = (stepN: number) => {
    if (stepN === 0) {
        return 'MONDAY';
    } else if (stepN === 1) {
        return 'OTHER';
    } else if (stepN === 2) {
        return 'SATURDAY';
    } else {
        return 'SUNDAY';
    }
};

export const getSingle = () => {
    const today = dayjs(new Date()).get('date');
    if (today % 2 === 0) {
        return EVEN_DAY.EVEN;
    } else {
        return EVEN_DAY.NOTEVEN;
    }
};

export const getDayCh = (even: number) => {
    if (even % 2 === 0) {
        return EVEN_DAY.EVEN;
    } else {
        return EVEN_DAY.NOTEVEN;
    }
};

const isValidHex = (hex: string) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

const getChunksFromString = (st: any, chunkSize: number) =>
    st.match(new RegExp(`.{${chunkSize}}`, 'g'));

const convertHexUnitTo256 = (hexStr: string) =>
    parseInt(hexStr.repeat(2 / hexStr.length), 16);

const getAlphafloat = (a: any, alpha: any) => {
    if (typeof a !== 'undefined') {
        return a / 255;
    }
    if (typeof alpha != 'number' || alpha < 0 || alpha > 1) {
        return 1;
    }
    return alpha;
};

export const hexToRGBA = (hex: string, alpha: string) => {
    if (!isValidHex(hex)) {
        throw new Error('Invalid HEX');
    }
    const chunkSize = Math.floor((hex.length - 1) / 3);
    const hexArr = getChunksFromString(hex.slice(1), chunkSize);
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
    return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
};

export const rgbaParse = (str: string) =>
    str.slice(str.indexOf('(') + 1, str.length - 1);

export const stringToRgba = (txt: string) => {
    const rgba = rgbaParse(txt);
    const [r, g, b, a] = rgba.split(',').map(Number);
    return {r, g, b, a};
};

export const parsedColorText = (color: string) => {
    let parsedColor: string = color;
    const rowColor = color?.startsWith('#');

    if (rowColor) {
        parsedColor = hexToRGBA(color, '1');
    } else {
        parsedColor = color;
    }
    return parsedColor;
};
