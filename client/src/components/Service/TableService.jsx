import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CREATE_BILL } from "../../API/Bill/createBill.api.js";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { AiOutlineFileAdd, AiOutlineEdit } from "react-icons/ai";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import { GET_ONE_ROOM } from "../../API/Motels/GetOneRoom.api.js";
function TableService({ user }) {
  const [month, setMonth] = useState();
  const [value, setValue] = useState();
  const [data, setData] = useState({});

  const [roomId, setRoomId] = useState();
  const [room, setRoom] = useState();
  const [dataRoom, setDataRoom] = useState();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };
  const POSTAPI = async (roomId, formValues) => {
    try {
      console.log("obj da truye", formValues);
      var obj = {
        ...formValues,
        ...data,
      };
      console.log(obj);
      if (obj) {
        const result = await CREATE_BILL(user?.token, roomId, obj);
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
      } else {
        toast.error("Thêm Thất Bại", {
          position: "top-right",
          autoClose: 1500,
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
  const getAPI_Room = async (id) => {
    try {
      if (data?.month) {
        const result = await GET_ONE_ROOM(user?.token, id);
        if (result.status === 200) {
          if (result.data.status) {
            // setDataRoom(result.data.data);
            console.log(result?.data.data);
            if (
              !result?.data.data.bill.find((item) => item.month == data?.month)
            ) {
              Render(result.data.data);
            } else {
              toast.error(`Chỉ số tháng ${data?.month} đã được thêm`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          }
        }
      } else {
        toast.error(`Vui lòng chọn tháng cần thêm `, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      //  getAPI_Room()
    } catch (error) {}
  };

  const GETAPI_ROOM = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      console.log(result.data.data);
      setRoom(result.data.data);
    } catch (error) {}
  };
  const Render = async (data) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: `Nhập chỉ số điện/nước cho phòng ${data?.roomCode}`,
        html: `
          <div class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-2" for="grid-first-name">
                  Chỉ Số Điện Cũ
              </label>
              <input 
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="oldEle"
              type="number" 
              value=${
                data?.bill != "" ? data?.bill[data?.bill.length - 1].newEle : 0
              }
              placeholder="Nhập số điện" 
              />
          </div>
          <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-2" for="grid-last-name">
                  Chỉ Số Điện Mới
              </label>
              <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="newEle"
                  type="number" 
                  placeholder="Nhập số điện" 
              />
          </div>
      </div>
  </div>
  <div class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-2" for="grid-first-name">
          Chỉ Số Nước Cũ
          </label>
          <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          id="oldWater"
          type="number" 
          value=${
            data?.bill != "" ? data?.bill[data?.bill.length - 1].newWater : 0
          }
          placeholder="Nhập số nước"  />
        
      </div>
      <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-2" for="grid-last-name">
          Chỉ Số Nước Mới
          </label>
          <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="newWater"
              type="number" 
              placeholder="Nhập số nước" 
          />
      </div>
  </div>
  </div> `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("oldEle").value,
            document.getElementById("newEle").value,
            document.getElementById("oldWater").value,
            document.getElementById("newWater").value,
          ];
        },
      });

      if (formValues) {
        // Swal.fire(JSON.stringify(formValues))
        var obj = {
          oldEle: formValues[0],
          newEle: formValues[1],
          oldWater: formValues[2],
          newWater: formValues[3],
        };
        POSTAPI(data?._id, obj);
      }
    } catch (error) {}
  };
  useEffect(() => {
    GETAPI_ROOM();
  }, [data, value]);
  return (
    <div>
      <ToastContainer />

      <div className=" w-full flex justify-center items-center ">
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
                <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-[10px] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Chọn Tháng
                </label>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col">
              <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg shadow overflow-scroll h-[440px] dark:border-gray-700 dark:shadow-gray-900">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                      <thead class="bg-gray-50 dark:bg-gray-700 text-[10px]">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase dark:text-gray-400"
                          >
                            Phòng
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase dark:text-gray-400"
                          >
                            Tháng
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase dark:text-gray-400"
                          >
                            CS Điện Cũ
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase dark:text-gray-400"
                          >
                            CS Điện Mới
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase dark:text-gray-400"
                          >
                            CS Nước Cũ
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase dark:text-gray-400"
                          >
                            CS Nước Mới
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase dark:text-gray-400"
                          >
                            Sử dụng
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase dark:text-gray-400"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                        {room?.map((i, index) => {
                          return (
                            <>
                              <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-[10px] font-medium text-gray-800 dark:text-gray-200">
                                  {i?.roomCode}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-[10px] font-medium text-gray-800 dark:text-gray-200">
                                  {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.month
                                    : ""}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                  {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.oldEle
                                    : ""}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                  {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.newEle
                                    : ""}
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                  {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.oldWater
                                    : ""}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                  {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.newWater
                                    : ""}
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                  {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.newEle -
                                      i?.bill[i?.bill.length - 1]?.oldEle
                                    : ""}{" "}
                                  (kWh) -{" "}
                                  {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.newWater -
                                      i?.bill[i?.bill.length - 1]?.oldWater
                                    : ""}{" "}
                                  Khối
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-[10px] font-medium">
                                  <div className="flex  justify-between items-center w-full">
                                    <div>
                                      <p class="group max-w-max relative flex flex-col items-center justify-center rounded-full border border-gray-500 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-600">
                                        <button
                                          id="addbtn"
                                          onClick={(e) => getAPI_Room(i?._id)}
                                          className="cursor-pointer p-2 z-10 bg-blue-300 rounded-full hover:bg-blue-500"
                                        >
                                          <i className="text-xl">
                                            <AiOutlineFileAdd />
                                          </i>
                                        </button>
                                        <div class="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] z-1 group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                                          <div class="flex max-w-xs flex-col items-center">
                                            <div class="rounded bg-gray-100 p-2 text-[10px] text-gray-800  text-center shadow-lg">
                                              Thêm
                                            </div>
                                            <div class="clip-bottom h-2 w-4 bg-gray-900"></div>
                                          </div>
                                        </div>
                                      </p>
                                    </div>
                                    <div>
                                      <NavLink
                                        to={`/bill/${i?._id}/${i?.roomCode}`}
                                      >
                                        <p class="group max-w-max relative flex flex-col items-center justify-center rounded-full border border-gray-500 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-600">
                                          <button className="cursor-pointer p-2 z-10 bg-blue-300 rounded-full hover:bg-blue-500">
                                            <i className="text-xl">
                                              <AiOutlineEdit />
                                            </i>
                                          </button>

                                          <div class="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] z-11 group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            <div class="flex max-w-xs flex-col items-center">
                                              <div class="rounded bg-gray-100 p-2 text-[10px] text-gray-800  text-center shadow-lg">
                                                Chỉnh sửa
                                              </div>
                                              <div class="clip-bottom h-2 w-4  "></div>
                                            </div>
                                          </div>
                                        </p>
                                      </NavLink>
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
        </div>
      </div>
    </div>
  );
}

export default TableService;
