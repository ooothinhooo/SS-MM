import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Hearder from "../Header/Hearder.jsx";
import Footer from "../Footer/Footer.jsx";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";
import { ToastContainer } from "react-toastify";

function DefaultLayout({ children }) {
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
        <div class="h-screen ">
          {/* <!-- Static sidebar for desktop --> */}
          <Sidebar />
          {/* <div class="hidden md:flex md:flex-shrink-0">
            <div class="flex flex-col w-64">
              <div class="flex-1 flex flex-col min-h-0 border-r border-gray-200">
                <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <div class="flex items-center flex-shrink-0 px-4">
                    <img
                      class="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
                    <a
                      href="#"
                      class="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      Dashboard
                    </a>
                    <a
                      href="#"
                      class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      Projects
                    </a>
                    <a
                      href="#"
                      class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      Calendar
                    </a>
                  </nav>
                </div>
                <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
                  Side footer
                </div>
              </div>
            </div>
          </div> */}
        </div>

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

export default DefaultLayout;
{
  /* <div className={``}>
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

      <div className={`w-full h-full flex justify-start items-start`}>
        <div className="flex w-full h-full  ">
          <div class="flex gap-4">
            <aside class="h-screen sticky top-0">
              <div className=" top-0 left-0  ">
                <Hearder />
              </div>
              <div className="mt-12 sticky h-full">
                {" "}
                <Sidebar />
              </div>
            </aside>

            <main>
              <div className={`mt-20 mr-20`}>{children}</div>
            </main>
          </div>
         \
        </div>
      </div>
    </div> */
}