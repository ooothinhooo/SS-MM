import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Hearder from "../Header/Hearder.jsx";
import Footer from "../Footer/Footer.jsx";
import ViewSidebar from "../Sidebar/ViewSidebar.jsx";

function ViewLayout({ children }) {
  return (
    <div className={``}>
      <ViewSidebar />
      <div class="flex flex-col flex-1">
        <div class="z-10 py-4  shadow-xs ">
          <Hearder />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ViewLayout;
