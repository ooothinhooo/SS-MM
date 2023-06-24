import React from "react";
import { NumericFormat } from "react-number-format";
import QRCode from "react-qr-code";
function CardPay3() {
  const value = JSON.parse(sessionStorage.getItem("pay"));

  const now = new Date(Date.now());
  const formattedDate = now.toLocaleString();
  //   console.log(item);
  return (
    <div>
      <div class="px-2">
        {value?.map((item, index) => {
          return (
            <>
              <div>
                <div class="bg-white rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-16">
                  <h1 class="font-bold text-2xl my-4 text-center text-blue-600 uppercase">
                    hoá đơn nhà trọ
                  </h1>
                  <p class="mb-2"></p>
                  <div class="flex justify-between mb-6">
                    <div className="block text-left">
                      <h1 class="text-lg font-bold uppercase">
                        Hoá đơn tháng:{" "}
                        {item?.bill[item?.bill?.length - 1]?.month}
                      </h1>
                      <h1 class="text-lg font-bold uppercase">
                        PHÒNG :{" "}
                        <span className="font-bold text-blue-700">
                          {item?.roomCode}
                        </span>
                      </h1>
                    </div>
                    <div class="text-gray-700">
                      <QRCode
                        value={`https://fe-ss-mm.vercel.app/bill/view/${
                          item?._id
                        }/${item?.bill[item?.bill?.length - 1]?.month}`}
                        size="80"
                      />
                    </div>
                  </div>
                  <div class="mb-8"></div>
                  <table class="w-full mb-8">
                    <thead>
                      <tr>
                        <th class="text-left font-bold text-gray-700">
                          Dịch Vụ
                        </th>
                        <th class="text-left font-bold text-gray-700">
                          Sử dụng
                        </th>
                        <th class="text-left font-bold text-gray-700">
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-left text-gray-700">Tiền phòng</td>
                        <td class="text-left text-gray-700">1</td>
                        <td class="text-left text-gray-700">
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
                            <td class="text-left text-gray-700">Tiền điện</td>
                            <td class="text-left text-gray-700">
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
                            <td class="text-left text-gray-700">
                              <NumericFormat
                                value={
                                  Number(
                                    Number(
                                      item?.bill[item?.bill?.length - 1]?.newEle
                                    ) -
                                      Number(
                                        item?.bill[item?.bill?.length - 1]
                                          ?.oldEle
                                      )
                                  ) *
                                  Number(
                                    item?.bill[item?.bill?.length - 1]?.elePrice
                                  )
                                }
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

                      {item?.bill[item?.bill?.length - 1]?.waterUnit !=
                      "free" ? (
                        <>
                          <tr>
                            <td class="text-left text-gray-700">Tiền nước</td>
                            <td class="text-left text-gray-700">
                              {item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "free" ? (
                                "0"
                              ) : item?.bill[item?.bill?.length - 1]
                                  ?.waterUnit == "room" ? (
                                "1"
                              ) : item?.bill[item?.bill?.length - 1]
                                  ?.waterUnit == "member" ? (
                                item?.member.length
                              ) : item?.bill[item?.bill?.length - 1]
                                  ?.waterUnit == "met" ? (
                                <>
                                  {" "}
                                  {Number(
                                    item?.bill[item?.bill?.length - 1]?.newWater
                                  ) -
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.oldWater
                                    )}
                                </>
                              ) : item?.bill[item?.bill?.length - 1]
                                  ?.waterUnit == "kwh" ? (
                                <>
                                  {" "}
                                  {Number(
                                    item?.bill[item?.bill?.length - 1]?.newWater
                                  ) -
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.oldWater
                                    )}
                                </>
                              ) : (
                                ""
                              )}
                              {/*  */}
                            </td>
                            <td class="text-left text-gray-700">
                              {" "}
                              {/*  */}
                              <NumericFormat
                                value={Number(
                                  item?.bill[item?.bill?.length - 1]
                                    ?.waterUnit == "free"
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
                              <td class="text-left text-gray-700">
                                <div class="font-medium text-left ">
                                  {i?.name}
                                </div>
                              </td>

                              <td class="text-left text-gray-700">
                                {i?.unit == "room"
                                  ? 1
                                  : i?.unit == "member"
                                  ? item?.member.length
                                  : ""}
                              </td>
                              <td class="text-left text-gray-700">
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
                                  <span className="text-[12px] italic">
                                    VNĐ
                                  </span>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td class="text-left font-bold text-gray-700">
                          Tổng tiền
                        </td>
                        <td class="text-left font-bold text-gray-700">
                          <NumericFormat
                            value={
                              Number(item?.roomFee) +
                              Number(
                                item?.bill[item?.bill?.length - 1]?.eleUnit ==
                                  "kwh"
                                  ? (Number(
                                      item?.bill[item?.bill?.length - 1]?.newEle
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
                              ) +
                              Number(
                                item?.bill[item?.bill?.length - 1]?.waterUnit ==
                                  "met"
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
                              ) +
                              Number(
                                item?.bill[
                                  item?.bill?.length - 1
                                ]?.service.reduce(
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
                          {/* <NumericFormat
                            value={
                              Number(item?.roomFee) +
                              Number(
                                item?.bill[item?.bill?.length - 1]?.eleUnit ==
                                  "Kwh"
                                  ? (Number(
                                      item?.bill[item?.bill?.length - 1]?.newEle
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
                                      ?.eleUnit == "Phòng"
                                  ? Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.elePrice
                                    )
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.eleUnit == "Người"
                                  ? Number(item.member.length) *
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.elePrice
                                    )
                                  : 0
                              ) +
                              Number(
                                item?.bill[item?.bill?.length - 1]?.waterUnit ==
                                  "Khối"
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
                                      ?.waterUnit == "Phòng"
                                  ? Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.waterPrice
                                    )
                                  : item?.bill[item?.bill?.length - 1]
                                      ?.waterUnit == "Người"
                                  ? Number(item.member.length) *
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.waterPrice
                                    )
                                  : 0
                              ) +
                              Number(
                                item?.bill[
                                  item?.bill?.length - 1
                                ]?.service.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + parseInt(currentValue.value),
                                  0
                                )
                              )
                            }
                            thousandSeparator
                            displayType="text"
                          /> */}
                          <span className="text-[12px] italic">VNĐ</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <div class="text-gray-700 mb-2">
                    Vui lòng chuyển khoản thanh toán trong vòng 30 ngày.
                  </div>
                  <div class="text-gray-700">
                    Mọi thông tin chi tiết liên hệ {item?.motelId?.phone}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default CardPay3;
