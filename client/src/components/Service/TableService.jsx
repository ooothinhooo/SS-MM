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
function TableService({ user }) {
  const [roomId, setRoomId] = useState();
  const [room, setRoom] = useState();
  const [dataRoom, setDataRoom] = useState();

  const GETAPI_ROOM = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      console.log("Table service", result.data.data);
      // setRoom(result.data.data);
      const array = result.data.data.sort((a, b) =>
        String(a.roomCode) > String(b.roomCode) ? 1 : -1
      );
      setRoom(array);
    } catch (error) {}
  };

  useEffect(() => {
    GETAPI_ROOM();
  }, []);

  return (
    <div>
      <ToastContainer />

      <div className=" w-full flex justify-center items-center ">
        <div className="w-full px-4 py-2  ">
          <div className="w-full h-full">
            <div class="flex flex-col">
              <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 w-full inline-block align-middle">
                  <div class="p-2 border rounded-lg shadow overflow-scroll h-[540px]">
                    <table class="w-full text-sm text-left text-black rounded-lg">
                      <thead class="text-xs text-blue uppercase bg-blue-50  ">
                        <tr>
                          <th
                            rowspan="2"
                            scope="col"
                            class="text-center   border-2 border-gray-500"
                          >
                            Phòng
                          </th>
                          <th
                            rowspan="2"
                            scope="col"
                            class="text-center py-2 px-1 border-2 border-gray-500"
                          >
                            Tháng
                          </th>
                          <th
                            colspan="2"
                            scope="col"
                            class="text-center py-2 px-1 border-2 border-gray-500"
                          >
                            Tiền Điện
                          </th>
                          <th
                            colspan="2"
                            scope="col"
                            class="text-center py-2 px-1 border-2 border-gray-500"
                          >
                            Tiền Nước
                          </th>
                          <th
                            scope="col"
                            rowspan="2"
                            class="text-center py-2 px-1 border-2 border-gray-500"
                          >
                            Dịch vụ Khác
                          </th>
                        </tr>
                        <tr>
                          <th
                            scope="col"
                            class="text-center py-2 px-1 border-2 border-gray-500"
                          >
                            Sử dụng
                          </th>
                          <th
                            scope="col"
                            class="text-center py-2 px-1 border-2 border-gray-500"
                          >
                            Thành Tiền
                          </th>
                          <th
                            scope="col"
                            class="text-center py-2 px-1 border-2 border-gray-500"
                          >
                            Sử dụng
                          </th>

                          <th
                            scope="col"
                            class="text-center py-2 px-1 border-2 border-gray-500"
                          >
                            Thành Tiền
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {room?.map((item, index) => {
                          return (
                            <>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600">
                                <td class="px-4 py-2 font-bold  border-gray-400 border-2 border-x">
                                  {item?.roomCode}
                                </td>
                                <td class="px-4 py-2 border-2 border-gray-400 border-x">
                                  {item?.bill[item?.bill?.length - 1]?.month}
                                </td>
                                <td class="px-4 py-2 border-2 border-gray-400 border-x">
                                  <NumericFormat
                                    value={
                                      Number(
                                        item?.bill[item?.bill?.length - 1]
                                          ?.newEle
                                      ) -
                                      Number(
                                        item?.bill[item?.bill?.length - 1]
                                          ?.oldEle
                                      )
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />{" "}
                                  <span className="italic font-bold text-[13px]">
                                    {/* {
                                      item?.bill[item?.bill?.length - 1]
                                        ?.eleUnit
                                    } */}

                                    {item?.bill[item?.bill?.length - 1]
                                      ?.eleUnit == "free"
                                      ? "Miễn Phí"
                                      : item?.bill[item?.bill?.length - 1]
                                          ?.eleUnit == "room"
                                      ? "Phòng"
                                      : item?.bill[item?.bill?.length - 1]
                                          ?.eleUnit == "member"
                                      ? "Người"
                                      : item?.bill[item?.bill?.length - 1]
                                          ?.eleUnit == "met"
                                      ? "Khối"
                                      : item?.bill[item?.bill?.length - 1]
                                          ?.eleUnit == "kwh"
                                      ? "Kwh"
                                      : ""}
                                  </span>
                                </td>
                                <td class="px-4 py-2 border-2 border-gray-400 border-x">
                                  <NumericFormat
                                    value={
                                      item?.bill[item?.bill?.length - 1]
                                        ?.eleUnit == "kwh"
                                        ? (Number(
                                            item?.bill[item?.bill?.length - 1]
                                              ?.newEle
                                          ) -
                                            Number(
                                              item?.bill[item?.bill?.length - 1]
                                                ?.oldEle
                                            )) *
                                          Number(
                                            item?.bill[item?.bill?.length - 1]
                                              ?.elePrice
                                          )
                                        : item?.bill[item?.bill?.length - 1]
                                            ?.eleUnit == "room"
                                        ? Number(
                                            item?.bill[item?.bill?.length - 1]
                                              ?.elePrice
                                          )
                                        : item?.bill[item?.bill?.length - 1]
                                            ?.eleUnit == "member"
                                        ? Number(item.member.length) *
                                          Number(
                                            item?.bill[item?.bill?.length - 1]
                                              ?.elePrice
                                          )
                                        : 0
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                  <span className="italic font-bold text-[13px]">
                                    đ
                                  </span>
                                </td>
                                <td class="px-4 py-2 border-2 border-gray-400 border-x">
                                  <NumericFormat
                                    value={
                                      Number(
                                        item?.bill[item?.bill?.length - 1]
                                          ?.newWater
                                      ) -
                                      Number(
                                        item?.bill[item?.bill?.length - 1]
                                          ?.oldWater
                                      )
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />{" "}
                                  <span className="italic font-bold text-[13px]">
                                    {/* {
                                      item?.bill[item?.bill?.length - 1]
                                        ?.waterUnit
                                    } */}
                                    {item?.bill[item?.bill?.length - 1]
                                      ?.waterUnit == "free"
                                      ? "Miễn Phí"
                                      : item?.bill[item?.bill?.length - 1]
                                          ?.waterUnit == "room"
                                      ? "Phòng"
                                      : item?.bill[item?.bill?.length - 1]
                                          ?.waterUnit == "member"
                                      ? "Người"
                                      : item?.bill[item?.bill?.length - 1]
                                          ?.waterUnit == "met"
                                      ? "Khối"
                                      : item?.bill[item?.bill?.length - 1]
                                          ?.waterUnit == "kwh"
                                      ? "Kwh"
                                      : ""}
                                  </span>
                                </td>
                                <td class="px-4 py-2 border-2 border-gray-400 border-x">
                                  <NumericFormat
                                    value={
                                      item?.bill[item?.bill?.length - 1]
                                        ?.waterUnit == "met"
                                        ? (Number(
                                            item?.bill[item?.bill?.length - 1]
                                              ?.newWater
                                          ) -
                                            Number(
                                              item?.bill[item?.bill?.length - 1]
                                                ?.oldWater
                                            )) *
                                          Number(
                                            item?.bill[item?.bill?.length - 1]
                                              ?.waterPrice
                                          )
                                        : item?.bill[item?.bill?.length - 1]
                                            ?.waterUnit == "room"
                                        ? Number(
                                            item?.bill[item?.bill?.length - 1]
                                              ?.waterPrice
                                          )
                                        : item?.bill[item?.bill?.length - 1]
                                            ?.waterUnit == "member"
                                        ? Number(item.member.length) *
                                          Number(
                                            item?.bill[item?.bill?.length - 1]
                                              ?.waterPrice
                                          )
                                        : 0
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                  <span className="italic font-bold text-[13px]">
                                    đ
                                  </span>
                                </td>
                                <td class="px-4 py-2 border-2 border-gray-400 border-x">
                                  {item?.bill[
                                    item?.bill?.length - 1
                                  ]?.service?.map((i) => {
                                    return (
                                      <>
                                        <p className="">
                                          <span className="italic font-bold text-[13px]">
                                            {i.name}
                                          </span>{" "}
                                          ={" "}
                                          <NumericFormat
                                            value={i?.value}
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
                                            {i.unit == "free"
                                              ? "Miễn Phí"
                                              : i.unit == "room"
                                              ? "Phòng"
                                              : i.unit == "member"
                                              ? "Người"
                                              : i.unit == "met"
                                              ? "Khối"
                                              : i.unit == "kwh"
                                              ? "Kwh"
                                              : ""}
                                          </span>
                                        </p>
                                      </>
                                    );
                                  })}
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
