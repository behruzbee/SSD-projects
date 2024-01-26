import {addZero} from './addZero';

describe('Validate adding zero', () => {
    test('Call Math.abs', () => {
        const spyMathAbs = jest.spyOn(Math, 'abs');
        addZero(-10);
        expect(spyMathAbs).toBeCalledTimes(1);
    });
    test('Not call Math.abs', () => {
        const spyMathAbs = jest.spyOn(Math, 'abs');
        addZero(10);
        expect(spyMathAbs).toBeCalledTimes(0);
    });

    test('Less than 10', () => {
        expect(addZero(1)).toBe('01');
    });
    test('Equal to 10', () => {
        expect(addZero(10)).toBe('10');
    });
    test('Greater than 10', () => {
        expect(addZero(11)).toBe('11');
    });
    test('Negative number', () => {
        expect(addZero(-10)).toBe('10');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
