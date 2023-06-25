import React, { useEffect, useState } from "react";
import { MdOutlineDeleteSweep, MdHome } from "react-icons/md";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_ROOM } from "../../API/Motels/DeleteRoom.api.js";
import { NavLink, useNavigate } from "react-router-dom";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { NumericFormat } from "react-number-format";
import { AiOutlineUser } from "react-icons/ai";
import { CiMinimize2 } from "react-icons/ci";
import { CHECK_STATUS_BILL } from "../../API/Bill/CheckStatusBill.api.js";
import { Toast } from "../../Func/Toast.js";
import { Tooltip } from "flowbite-react";

function ListRoom({
  data,
  user,

  GetAPI,
}) {
  const [room, setRoom] = useState();
  const navigation = useNavigate();

  // const GetAPI = async () => {
  //   try {
  //     const result = await LIST_ROOM(user?.token, user?.Motel);
  //     setRoom(result.data.data);
  //     console.log("lisst room", result);
  //     console.log("lisst room", result.data.data);
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   GetAPI();
  // }, []);

  const deleteRoom = async (_id, roomCode) => {
    Swal.fire({
      title: "Xoá Phòng?",
      text: `Bạn Muốn Xoá Phòng ${roomCode}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Delete_API_Room(_id);
      }
    });
    //
  };

  const Delete_API_Room = async (_id) => {
    try {
      const result = await DELETE_ROOM(user?.token, _id);
      console.log(result);
      if (result.status == 200) {
        if (result.data.status == 200) {
          Toast.fire({
            icon: "success",
            title: "Xoá Phòng Thành Công",
          });

          GetAPI();
        }
      }
    } catch (error) {}
  };

  // console.log(data);
  const Render_CheckStatus = async (data) => {
    try {
      // console.log(data?.bill);
      const html = "";
      const x = data?.bill.map((i) => {
        return ` 
            
          <div class="px-4 py-5 sm:px-6 border w-full">
            <div class="flex items-center justify-between">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
               Hoá Đơn Tháng <span class="text-blue-800 font-bold">${
                 i?.month
               }</span>
              </h3>
            </div>
            <div class="mt-2.5">
            <div class="flex items-center mr-4">
            <input 
            ${i?.status ? "checked" : ""}
            type="checkbox" value=${
              i?.month
            } name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-2-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            ${
              i?.status
                ? ` <p class="text-sm font-medium text-gray-500">
             <span class="text-green-600">Đã thu</span>
          </p>`
                : ` <p class="text-sm font-medium text-gray-500">
          <span class="text-red-600">Chưa thu</span>
        </p>`
            }
            </label>
        </div>
            </div>
            
        </div>
        `;
      });
      // console.log(x);

      const { value: formValues } = await Swal.fire({
        title: `PHÒNG ${data?.roomCode}`,
        width: 900,
        html: `
        <div class="grid grid-cols-3 gap-2">
          ${x.join("").split(",")}
        </div>
         `,
        focusConfirm: false,
        preConfirm: () => {
          const checkboxes = document.querySelectorAll(
            "input[type=checkbox]:checked"
          );
          let ArrayChecked = [];
          Array.prototype.forEach.call(checkboxes, function (el) {
            ArrayChecked.push(el.value);
          });

          const Nocheckboxes = document.querySelectorAll(
            "input[type=checkbox]"
          );
          let ArrayNoChecked = [];
          Array.prototype.forEach.call(Nocheckboxes, function (el) {
            if (!el.checked) {
              ArrayNoChecked.push(el.value);
            }
          });
          ArrayNoChecked.pop();
          return [ArrayChecked, ArrayNoChecked];
        },
      });

      if (formValues) {
        // Swal.fire(JSON.stringify(formValues));
        POST_CheckStatus(data?._id, formValues[0], formValues[1]);
      }
    } catch (error) {}
  };
  const POST_CheckStatus = async (roomId, ArrayChecked, ArrayNoChecked) => {
    try {
      console.log(roomId, ArrayChecked, ArrayNoChecked);
      const result = await CHECK_STATUS_BILL(
        user?.token,
        roomId,
        ArrayChecked,
        ArrayNoChecked
      );
      console.log(result);
      if (result?.data.status == 200) {
        // toast.success("Cập nhật thành công");
        Toast.fire({
          icon: "success",
          title: "Cập nhật thành công",
        });
        GetAPI();
      }
    } catch (error) {}
  };

  return (
    <div>
      <div class="w-full ">
        <div class="w-full h-full flex items-center justify-center  font-sans overflow-hidden">
          <div class="w-full mr-3 ">
            <div class="bg-white shadow-md rounded my-2  overflow-scroll h-[550px]">
              <table class=" w-full table-auto ">
                <thead className="">
                  <tr class="  bg-gray-200 text-gray-600 uppercase text-[13px] leading-normal">
                    <th class="py-3 px-6 text-left ">Phòng</th>
                    <th class="py-3 px-6 text-left ">Loại Phòng</th>
                    <th class="py-3 px-6 text-left ">Giá </th>
                    <th class="py-3 px-6 text-left ">Cọc</th>
                    <th class="py-3 px-6 text-left ">Khách Thuê</th>
                    <th class="py-3 px-6 text-left ">Ngày Vào</th>
                    <th class="py-3 px-6 text-left ">Tình Trạng</th>
                    <th class="py-3 px-6 text-left ">Thu tiền</th>
                    <th class="py-3 px-6 text-left "></th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light  ">
                  {data &&
                    data?.map((item, index) => {
                      return (
                        <>
                          <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-6 text-left whitespace-nowrap">
                              <div class="flex items-center text-[13px]">
                                {/* Phòng */}
                                <span className=" ml-1 rounded-full text-blue-700 font-bold">
                                  {item?.roomCode}
                                </span>
                              </div>
                            </td>
                            <td class="py-3 px-6 text-left">
                              <div class="flex items-center text-xs">
                                {item?.category}
                              </div>
                            </td>
                            <td class="py-3 px-6 text-left">
                              <div class="flex items-center justify-center"></div>
                              <NumericFormat
                                value={item?.roomFee}
                                thousandSeparator
                                displayType="text"
                              />{" "}
                              <span className="italic text-sm"> VNĐ</span>
                            </td>
                            <td class="py-3 px-6 text-left">
                              <NumericFormat
                                value={item?.deposit}
                                thousandSeparator
                                displayType="text"
                              />{" "}
                              VNĐ
                            </td>
                            <td class="py-3 px-6 text-left">
                              <div class="flex items-center justify-center text-lg">
                                {item?.member?.length} <AiOutlineUser />
                              </div>
                            </td>
                            <td class="py-3 px-6 text-left">{item?.checkIn}</td>
                            <td class="py-3 px-6 text-left">
                              {item?.member?.length != 0 ? "Đã thuê" : "Trống"}
                            </td>
                            <td class="py-3 px-6 text-left">
                              <div
                                onClick={(e) => Render_CheckStatus(data[index])}
                                className="bg-gray-200  border-b rounded-md flex justify-center items-center cursor-pointer "
                              >
                                {/* <svg
                                  width="28px"
                                  height="40px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14.6923 6.08088C14.6923 5.48393 14.2618 5 13.7308 5H7.96154C7.4305 5 7 5.48393 7 6.08088V16.5294L7.76923 15.9529M10.2692 7.47059H16.0385C16.5695 7.47059 17 7.95452 17 8.55147V19L13.1538 16.1176L9.30769 19V8.55147C9.30769 7.95452 9.73819 7.47059 10.2692 7.47059Z"
                                    stroke="#464455"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg> */}
                                <span className="text-[12px] p-1">
                                  {item?.bill[item?.bill.length - 1]?.status ? (
                                    <>
                                      <span className="text-green-600 font-bold">
                                        Đã thu
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-red-600 font-bold">
                                        Chưa thu
                                      </span>
                                    </>
                                  )}
                                </span>
                              </div>
                            </td>
                            <td class="py-3 px-6 text-left">
                              <div class="flex item-center justify-center">
                                <div class="w-4 mr-2 cursor-pointer text-lg transform hover:text-purple-500 hover:scale-150">
                                  <NavLink to={`/room/view/${item?._id}`}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  </NavLink>
                                </div>

                                <div
                                  onClick={(e) =>
                                    deleteRoom(item?._id, item?.roomCode)
                                  }
                                  class={` w-4 mr-2 cursor-pointer text-lg transform hover:text-purple-500 hover:scale-150`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListRoom;
