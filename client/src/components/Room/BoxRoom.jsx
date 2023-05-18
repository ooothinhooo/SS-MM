import React, { useEffect, useState } from "react";
import { MdOutlineDeleteSweep, MdHome } from "react-icons/md";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_ROOM } from "../../API/Motels/DeleteRoom.api.js";
import { NavLink, useNavigate } from "react-router-dom";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";

function BoxRoom({ data, user, dele }) {
  const [room, setRoom] = useState();

  const navigation = useNavigate();

  const GetAPI = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      setRoom(result.data.data.rooms);
    } catch (error) {}
  };
  useEffect(() => {
    GetAPI();
  }, [data, room]);

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
      <div class="flex items-center justify-center">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {room &&
            room?.map((item, index) => {
              return (
                <>
                  <div class="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl hover:bg-gray-200 ">
                    <div
                      class={`text-white flex items-center absolute rounded-full py-4 px-4
                     shadow-xl   -top-2 cursor-pointer
                     ${
                       dele
                         ? "right-4 bg-red-500 hover:bg-red-700"
                         : "left-4 bg-pink-500"
                     }
                     `}
                    >
                      {/* <!-- svg  --> */}
                      {dele ? (
                        <>
                          <span
                            onClick={(e) =>
                              deleteRoom(item?._id, item?.roomCode)
                            }
                            className="w-8 h-8 text-white  "
                          >
                            <MdOutlineDeleteSweep className="w-full h-full" />
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-8 h-8 text-white">
                            <NavLink to={`/room/view/${item?._id}`}>
                              <MdHome className="w-full h-full" />
                            </NavLink>
                          </span>
                        </>
                      )}
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg> */}
                    </div>
                    <div class="mt-8">
                      <p class="text-xl font-semibold my-2">
                        Phòng {item?.roomCode}
                      </p>
                      {/* <div class="flex space-x-2 text-gray-400 text-sm">
           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p>Marketing Team</p>
          </div> */}
                      <div class="flex space-x-2 text-gray-400 text-sm my-3">
                        {/* <!-- svg  --> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p>1 Weeks Left</p>
                      </div>
                      <div class="border-t-2"></div>

                      <div class="flex justify-between">
                        <div class="my-2">
                          <p class="font-semibold text-base mb-2">Thành viên</p>
                          <div class="flex space-x-2">
                            <img
                              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                              class="w-6 h-6 rounded-full"
                            />
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Woman_7.jpg"
                              class="w-6 h-6 rounded-full"
                            />
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSqK0tVELGWDYAiUY1oRrfnGJCKSKv95OGUtm9eKG9HQLn769YDujQi1QFat32xl-BiY&usqp=CAU"
                              class="w-6 h-6 rounded-full"
                            />
                          </div>
                        </div>
                        <div class="my-2">
                          <p class="font-semibold text-base mb-2">Xem Thêm</p>
                          <div class="text-base text-gray-400 font-semibold">
                            <p>...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default BoxRoom;
