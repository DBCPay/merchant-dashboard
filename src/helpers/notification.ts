import { toast } from "react-toastify";

export const showSuccessNotification = (message: string) => {
  toast.success(message);
};

export const showErrorNotification = (error: string) => {
  toast.error(error);
};

export const showInfoNotification = (error: string) => {
  toast.info(error);
};
