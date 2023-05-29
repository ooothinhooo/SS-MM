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
          <div>
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              class="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
            >
              <svg
                class="w-3 h-3 mr-1"
                aria-hidden="true"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z" />
              </svg>
              Fix #6597
              <svg
                class="w-4 h-4 ml-1"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    New branch
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Rename
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <h1>DANH SÁCH IN PHIẾU</h1>
      <button onClick={(e) => setCard("1")}>xxxx</button>
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
      <div className="w-[98%]">
        <div class="grid grid-cols-2 gap-4">
          {value?.map((item, index) => {
            return (
              <>
                <div className=" w-auto h-auto shadow-xl border-2">
                  <div>
                    <p>NHÀ TRỌ: {item?.motelId?.motelName}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-left mx-2">
                        <p>
                          PHÒNG :{" "}
                          <span className="font-bold text-blue-700">
                            {item?.roomCode}
                          </span>
                        </p>
                        <p>
                          Phiếu thu tháng:{" "}
                          {item?.bill[item?.bill?.length - 1]?.month}
                        </p>
                        <p>Tên Khách:{item?.userSub?.fullName}</p>
                        <p>SĐT Khách:{item?.userSub?.phone}</p>
                      </div>
                      <div className="text-left mx-2">
                        <p>Ngày in : {now.toLocaleDateString()}</p>
                        <p>Giờ in: {now.toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <div>
                      <div class="overflow-x-auto p-3">
                        <table class="table-auto w-full">
                          <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                              <th class="p-2">
                                <div class="font-semibold text-center">
                                  Tên Dịch Vụ
                                </div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-center">
                                  Đơn Vị
                                </div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-center">
                                  Số Lượng
                                </div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-center">
                                  Đơn Giá
                                </div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-center">
                                  Thành Tiền
                                </div>
                              </th>
                            </tr>
                          </thead>

                          <tbody class="text-sm divide-y divide-gray-100">
                            <tr>
                              <td class="p-2">
                                <div class="text-center">Tiền Phòng</div>
                              </td>
                              <td class="p-2">
                                <div class="text-center font-medium text-green-500">
                                  Phòng
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-center font-medium text-green-500">
                                  1
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-center font-medium text-green-500">
                                  <NumericFormat
                                    value={item?.roomFee}
                                    thousandSeparator
                                    displayType="text"
                                  />
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-center font-medium text-green-500">
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
                                <div class="font-medium text-center text-gray-800">
                                  Tiền Điện
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-center">
                                  {item?.bill[item?.bill?.length - 1]?.eleUnit}
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-center font-medium text-green-500">
                                  {Number(
                                    item?.bill[item?.bill?.length - 1]?.newEle
                                  ) -
                                    Number(
                                      item?.bill[item?.bill?.length - 1]?.oldEle
                                    )}
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-center font-medium text-green-500">
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
                                <div class="text-center font-medium text-green-500">
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
                                <div class="font-medium text-center text-gray-800">
                                  Tiền Nước
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-center">
                                  {
                                    item?.bill[item?.bill?.length - 1]
                                      ?.waterUnit
                                  }
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-center font-medium text-green-500">
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
                                <div class="text-center font-medium text-green-500">
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
                                <div class="text-center font-medium text-green-500">
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
                                        <div class="font-medium text-center text-gray-800">
                                          {b?.name}
                                        </div>
                                      </td>
                                      <td class="p-2">
                                        <div class="text-center">{b?.unit}</div>
                                      </td>
                                      <td class="p-2">
                                        <div class="text-center font-medium text-green-500">
                                          1
                                        </div>
                                      </td>
                                      <td class="p-2">
                                        <div class="text-center font-medium text-green-500">
                                          <NumericFormat
                                            value={b?.value}
                                            thousandSeparator
                                            displayType="text"
                                          />
                                        </div>
                                      </td>
                                      <td class="p-2">
                                        <div class="text-center font-medium text-green-500">
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
                                <div class="text-center font-medium text-green-500">
                                  Tổng cộng
                                </div>
                              </td>
                              <td class="p-2">
                                <div class="text-center font-medium text-green-500">
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
      <div class="p-2 border rounded-lg shadow overflow-scroll h-[540px]">
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
            {value?.map((item, index) => {
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
                          Number(item?.bill[item?.bill?.length - 1]?.newWater) -
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
                      {item?.bill[item?.bill?.length - 1]?.service?.map((i) => {
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
                      })}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
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
    const fileName = `phiếu thu tiền trọ ${formattedDate}`;
    const html2CanvasOptions = {};
    const pdfOptions = { w: 300, h: 100, x: 0, y: 0 };
    let card = JSON.parse(sessionStorage.getItem("card"));

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
                html2CanvasOptions,
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
