import React, { useEffect, useState } from "react";
import Bill from "../../components/Billing/Bill.jsx";
import { NavLink, useParams } from "react-router-dom";
function UpdateBillPage({ user }) {
  let { id, roomCode } = useParams();
  return (
    <div>
      <div className="mt-20 mr-20 w-full  ">
        <div className="flex justify-start mx-4">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NavLink to={"/main"}>
                  <p
                    href="#"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </p>
                </NavLink>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <NavLink to={"/bill"}>
                    <p class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                      Hoá đơn điện nước
                    </p>
                  </NavLink>
                </div>
              </li>

              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    Phòng {roomCode}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div>
          {/* <div className="flex justify-center items-center px-4 py-2 rounded-md bg-blue-gray-50">
            <span>
              Danh Mục Chỉnh Sửa Chỉ Số Điện/Nước Cho Phòng {roomCode}
            </span>
          </div> */}
        </div>
        <div>
          <Bill user={user} roomId={id} />
        </div>
      </div>
    </div>
  );
}

export default UpdateBillPage;
