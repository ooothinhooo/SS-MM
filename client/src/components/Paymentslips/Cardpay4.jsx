import React from "react";
import { NumericFormat } from "react-number-format";

function Cardpay4() {
  //   console.log(JSON.parse(localStorage.getItem("user")));
  const value = JSON.parse(sessionStorage.getItem("pay"));
  console.log(value);
  const now = new Date(Date.now());
  const formattedDate = now.toLocaleString();
  return (
    <>
      <div className="w-[98%] flex ">
        <div class="grid grid-cols-1 gap-4 justify-center items-center">
          {value?.map((item, index) => {
            return (
              <>
                <div className="w-full  h-full shadow-xl border-2 p-2">
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="text-left mx-2">
                        <p className="text-black font-bold uppercase text-md">
                          HOÁ ĐƠN TIỀN TRỌ{" "}
                        </p>
                        <p>
                          Tháng {item?.bill[item?.bill?.length - 1]?.month} -
                          {item?.term}{" "}
                        </p>
                        <p>
                          PHÒNG :{" "}
                          <span className="font-bold text-blue-700">
                            {item?.roomCode}
                          </span>
                        </p>
                      </div>
                      <div className="text-left mx-2">
                        <p>Tên khách thuê:{item?.userSub?.fullName}</p>
                        <p>SĐT khách thuê:{item?.userSub?.phone}</p>
                        <p>Ngày giờ in: {formattedDate}</p>
                      </div>
                    </div>
                    <div>
                      <div class="overflow-x-auto p-3">
                        <table class="table-auto w-full">
                          <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                              <th class="p-2">
                                <div class="font-semibold text-left">
                                  Tên Dịch Vụ
                                </div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-left">
                                  Đơn Vị
                                </div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-left">
                                  Số Lượng
                                </div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-left">
                                  Đơn Giá
                                </div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-left">
                                  Thành Tiền
                                </div>
                              </th>
                            </tr>
                          </thead>

                          <tbody class="text-sm divide-y divide-gray-100">
                            <tr>
                              <td class="p-2">
                                <div class="text-left">Tiền Phòng</div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  Phòng
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  1
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  <NumericFormat
                                    value={item?.roomFee}
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  <NumericFormat
                                    value={item?.roomFee}
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td class="p-2">
                                <div class="font-medium text-left text-gray-800">
                                  Tiền Điện
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left">
                                  {/* {item?.bill[item?.bill?.length - 1]?.eleUnit} */}
                                  {item?.bill[item?.bill?.length - 1]
                                    ?.eleUnit == "free"
                                    ? "Miễn Phí"
                                    : item?.bill[item?.bill?.length - 1]
                                        ?.eleUnit == "room"
                                    ? "Phòng"
                                    : item?.bill[item?.bill?.length - 1]
                                        ?.eleUnit == "member"
                                    ? "Trên Người"
                                    : item?.bill[item?.bill?.length - 1]
                                        ?.eleUnit == "met"
                                    ? "Khối"
                                    : item?.bill[item?.bill?.length - 1]
                                        ?.eleUnit == "kwh"
                                    ? "Kwh"
                                    : ""}
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  {Number(
                                    item?.bill[item?.bill?.length - 1]?.newEle
                                  ) -
                                    Number(
                                      item?.bill[item?.bill?.length - 1]?.oldEle
                                    )}
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  <NumericFormat
                                    value={
                                      item?.bill[item?.bill?.length - 1]
                                        ?.elePrice
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  <NumericFormat
                                    value={
                                      Number(
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
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td class="p-2">
                                <div class="font-medium text-left text-gray-800">
                                  Tiền Nước
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left">
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
                                    ? "Trên Người"
                                    : item?.bill[item?.bill?.length - 1]
                                        ?.waterUnit == "met"
                                    ? "Khối"
                                    : item?.bill[item?.bill?.length - 1]
                                        ?.waterUnit == "kwh"
                                    ? "Kwh"
                                    : ""}
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  {Number(
                                    item?.bill[item?.bill?.length - 1]?.newWater
                                  ) -
                                    Number(
                                      item?.bill[item?.bill?.length - 1]
                                        ?.oldWater
                                    )}
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  <NumericFormat
                                    value={
                                      item?.bill[item?.bill?.length - 1]
                                        ?.waterPrice
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  <NumericFormat
                                    value={
                                      Number(
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
                                    }
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </div>
                              </td>
                            </tr>
                            {item?.bill[item?.bill?.length - 1]?.service?.map(
                              (b) => {
                                return (
                                  <>
                                    <tr>
                                      <td class="p-2">
                                        <div class="font-medium text-left text-gray-800">
                                          {b?.name}
                                        </div>
                                      </td>
                                      <td class="p-2">
                                        <div class="text-left">{b?.unit}</div>
                                      </td>
                                      <td class="p-2">
                                        <div class="text-left font-medium text-green-500">
                                          1
                                        </div>
                                      </td>
                                      <td class="p-2">
                                        <div class="text-left font-medium text-green-500">
                                          <NumericFormat
                                            value={b?.value}
                                            thousandSeparator
                                            displayType="text"
                                          />
                                        </div>
                                      </td>
                                      <td class="p-2">
                                        <div class="text-left font-medium text-green-500">
                                          <NumericFormat
                                            value={b?.value}
                                            thousandSeparator
                                            displayType="text"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                );
                              }
                            )}
                            <tr>
                              <td class="p-2"></td>
                              <td class="p-2"></td>
                              <td class="p-2"></td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  Tổng cộng
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                  {/* tong tien */}
                                  <div>
                                    <NumericFormat
                                      value={
                                        Number(item?.roomFee) +
                                        Number(
                                          item?.bill[item?.bill?.length - 1]
                                            ?.eleUnit == "kwh"
                                            ? (Number(
                                                item?.bill[
                                                  item?.bill?.length - 1
                                                ]?.newEle
                                              ) -
                                                Number(
                                                  item?.bill[
                                                    item?.bill?.length - 1
                                                  ]?.oldEle
                                                )) *
                                                Number(
                                                  item?.bill[
                                                    item?.bill?.length - 1
                                                  ]?.elePrice
                                                )
                                            : item?.bill[item?.bill?.length - 1]
                                                ?.eleUnit == "room"
                                            ? Number(
                                                item?.bill[
                                                  item?.bill?.length - 1
                                                ]?.elePrice
                                              )
                                            : item?.bill[item?.bill?.length - 1]
                                                ?.eleUnit == "member"
                                            ? Number(item.member.length) *
                                              Number(
                                                item?.bill[
                                                  item?.bill?.length - 1
                                                ]?.elePrice
                                              )
                                            : 0
                                        ) +
                                        Number(
                                          item?.bill[item?.bill?.length - 1]
                                            ?.waterUnit == "met"
                                            ? (Number(
                                                item?.bill[
                                                  item?.bill?.length - 1
                                                ]?.newWater
                                              ) -
                                                Number(
                                                  item?.bill[
                                                    item?.bill?.length - 1
                                                  ]?.oldWater
                                                )) *
                                                Number(
                                                  item?.bill[
                                                    item?.bill?.length - 1
                                                  ]?.waterPrice
                                                )
                                            : item?.bill[item?.bill?.length - 1]
                                                ?.waterUnit == "room"
                                            ? Number(
                                                item?.bill[
                                                  item?.bill?.length - 1
                                                ]?.waterPrice
                                              )
                                            : item?.bill[item?.bill?.length - 1]
                                                ?.waterUnit == "member"
                                            ? Number(item.member.length) *
                                              Number(
                                                item?.bill[
                                                  item?.bill?.length - 1
                                                ]?.waterPrice
                                              )
                                            : 0
                                        ) +
                                        Number(
                                          item?.bill[
                                            item?.bill?.length - 1
                                          ]?.service.reduce(
                                            (accumulator, currentValue) =>
                                              accumulator +
                                              parseInt(currentValue.value),
                                            0
                                          )
                                        )
                                      }
                                      thousandSeparator
                                      displayType="text"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Cardpay4;
