export class ParseNumber {
    private static value: number | undefined;
    constructor(numb: number | undefined) {
        ParseNumber.value = numb;
    }

    static getValue() {
        return this.value;
    }

    private static setValue(val: number) {
        this.value = val;
    }

    static parseFloat(val = this.value) {
        if (val) {
            this.setValue(+parseFloat(val.toString()));
        } else {
            this.setValue(0);
        }
        return ParseNumber;
    }

    static parseToFixed(val = this.value, fix = 0) {
        if (val) {
            this.setValue(+val.toFixed(fix));
        } else {
            this.setValue(0);
        }
        return ParseNumber;
    }

    static parseInt(val = this.value) {
        if (val) {
            this.setValue(+parseInt(val.toString()));
        } else {
            this.setValue(0);
        }
        return ParseNumber;
    }
}
