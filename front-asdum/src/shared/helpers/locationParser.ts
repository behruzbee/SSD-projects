export const locatioParser = (mapsLats: any[]) => {
    if (mapsLats?.length > 0) {
        const result = [];
        for (let i = 0; i < mapsLats.length; i++) {
            const next = mapsLats[i + 1];
            const current = mapsLats[i];

            if (next) {
                result.push(
                    `${next?.lng - current?.lng},${next?.lat - current?.lat}`,
                );
            }
        }

        return `${mapsLats[0].lng},${mapsLats[0].lat}~${result.join('~')}`;
    }
    return '';
};
