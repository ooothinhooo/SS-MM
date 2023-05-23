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
  const printListData = () => {
    sessionStorage.setItem("pay", JSON.stringify(pay));
    navigation("/payment/print");
  };
  const printALlData = () => {
    sessionStorage.setItem("pay", JSON.stringify(value));
    navigation("/payment/print");
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
                          CS Điện Mới
                        </th>

                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          CS Nước Mới
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          Sử dụng
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
                      {value?.map((i, index) => {
                        return (
                          <>
                            <tr>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {i?.roomCode}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={i?.roomFee}
                                  thousandSeparator
                                  displayType="text"
                                />{" "}
                                VNĐ
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.month}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
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
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
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

                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
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
                              <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
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
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {i?.roomCode}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                <NumericFormat
                                  value={i?.roomFee}
                                  thousandSeparator
                                  displayType="text"
                                />{" "}
                                VNĐ
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {i?.bill[i?.bill?.length - 1]?.month}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
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
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
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

                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
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
                              <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
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
