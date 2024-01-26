export const classNameCleaner = (selectorArr: any, className: string): void => {
    for (let i = 0; i < selectorArr.length; i++) {
        selectorArr[i].classList.remove(className);
    }
};
