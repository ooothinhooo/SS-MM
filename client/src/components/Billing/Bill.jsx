import React, { useEffect, useState } from "react";
import { GET_ONE_ROOM } from "../../API/Motels/GetOneRoom.api.js";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { UPDATE_BILL } from "../../API/Bill/updateBill.api.js";
import { DELETE_BILL } from "../../API/Bill/deleteBill.api.js";
import { DELETE_ALL_BILL } from "../../API/Bill/deteleAllBill.api.js";
import { NumericFormat } from "react-number-format";

function Bill({ user, roomId }) {
  const [room, setRoom] = useState();
  const [bill, setBill] = useState();

  const getAPI_Room = async () => {
    try {
      const result = await GET_ONE_ROOM(user?.token, roomId);
      setRoom(result.data.data);
      setBill(result.data.data?.bill);
      console.log(result.data.data?.bill);
    } catch (error) {}
  };

  const updateBill = async (month, oldEle, newEle, oldWater, newWater) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: `Thay đổi chỉ số điện/nước cho hoá đơn tháng ${month}`,
        html: `
          <div class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Chỉ Số Điện Cũ
              </label>
              <input 
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="oldEle"
              type="number" 
              value=${oldEle}
              placeholder="Nhập số điện" 
              />
          </div>
          <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                  Chỉ Số Điện Mới
              </label>
              <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="newEle"
                  value=${newEle}
                  type="number" 
                  placeholder="Nhập số điện" 
              />
          </div>
      </div>
  </div>
  <div class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Chỉ Số Nước Cũ
          </label>
          <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          id="oldWater"
          type="number" 
          value=${oldWater}
          placeholder="Nhập số nước"  />
        
      </div>
      <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
          Chỉ Số Nước Mới
          </label>
          <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="newWater"
              value=${newWater}
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
          month: month,
          oldEle: formValues[0],
          newEle: formValues[1],
          oldWater: formValues[2],
          newWater: formValues[3],
        };
        POSTAPI(obj);
      }
    } catch (error) {}
  };

  const POSTAPI = async (formValues) => {
    try {
      var obj = {
        ...formValues,
      };
      console.log(obj);
      if (obj) {
        const result = await UPDATE_BILL(user?.token, roomId, obj);
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
        getAPI_Room();
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

  const deteleBill = async (month, oldEle, newEle, oldWater, newWater) => {
    try {
      console.log("clic");
      const result = await DELETE_BILL(user?.token, roomId, month);
      console.log(result);
      if (result?.data?.status == 200) {
        toast.success("Xoá  thành công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getAPI_Room();
      }
    } catch (error) {}
  };
  const deleteAllBill = async () => {
    try {
      console.log("clic");
      const result = await DELETE_ALL_BILL(user?.token, roomId);
      console.log(result);
      if (result?.data?.status == 200) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getAPI_Room();
      }
    } catch (error) {}
  };
  const QuetionDeleteALlBill = async () => {
    try {
      Swal.fire({
        title: "Bạn Chắc Chắn",
        text: "Muốn Xoá Tất Cả Các Bill",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteAllBill();
          // Swal.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // )
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getAPI_Room();
  }, []);
  return (
    <div>
      <ToastContainer />

      <div>
        <div>
          <div class="flex flex-col">
            <div className="w-full  p-1 justify-start items-center flex">
              <div class="w-full flex justify-start bg-gray-200 rounded-md px-2">
                <div class="w-full flex items-center justify-around space-x-5 py-1.5 px-2">
                  <div class="flex items-center flex-1 min-w-0">
                    <img
                      src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/SlackLogo_CompanyNews_SecondaryAubergine_Hero.jpg?d=500x500&amp;f=fill"
                      class="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                    />
                    <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                      <p class="text-lg font-bold text-gray-800 truncate">
                        DANH MỤC CHỈNH SỬA HOÁ ĐƠN CHO PHÒNG {room?.roomCode}
                      </p>
                      <p class="text-blue-600 text-md"></p>
                    </div>
                  </div>
                  <div class="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                    <p
                      onClick={(e) => QuetionDeleteALlBill()}
                      class="bg-red-600 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 hover:bg-red-700 rounded-lg cursor-pointer"
                    >
                      Xoá tất cả các bill
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="-m-1.5 overflow-x-auto">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          Tháng
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          CS Điện Cũ
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          CS Điện Mới
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          CS Nước Cũ
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          CS Nước Mới
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          Sử dụng
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      {bill?.map((i, index) => {
                        return (
                          <>
                            <tr>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {i?.month}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={i?.oldEle}
                                  thousandSeparator
                                  displayType="text"
                                />
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={i?.newEle}
                                  thousandSeparator
                                  displayType="text"
                                />
                              </td>

                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={i?.oldWater}
                                  thousandSeparator
                                  displayType="text"
                                />
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={i?.newWater}
                                  thousandSeparator
                                  displayType="text"
                                />
                              </td>

                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <span>
                                  {" "}
                                  {i?.newEle - i?.oldEle} {i?.eleUnit}
                                </span>{" "}
                                |{" "}
                                <span>
                                  {" "}
                                  {i?.newWater - i?.oldWater} {i?.waterUnit}
                                </span>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <div className="flex justify-center items-center gap-1">
                                  <div>
                                    <p class="group max-w-max relative flex flex-col items-center justify-center rounded-full border border-gray-500 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-600">
                                      <button
                                        id="addbtn"
                                        onClick={(e) =>
                                          updateBill(
                                            i?.month,
                                            i?.oldEle,
                                            i?.newEle,
                                            i?.oldWater,
                                            i?.newWater
                                          )
                                        }
                                        className="cursor-pointer px-2  z-10 bg-blue-300 rounded-full hover:bg-blue-500"
                                      >
                                        <i className="text-xl ">
                                          <AiOutlineEdit />
                                        </i>
                                      </button>
                                      <div class="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] z-1 group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <div class="flex max-w-xs flex-col items-center">
                                          <div class="rounded bg-gray-100 px-2 text-xs text-gray-800  text-center shadow-lg">
                                            Cập nhật
                                          </div>
                                          <div class="clip-bottom h-2 w-4 "></div>
                                        </div>
                                      </div>
                                    </p>
                                  </div>
                                  <div>
                                    <p class="group max-w-max relative flex flex-col items-center justify-center rounded-full border border-gray-500 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-600">
                                      <button
                                        id="addbtn"
                                        onClick={(e) =>
                                          deteleBill(
                                            i?.month,
                                            i?.oldEle,
                                            i?.newEle,
                                            i?.oldWater,
                                            i?.newWater
                                          )
                                        }
                                        className="cursor-pointer px-2 z-10 bg-blue-300 rounded-full hover:bg-blue-500"
                                      >
                                        <i className="text-xl">
                                          <AiOutlineDelete />
                                        </i>
                                      </button>
                                      <div class="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] z-1 group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <div class="flex max-w-xs flex-col items-center">
                                          <div class="rounded bg-gray-100 px-2 text-xs text-gray-800  text-center shadow-lg">
                                            Xoá
                                          </div>
                                          <div class="clip-bottom h-2 w-4 "></div>
                                        </div>
                                      </div>
                                    </p>
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
  );
}

export default Bill;
