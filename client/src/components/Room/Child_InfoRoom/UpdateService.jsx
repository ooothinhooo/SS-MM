import React, { useEffect, useState } from "react";
import Input from "../../Componets/InputType/Input.jsx";
import { ToastContainer, toast } from "react-toastify";
import { UPDATE_SERVICE_TOROOM } from "../../../API/Room/updateServiceToRoom.api.js";

import { NumericFormat } from "react-number-format";
function UpdateService({ user, roomId, getAPI_Room }) {
  const [data, setData] = useState({});
  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  useEffect(() => {
    console.log(data);
    data.roomId = roomId;
  }, [data]);
  const updateData = async () => {
    try {
      const result = await UPDATE_SERVICE_TOROOM(user?.token, data);

      console.log(result?.data?.status);

      if (result?.data?.status === 200) {
        getAPI_Room();
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {}
  };
  return (
    <div className="w-full flex justify-center items-center   bg-white">
      <ToastContainer />

      <div className="w-[90%]  bg-white">
        <p class="mt-2 px-2 text-base text-gray-600">THÔNG TIN DỊCH VỤ PHÒNG</p>
        <div>
          <div
            onClick={(e) => updateData()}
            class="max-w-md mx-auto space-y-6 flex justify-center my-1"
          >
            <p class="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500">
              <strong class="font-medium">XÁC NHẬN CẬP NHẬT DỊCH VỤ</strong>
              <svg
                class="ml-1 rotate-180 fill-white group-hover:fill-blue-500"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M17.6954 12.4962L21.6468 12.1467C22.5335 12.1467 23.2525 12.8727 23.2525 13.7681C23.2525 14.6635 22.5335 15.3895 21.6468 15.3895L17.6954 15.04C16.9997 15.04 16.4357 14.4705 16.4357 13.7681C16.4357 13.0645 16.9997 12.4962 17.6954 12.4962"
                ></path>
                <path d="M4.42637 12.5604C4.48813 12.4981 4.71885 12.2345 4.93559 12.0157C6.19989 10.6449 9.50107 8.40347 11.228 7.71751C11.4902 7.60808 12.1532 7.37512 12.5086 7.35864C12.8477 7.35864 13.1716 7.43748 13.4804 7.59279C13.8661 7.81046 14.1738 8.15403 14.3439 8.55878C14.4522 8.83882 14.6224 9.68009 14.6224 9.69539C14.7913 10.6143 14.8834 12.1086 14.8834 13.7606C14.8834 15.3325 14.7913 16.7656 14.6527 17.6999C14.6375 17.7163 14.4674 18.76 14.2821 19.1177C13.943 19.7719 13.28 20.1766 12.5704 20.1766H12.5086C12.046 20.1613 11.0742 19.7554 11.0742 19.7413C9.43931 19.0553 6.21621 16.9221 4.92044 15.5043C4.92044 15.5043 4.55455 15.1396 4.39608 14.9125C4.14904 14.5854 4.02552 14.1806 4.02552 13.7759C4.02552 13.3241 4.16419 12.904 4.42637 12.5604"></path>
              </svg>
              <span class="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 px-2">
          <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p class="text-sm text-gray-600">GIÁ PHÒNG</p>
            <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
              <Input
                name="roomFee"
                type="number"
                placeholder="1.000.000"
                // labelText="Ngày Sinh"
                value={data.roomFee}
                handleInputState={handleInputState}
              />

              <span className="font-serif text-blue-700">VND</span>
            </p>
          </div>

          <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p class="text-sm text-gray-600">TIỀN CỌC</p>
            <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
              <Input
                name="deposit"
                type="number"
                placeholder="1.000.000"
                // labelText="Ngày Sinh"
                value={data.deposit}
                handleInputState={handleInputState}
              />
              <span className="font-serif text-blue-700">VND</span>
            </p>
          </div>

          <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p class="text-sm text-gray-600">NGÀY NHẬN PHÒNG</p>
            <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
              <Input
                name="checkIn"
                type="date"
                placeholder="dd-mm-yyyy"
                min="1997-01-01"
                max="2030-12-31"
                value={data.checkIn}
                handleInputState={handleInputState}
              />
              {/* <span className="font-serif text-blue-700">VND</span> */}
            </p>
          </div>

          <div class="flex flex-col items-start justify-center rounded-2xl bg-blue-200 shadow-xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p class="text-sm text-gray-600">KỲ HẠN THANH TOÁN</p>
            <p class="text-base font-medium text-navy-700 dark:text-white flex gap-1 uppercase">
              <select
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                data-te-select-init
                name="term"
                onChange={handleChange}
                value={data.term}
              >
                <option value="">Choose</option>
                <option value="Kỳ 15">Kỳ 15</option>
                <option value="Kỳ 30">Kỳ 30</option>
              </select>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateService;
