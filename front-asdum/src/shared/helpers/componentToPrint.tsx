import {RefObject} from 'react';
import {useReactToPrint} from 'react-to-print';

export const handleComponentToPrint = (
    componentRef: RefObject<HTMLElement> | null,
    documentTitle: string,
) => {
    const printComponent = useReactToPrint({
        content: () => (componentRef ? componentRef.current : null),
        pageStyle:
            '@media print { body { -webkit-print-color-adjust: exact; } @page { size: A4; margin: 200mm !important }}',
        documentTitle: documentTitle,
    });
    return {printComponent};
};
