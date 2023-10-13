import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = (msg) => {
    toast.success(`${msg}`, {
        position: 'top-right',
        autoClose: 1950,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export const toastWait = (msg) => {
    toast.warning(`${msg}`, {
        position: 'top-right',
        autoClose: 1950,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export const toastFail = (msg) => {
    toast.error(`${msg}`, {
        position: 'top-right',
        autoClose: 1950,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};
