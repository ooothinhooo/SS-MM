import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import { FIND_BILL } from "../../API/Api/FindRoomBill.api.js";

function ViewBillPage() {
  let { id, month } = useParams();
  const [room, setRoom] = useState();
  const [bill, setBill] = useState();
  // const value = JSON.parse(sessionStorage.getroom("pay"));
  const GETAPI = async () => {
    try {
      const result = await FIND_BILL(id, month);
      console.log(result?.data?.data);
      setRoom(result?.data?.data?.room);
      setBill(result?.data?.data?.result);
      console.log(room);
      console.log(bill);
    } catch (error) {}
  };

  useEffect(() => {
    GETAPI();
  }, []);
  const now = new Date(Date.now());
  const formattedDate = now.toLocaleString();
  console.log(id, month);
  return (
    <div>
      Xem chi tiết hoá đơn
      <div>
        <div>
          <div class=" w-full flex justify-center items-center">
            <div class="bg-white rounded-lg shadow-lg px-8 py-10 w-[90%]  mx-auto mb-4">
              <div class="flex rooms-center justify-between mb-8">
                <div class="flex rooms-center">
                  <img
                    class="h-8 w-8 mr-2"
                    src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                    alt="Logo"
                  />
                  <div class="text-gray-700 font-semibold text-lg">
                    {room?.motelId?.motelName}
                  </div>
                </div>
                <div class="text-gray-700">
                  <div class="font-bold text-xl mb-2 uppercase">
                    HOÁ ĐƠN TIỀN TRỌ PHÒNG{" "}
                    <span className="font-bold text-blue-700">
                      {room?.roomCode}
                    </span>{" "}
                  </div>
                  {/* <div class="text-sm">Date: 01/05/2023</div> */}
                  {/* <div class="text-sm">Invoice #: INV12345</div> */}
                </div>
              </div>
              <div class="border-b-2 border-gray-300  mb-2 ">
                <h2 class="text-2xl font-bold mb-2">
                  Hoá đơn tháng: {bill?.month}
                </h2>
                <p className="text-left md:flex justify-start items-center gap-4">
                  <p>Tên khách thuê:{room?.userSub?.fullName}</p>
                  <p>SĐT khách thuê:{room?.userSub?.phone}</p>
                  {/* <p>Ngày giờ in: {formattedDate}</p> */}
                </p>
              </div>
              <table class="w-full text-left mb-8">
                <thead>
                  <tr className="text-[8px] md:text-sm">
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Tên Dịch Vụ
                    </th>
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Đơn Vị
                    </th>
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Số Cũ
                    </th>
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Số Mới
                    </th>
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Số Lượng
                    </th>
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Đơn Giá
                    </th>
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Thành Tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="text-left text-[8px] md:text-sm">
                  <tr>
                    <td class="py-4 text-gray-700">Tiền Phòng</td>
                    <td class="py-4 text-gray-700">Phòng</td>
                    <td class="py-4 text-gray-700">--</td>
                    <td class="py-4 text-gray-700">--</td>
                    <td class="py-4 text-gray-700">1</td>
                    <td class="py-4 text-gray-700">
                      {" "}
                      <NumericFormat
                        value={room?.roomFee}
                        thousandSeparator
                        displayType="text"
                      />{" "}
                      <span className="md:text-[12px] italic">VNĐ</span>
                    </td>
                    <td class="py-4 text-gray-700">
                      {" "}
                      <NumericFormat
                        value={room?.roomFee}
                        thousandSeparator
                        displayType="text"
                      />{" "}
                      <span className="md:text-[12px] italic">VNĐ</span>
                    </td>
                  </tr>
                  {bill?.eleUnit != "free" ? (
                    <>
                      <tr>
                        <td class="py-4 text-gray-700">Tiền Điện</td>
                        <td class="py-4 text-gray-700">
                          {/* {room?.bill?.eleUnit} */}
                          {bill?.eleUnit == "free"
                            ? "Miễn Phí"
                            : bill?.eleUnit == "room"
                            ? "Phòng"
                            : bill?.eleUnit == "member"
                            ? "Trên Người"
                            : bill?.eleUnit == "met"
                            ? "Khối"
                            : bill?.eleUnit == "kwh"
                            ? "Kwh"
                            : ""}
                        </td>
                        <td class="py-4 text-gray-700">{bill?.oldEle}</td>
                        <td class="py-4 text-gray-700">{bill?.newEle}</td>

                        <td class="py-4 text-gray-700">
                          {" "}
                          {Number(bill?.newEle) - Number(bill?.oldEle)}
                        </td>
                        <td class="py-4 text-gray-700">
                          <NumericFormat
                            value={bill?.elePrice}
                            thousandSeparator
                            displayType="text"
                          />{" "}
                          <span className="md:text-[12px] italic">VNĐ</span>
                        </td>
                        <td class="py-4 text-gray-700">
                          <NumericFormat
                            value={
                              Number(
                                Number(bill?.newEle) - Number(bill?.oldEle)
                              ) * Number(bill?.elePrice)
                            }
                            thousandSeparator
                            displayType="text"
                          />{" "}
                          <span className="md:text-[12px] italic">VNĐ</span>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}

                  {bill?.waterUnit != "free" ? (
                    <>
                      <tr>
                        <td class="py-4 text-gray-700">Tiền Nước</td>
                        <td class="py-4 text-gray-700">
                          {/* {room?.bill?.waterUnit} */}
                          {bill?.waterUnit == "free"
                            ? "Miễn Phí"
                            : bill?.waterUnit == "room"
                            ? "Phòng"
                            : bill?.waterUnit == "member"
                            ? "Trên Người"
                            : bill?.waterUnit == "met"
                            ? "Khối"
                            : bill?.waterUnit == "kwh"
                            ? "Kwh"
                            : ""}
                        </td>
                        <td class="py-4 text-gray-700">{bill?.oldWater}</td>
                        <td class="py-4 text-gray-700">{bill?.newWater}</td>

                        <td class="py-4 text-gray-700">
                          {Number(bill?.newWater) - Number(bill?.oldWater)}
                        </td>
                        <td class="py-4 text-gray-700">
                          <NumericFormat
                            value={bill?.waterPrice}
                            thousandSeparator
                            displayType="text"
                          />{" "}
                          <span className="md:text-[12px] italic">VNĐ</span>
                        </td>
                        <td class="py-4 text-gray-700">
                          {" "}
                          <NumericFormat
                            value={
                              Number(
                                Number(bill?.newWater) - Number(bill?.oldWater)
                              ) * Number(bill?.waterPrice)
                            }
                            thousandSeparator
                            displayType="text"
                          />{" "}
                          <span className="md:text-[12px] italic">VNĐ</span>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}

                  {bill?.service?.map((b) => {
                    return (
                      <>
                        <tr>
                          <td class="p-2">
                            <div class="font-medium text-left ">{b?.name}</div>
                          </td>
                          <td class="p-2 text-left">
                            {b?.unit == "free"
                              ? "Miễn Phí"
                              : b?.unit == "room"
                              ? "Phòng"
                              : b?.unit == "member"
                              ? "Trên Người"
                              : b?.unit == "met"
                              ? "Khối"
                              : b?.unit == "kwh"
                              ? "Kwh"
                              : ""}
                          </td>
                          <td class="p-2">-- </td>
                          <td class="p-2">--</td>
                          <td class="p-2">
                            <div class="text-left font-medium ">1</div>
                          </td>
                          <td class="p-2">
                            <div class="text-left ">
                              <NumericFormat
                                value={b?.value}
                                thousandSeparator
                                displayType="text"
                              />{" "}
                              <span className="md:text-[12px] italic">VNĐ</span>
                            </div>
                          </td>
                          <td class="p-2">
                            <div class="text-left font-medium ">
                              <NumericFormat
                                value={b?.value}
                                thousandSeparator
                                displayType="text"
                              />{" "}
                              <span className="md:text-[12px] italic">VNĐ</span>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>

              <div class="flex justify-end mb-8">
                <div class="text-gray-700 mr-2">Total:</div>
                <div class="text-gray-700 font-bold text-xl">
                  <NumericFormat
                    value={
                      Number(room?.roomFee) +
                      Number(
                        bill?.eleUnit == "kwh"
                          ? (Number(bill?.newEle) - Number(bill?.oldEle)) *
                              Number(bill?.elePrice)
                          : bill?.eleUnit == "room"
                          ? Number(bill?.elePrice)
                          : bill?.eleUnit == "member"
                          ? Number(room.member.length) * Number(bill?.elePrice)
                          : 0
                      ) +
                      Number(
                        bill?.waterUnit == "met"
                          ? (Number(bill?.newWater) - Number(bill?.oldWater)) *
                              Number(bill?.waterPrice)
                          : bill?.waterUnit == "room"
                          ? Number(bill?.waterPrice)
                          : room?.bill?.waterUnit == "member"
                          ? Number(room.member.length) *
                            Number(bill?.waterPrice)
                          : 0
                      ) +
                      Number(
                        bill?.service.reduce(
                          (accumulator, currentValue) =>
                            accumulator + parseInt(currentValue.value),
                          0
                        )
                      )
                    }
                    thousandSeparator
                    displayType="text"
                  />
                  <span className="md:text-[12px] italic">VNĐ</span>
                </div>
              </div>
              <div class="border-t-2 border-gray-300 pt-2 mb-2">
                <div class="text-gray-700 mb-2">
                  Vui Lòng Thanh Toán Hoá Đơn Trước 30 ngày
                </div>
                <div class="text-gray-700 mb-2">
                  Mọi thông tin chi tiết liên hệ {room?.motelId?.motelPhone}
                </div>
                {/* <div class="text-gray-700">123 Main St., Anytown, USA 12345</div> */}
              </div>
              {/*  */}
              <div class="border-t-2 border-gray-300 pt-2 mb-2">
                <div class="text-gray-700 mb-2 text-left">THÀNH VIÊN PHÒNG</div>
                <div class="text-gray-700 mb-2 text-left">
                  <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table class="min-w-full">
                        <thead class="bg-white border-b">
                          <tr>
                            <th
                              scope="col"
                              class="text-[8px] md:text-sm font-medium text-gray-900 md:px-6 py-4 text-left"
                            >
                              #
                            </th>
                            <th
                              scope="col"
                              class="text-[8px] md:text-sm font-medium text-gray-900 md:px-6 py-4 text-left"
                            >
                              Họ Tên
                            </th>
                            <th
                              scope="col"
                              class="text-[8px] md:text-sm font-medium text-gray-900 md:px-6 py-4 text-left"
                            >
                              Giới Tính
                            </th>
                            <th
                              scope="col"
                              class="text-[8px] md:text-sm font-medium text-gray-900 md:px-6 py-4 text-left"
                            >
                              SĐT
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {room?.member?.map((i, index) => {
                            return (
                              <>
                                <tr class="bg-gray-100 border-b">
                                  <td class="md:px-6 py-4 whitespace-nowrap md:text-sm text-[8px] font-medium text-gray-900">
                                    {index + 1}
                                  </td>
                                  <td class="md:text-sm text-[8px] text-gray-900 font-light md:px-6 py-4 whitespace-nowrap">
                                    {i?.fullName}
                                  </td>
                                  <td class="md:text-sm text-[8px] text-gray-900 font-light md:px-6 py-4 whitespace-nowrap">
                                    {i?.sex == 0 ? "Nữ" : "Nam"}
                                  </td>
                                  <td class="md:text-sm text-[8px] text-gray-900 font-light md:px-6 py-4 whitespace-nowrap">
                                    {i?.phone}
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
                {/* <div class="text-gray-700">123 Main St., Anytown, USA 12345</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBillPage;
