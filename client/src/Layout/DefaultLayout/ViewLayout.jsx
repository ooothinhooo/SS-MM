import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Hearder from "../Header/Hearder.jsx";
import Footer from "../Footer/Footer.jsx";
import ViewSidebar from "../Sidebar/ViewSidebar.jsx";
import { ToastContainer } from "react-toastify";

function ViewLayout({ children }) {
  return (
    <div className={``}>
      <ViewSidebar />
      <div class="flex flex-col flex-1">
        <div class="z-10 py-4  shadow-xs ">
          <Hearder />
        </div>
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
        <div className="mt-20 mr-20">{children}</div>
      </div>
    </div>
  );
}

export default ViewLayout;
