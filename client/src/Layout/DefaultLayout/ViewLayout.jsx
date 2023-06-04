import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Hearder from "../Header/Hearder.jsx";
import Footer from "../Footer/Footer.jsx";
import ViewSidebar from "../Sidebar/ViewSidebar.jsx";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";

function ViewLayout({ children }) {
  const location = useLocation().pathname;
  const { user, isConvert } = useContext(ProductContext);
  return (
    <>
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
      <Hearder />

      <div class="h-screen flex overflow-hidden bg-white">
        <div class="flex flex-col w-0 flex-1 overflow-hidden">
          <main class="flex-1 relative z-0 mt-20 ml-8  overflow-y-auto focus:outline-none">
            <div class="">{children}</div>
          </main>
        </div>
      </div>
      {/* <footer>
      <div class="py-8 bg-red-500">FOOTER</div>
    </footer> */}
    </>
  );
}

export default ViewLayout;
