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

function ListRoom({ data, user, dele, GetAPI }) {
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
          toast.success("Xoá Phòng Thành Công");
          GetAPI();
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <div class="overflow-x-auto">
        <div class="w-full h-full flex items-center justify-center  font-sans overflow-hidden">
          <div class="w-[97%] ">
            <div class="bg-white shadow-md rounded my-2  overflow-scroll h-[550px]">
              <table class="min-w-max w-full table-auto ">
                <thead className="">
                  <tr class="  bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left ">Tên Phòng</th>
                    <th class="py-3 px-6 text-left ">Loại Phòng</th>
                    <th class="py-3 px-6 text-left ">Giá thuê</th>
                    <th class="py-3 px-6 text-center ">Cọc</th>
                    <th class="py-3 px-6 text-center ">Khách Thuê</th>
                    <th class="py-3 px-6 text-center ">Ngày Vào</th>
                    <th class="py-3 px-6 text-center ">Tình Trạng</th>
                    <th class="py-3 px-6 text-center "></th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light  ">
                  {data &&
                    data?.map((item, index) => {
                      return (
                        <>
                          <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-6 text-left whitespace-nowrap">
                              <div class="flex items-center">
                                Phòng
                                <span className="py-1 px-[10px] ml-1 rounded-full bg-blue-200 text-black font-bold">
                                  {item?.roomCode}
                                </span>
                              </div>
                            </td>
                            <td class="py-3 px-6 text-left">
                              <div class="flex items-center">
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
                              VNĐ
                            </td>
                            <td class="py-3 px-6 text-left">
                              <NumericFormat
                                value={item?.deposit}
                                thousandSeparator
                                displayType="text"
                              />{" "}
                              VNĐ
                            </td>
                            <td class="py-3 px-6 text-center">
                              <div class="flex items-center justify-center text-lg">
                                {item?.member?.length} <AiOutlineUser />
                              </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                              {item?.checkIn}
                            </td>
                            <td class="py-3 px-6 text-center">
                              {item?.member?.length != 0 ? "Đã thuê" : "Trống"}
                            </td>
                            <td class="py-3 px-6 text-center">
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
                                {/* <div class="w-4 mr-2 cursor-pointer text-lg transform hover:text-purple-500 hover:scale-150">
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
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </div> */}
                                <div
                                  onClick={(e) =>
                                    deleteRoom(item?._id, item?.roomCode)
                                  }
                                  class="w-4 mr-2 cursor-pointer text-lg transform hover:text-purple-500 hover:scale-150"
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
