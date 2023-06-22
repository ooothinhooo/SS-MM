import React, { useContext, useState } from "react";

import { motion } from "framer-motion";

import { BsFillKeyboardFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";
import { routes } from "../../config/routes.js";
import Swal from "sweetalert2";
import LOGO from "../../images/smart-meter.png";
import InputSearch from "../../components/Search/InputSearch.jsx";
function Hearder() {

  const [bar, setBar] = useState(Boolean(false));
  const { setUser, user, social, setSocial } = useContext(ProductContext);
  /* `const [dropMenu, setDropMenu] = useState(false);` is declaring a state variable `dropMenu` and a
  function `setDropMenu` to update its value. The initial value of `dropMenu` is set to `false`.
  This state variable is likely used to control the visibility of a dropdown menu in the header
  component. */
  const [dropMenu, setDropMenu] = useState(false);
  const navigation = useNavigate();
  const location = useLocation().pathname;

  function isLocationInRoutes(location, data) {
    for (const key in data) {
      if (data[key] === location) {
        console.log(data[key]);
        return true;
      }
    }
    return false;
  }
  const NavLinkTo = () => {
    Swal.fire({
      title: "Bạn muốn chuyển trang",
      text: "Chọn Lựa Chọn Của Bạn",
      // icon: "warning",
      width: 600,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Quản Lý Nhà Trọ",
      cancelButtonText: "Mạng Xã Hội",
    }).then((result) => {
      if (result.isConfirmed) {
        setSocial(false);
        navigation("/room");
      } else {
        setSocial(true);
        navigation("/");
      }
    });

    // window.location = "/room";
  };

  const Bar = [
    {
      title: "Trang cá nhân",
      icon: "",
      path: `/u/${user?.userId}`,
    },
    {
      title: "Quản lý nội dung",
      icon: "",
      path: `/u/dash/${user?.userId}`,
    },
    {
      title: "Cập nhật tài khoản",
      icon: "",
      path: `/u/edit/${user?.userId}`,
    },
    {
      title: "Thay đổi mật khẩu",
      icon: "",
      path: `/u/pass/${user?.userId}`,
    },
  ];
  // if()
  const handlerLogout = () => {
    Swal.fire({
      title: "Bạn muốn đăng xuất",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng xuất ngay",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã Đăng Xuất", "Đăng Xuất Thành Công", "success");
        localStorage.clear();
        // navigation("/");
        // window.location.href = "/";
        window.location = "/";
      }
    });
  };

  return (
    <>
      <div>
        {/* <span className="text-black text-xl">Header</span> */}
        <nav class="bg-white border-b border-gray-200 fixed  z-30 w-full">
          <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-start">
                <NavLink to="/">
                  <button
                    id="toggleSidebarMobile"
                    aria-expanded="true"
                    aria-controls="sidebar"
                    class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                  ></button>
                  <a
                    href="#"
                    class="text-xl font-bold flex items-center lg:ml-2.5"
                  >
                    <img src={LOGO} class="h-10 mr-2" alt="Windster Logo" />
                    <span class="self-center whitespace-nowrap">SSMM</span>
                  </a>
                </NavLink>
                {/* <div action="#" method="GET" class="hidden lg:block lg:pl-32">
                  <label for="topbar-search" class="sr-only">
                    Search
                  </label>
                  <div class="mt-1 relative lg:w-64">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        class="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="email"
                      id="topbar-search"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                      placeholder="Search"
                    />
                  </div>
                </div> */}
                <div>
                  <InputSearch />
                </div>
              </div>
              <div class="flex items-center">
                <button
                  id="toggleSidebarMobileSearch"
                  type="button"
                  class="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
                >
                  <span class="sr-only">Search</span>
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div class="hidden lg:flex items-center">
                  <span class="text-base font-normal text-gray-500 mr-5">
                    ❤️
                  </span>
                  <div class="-mb-1">
                    <a
                      class="github-button"
                      href="#"
                      data-color-scheme="no-preference: dark; light: light; dark: light;"
                      data-icon="octicon-star"
                      data-size="large"
                      data-show-count="true"
                      aria-label="Star themesberg/windster-tailwind-css-dashboard on GitHub"
                    >
                      Xin Chào
                    </a>
                  </div>
                </div>
                <>
                  {!user?.Motel ? (
                    <>
                      <NavLink to={`/motel`}>
                        <p class="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                          <svg
                            class="svg-inline--fa fa-gem -ml-1 mr-2 h-4 w-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="gem"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                            ></path>
                          </svg>
                          Quản Lý Nhà Trọ
                        </p>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <div onClick={(e) => NavLinkTo()}>
                        <p class="hidden cursor-pointer  sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                          <svg
                            class="svg-inline--fa fa-gem -ml-1 mr-2 h-4 w-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="gem"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                            ></path>
                          </svg>
                          Quản Lý Nhà Trọ
                        </p>
                      </div>
                    </>
                  )}
                </>
                <>
                  <div
                    onClick={(e) => {
                      setBar(!bar);
                    }}
                    className={`${!social ? "hidden" : ""}`}
                  >
                    <a class="relative cursor-pointer inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-gray-500 rounded-xl group">
                      <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-white rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-gray-300"></span>
                      </span>
                      <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-gray-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                      <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                        <AiOutlineBars />
                      </span>
                    </a>
                  </div>
                  <div
                    className={`${
                      bar ? "" : "hidden"
                    } w-[180px] h-auto absolute top-[60px] right-[23px] bg-white drop-shadow-2xl shadow-indigo-500/40 z-100   rounded-md flex items-start justify-start`}
                  >
                    <div className="w-full  py-2 items-start justify-start text-left">
                      {Bar.map((item) => {
                        return (
                          <NavLink to={item?.path}>
                            <button className="mb-2 w-[160px] flex items-start justify-start ml-2">
                              <a
                                href="#_"
                                class="relative w-50 border text-left inline-flex items-center justify-start px-1 py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-blue-400 group"
                              >
                                <span
                                  class={`w-48 h-48 rounded rotate-[-80deg] bg-blue-400 absolute bottom-1 left-10 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0`}
                                ></span>
                                <span class="relative w-[160px] text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                                  {item?.title}
                                </span>
                              </a>
                            </button>
                          </NavLink>
                        );
                      })}
                      <button
                        onClick={(e) => handlerLogout()}
                        className="mb-2 w-[160px] flex items-start justify-start ml-2"
                      >
                        <a class="relative w-50 border text-left inline-flex items-center justify-start px-1 py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-green-300 group">
                          <span class="w-48 h-48 rounded rotate-[30deg] bg-green-400 absolute bottom-2 left-14 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                          <span class="relative w-[160px] text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                            Đăng xuất
                          </span>
                        </a>
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Hearder;
