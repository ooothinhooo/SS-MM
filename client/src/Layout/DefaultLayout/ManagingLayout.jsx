import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Hearder from "../Header/Hearder.jsx";
import Footer from "../Footer/Footer.jsx";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";

function DefaultLayout({ children }) {
  const location = useLocation().pathname;
  const { user, isConvert } = useContext(ProductContext);

  return (
    <div className={``}>
      <div className="">
        <Hearder />
      </div>

      <div className={`w-full h-full flex justify-center items-center`}>
        <div className="">
          {user ? (
            <div class="grid grid-cols-6 gap-4">
              <div class="">
                <Sidebar />
              </div>
              <div class="col-span-5">
                {" "}
                <div className={``}>{children}</div>
              </div>
            </div>
          ) : (
            <div className={``}>{children}</div>
          )}

          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
