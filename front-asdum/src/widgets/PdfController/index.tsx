import {useNavigate} from 'react-router-dom';
import {useReactToPrint} from 'react-to-print';

export const useGeneratePDF = (componentRef: any, pageStyle: string) => {
    console.log('Ref: ', componentRef);
    const navigate = useNavigate();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => navigate(-1),
        pageStyle:
            pageStyle ||
            '@media print { body { -webkit-print-color-adjust: exact; } @page { size: A4; margin: 200mm !important }}',
    });

    return {handlePrint};
};
