import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import React, { useEffect, useState } from "react";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { NavLink } from "react-router-dom";
import {
  AiFillDelete,
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlineFolderView,
  AiOutlineFundView,
} from "react-icons/ai";
import PaymemtsForm from "../../components/Paymentslips/PaymemtsForm.jsx";
import PrintPay from "../../components/Paymentslips/PrintPay.jsx";

export default function PaymentsPage({ user }) {
  return (
    <div className="w-full ">
      <div className="App w-[90%] mb-4">
        <div>
          {/* <!-- Breadcrumb --> */}
          <nav
            class="justify-between px-4 py-3 text-gray-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
          >
            <ol class="inline-flex items-center mb-3 space-x-1 md:space-x-3 sm:mb-0">
              <li>
                <NavLink to="/">
                  <div class="flex items-center">
                    <p
                      href="#"
                      class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Quản lý nhà trọ
                    </p>
                  </div>
                </NavLink>
              </li>

              <li aria-current="page">
                <NavLink to="/payment">
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
                    <p
                      href="#"
                      class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Phiếu Chi
                    </p>
                  </div>
                </NavLink>
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
                  <span class="mx-1 text-sm font-medium text-gray-500 md:mx-2 dark:text-gray-400">
                    Danh Sách phiếu chi
                  </span>
                </div>
              </li>
            </ol>
            <div></div>
          </nav>
        </div>
      </div>
      <PaymemtsForm user={user} />
      {/* <PrintPay /> */}
    </div>
  );
}
