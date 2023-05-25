import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Hearder from "../Header/Hearder.jsx";
import Footer from "../Footer/Footer.jsx";
import ViewSidebar from "../Sidebar/ViewSidebar.jsx";

function NoLoginLayout({ children }) {
  return <div className={`w-full h-screen`}>{children}</div>;
}

export default NoLoginLayout;
