import React from "react";
import { NumericFormat } from "react-number-format";

function CardPay2({ item }) {
  const value = JSON.parse(sessionStorage.getItem("pay"));

  const now = new Date(Date.now());
  const formattedDate = now.toLocaleString();
  console.log(item);
  return (
    <div>
      <div class="px-2">
        {value?.map((item, index) => {
          return (
            <>
              <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto mb-4">
                <div class="flex items-center justify-between mb-8">
                  <div class="flex items-center">
                    <img
                      class="h-8 w-8 mr-2"
                      src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                      alt="Logo"
                    />
                    <div class="text-gray-700 font-semibold text-lg">
                      {item?.motelId?.motelName}
                    </div>
                  </div>
                  <div class="text-gray-700">
                    <div class="font-bold text-xl mb-2 uppercase">
                      HOÁ ĐƠN TIỀN TRỌ PHÒNG{" "}
                      <span className="font-bold text-blue-700">
                        {item?.roomCode}
                      </span>{" "}
                    </div>
                    {/* <div class="text-sm">Date: 01/05/2023</div> */}
                    {/* <div class="text-sm">Invoice #: INV12345</div> */}
                  </div>
                </div>
                <div class="border-b-2 border-gray-300  mb-2">
                  <h2 class="text-2xl font-bold mb-4">
                    Hoá đơn tháng: {item?.bill[item?.bill?.length - 1]?.month}
                  </h2>
                  <p>Tên khách thuê:{item?.userSub?.fullName}</p>
                  <p>SĐT khách thuê:{item?.userSub?.phone}</p>
                  <p>Ngày giờ in: {formattedDate}</p>
                </div>
                <table class="w-full text-left mb-8">
                  <thead>
                    <tr>
                      <th class="text-gray-700 font-bold uppercase py-2">
                        Tên Dịch Vụ
                      </th>
                      <th class="text-gray-700 font-bold uppercase py-2">
                        Đơn Vị
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
                  <tbody>
                    <tr>
                      <td class="py-4 text-gray-700">Tiền Phòng</td>
                      <td class="py-4 text-gray-700">Phòng</td>
                      <td class="py-4 text-gray-700">1</td>
                      <td class="py-4 text-gray-700">
                        {" "}
                        <NumericFormat
                          value={item?.roomFee}
                          thousandSeparator
                          displayType="text"
                        />{" "}
                        <span className="text-[12px] italic">VNĐ</span>
                      </td>
                      <td class="py-4 text-gray-700">
                        {" "}
                        <NumericFormat
                          value={item?.roomFee}
                          thousandSeparator
                          displayType="text"
                        />{" "}
                        <span className="text-[12px] italic">VNĐ</span>
                      </td>
                    </tr>

                    <tr>
                      <td class="py-4 text-gray-700">Tiền Điện</td>
                      <td class="py-4 text-gray-700">
                        {item?.bill[item?.bill?.length - 1]?.eleUnit}
                      </td>
                      <td class="py-4 text-gray-700">
                        {" "}
                        {Number(item?.bill[item?.bill?.length - 1]?.newEle) -
                          Number(item?.bill[item?.bill?.length - 1]?.oldEle)}
                      </td>
                      <td class="py-4 text-gray-700">
                        <NumericFormat
                          value={item?.bill[item?.bill?.length - 1]?.elePrice}
                          thousandSeparator
                          displayType="text"
                        />{" "}
                        <span className="text-[12px] italic">VNĐ</span>
                      </td>
                      <td class="py-4 text-gray-700">
                        <NumericFormat
                          value={
                            Number(
                              Number(
                                item?.bill[item?.bill?.length - 1]?.newEle
                              ) -
                                Number(
                                  item?.bill[item?.bill?.length - 1]?.oldEle
                                )
                            ) *
                            Number(item?.bill[item?.bill?.length - 1]?.elePrice)
                          }
                          thousandSeparator
                          displayType="text"
                        />{" "}
                        <span className="text-[12px] italic">VNĐ</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-4 text-gray-700">Tiền Nước</td>
                      <td class="py-4 text-gray-700">
                        {item?.bill[item?.bill?.length - 1]?.waterUnit}
                      </td>
                      <td class="py-4 text-gray-700">
                        {Number(item?.bill[item?.bill?.length - 1]?.newWater) -
                          Number(item?.bill[item?.bill?.length - 1]?.oldWater)}
                      </td>
                      <td class="py-4 text-gray-700">
                        <NumericFormat
                          value={item?.bill[item?.bill?.length - 1]?.waterPrice}
                          thousandSeparator
                          displayType="text"
                        />{" "}
                        <span className="text-[12px] italic">VNĐ</span>
                      </td>
                      <td class="py-4 text-gray-700">
                        {" "}
                        <NumericFormat
                          value={
                            Number(
                              Number(
                                item?.bill[item?.bill?.length - 1]?.newWater
                              ) -
                                Number(
                                  item?.bill[item?.bill?.length - 1]?.oldWater
                                )
                            ) *
                            Number(
                              item?.bill[item?.bill?.length - 1]?.waterPrice
                            )
                          }
                          thousandSeparator
                          displayType="text"
                        />{" "}
                        <span className="text-[12px] italic">VNĐ</span>
                      </td>
                    </tr>

                    {item?.bill[item?.bill?.length - 1]?.service?.map((b) => {
                      return (
                        <>
                          <tr>
                            <td class="p-2">
                              <div class="font-medium text-left ">
                                {b?.name}
                              </div>
                            </td>
                            <td class="p-2">
                              <div class="text-left">{b?.unit}</div>
                            </td>
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
                                <span className="text-[12px] italic">VNĐ</span>
                              </div>
                            </td>
                            <td class="p-2">
                              <div class="text-left font-medium ">
                                <NumericFormat
                                  value={b?.value}
                                  thousandSeparator
                                  displayType="text"
                                />{" "}
                                <span className="text-[12px] italic">VNĐ</span>
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
                        Number(item?.roomFee) +
                        Number(
                          item?.bill[item?.bill?.length - 1]?.eleUnit == "Kwh"
                            ? (Number(
                                item?.bill[item?.bill?.length - 1]?.newEle
                              ) -
                                Number(
                                  item?.bill[item?.bill?.length - 1]?.oldEle
                                )) *
                                Number(
                                  item?.bill[item?.bill?.length - 1]?.elePrice
                                )
                            : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "Phòng"
                            ? Number(
                                item?.bill[item?.bill?.length - 1]?.elePrice
                              )
                            : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "Người"
                            ? Number(item.member.length) *
                              Number(
                                item?.bill[item?.bill?.length - 1]?.elePrice
                              )
                            : 0
                        ) +
                        Number(
                          item?.bill[item?.bill?.length - 1]?.waterUnit ==
                            "Khối"
                            ? (Number(
                                item?.bill[item?.bill?.length - 1]?.newWater
                              ) -
                                Number(
                                  item?.bill[item?.bill?.length - 1]?.oldWater
                                )) *
                                Number(
                                  item?.bill[item?.bill?.length - 1]?.waterPrice
                                )
                            : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "Phòng"
                            ? Number(
                                item?.bill[item?.bill?.length - 1]?.waterPrice
                              )
                            : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "Người"
                            ? Number(item.member.length) *
                              Number(
                                item?.bill[item?.bill?.length - 1]?.waterPrice
                              )
                            : 0
                        ) +
                        Number(
                          item?.bill[item?.bill?.length - 1]?.service.reduce(
                            (accumulator, currentValue) =>
                              accumulator + parseInt(currentValue.value),
                            0
                          )
                        )
                      }
                      thousandSeparator
                      displayType="text"
                    />
                    <span className="text-[12px] italic">VNĐ</span>
                  </div>
                </div>
                <div class="border-t-2 border-gray-300 pt-2 mb-2">
                  <div class="text-gray-700 mb-2">
                    Vui Lòng Thanh Toán Hoá Đơn Trước 30 ngày
                  </div>
                  <div class="text-gray-700 mb-2">
                    Mọi thông tin chi tiết liên hệ {item?.motelId?.motelPhone}
                  </div>
                  {/* <div class="text-gray-700">123 Main St., Anytown, USA 12345</div> */}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default CardPay2;
