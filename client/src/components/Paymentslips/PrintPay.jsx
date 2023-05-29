import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineFileAdd, AiOutlineFolderView } from "react-icons/ai";

import { NumericFormat } from "react-number-format";
export default function PrintPay({ user, pay }) {
  const [card, setCard] = useState();
  return (
    <div className="App">
      <div>
        {/* <!-- Breadcrumb --> */}
        <nav
          class="justify-between px-4 py-3 text-gray-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Breadcrumb"
        >
          <ol class="inline-flex items-center mb-3 space-x-1 md:space-x-3 sm:mb-0">
            <li>
              <NavLink to="/">
                <div class="flex items-center">
                  <p
                    href="#"
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Trang chủ
                  </p>
                </div>
              </NavLink>
            </li>
            <li aria-current="page">
              <NavLink to="/payment">
                <div class="flex items-center">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p
                    href="#"
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Phiếu Chi
                  </p>
                </div>
              </NavLink>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="mx-1 text-sm font-medium text-gray-500 md:mx-2 dark:text-gray-400">
                  In Phiếu
                </span>
              </div>
            </li>
          </ol>
          <div></div>
        </nav>
      </div>
      <h1>DANH SÁCH IN PHIẾU</h1>
      <MyComponent card={card} />
    </div>
  );
}

export function PrintData() {
  //   console.log(JSON.parse(localStorage.getItem("user")));
  const value = JSON.parse(sessionStorage.getItem("pay"));
  console.log(value);
  const now = new Date(Date.now());
  const formattedDate = now.toLocaleString();
  return (
    <>
      <div className="w-[98%] flex ">
        <div class="grid grid-cols-2 gap-4 justify-center items-center">
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
                                  {item?.bill[item?.bill?.length - 1]?.eleUnit}
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
                                  {
                                    item?.bill[item?.bill?.length - 1]
                                      ?.waterUnit
                                  }
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
                                            ?.eleUnit == "Kwh"
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
                                                ?.eleUnit == "Phòng"
                                            ? Number(
                                                item?.bill[
                                                  item?.bill?.length - 1
                                                ]?.elePrice
                                              )
                                            : item?.bill[item?.bill?.length - 1]
                                                ?.eleUnit == "Người"
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
                                            ?.waterUnit == "Khối"
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
                                                ?.waterUnit == "Phòng"
                                            ? Number(
                                                item?.bill[
                                                  item?.bill?.length - 1
                                                ]?.waterPrice
                                              )
                                            : item?.bill[item?.bill?.length - 1]
                                                ?.waterUnit == "Người"
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

export function Card1() {
  const value = JSON.parse(sessionStorage.getItem("pay"));
  return (
    <>
      <div class="p-2 border rounded-lg shadow ">
        {value?.map((item, index) => {
          return (
            <table class="w-full text-sm text-center text-black rounded-lg">
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
                          {item?.bill[item?.bill?.length - 1]?.eleUnit}
                        </span>
                      </td>
                      <td class="px-4 py-2 border-2 border-gray-400 border-x">
                        <NumericFormat
                          value={
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
                          {item?.bill[item?.bill?.length - 1]?.waterUnit}
                        </span>
                      </td>
                      <td class="px-4 py-2 border-2 border-gray-400 border-x">
                        <NumericFormat
                          value={
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
                            />
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
class ComponentToPrint extends React.Component {
  render({ pay }) {
    return <div>{pay}</div>;
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }
  render() {
    const now = new Date(Date.now());
    const formattedDate = now.toLocaleString();
    let card = JSON.parse(sessionStorage.getItem("card"));
    const fileName = `phiếu thu tiền trọ ${formattedDate}`;
    const html2CanvasOptions = {};
    const html2CanvasOptionsPNG = { width: 580, height: 800 };
    const pdfOptions =
      card == 1 ? { w: 580, h: 800 } : { w: 210, h: 300, x: 0, y: 0 };
    // const pdfOptions = { w: 210, h: 300, x: 0, y: 0 };

    return (
      <React.Fragment>
        <div className="flex justify-center items-end gap-2 my-2">
          <div
            className="mx-2"
            onClick={() =>
              exportComponentAsJPEG(this.componentRef, {
                fileName,
                html2CanvasOptions,
              })
            }
          >
            <p class="relative px-5 py-2 font-medium text-white group">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
              <span class="relative"> Export As JPEG</span>
            </p>
          </div>
          <div
            className="mx-2"
            onClick={() =>
              exportComponentAsPNG(this.componentRef, {
                fileName,
                html2CanvasOptionsPNG,
                pdfOptions,
              })
            }
          >
            <p class="relative px-5 py-2 font-medium text-white group">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
              <span class="relative"> Export As PNG</span>
            </p>
          </div>
          <div
            className="mx-2"
            onClick={() =>
              exportComponentAsPDF(this.componentRef, {
                fileName,
                html2CanvasOptions,
                pdfOptions,
              })
            }
          >
            <p class="relative px-5 py-2 font-medium text-white group">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
              <span class="relative"> Export As PDF</span>
            </p>
          </div>
        </div>

        <div ref={this.componentRef}>
          {/* <PrintData /> */}
          {card == "1" ? <PrintData /> : <Card1 />}
        </div>
      </React.Fragment>
    );
  }
}
