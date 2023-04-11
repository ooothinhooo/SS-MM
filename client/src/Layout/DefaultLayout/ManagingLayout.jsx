import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Hearder from "../Header/Hearder.jsx";
import Footer from "../Footer/Footer.jsx";

function DefaultLayout({ children }) {
  return (
    <div className={``}>
      <div className="">
        <Hearder />
      </div>

      <div className={`w-full h-full flex justify-center items-center`}>
        <div className="">
          <div class="grid grid-cols-6 gap-4">
            <div class="">
              <Sidebar />
            </div>
            <div class="col-span-5">
              {" "}
              <div className={``}>{children}</div>
            </div>
          </div>

          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
