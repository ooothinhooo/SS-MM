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
                <div class="border-b-2 border-gray-300  mb-2 ">
                  <h2 class="text-2xl font-bold mb-2">
                    Hoá đơn tháng: {item?.bill[item?.bill?.length - 1]?.month}
                  </h2>
                  <p className="text-left">
                    <p>Tên khách thuê:{item?.userSub?.fullName}</p>
                    <p>SĐT khách thuê:{item?.userSub?.phone}</p>
                    <p>Ngày giờ in: {formattedDate}</p>
                  </p>
                </div>
                <table class="w-full text-left mb-8">
                  <thead>
                    <tr className="text-sm">
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
                  <tbody className="text-left">
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
                    {item?.bill[item?.bill?.length - 1]?.eleUnit != "free" ? (
                      <>
                        <tr>
                          <td class="py-4 text-gray-700">Tiền Điện</td>
                          <td class="py-4 text-gray-700">
                            {/* {item?.bill[item?.bill?.length - 1]?.eleUnit} */}
                            {item?.bill[item?.bill?.length - 1]?.eleUnit ==
                            "free"
                              ? "Miễn Phí"
                              : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                                "room"
                              ? "Phòng"
                              : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                                "member"
                              ? "Người"
                              : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                                "met"
                              ? "Khối"
                              : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                                "kwh"
                              ? "Kwh"
                              : ""}
                          </td>
                          <td class="py-4 text-gray-700">
                            {item?.bill[item?.bill?.length - 1]?.eleUnit ==
                            "free" ? (
                              "0"
                            ) : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "room" ? (
                              "1"
                            ) : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "member" ? (
                              item?.member.length
                            ) : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "met" ? (
                              <>
                                {Number(
                                  item?.bill[item?.bill?.length - 1]?.newEle
                                ) -
                                  Number(
                                    item?.bill[item?.bill?.length - 1]?.oldEle
                                  )}
                              </>
                            ) : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "kwh" ? (
                              <>
                                {Number(
                                  item?.bill[item?.bill?.length - 1]?.newEle
                                ) -
                                  Number(
                                    item?.bill[item?.bill?.length - 1]?.oldEle
                                  )}
                              </>
                            ) : (
                              ""
                            )}
                            {/* {Number(
                              item?.bill[item?.bill?.length - 1]?.newEle
                            ) -
                              Number(
                                item?.bill[item?.bill?.length - 1]?.oldEle
                              )} */}
                          </td>
                          <td class="py-4 text-gray-700">
                            <NumericFormat
                              value={
                                item?.bill[item?.bill?.length - 1]?.elePrice
                              }
                              thousandSeparator
                              displayType="text"
                            />{" "}
                            <span className="text-[12px] italic">VNĐ</span>
                          </td>
                          <td class="py-4 text-gray-700">
                            <NumericFormat
                              value={Number(
                                item?.bill[item?.bill?.length - 1]?.eleUnit ==
                                  "free"
                                  ? 0
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.eleUnit == "room"
                                  ? Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.elePrice
                                    )
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.eleUnit == "member"
                                  ? Number(item?.member?.length) *
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.elePrice
                                    )
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.eleUnit == "met"
                                  ? Number(
                                      Number(
                                        item?.bill[item?.bill?.length - 1]
                                          ?.newEle
                                      ) -
                                        Number(
                                          item?.bill[item?.bill?.length - 1]
                                            ?.oldEle
                                        )
                                    ) *
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.elePrice
                                    )
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.eleUnit == "kwh"
                                  ? Number(
                                      Number(
                                        item?.bill[item?.bill?.length - 1]
                                          ?.newEle
                                      ) -
                                        Number(
                                          item?.bill[item?.bill?.length - 1]
                                            ?.oldEle
                                        )
                                    ) *
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.elePrice
                                    )
                                  : 0
                              )}
                              thousandSeparator
                              displayType="text"
                            />{" "}
                            {/*  */}
                            <span className="text-[12px] italic">VNĐ</span>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}

                    {item?.bill[item?.bill?.length - 1]?.waterUnit != "free" ? (
                      <>
                        <tr>
                          <td class="py-4 text-gray-700">Tiền Nước</td>
                          <td class="py-4 text-gray-700">
                            {/* {item?.bill[item?.bill?.length - 1]?.waterUnit} */}
                            {item?.bill[item?.bill?.length - 1]?.waterUnit ==
                            "free"
                              ? "Miễn Phí"
                              : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                                "room"
                              ? "Phòng"
                              : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                                "member"
                              ? "Người"
                              : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                                "met"
                              ? "Khối"
                              : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                                "kwh"
                              ? "Kwh"
                              : ""}
                          </td>
                          <td class="py-4 text-gray-700">
                            {item?.bill[item?.bill?.length - 1]?.waterUnit ==
                            "free" ? (
                              "0"
                            ) : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "room" ? (
                              "1"
                            ) : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "member" ? (
                              item?.member.length
                            ) : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "met" ? (
                              <>
                                {" "}
                                {Number(
                                  item?.bill[item?.bill?.length - 1]?.newWater
                                ) -
                                  Number(
                                    item?.bill[item?.bill?.length - 1]?.oldWater
                                  )}
                              </>
                            ) : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "kwh" ? (
                              <>
                                {" "}
                                {Number(
                                  item?.bill[item?.bill?.length - 1]?.newWater
                                ) -
                                  Number(
                                    item?.bill[item?.bill?.length - 1]?.oldWater
                                  )}
                              </>
                            ) : (
                              ""
                            )}
                            {/*  */}
                          </td>
                          <td class="py-4 text-gray-700">
                            <NumericFormat
                              value={
                                item?.bill[item?.bill?.length - 1]?.waterPrice
                              }
                              thousandSeparator
                              displayType="text"
                            />{" "}
                            <span className="text-[12px] italic">VNĐ</span>
                          </td>
                          <td class="py-4 text-gray-700">
                            {" "}
                            {/*  */}
                            <NumericFormat
                              value={Number(
                                item?.bill[item?.bill?.length - 1]?.waterUnit ==
                                  "free"
                                  ? 0
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.waterUnit == "room"
                                  ? Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.waterPrice
                                    )
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.waterUnit == "member"
                                  ? Number(item?.member?.length) *
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.waterPrice
                                    )
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.waterUnit == "met"
                                  ? Number(
                                      Number(
                                        item?.bill[item?.bill?.length - 1]
                                          ?.newWater
                                      ) -
                                        Number(
                                          item?.bill[item?.bill?.length - 1]
                                            ?.oldWater
                                        )
                                    ) *
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.waterPrice
                                    )
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.waterUnit == "kwh"
                                  ? Number(
                                      Number(
                                        item?.bill[item?.bill?.length - 1]
                                          ?.newWater
                                      ) -
                                        Number(
                                          item?.bill[item?.bill?.length - 1]
                                            ?.oldWater
                                        )
                                    ) *
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.waterPrice
                                    )
                                  : 0
                              )}
                              thousandSeparator
                              displayType="text"
                            />{" "}
                            <span className="text-[12px] italic">VNĐ</span>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}

                    {item?.bill[item?.bill?.length - 1]?.service?.map((i) => {
                      return (
                        <>
                          <tr>
                            <td class="">
                              <div class="font-medium text-left ">
                                {i?.name}
                              </div>
                            </td>
                            <td class="">
                              <div class="text-left">
                                {" "}
                                <div class="text-left">
                                  {" "}
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
                                </div>
                              </div>
                            </td>
                            <td class="">
                              <div class=" text-left font-medium ">
                                {i?.unit == "room"
                                  ? 1
                                  : i?.unit == "member"
                                  ? item?.member.length
                                  : ""}
                              </div>
                            </td>
                            <td class="">
                              <div class="text-left ">
                                <NumericFormat
                                  value={i?.value}
                                  thousandSeparator
                                  displayType="text"
                                />{" "}
                                <span className="text-[12px] italic">VNĐ</span>
                              </div>
                            </td>
                            <td class="">
                              <div class="text-left font-medium ">
                                <NumericFormat
                                  value={
                                    i?.unit == "room"
                                      ? i.value
                                      : i?.unit == "member"
                                      ? Number(item?.member.length) *
                                        Number(i.value)
                                      : 0
                                  }
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
                  <div class="text-gray-700 mr-2">Tổng:</div>
                  <div class="text-gray-700 font-bold text-xl">
                    <NumericFormat
                      value={
                        Number(item?.roomFee) +
                        Number(
                          item?.bill[item?.bill?.length - 1]?.eleUnit == "kwh"
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
                              "room"
                            ? Number(
                                item?.bill[item?.bill?.length - 1]?.elePrice
                              )
                            : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "member"
                            ? Number(item.member.length) *
                              Number(
                                item?.bill[item?.bill?.length - 1]?.elePrice
                              )
                            : 0
                        ) +
                        Number(
                          item?.bill[item?.bill?.length - 1]?.waterUnit == "met"
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
                              "room"
                            ? Number(
                                item?.bill[item?.bill?.length - 1]?.waterPrice
                              )
                            : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "member"
                            ? Number(item.member.length) *
                              Number(
                                item?.bill[item?.bill?.length - 1]?.waterPrice
                              )
                            : 0
                        ) +
                        Number(
                          item?.bill[item?.bill?.length - 1]?.service.reduce(
                            (accumulator, currentValue) =>
                              accumulator +
                              parseInt(
                                currentValue?.unit == "room"
                                  ? currentValue.value
                                  : currentValue?.unit == "member"
                                  ? Number(item?.member.length) *
                                    Number(currentValue.value)
                                  : 0
                              ),
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
                    Mọi thông tin chi tiết liên hệ {item?.motelId?.phone}
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
