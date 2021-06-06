import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (mesaage) => {
  toast.configure();
  toast.info(mesaage, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyError = (mesaage) => {
  toast.configure();
  toast.error(mesaage, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
