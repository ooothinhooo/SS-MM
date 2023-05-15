import React, { useState } from "react";
import { USERS_SUB_TOROOM } from "../../API/Room/userSubToRoom.api.js";
import { ADD_MEMBER_TOROOM } from "../../API/Room/addMemberToRoom.api.js";
import { ToastContainer } from "react-toastify";
import AddUserSub from "./Child_InfoRoom/AddUserSub.jsx";
import UpdateService from "./Child_InfoRoom/UpdateService.jsx";

function InfoRom({ user, data, getAPI_Room }) {
  console.log("info room=>", data);
  console.log(data?.userSub?.fullName);
  const [isAdd, setIsAdd] = useState(Boolean(false));
  const [isUp, setIsUp] = useState(Boolean(false));
  // getAPI_Room();

  return (
    <div>
      <div
        className={`absolute h-screen w-full bg-white z-30 justify-start ${
          isAdd ? "" : "hidden"
        }`}
      >
        <div className="justify-start flex ">
          <button
            onClick={(e) => setIsAdd(!isAdd)}
            className={` px-2 py-3 bg-blue-200 rounded-xl`}
          >
            Quay lại
          </button>
        </div>
        <div>
          <AddUserSub
            user={user}
            roomId={data?._id}
            isAdd={isAdd}
            getAPI_Room={getAPI_Room}
          />
        </div>
      </div>
      <div
        className={`absolute h-screen w-full bg-white z-30 justify-start ${
          isUp ? "" : "hidden"
        }`}
      >
        <div className="justify-start flex ">
          <button
            onClick={(e) => setIsUp(!isUp)}
            className={` px-2 py-3 bg-blue-200 rounded-xl`}
          >
            Quay lại
          </button>
        </div>
        <div>
          <UpdateService
            data={data}
            user={user}
            roomId={data?._id}
            isAdd={isAdd}
            getAPI_Room={getAPI_Room}
          />
        </div>
      </div>
      <div
        class={`${
          !isAdd || !isUp ? "" : "hidden"
        }flex flex-col justify-center items-center `}
      >
        <div class="relative flex flex-col items-center rounded-[20px] w-full mx-auto bg-white   bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
          <div class="mt-2 mb-8 w-full">
            <div>
              <h4 class="px-2 text-xl font-bold text-blue-700 dark:text-white uppercase">
                PHÒNG {data?.roomCode}
              </h4>
              <div className="w-full flex justify-center items-center">
                <div className="flex justify-center items-center gap-4 w-[60%]">
                  <button
                    onClick={(e) => setIsAdd(!isAdd)}
                    class="w-full rounded-md bg-indigo-600  py-2 text-indigo-100 hover:bg-indigo-500 hover:shadow-md duration-75"
                  >
                    Tải thông tin khách thuê
                  </button>
                  <button
                    onClick={(e) => setIsUp(!isUp)}
                    class="w-full rounded-md bg-indigo-600  py-2 text-indigo-100 hover:bg-indigo-500 hover:shadow-md duration-75"
                  >
                    Cập nhật dịch vụ phòng trọ
                  </button>
                </div>
              </div>
            </div>
            <p class="mt-2 px-2 text-base text-gray-600">
              THÔNG TIN KHÁCH THÊ PHÒNG
            </p>
            <div className=" w-full space-y-2">
              <div className="flex w-full justify-between gap-2">
                <div class="flex flex-col w-full items-start justify-center rounded-2xl bg-blue-100 shadow-xl bg-clip-border px-2 py-2 shadow-3xl shadow-shadow-500 ">
                  <p class="text-sm text-gray-600">Tên Khách Đăng Ký</p>
                  <p class="text-base font-medium text-navy-700 dark:text-white">
                    {data?.userSub?.fullName}
                  </p>
                </div>

                <div class="flex flex-col w-full items-start justify-center rounded-2xl bg-blue-100 shadow-xl bg-clip-border px-2 py-2 shadow-3xl shadow-shadow-500 ">
                  <p class="text-sm text-gray-600">Ngày Sinh</p>
                  <p class="text-base font-medium text-navy-700 dark:text-white">
                    {data?.userSub?.dob}
                  </p>
                </div>
                <div class="flex flex-col w-full items-start justify-center rounded-2xl bg-blue-100 shadow-xl bg-clip-border px-2 py-2 shadow-3xl shadow-shadow-500 ">
                  <p class="text-sm text-gray-600">Số điện thoại</p>
                  <p class="text-base font-medium text-navy-700 dark:text-white">
                    {data?.userSub?.phone}
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-between gap-2">
                <div class="flex flex-col w-full items-start justify-center rounded-2xl bg-blue-100 shadow-xl bg-clip-border px-2 py-2 shadow-3xl shadow-shadow-500 ">
                  <p class="text-sm text-gray-600">Số CMND</p>
                  <p class="text-base font-medium text-navy-700 dark:text-white">
                    {data?.userSub?.cccd}
                  </p>
                </div>

                <div class="flex flex-col w-full items-start justify-center rounded-2xl bg-blue-100 shadow-xl bg-clip-border px-2 py-2 shadow-3xl shadow-shadow-500 ">
                  <p class="text-sm text-gray-600">Ngày Cấp</p>
                  <p class="text-base font-medium text-navy-700 dark:text-white">
                    {data?.userSub?.dateRange}
                  </p>
                </div>
                <div class="flex flex-col w-full items-start justify-center rounded-2xl bg-blue-100 shadow-xl bg-clip-border px-2 py-2 shadow-3xl shadow-shadow-500 ">
                  <p class="text-sm text-gray-600">Biển Số Xe</p>
                  <p class="text-base font-medium text-navy-700 dark:text-white">
                    {data?.userSub?.carNum}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* //TÁC Vụ */}
          <p class="mt-2 px-2 text-base text-gray-600">THÔNG TIN PHÒNG</p>
          <div class="grid grid-cols-2 gap-4 px-2 w-full">
            <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p class="text-sm text-gray-600">GIÁ PHÒNG</p>
              <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
                <span className="font-extrabold">{data?.roomFee}</span>
                <span className="font-serif text-blue-700">VND</span>
              </p>
            </div>

            <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p class="text-sm text-gray-600">TIỀN CỌC</p>
              <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
                <span className="font-extrabold">{data?.deposit}</span>
                <span className="font-serif text-blue-700">VND</span>
              </p>
            </div>

            <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p class="text-sm text-gray-600">GIÁ ĐIỆN</p>
              <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
                <span className="font-extrabold">{data?.electricityPrice}</span>
                <span className="font-serif text-blue-700">VND</span>
              </p>
            </div>

            <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p class="text-sm text-gray-600">GIÁ NƯỚC</p>
              <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
                <span className="font-extrabold">{data?.waterPrice}</span>
                <span className="font-serif text-blue-700">VND</span>
              </p>
            </div>

            <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p class="text-sm text-gray-600">NGÀY NHẬN PHÒNG</p>
              <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
                <span className="font-extrabold">{data?.checkIn}</span>
                <span className="font-serif text-blue-700">VND</span>
              </p>
            </div>

            <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p class="text-sm text-gray-600">KỲ HẠN THANH TOÁN</p>
              <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
                <span className="font-extrabold">{data?.term}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoRom;
