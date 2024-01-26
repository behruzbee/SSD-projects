import React, {FC} from 'react';

interface IFileProps {
    base64Data: string;
    width?: number | string;
    height?: number | string;
}
export const PDFViewer: FC<IFileProps> = ({base64Data, width, height}) => {
    return (
        <iframe
            width={width}
            height={height}
            src={`data:application/pdf;base64,${base64Data}#toolbar=0`}
        />
    );
};
