import React from "react";
import { NumericFormat } from "react-number-format";

function CardPay1() {
  const value = JSON.parse(sessionStorage.getItem("pay"));
  return (
    <>
      <div class="px-2">
        {value?.map((item, index) => {
          return (
            <table class="w-full text-sm text-center text-black rounded-lg my-2">
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
                  <th
                    scope="col"
                    rowspan="2"
                    class="text-center py-2 px-1 border-2 border-gray-500"
                  >
                    Tổng tiền
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
                <>
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
                            Number(item?.bill[item?.bill?.length - 1]?.newEle) -
                            Number(item?.bill[item?.bill?.length - 1]?.oldEle)
                          }
                          thousandSeparator
                          displayType="text"
                        />{" "}
                        <span className="italic font-bold text-[13px]">
                          {/* {item?.bill[item?.bill?.length - 1]?.eleUnit} */}
                          {item?.bill[item?.bill?.length - 1]?.eleUnit == "free"
                            ? "Miễn Phí"
                            : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "room"
                            ? "Phòng"
                            : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "member"
                            ? "Trên Người"
                            : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "met"
                            ? "Khối"
                            : item?.bill[item?.bill?.length - 1]?.eleUnit ==
                              "kwh"
                            ? "Kwh"
                            : ""}
                        </span>
                      </td>
                      <td class="px-4 py-2 border-2 border-gray-400 border-x">
                        <NumericFormat
                          value={
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
                          }
                          thousandSeparator
                          displayType="text"
                        />
                        <span className="italic font-bold text-[13px]">đ</span>
                      </td>
                      <td class="px-4 py-2 border-2 border-gray-400 border-x">
                        <NumericFormat
                          value={
                            Number(
                              item?.bill[item?.bill?.length - 1]?.newWater
                            ) -
                            Number(item?.bill[item?.bill?.length - 1]?.oldWater)
                          }
                          thousandSeparator
                          displayType="text"
                        />{" "}
                        <span className="italic font-bold text-[13px]">
                          {/* {item?.bill[item?.bill?.length - 1]?.waterUnit} */}
                          {item?.bill[item?.bill?.length - 1]?.waterUnit ==
                          "free"
                            ? "Miễn Phí"
                            : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "room"
                            ? "Phòng"
                            : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "member"
                            ? "Trên Người"
                            : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "met"
                            ? "Khối"
                            : item?.bill[item?.bill?.length - 1]?.waterUnit ==
                              "kwh"
                            ? "Kwh"
                            : ""}
                        </span>
                      </td>
                      <td class="px-4 py-2 border-2 border-gray-400 border-x">
                        <NumericFormat
                          value={
                            item?.bill[item?.bill?.length - 1]?.waterUnit ==
                            "met"
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
                          }
                          thousandSeparator
                          displayType="text"
                        />
                        <span className="italic font-bold text-[13px]">đ</span>
                      </td>
                      <td class="px-4 py-2 border-2 border-gray-400 border-x">
                        {item?.bill[item?.bill?.length - 1]?.service?.map(
                          (i) => {
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
                                    {i.unit}
                                  </span>
                                </p>
                              </>
                            );
                          }
                        )}
                      </td>
                      <td class="px-4 py-2 border-2 border-gray-400 border-x">
                        <div class="text-center font-medium text-green-500">
                          {/* tong tien */}
                          <div>
                            <NumericFormat
                              value={
                                Number(item?.roomFee) +
                                Number(
                                  item?.bill[item?.bill?.length - 1]?.eleUnit ==
                                    "kwh"
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
                                ) +
                                Number(
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
                            {/* <NumericFormat
                              value={
                                Number(item?.roomFee) +
                                Number(
                                  item?.bill[item?.bill?.length - 1]?.eleUnit ==
                                    "Kwh"
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
                                  item?.bill[item?.bill?.length - 1]
                                    ?.waterUnit == "Khối"
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
                                      accumulator +
                                      parseInt(currentValue.value),
                                    0
                                  )
                                )
                              }
                              thousandSeparator
                              displayType="text"
                            />{" "} */}
                            <span className="italic font-bold text-[13px]">
                              đ
                            </span>{" "}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                </>
              </tbody>
            </table>
          );
        })}
      </div>
    </>
  );
}

export default CardPay1;
