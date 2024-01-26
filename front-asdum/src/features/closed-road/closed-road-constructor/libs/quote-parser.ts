export const quoteParser = (str: string): string => {
    console.time();
    let parsed = '';
    if (!str.includes("'")) {
        parsed += str;
    } else {
        for (let i = 0; i < str.length; i++) {
            const letter = str[i];
            if (letter === "'") {
                parsed += letter + letter;
            } else {
                parsed += letter;
            }
        }
    }
    return parsed;
};
