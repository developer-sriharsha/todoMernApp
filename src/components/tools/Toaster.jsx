import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';

export const Toaster = ({ message, type }) => {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        transition={Slide}
      />
    </React.Fragment>
  );
};
export default Toaster;

export function toastMessage(
  message = 'No message',
  type = 'info',
  toastOptions = {}
) {
  let toastOptionsContants = { position: toast.POSITION.TOP_RIGHT };
  toastOptionsContants = { ...toastOptionsContants, toastOptions };

  if (type === 'success') {
    toast.success(message, toastOptionsContants);
  }
  if (type === 'info') {
    toast.info(message, toastOptionsContants);
  }
  if (type === 'warn') {
    toast.warn(message, toastOptionsContants);
  }
  if (type === 'error') {
    toast.error(message, toastOptionsContants);
  }
}
