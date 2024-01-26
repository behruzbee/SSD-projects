export const useFileDownloader = (base64: string, fileName: string) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = base64;
    downloadLink.download = fileName;
    downloadLink.click();
    downloadLink.remove();
};
