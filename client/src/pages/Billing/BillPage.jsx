import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CREATE_BILL } from "../../API/Bill/createBill.api.js";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";

function BillPage({ user }) {
  const [data, setData] = useState();
  const [roomId, setRoomId] = useState();
  const [room, setRoom] = useState();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };
  const POSTAPI = async (roomId) => {
    try {
      const result = await CREATE_BILL(user?.token, roomId, data);
      console.log(result);
      toast.success("Thêm  thành công", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      GETAPI_ROOM();
    } catch (error) {}
  };

  const GETAPI_ROOM = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      setRoom(result.data.data.rooms);
    } catch (error) {}
  };
  useEffect(() => {
    GETAPI_ROOM();
    console.log(room);
  }, []);
  return (
    <div>
      <ToastContainer />

      <div className="mt-20 mr-20 w-full flex justify-center items-center ">
        <div className="w-[95%] p-6 h-full shadow-xl rounded-md">
          <div>
            <p className="text-left uppercase text-lg font-bold">
              Thêm Chỉ Số Điện và Nước Cho Phòng Trọ
            </p>
            <div className="w-full border-b bottom-6 bg-blue-gray-300 my-1"></div>
            <div
              class="mb-4 rounded-lg bg-blue-gray-50 px-6 py-2 text-base text-secondary-800 text-left flex  "
              role="alert"
            >
              <p className="mr-4 flex items-start">
                {" "}
                Chọn Tháng Cần Thêm Các Chỉ Số
              </p>
              <div>
                <input
                  type="month"
                  name="month"
                  value={data?.month}
                  onChange={handleChange}
                  class="peer block w-full font-bold  rounded-md appearance-none  border-gray-500 bg-transparent py-2.5 px-2 text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Chọn Tháng
                </label>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full text-left text-md font-light rounded-md">
                      <thead class="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" class="px-6 py-4 bg-[#93C6E7]">
                            Phòng
                          </th>
                          <th scope="col" class="px-6 py-4 bg-[#FFF4D2]">
                            CS Điện Cũ
                          </th>
                          <th scope="col" class="px-6 py-4 bg-[#FFF4D2]">
                            CS Điện Mới
                          </th>

                          <th scope="col" class="px-6 py-4 bg-[#AEE2FF]">
                            CS Nước Cũ
                          </th>
                          <th scope="col" class="px-6 py-4 bg-[#AEE2FF]">
                            CS Nước Mới
                          </th>
                          <th scope="col" class="px-6 py-4 bg-[#BCEAD5]">
                            Tổng Lượng Điện/Nước SD
                          </th>
                          <th scope="col" class="px-6 py-4"></th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {room?.map((i, index) => {
                          return (
                            <>
                              <tr
                                key={i._id}
                                class={`${
                                  roomId == i?._id
                                    ? "border-double border-4 border-green-500"
                                    : "border-double border-4 border-black"
                                } transition duration-300 ease-in-out hover:bg-neutral-100 `}
                              >
                                <td class="whitespace-nowrap px-6 py-2 font-medium bg-[#93C6E7]">
                                  {i?.roomCode}
                                </td>
                                <td class="whitespace-nowrap px-6 py-2 bg-[#FFF4D2] border-x-2 border-gray-600 ">
                                  {roomId == i?._id ? (
                                    <>
                                      <input
                                        type="number"
                                        name="oldEle"
                                        value={
                                          data?.oldEle
                                            ? data?.oldEle
                                            : i?.bill[i?.bill.length - 1]
                                                ?.newEle
                                        }
                                        onChange={handleChange}
                                        class="px-3 py-2 rounded-md  w-[5.5em] "
                                      />
                                    </>
                                  ) : (
                                    <>{i?.bill[i?.bill.length - 1]?.newEle}</>
                                  )}
                                </td>
                                <td class="whitespace-nowrap px-6 py-2 bg-[#FFF4D2] border-x-2 border-gray-600">
                                  {roomId == i?._id ? (
                                    <>
                                      <input
                                        type="number"
                                        name="newEle"
                                        value={data?.newEle}
                                        onChange={handleChange}
                                        class="px-3 py-2 rounded-md  w-[5.5em]"
                                      />
                                    </>
                                  ) : (
                                    <>[]</>
                                  )}
                                </td>
                                <td class="whitespace-nowrap px-6 py-2  bg-[#AEE2FF] border-x-2 border-gray-600">
                                  {roomId == i?._id ? (
                                    <>
                                      <input
                                        type="number"
                                        name="oldWater"
                                        value={
                                          data?.oldWater
                                            ? data?.oldWater
                                            : i?.bill[i?.bill.length - 1]
                                                ?.newWater
                                        }
                                        onChange={handleChange}
                                        class="px-3 py-2 rounded-md  w-[5.5em]"
                                      />
                                    </>
                                  ) : (
                                    <>{i?.bill[i?.bill.length - 1]?.newWater}</>
                                  )}
                                </td>
                                <td class="whitespace-nowrap px-6 py-2 bg-[#AEE2FF] border-x-2 border-gray-600">
                                  {roomId == i?._id ? (
                                    <>
                                      <input
                                        type="number"
                                        name="newWater"
                                        value={data?.newWater}
                                        onChange={handleChange}
                                        class="px-3 py-2 rounded-md  w-[5.5em]"
                                      />
                                    </>
                                  ) : (
                                    <>[]</>
                                  )}
                                </td>

                                <td class="whitespace-nowrap px-6 py-2 bg-[#BCEAD5] border-x-2 border-gray-600">
                                  {data?.newEle - data?.oldEle} | 7 Khối
                                </td>
                                <td class="whitespace-nowrap px-6 py-2">
                                  {roomId == i?._id ? (
                                    <div className="flex gap-1">
                                      <button
                                        onClick={(e) => POSTAPI(i?._id)}
                                        class="group relative  w-[3em] overflow-hidden rounded-md bg-white text-lg shadow"
                                      >
                                        <div class="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                        <span class="relative text-black group-hover:text-white">
                                          Lưu
                                        </span>
                                      </button>
                                      <button
                                        onClick={(e) => setRoomId("")}
                                        class="group relative  w-[3em] overflow-hidden rounded-md bg-red-400 text-lg shadow"
                                      >
                                        {/* <div class="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div> */}
                                        <span class="relative text-black ">
                                          Huỷ
                                        </span>
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <button
                                        onClick={(e) => setRoomId(i?._id)}
                                        class="group relative  w-[4em] overflow-hidden rounded-md bg-white text-lg shadow"
                                      >
                                        <div class="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                        <span class="relative text-black group-hover:text-white">
                                          Thêm
                                        </span>
                                      </button>
                                    </>
                                  )}
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
        </div>
      </div>
    </div>
  );
}

export default BillPage;
