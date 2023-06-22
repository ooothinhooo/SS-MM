import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CREATE_BILL } from "../../API/Bill/createBill.api.js";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { AiOutlineFileAdd, AiOutlineEdit } from "react-icons/ai";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import { GET_ONE_ROOM } from "../../API/Motels/GetOneRoom.api.js";
import { NumericFormat } from "react-number-format";
function BillPage({ user }) {
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
      // console.log("obj da truye", formValues);
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
      // setRoom(result.data.data);
      const array = result.data.data.sort((a, b) =>
        String(a.roomCode) > String(b.roomCode) ? 1 : -1
      );
      setRoom(array);
    } catch (error) {}
  };
  const Render = async (data, x) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: `Nhập chỉ số điện/nước cho phòng ${data?.roomCode}`,
        width: 650,
        // background: "#f13532",
        confirmButtonText: `Xác Nhận Tạo Hoá Đơn `,
        html: `
       <div class="flex justify-center items-center gap-4">
       <div class="mb-6"> Tiền Phòng: ${data?.roomFee} </div>
       <div class="mb-6"> Thành viên: ${data?.member?.length} </div>
       </div>
 <div class="w-full text-sm mb-6"> ${data?.services?.map((i) => {
   return ` <span className="text-red-700"> ${i.name}: ${i.value}/${
     i.unit == "free"
       ? "Miễn Phí"
       : i.unit == "room"
       ? "Phòng"
       : i.unit == "member"
       ? "Trên Người"
       : i.unit == "met"
       ? "Khối"
       : i.unit == "kwh"
       ? "Kwh"
       : ""
   }</span>`;
 })} </div>

 ${
   data?.services?.find((i) => {
     return i.name === "Tiền Điện";
   })?.unit === "free" ||
   data?.services?.find((i) => {
     return i.name === "Tiền Điện";
   })?.unit === "member" ||
   data?.services?.find((i) => {
     return i.name === "Tiền Điện";
   })?.unit === "room"
     ? ``
     : `
   <div class="w-full max-w-xl flex justify-center items-center">
   <div class="flex  w-full -mx-3 mb-2 ">
     <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Chỉ Số Điện Cũ </label>
       <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="oldEle" type="number" value=${
         data?.bill != "" ? data?.bill[data?.bill.length - 1].newEle : 0
       } placeholder="Nhập số điện" />
     </div>
     <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name"> Chỉ Số Điện Mới </label>
       <input
       class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
       id="newEle"
       type="number"
       placeholder="Nhập số điện"
     />
     
      
     </div>
     <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name"> Đơn Vị Điện </label>
       <p class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  >
       <span>
       ${
         data?.services?.find((i) => {
           return i.name === "Tiền Điện";
         })?.value
       }
       </span>
       <span>/</span>
       <span>
       ${
         data?.services?.find((i) => {
           return i.name === "Tiền Điện";
         })?.unit
       }
       </span>
       </p>
     </div>
   </div>
 </div>
   `
 }

${
  data?.services?.find((i) => {
    return i.name === "Tiền Nước";
  })?.unit === "free" ||
  data?.services?.find((i) => {
    return i.name === "Tiền Nước";
  })?.unit === "member" ||
  data?.services?.find((i) => {
    return i.name === "Tiền Nước";
  })?.unit === "room"
    ? ``
    : `
   <div class="w-full max-w-xl flex justify-center items-center">
   <div class="flex  w-full -mx-3 mb-2 ">
     <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
     <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Chỉ Số Nước Cũ </label>
     <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      id="oldWater" type="number" 
     value=${data?.bill != "" ? data?.bill[data?.bill.length - 1].newWater : 0} 
     placeholder="Nhập số nước" />
     </div>
     <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
     <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name"> Chỉ Số Nước Mới </label>
     <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" // class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="newWater" type="number" placeholder="Nhập số nước" />
     </div>
     <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name" >Đơn Vị Nước </label>
       <p class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  >
        <span>
        ${
          data?.services?.find((i) => {
            return i.name === "Tiền Nước";
          })?.value
        }
        </span>
        <span>/</span>
        <span>
        ${
          data?.services?.find((i) => {
            return i.name === "Tiền Nước";
          })?.unit
        }
        </span>
        </p>
     </div>
   </div>
 </div>
   `
}




   `,
        focusConfirm: false,
        preConfirm: () => {
          let elePrice = data?.services?.find((i) => {
            return i.name === "Tiền Điện";
          })?.value;
          let waterPrice = data?.services?.find((i) => {
            return i.name === "Tiền Nước";
          })?.value;
          let waterUnit = data?.services?.find((i) => {
            return i.name === "Tiền Nước";
          })?.unit;
          let eleUnit = data?.services?.find((i) => {
            return i.name === "Tiền Điện";
          })?.unit;
          const filteredArr = data?.services?.filter((item) => {
            return item.name !== "Tiền Điện" && item.name !== "Tiền Nước";
          });

          if (eleUnit != "free" && eleUnit != "member" && eleUnit != "room") {
            var oldEle = document.getElementById("oldEle").value;
            var newEle = document.getElementById("newEle").value;
          } else {
            var oldEle = 0;
            var newEle = 0;
          }
          if (
            waterUnit != "free" &&
            waterUnit != "member" &&
            waterUnit != "room"
          ) {
            var oldWater = document.getElementById("oldWater").value;
            var newWater = document.getElementById("newWater").value;
          } else {
            var oldWater = 0;
            var newWater = 0;
          }
          return [
            oldEle,
            newEle,
            oldWater,
            newWater,

            data.roomFee,
            elePrice,
            eleUnit,
            waterPrice,
            waterUnit,
            filteredArr,
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
          roomFee: formValues[4],
          elePrice: formValues[5],
          eleUnit: formValues[6],
          waterPrice: formValues[7],
          waterUnit: formValues[8],
          service: formValues[9],
          status: false,
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

      <div className="w-full flex justify-center items-center ">
        <div className="w-full px-2 mr-2 h-full shadow-xl rounded-md ">
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
                {/* <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Chọn Tháng
                </label> */}
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col">
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
                            Phòng
                          </th>
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
                            Dịch Vụ
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
                        {room?.map((i, index) => {
                          return (
                            <>
                              <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {i?.roomCode}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.month
                                    : ""}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  <NumericFormat
                                    value={
                                      i?.bill != ""
                                        ? i?.bill[i?.bill.length - 1]?.oldEle
                                        : ""
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  <NumericFormat
                                    value={
                                      i?.bill != ""
                                        ? i?.bill[i?.bill.length - 1]?.newEle
                                        : ""
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  <NumericFormat
                                    value={
                                      i?.bill != ""
                                        ? i?.bill[i?.bill.length - 1]?.oldWater
                                        : ""
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  <NumericFormat
                                    value={
                                      i?.bill != ""
                                        ? i?.bill[i?.bill.length - 1]?.newWater
                                        : ""
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  <NumericFormat
                                    value={
                                      i?.bill != ""
                                        ? i?.bill[i?.bill.length - 1]?.newEle -
                                          i?.bill[i?.bill.length - 1]?.oldEle
                                        : ""
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />{" "}
                                  {i?.bill[i?.bill?.length - 1]?.eleUnit ==
                                  "free"
                                    ? "Miễn Phí"
                                    : i?.bill[i?.bill?.length - 1]?.eleUnit ==
                                      "room"
                                    ? "Phòng"
                                    : i?.bill[i?.bill?.length - 1]?.eleUnit ==
                                      "member"
                                    ? "Trên Người"
                                    : i?.bill[i?.bill?.length - 1]?.eleUnit ==
                                      "met"
                                    ? "Khối"
                                    : i?.bill[i?.bill?.length - 1]?.eleUnit ==
                                      "kwh"
                                    ? "Kwh"
                                    : ""}
                                  {/* {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.eleUnit
                                    : ""}{" "} */}{" "}
                                  -{" "}
                                  <NumericFormat
                                    value={
                                      i?.bill != ""
                                        ? i?.bill[i?.bill.length - 1]
                                            ?.newWater -
                                          i?.bill[i?.bill.length - 1]?.oldWater
                                        : ""
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />{" "}
                                  {/* {i?.bill != ""
                                    ? i?.bill[i?.bill.length - 1]?.waterUnit
                                    : ""} */}
                                  {i?.bill[i?.bill?.length - 1]?.waterUnit ==
                                  "free"
                                    ? "Miễn Phí"
                                    : i?.bill[i?.bill?.length - 1]?.waterUnit ==
                                      "room"
                                    ? "Phòng"
                                    : i?.bill[i?.bill?.length - 1]?.waterUnit ==
                                      "member"
                                    ? "Trên Người"
                                    : i?.bill[i?.bill?.length - 1]?.waterUnit ==
                                      "met"
                                    ? "Khối"
                                    : i?.bill[i?.bill?.length - 1]?.waterUnit ==
                                      "kwh"
                                    ? "Kwh"
                                    : i?.bill[i?.bill?.length - 1]?.waterUnit}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  {i?.bill[i?.bill?.length - 1]?.service?.map(
                                    (item) => {
                                      return (
                                        <>
                                          <p className="">
                                            <span className="italic font-bold text-[13px]">
                                              {item.name}
                                            </span>{" "}
                                            ={" "}
                                            <NumericFormat
                                              value={item?.value}
                                              thousandSeparator
                                              displayType="text"
                                            />
                                            <span className="italic font-bold text-[13px]">
                                              đ
                                            </span>{" "}
                                            <span className="italic font-bold text-[16px]">
                                              /
                                            </span>
                                            <span className="italic  text-[13px]">
                                              {item.unit}
                                            </span>
                                          </p>
                                        </>
                                      );
                                    }
                                  )}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                  <div className="flex  justify-between items-center w-full">
                                    <div>
                                      <p class="group max-w-max relative flex flex-col items-center justify-center rounded-full border border-gray-500 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-600">
                                        <button
                                          id="addbtn"
                                          onClick={(e) => getAPI_Room(i?._id)}
                                          className="cursor-pointer px-2 z-10 bg-blue-300 rounded-full hover:bg-blue-500"
                                        >
                                          <i className="text-xl">
                                            <AiOutlineFileAdd />
                                          </i>
                                        </button>
                                        <div class="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] z-1 group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                                          <div class="flex max-w-xs flex-col items-center">
                                            <div class="rounded bg-gray-100 px-2 text-xs text-gray-800  text-center shadow-lg">
                                              Thêm
                                            </div>
                                            <div class="clip-bottom h-2 w-4 "></div>
                                          </div>
                                        </div>
                                      </p>
                                    </div>
                                    <div>
                                      <NavLink
                                        to={`/bill/${i?._id}/${i?.roomCode}`}
                                      >
                                        <p class="group max-w-max relative flex flex-col items-center justify-center rounded-full border border-gray-500 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-600">
                                          <button className="cursor-pointer px-2 z-10 bg-blue-300 rounded-full hover:bg-blue-500">
                                            <i className="text-xl">
                                              <AiOutlineEdit />
                                            </i>
                                          </button>

                                          <div class="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] z-11 group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            <div class="flex max-w-xs flex-col items-center">
                                              <div class="rounded  px-2 text-xs text-gray-800  text-center shadow-lg">
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

export default BillPage;
