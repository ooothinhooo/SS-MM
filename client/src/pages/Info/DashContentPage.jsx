import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FIND_USER } from "../../API/User/FindUser.api.js";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import { DELETE_POST } from "../../API/Posts/DeletePost.api.js";
import { toast } from "react-toastify";
import { Toast } from "../../Func/Toast.js";
function DashContentPage({ user }) {
  let { id } = useParams();

  const [data, setData] = useState();
  const GET_FIND_USER = async () => {
    try {
      const result = await FIND_USER(user?.token, id);
      console.log(result.data.data.Posts);
      setData(result?.data?.data?.Posts);
    } catch (error) {}
  };

  const handeleDelete = async (id) => {
    try {
      const result = await DELETE_POST(user?.token, id);
      if (result) {
        Toast.fire({
          icon: "success",
          title: "Đã xoá 1 bài viết",
        });
        // toast.success("Đã xoá 1 bài viết", {});
        GET_FIND_USER();
      }
    } catch (error) {}
  };

  useEffect(() => {
    GET_FIND_USER();
  }, []);
  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="w-[97%] border-x px-4 text-left">
          <div>
            <Breadcrumb />
          </div>
          <div>
            <h1 className="text-2xl font-bold p-2">Quản lý tin đăng</h1>
          </div>
          <div className="rounded-md border">
            <div class="w-full shadow-lg rounded-lg overflow-hidden ">
              <table class="w-full table-fixed">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Ngày Đăng
                    </th>
                    <th class="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Tiêu Đề
                    </th>
                    <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Tỉnh/ Thành phố
                    </th>
                    <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Quận/Huyện
                    </th>
                    <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Phường/Xã
                    </th>
                    <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Địa chỉ
                    </th>
                    <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Giá
                    </th>
                    <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase"></th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  {data?.map((i) => {
                    return (
                      <>
                        <tr>
                          <td class="py-4 px-6 border-b border-gray-200">
                            {moment(i?.createdAt).format("LL")}
                          </td>
                          <td class="py-4 px-6 border-b border-gray-200 truncate">
                            {i?.title}
                          </td>
                          <td class="py-4 px-6 border-b border-gray-200">
                            {i?.province}
                          </td>
                          <td class="py-4 px-6 border-b border-gray-200">
                            {i?.district}
                          </td>
                          <td class="py-4 px-6 border-b border-gray-200">
                            {i?.ward}
                          </td>
                          <td class="py-4 px-6 border-b border-gray-200">
                            {i?.address}
                          </td>
                          <td class="py-4 px-6 border-b border-gray-200">
                            <NumericFormat
                              value={i?.roomFee}
                              thousandSeparator
                              displayType="text"
                            />{" "}
                            đ
                          </td>
                          <td class="py-4 px-6 border-b border-gray-200  ">
                            <NavLink to={`/post/view/${i?._id}`}>
                              <span class="bg-green-500 text-white py-1 px-2 rounded-full text-xs cursor-pointer">
                                Xem
                              </span>
                            </NavLink>
                            <span
                              onClick={() => handeleDelete(i?._id)}
                              class="bg-red-500 text-white py-1 px-2 rounded-full text-xs cursor-pointer"
                            >
                              Xoá
                            </span>
                          </td>
                        </tr>
                      </>
                    );
                  })}

                  {/* <!-- Add more rows here --> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Breadcrumb() {
  return (
    <>
      <nav
        class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NavLink to="/">
              <a class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Trang chủ
              </a>
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
              <a
                href="#"
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Quản Lý
              </a>
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
                Danh sách Đăng Tin
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
}
export default DashContentPage;
