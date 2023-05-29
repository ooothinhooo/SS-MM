import React, { useEffect, useState } from "react";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiOutlineFolderView,
} from "react-icons/ai";
import PrintPay, { PrintData } from "./PrintPay.jsx";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";

function PaymemtsForm({ user }) {
  const navigation = useNavigate();

  const [room, setRoom] = useState([]);
  const [pay, setPay] = useState([]);
  let arr = [];
  const [value, setValue] = useState();
  const getAPI_LISTROOM = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      if (result.data.status == 200) {
        setRoom(result.data.data);
        setValue(result.data.data);
      }
    } catch (error) {}
  };
  const addPay = async (x) => {
    try {
      moveObject(x);
    } catch (error) {}
  };

  const removePay = async (obj) => {
    try {
      const objIndex = pay.findIndex((o) => o._id === obj._id);
      if (objIndex !== -1) {
        const newValue = [...pay];
        newValue.splice(objIndex, 1);
        setPay(newValue);
        setValue([...value, obj]);
      }
    } catch (error) {}
  };

  const moveObject = (obj) => {
    const objIndex = value.findIndex((o) => o._id === obj._id);
    if (objIndex !== -1) {
      const newValue = [...value];
      newValue.splice(objIndex, 1);
      setValue(newValue);
      setPay([...pay, obj]);
    }
  };

  useEffect(() => {
    getAPI_LISTROOM();
  }, []);
  useEffect(() => {
    console.log(value);
    // setPay(JSON.parse(sessionStorage.getItem("pay")));
    console.log(pay);
  }, [pay, value]);
  const printListData = async () => {
    const { value: fruit } = await Swal.fire({
      title: "Chọn Dạng Phiếu",
      input: "select",
      width: 900,
      inputOptions: {
        1: "Dạng 1",
        2: "Dạng 2",
      },
      inputPlaceholder: "Chọn Dạng Phiếu",
      showCancelButton: true,
      html: ` <section class="py-8 px-4">
      <div class="flex flex-wrap -mx-4">
    
        <div class="md:w-1/3 px-4 mb-8 md:mb-0">
       Dạng 1
        <img class="rounded shadow-md" src="https://i.ibb.co/1mSPssr/image.png" alt=""></div>
        <div class="md:w-2/3 px-4 mb-8 md:mb-0">Dạng 2
       
        <img class="rounded shadow-md" src="https://i.ibb.co/vD6Jy7M/image.png" alt=""></div>
      </div>
    </section>`,
    });

    if (fruit) {
      // Swal.fire(`You selected: ${fruit}`);
      sessionStorage.setItem("pay", JSON.stringify(pay));
      sessionStorage.setItem("card", JSON.stringify(fruit));
      navigation("/payment/print");
    }
  };
  const printALlData = async () => {
    const { value: fruit } = await Swal.fire({
      title: "Chọn Dạng Phiếu",
      input: "select",
      width: 900,
      inputOptions: {
        1: "Dạng 1",
        2: "Dạng 2",
      },
      inputPlaceholder: "Chọn Dạng Phiếu",
      showCancelButton: true,
      html: ` <section class="py-8 px-4">
      <div class="flex flex-wrap -mx-4">
    
        <div class="md:w-1/3 px-4 mb-8 md:mb-0">
       Dạng 1
        <img class="rounded shadow-md" src="https://i.ibb.co/1mSPssr/image.png" alt=""></div>
        <div class="md:w-2/3 px-4 mb-8 md:mb-0">Dạng 2
       
        <img class="rounded shadow-md" src="https://i.ibb.co/vD6Jy7M/image.png" alt=""></div>
      </div>
    </section>`,
    });

    if (fruit) {
      // Swal.fire(`You selected: ${fruit}`);

      sessionStorage.setItem("card", JSON.stringify(fruit));
      sessionStorage.setItem("pay", JSON.stringify(value));
      navigation("/payment/print");
    }
  };
   
  return (
    <div>
      <div>
        <div className="flex justify-center items-center w-full ">
          <div className="bg-blue-100 w-[90%] py-2 px-4 flex justify-between items-center ">
            <div onClick={(e) => printListData()}>
              <p class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
                <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                <span class="relative">IN THEO DS ĐÃ CHỌN</span>
              </p>
            </div>
            <div onClick={(e) => printALlData()}>
              <p class="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
                <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                <span class="relative">IN TẤT CẢ</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-start text-left bg-gray-200">
          <div className="font-thin">
            <p>Lưu Ý</p>
            <p>
              Các giá tiền điện/nước không hiện thị tức là phòng trọ chưa được
              thêm
            </p>
            <p>
              Các chỉ số điện nước không hiện thị tức là phòng trọ chưa thêm hoá
              đơn mới nhất
            </p>
          </div>
        </div>
        <div>
          <div className="my-2">DANH SÁCH PHÒNG TRỌ CẦN IN HOÁ ĐƠN</div>
          <div class="flex flex-col">
            <div class=" overflow-x-scroll ">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                          class="text-center   border-2 border-gray-500"
                        >
                          Tiền Phòng
                        </th>
                        <th
                          rowspan="2"
                          scope="col"
                          class="text-center py-2 px-1 border-2 border-gray-500"
                        >
                          Tháng
                        </th>
                        <th
                          colspan="3"
                          scope="col"
                          class="text-center py-2 px-1 border-2 border-gray-500"
                        >
                          Tiền Điện
                        </th>
                        <th
                          colspan="3"
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
                          Tổng cộng
                        </th>
                        <th
                          scope="col"
                          rowspan="2"
                          class="text-center py-2 px-1 border-2 border-gray-500"
                        >
                          Trạng thái
                        </th>
                        <th
                          scope="col"
                          rowspan="2"
                          class="text-center py-2 px-1 border-2 border-gray-500"
                        ></th>
                      </tr>
                      <tr>
                        <th
                          scope="col"
                          class="text-center py-2 px-1 border-2 border-gray-500"
                        >
                          Điện Cũ
                        </th>
                        <th
                          scope="col"
                          class="text-center py-2 px-1 border-2 border-gray-500"
                        >
                          Điện Mới
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
                          Nước Cũ
                        </th>
                        <th
                          scope="col"
                          class="text-center py-2 px-1 border-2 border-gray-500"
                        >
                          Nước Mới
                        </th>
                        <th
                          scope="col"
                          class="text-center py-2 px-1 border-2 border-gray-500"
                        >
                          Thành Tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      {value?.map((i, index) => {
                        return (
                          <>
                            <tr>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] font-medium text-gray-800 dark:text-gray-200">
                                {i?.roomCode}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] font-medium text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={i?.roomFee}
                                  thousandSeparator
                                  displayType="text"
                                />{" "}
                                đ
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] font-medium text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.month}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.oldEle}
                                {i?.bill[i?.bill?.length - 1]?.eleUnit}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.newEle}
                                {i?.bill[i?.bill?.length - 1]?.eleUnit}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={
                                    i?.bill[i?.bill?.length - 1]?.eleUnit ==
                                    "Kwh"
                                      ? (Number(
                                          i?.bill[i?.bill?.length - 1]?.newEle
                                        ) -
                                          Number(
                                            i?.bill[i?.bill?.length - 1]?.oldEle
                                          )) *
                                        Number(
                                          i?.bill[i?.bill?.length - 1]?.elePrice
                                        )
                                      : i?.bill[i?.bill?.length - 1]?.eleUnit ==
                                        "Phòng"
                                      ? Number(
                                          i?.bill[i?.bill?.length - 1]?.elePrice
                                        )
                                      : i?.bill[i?.bill?.length - 1]?.eleUnit ==
                                        "Người"
                                      ? Number(i.member.length) *
                                        Number(
                                          i?.bill[i?.bill?.length - 1]?.elePrice
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
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.oldWater}{" "}
                                {i?.bill[i?.bill?.length - 1]?.waterUnit}
                              </td>

                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.newWater}
                                {i?.bill[i?.bill?.length - 1]?.waterUnit}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={
                                    i?.bill[i?.bill?.length - 1]?.waterUnit ==
                                    "Khối"
                                      ? (Number(
                                          i?.bill[i?.bill?.length - 1]?.newWater
                                        ) -
                                          Number(
                                            i?.bill[i?.bill?.length - 1]
                                              ?.oldWater
                                          )) *
                                        Number(
                                          i?.bill[i?.bill?.length - 1]
                                            ?.waterPrice
                                        )
                                      : i?.bill[i?.bill?.length - 1]
                                          ?.waterUnit == "Phòng"
                                      ? Number(
                                          i?.bill[i?.bill?.length - 1]
                                            ?.waterPrice
                                        )
                                      : i?.bill[i?.bill?.length - 1]
                                          ?.waterUnit == "Người"
                                      ? Number(i.member.length) *
                                        Number(
                                          i?.bill[i?.bill?.length - 1]
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
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.service?.map(
                                  (i) => {
                                    return (
                                      <>
                                        <p className="">
                                          <span className="italic font-bold text-[10px]">
                                            {i.name}
                                          </span>{" "}
                                          ={" "}
                                          <NumericFormat
                                            value={i?.value}
                                            thousandSeparator
                                            displayType="text"
                                          />
                                          <span className="italic font-bold text-[10px]">
                                            đ
                                          </span>{" "}
                                          <span className="italic font-bold text-[14px]">
                                            /
                                          </span>
                                          <span className="italic  text-[10px]">
                                            {i.unit}
                                          </span>
                                        </p>
                                      </>
                                    );
                                  }
                                )}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                {/* tien phong + tien dien + nuoc + dichj vu  */}
                                <NumericFormat
                                  value={
                                    Number(i?.roomFee) +
                                    Number(
                                      i?.bill[i?.bill?.length - 1]?.eleUnit ==
                                        "Kwh"
                                        ? (Number(
                                            i?.bill[i?.bill?.length - 1]?.newEle
                                          ) -
                                            Number(
                                              i?.bill[i?.bill?.length - 1]
                                                ?.oldEle
                                            )) *
                                            Number(
                                              i?.bill[i?.bill?.length - 1]
                                                ?.elePrice
                                            )
                                        : i?.bill[i?.bill?.length - 1]
                                            ?.eleUnit == "Phòng"
                                        ? Number(
                                            i?.bill[i?.bill?.length - 1]
                                              ?.elePrice
                                          )
                                        : i?.bill[i?.bill?.length - 1]
                                            ?.eleUnit == "Người"
                                        ? Number(i.member.length) *
                                          Number(
                                            i?.bill[i?.bill?.length - 1]
                                              ?.elePrice
                                          )
                                        : 0
                                    ) +
                                    Number(
                                      i?.bill[i?.bill?.length - 1]?.waterUnit ==
                                        "Khối"
                                        ? (Number(
                                            i?.bill[i?.bill?.length - 1]
                                              ?.newWater
                                          ) -
                                            Number(
                                              i?.bill[i?.bill?.length - 1]
                                                ?.oldWater
                                            )) *
                                            Number(
                                              i?.bill[i?.bill?.length - 1]
                                                ?.waterPrice
                                            )
                                        : i?.bill[i?.bill?.length - 1]
                                            ?.waterUnit == "Phòng"
                                        ? Number(
                                            i?.bill[i?.bill?.length - 1]
                                              ?.waterPrice
                                          )
                                        : i?.bill[i?.bill?.length - 1]
                                            ?.waterUnit == "Người"
                                        ? Number(i.member.length) *
                                          Number(
                                            i?.bill[i?.bill?.length - 1]
                                              ?.waterPrice
                                          )
                                        : 0
                                    ) +
                                    Number(
                                      i?.bill[
                                        i?.bill?.length - 1
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
                              </td>
                              <td class=" whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.status ? (
                                  <span className="text-green-500">Đã Thu</span>
                                ) : (
                                  <span className="text-red-700">Chưa Thu</span>
                                )}
                              </td>
                              <td class=" whitespace-nowrap text-center text-[10px] font-medium">
                                <div className="flex  justify-center gap-1 items-center w-full">
                                  <div>
                                    <p class="group max-w-max relative flex flex-col items-center justify-center rounded-full border border-gray-500 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-600">
                                      <button
                                        // onClick={(e) =>
                                        //   addPay(
                                        //     i?._id,
                                        //     i?.bill,
                                        //     i?.deposit,
                                        //     i?.electricityPrice,
                                        //     i?.roomFee,
                                        //     i?.waterPrice
                                        //   )
                                        // }
                                        onClick={(e) => addPay(value[index])}
                                        className="cursor-pointer px-2  z-10 bg-blue-300 rounded-full hover:bg-blue-500"
                                      >
                                        <i className="text-xl ">
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
                                        <button
                                          id="addbtn"
                                          className="cursor-pointer px-2  z-10 bg-blue-300 rounded-full hover:bg-blue-500"
                                        >
                                          <i className="text-xl ">
                                            <AiOutlineFolderView />
                                          </i>
                                        </button>
                                        <div class="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] z-1 group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                                          <div class="flex max-w-xs flex-col items-center">
                                            <div class="rounded bg-gray-100 px-2 text-xs text-gray-800  text-center shadow-lg">
                                              Xem Chi Tiết
                                            </div>
                                            <div class="clip-bottom h-2 w-4 "></div>
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
        <div>
          <div className="my-2">DANH SÁCH ĐÃ CHỌN</div>
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
                          Giá Phòng
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
                          SD Điện
                        </th>

                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          SD Nước
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          Tổng Tiền
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
                      {pay?.map((i, index) => {
                        return (
                          <>
                            <tr>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] font-medium text-gray-800 dark:text-gray-200">
                                {i?.roomCode}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] font-medium text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={i?.roomFee}
                                  thousandSeparator
                                  displayType="text"
                                />{" "}
                                VNĐ
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] font-medium text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.month}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.newEle} -{" "}
                                {i?.bill[i?.bill?.length - 1]?.oldEle} ={" "}
                                {i?.bill[i?.bill?.length - 1]?.newEle -
                                  i?.bill[i?.bill?.length - 1]?.oldEle}{" "}
                                Kí ({" "}
                                <NumericFormat
                                  value={i?.electricityPrice}
                                  thousandSeparator
                                  displayType="text"
                                />
                                /1kí)
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.newWater} -{" "}
                                {i?.bill[i?.bill?.length - 1]?.oldWater} ={" "}
                                {i?.bill[i?.bill?.length - 1]?.newWater -
                                  i?.bill[i?.bill?.length - 1]?.oldWater}{" "}
                                Khối ({" "}
                                <NumericFormat
                                  value={i?.waterPrice}
                                  thousandSeparator
                                  displayType="text"
                                />
                                /1 Khối)
                              </td>

                              <td class="px-6 py-4 whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={
                                    Number(
                                      Number(
                                        (i?.bill[i?.bill.length - 1]?.newWater -
                                          i?.bill[i?.bill.length - 1]
                                            ?.oldWater) *
                                          Number(i?.waterPrice)
                                      ) +
                                        Number(
                                          i?.bill[i?.bill.length - 1]?.newEle -
                                            i?.bill[i?.bill.length - 1]?.oldEle
                                        ) *
                                          Number(i?.electricityPrice)
                                    ) + Number(i?.roomFee)
                                  }
                                  thousandSeparator
                                  displayType="text"
                                />{" "}
                                VNĐ
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-center text-[10px] font-medium">
                                <div className="flex  justify-center gap-1 items-center w-full">
                                  <div>
                                    <p class="group max-w-max relative flex flex-col items-center justify-center rounded-full border border-gray-500 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-600">
                                      <button
                                        onClick={(e) => removePay(pay[index])}
                                        className="cursor-pointer px-2  z-10 bg-blue-300 rounded-full hover:bg-blue-500"
                                      >
                                        <i className="text-xl ">
                                          <AiOutlineDelete />
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
  );
}

export default PaymemtsForm;
