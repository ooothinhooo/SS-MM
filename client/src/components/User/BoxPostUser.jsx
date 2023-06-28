import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import { MdReadMore } from "react-icons/md";
import { HiChevronDoubleRight } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import { INTERACT_POST } from "../../API/Posts/InteractPost.api.js";
import { SAVE_POST } from "../../API/Posts/SavePost.api.js";
import { NumericFormat } from "react-number-format";
import { Toast } from "../../Func/Toast.js";

function BoxPostUser({ user, value, GETAPI_LISTPOST }) {
  const handlerLike = async (id) => {
    try {
      const result = await INTERACT_POST(user?.token, id);
      Toast.fire({
        icon: "success",
        title: "👍",
      });

      GETAPI_LISTPOST();
    } catch (error) {}
  };

  const handlerSavePost = async (id) => {
    try {
      const result = await SAVE_POST(user?.token, id);
      console.log(result);
      Toast.fire({
        icon: "success",
        title: "👍",
      });
      GETAPI_LISTPOST();
    } catch (error) {}
  };

  return (
    <>
      {/* xl:flex-col */}
      <ToastContainer />
      <li class="relative flex flex-col sm:flex-row h-[250px] items-start bg-white shadow-lg p-3 rounded-md  ">
        <div class="order-1 sm:ml-6 xl:ml-1 text-left ">
          <NavLink to={`/post/view/${value?._id}`}>
            <h3 class="mb-1 text-slate-900 font-semibold dark:text-slate-200">
              <span class="mb-1 block text-sm leading-6 text-indigo-500">
                {value?.title?.substring(0, 40) + " ..."}
              </span>
              Giá Phòng:
              <NumericFormat
                value={value?.roomFee}
                thousandSeparator
                displayType="text"
              />{" "}
              VNĐ/Phòng
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
                {value?.desc?.substring(0, 60) + " ..."}
              </div>
            </div>
            <div className="my-1">
              <p>
                <span>Liên Hệ: </span>
                <span>{value?.phone}</span>
              </p>
            </div>
          </div>
          <div className="w-full z-10 gap-2 flex justify-start items-center border-t rounded-md cursor-pointer">
            <span
              onClick={(e) => {
                handlerLike(value?._id);
              }}
              className={`${
                value?.likes?.some((obj) =>
                  Object.values(obj).includes(user?.userId)
                )
                  ? "text-blue-600"
                  : "text-black"
              }  flex justify-center  items-center ml-2  px-2 py-1`}
            >
              <AiFillLike className="text-xl mx-1 justify-center items-center" />{" "}
              Thích
            </span>
            <span
              onClick={() => handlerSavePost(value?._id)}
              className={` flex justify-center items-center ml-2  px-2 py-1`}
            >
              <BsSave className="text-md mx-1 justify-center items-center" />{" "}
              Lưu bài
            </span>
            <NavLink to={`/post/view/${value?._id}`}>
              <span className=" text-blue-900 flex justify-center items-center ml-2  px-2 py-1">
                <MdReadMore className="text-2xl mx-1 justify-center items-center" />{" "}
                Xem thêm
              </span>
            </NavLink>
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
}

export default BoxPostUser;
