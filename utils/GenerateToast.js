import { toast, Slide } from 'react-toastify';

export const SuccessToast = (message) => {
  toast.success(`${message}`, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
  });
};

export const WarningToast = (message) => {
  toast.warning(`${message}`, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
  });
};

export const ErrorToast = (message) => {
  toast.error(`${message}`, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
  });
};

export const DefaultToast = (message) => {
  toast(`${message}`, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
  });
};
