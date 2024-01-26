export const useDefineSaveLabel = <T>(
    selected: T,
    addText: string,
    updateText: string,
): string => {
    if (selected) {
        return updateText;
    }

    return addText;
};
