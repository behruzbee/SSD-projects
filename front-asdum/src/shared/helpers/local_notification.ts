import {toast} from 'react-toastify';

export const notify = (text: string) => {
    toast(text, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: 'toastProgress',
    });
};
export const notifySuccess = (text: string) => {
    toast.success(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: 'toastProgress',
    });
};

export const notifyInfo = (text: string) => {
    toast.success(text, {
        position: 'top-right',
        autoClose: 3000,
        toastId: 'success1',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: 'toastProgress',
    });
};

export const notifyError = (text: string) => {
    toast.error(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: 'toastProgress',
    });
};

export const notifyWarning = (text: string) => {
    toast.warning(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: 'toastProgress',
    });
};
