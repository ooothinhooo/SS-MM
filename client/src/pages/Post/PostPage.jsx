import React, { useEffect, useState } from "react";
import BoxPost from "../../components/Post/BoxPost.jsx";
import { LIST_POST } from "../../API/Api/ListPost.api.js";
import { NavLink } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import { MdReadMore } from "react-icons/md";
import { HiChevronDoubleRight } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
function PostPage() {
  const arr = [1, 1, 1, 1, 1, 1];
  const [data, setData] = useState();
  const [page, setPage] = useState("1");

  const GETAPI_LISTPOST = async () => {
    try {
      const result = await LIST_POST(page);
      setData(result?.data);
      console.log(result.data);
    } catch (error) {}
  };
  useEffect(() => {
    GETAPI_LISTPOST();
  }, []);

  const handelLike = () => {
    toast("....");
    console.log("xxx");
  };
  const nextPage = () => {
    const maxPage = Math.ceil(data.length / 15);
    setPage(page > maxPage ? 1 : page + 1);
    // console.log(page);
    // getPagination();
  };
  const prevPage = () => {
    setPage(page <= 1 ? 1 : page - 1);
    // getPagination();
  };

  useEffect(() => {
    GETAPI_LISTPOST();
  }, [page]);
  return (
    <div>
      <ToastContainer />
      {/* xl:grid-cols-3 */}
      <ul class="grid grid-cols-1  gap-y-2 gap-x-6 items-start justify-start text-left p-8">
        {data?.map((value) => {
          return (
            <>
              <li class="relative flex flex-col sm:flex-row h-[250px] items-start bg-white shadow-lg p-3 rounded-md  ">
                <div class="order-1 sm:ml-6 xl:ml-1 text-left ">
                  <NavLink to={`/post/view/${value?._id}`}>
                    <h3 class="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                      <span class="mb-1 block text-sm leading-6 text-indigo-500">
                        {value?.title}
                      </span>
                      Giá Phòng: {value?.roomFee}
                    </h3>
                  </NavLink>
                  <div class="prose w-full prose-slate prose-sm text-slate-600 dark:prose-dark">
                    <div className="whitespace-normal">
                      <span className="flex">
                        Địa Chỉ: <span>{value?.address}</span>
                      </span>
                      <span>{value?.ward + "," + value?.district}</span>
                    </div>
                    <p className="font-bold flex justify-start items-center">
                      <HiChevronDoubleRight />
                      {value?.province}
                    </p>
                    <div class="w-[90%]">
                      <div class="whitespace-normal text-sm italic">
                        {value?.desc.substring(0, 100) + " ..."}
                      </div>
                    </div>
                    <div className="my-1">
                      <p>
                        <span>Liên Hệ: </span>
                        <span>{value?.phone}</span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full z-10 gap-2 flex justify-start items-center border-t rounded-md ">
                    <span className="cursor-pointer text-blue-900 bg-black hover:text-black flex justify-center  items-center ml-2  px-2 py-1">
                      <AiFillLike
                        onclick={(e) => {
                          handelLike(value?._id);
                        }}
                        className="text-xl mx-1 justify-center items-center"
                      />{" "}
                      Thích
                    </span>
                    <span className=" text-blue-900 flex justify-center items-center ml-2  px-2 py-1">
                      <BsSave className="text-md mx-1 justify-center items-center" />{" "}
                      Lưu bài
                    </span>
                    <span className=" text-blue-900 flex justify-center items-center ml-2  px-2 py-1">
                      <MdReadMore className="text-2xl mx-1 justify-center items-center" />{" "}
                      Xem thêm
                    </span>
                  </div>
                </div>
                {/* xl:mb-6 xl:w-full */}
                <img
                  src={value?.images[0]?.imgUrl}
                  alt=""
                  class="mb-6 shadow-md rounded-lg bg-slate-50 w-full h-full sm:w-[17rem] sm:mb-0 mr-2 "
                />
              </li>
            </>
          );
        })}
      </ul>
      <div className="my-3 w-full   flex justify-center items-center ">
        <div className="w-[95%] flex justify-between items-center">
          <a
            onClick={(e) => prevPage()}
            class="cursor-pointer inline-flex justify-start items-center 
              px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-green-300 hover:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Sau
          </a>
          <a
            onClick={(e) => {
              nextPage();
            }}
            class="cursor-pointer inline-flex justify-end items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg
               hover:bg-green-300 hover:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Tiếp
            <svg
              aria-hidden="true"
              class="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
