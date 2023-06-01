import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Hearder from "../Header/Hearder.jsx";
import Footer from "../Footer/Footer.jsx";
import ViewSidebar from "../Sidebar/ViewSidebar.jsx";
import { ToastContainer } from "react-toastify";

function NoLoginLayout({ children }) {
  return (
    <div className={`w-full h-screen`}>
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
      {children}
    </div>
  );
}

export default NoLoginLayout;
