import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Hearder from "../Header/Hearder.jsx";
import Footer from "../Footer/Footer.jsx";

function DefaultLayout({ children }) {
  return (
    <div className={``}>
      <Hearder />
      <div className={``}>
        <Sidebar />
        <div className={``}>{children}</div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default DefaultLayout;
