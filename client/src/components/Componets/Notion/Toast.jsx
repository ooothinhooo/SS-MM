import React from "react";
import { ToastContainer, toast } from "react-toastify";
//https://fkhadra.github.io/react-toastify/introduction/
function Toast() {
  toast.success("🦄 Thêm thành công", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      Toast
    </div>
  );
}

export default Toast;
