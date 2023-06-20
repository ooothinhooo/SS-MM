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
import cardpay3 from "../../images/cardpay3.png";
import cardpay2 from "../../images/cardpay2.png";
import cardpay1 from "../../images/cardpay1.png";

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
        // setRoom(result.data.data);
        const array = result.data.data.sort((a, b) =>
          String(a.roomCode) > String(b.roomCode) ? 1 : -1
        );
        setRoom(array);
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

  const Render_Invo = async () => {
    try {
      const { value: x } = await Swal.fire({
        title: "Chọn Dạng Phiếu Để In",
        width: 1200,
        html: `
        <input type="radio" value="1" name="emotion" id="happy" class="input-hidden" />
        <label for="happy">
        <img src="https://i.ibb.co/PW470y8/image.png" class="cursor-pointer" alt="image" border="0">
        </label>

        <div class="grid grid-cols-3 gap-4 p-2">
        <input type="radio" name="emotion" id="sad" value="4"    class="input-hidden" />
        <label for="sad">
          <img  src=${cardpay1} class="cursor-pointer" />
        </label>
        
        <input type="radio" name="emotion" id="sad1" value="3"   class="input-hidden" />
        <label for="sad1">
          <img src=${cardpay3}  class="cursor-pointer" />
        </label>

        <input type="radio" value="2" name="emotion" id="happy2"   class="input-hidden" />
        <label for="happy2">
        <img src=${cardpay2}   class="cursor-pointer" />
        </label>

        <style>
          .input-hidden {
            position: absolute;
            left: -9999px;
          }
    
          input[type=radio]:checked+label>img {
            border: 1px solid #fff;
            box-shadow: 0 0 3px 3px #090;
          }
    
          /* Stuff after this is only to make things more pretty */
          input[type=radio]+label>img {
           
            transition: 500ms all;
          }
        </style>
      </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const checkboxes = document.querySelectorAll(
            "input[type=radio]:checked"
          );
          let ArrayChecked = [];
          Array.prototype.forEach.call(checkboxes, function (el) {
            ArrayChecked.push(el.value);
          });

          // return [ArrayChecked];
          const formValues = ArrayChecked[0];
          return formValues;
        },
      });

      if (x) {
      }
    } catch (error) {}
  };
  const printListData = async () => {
    try {
      const { value: x } = await Swal.fire({
        title: "Chọn Dạng Phiếu Để In",
        width: 1200,
        html: `
        <input type="radio" value="1" name="emotion" id="happy" class="input-hidden" />
        <label for="happy">
        <img src="https://i.ibb.co/PW470y8/image.png" class="cursor-pointer" alt="image" border="0">
        </label>

        <div class="grid grid-cols-3 gap-4 p-2">
        <input type="radio" name="emotion" id="sad" value="4"    class="input-hidden" />
        <label for="sad">
          <img  src=${cardpay1} class="cursor-pointer" />
        </label>
        
        <input type="radio" name="emotion" id="sad1" value="3"   class="input-hidden" />
        <label for="sad1">
          <img src=${cardpay3}  class="cursor-pointer" />
        </label>

        <input type="radio" value="2" name="emotion" id="happy2"   class="input-hidden" />
        <label for="happy2">
        <img src=${cardpay2}   class="cursor-pointer" />
        </label>

        <style>
          .input-hidden {
            position: absolute;
            left: -9999px;
          }
    
          input[type=radio]:checked+label>img {
            border: 1px solid #fff;
            box-shadow: 0 0 3px 3px #090;
          }
    
          /* Stuff after this is only to make things more pretty */
          input[type=radio]+label>img {
           
            transition: 500ms all;
          }
        </style>
      </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const checkboxes = document.querySelectorAll(
            "input[type=radio]:checked"
          );
          let ArrayChecked = [];
          Array.prototype.forEach.call(checkboxes, function (el) {
            ArrayChecked.push(el.value);
          });

          // return [ArrayChecked];
          const formValues = ArrayChecked[0];
          return formValues;
        },
      });

      if (x) {
        sessionStorage.setItem("card", JSON.stringify(x));
        sessionStorage.setItem("pay", JSON.stringify(value));
        // sessionStorage.setItem("card", JSON.stringify(fruit));
        navigation("/payment/print");
      }
    } catch (error) {}
  };
  const printALlData = async () => {
    try {
      const { value: x } = await Swal.fire({
        title: "Chọn Dạng Phiếu Để In",
        width: 1200,
        html: `
        <input type="radio" value="1" name="emotion" id="happy" class="input-hidden" />
        <label for="happy">
        <img src="https://i.ibb.co/PW470y8/image.png" class="cursor-pointer" alt="image" border="0">
        </label>

        <div class="grid grid-cols-3 gap-4 p-2">
        <input type="radio" name="emotion" id="sad" value="4"    class="input-hidden" />
        <label for="sad">
          <img  src=${cardpay1} class="cursor-pointer" />
        </label>
        
        <input type="radio" name="emotion" id="sad1" value="3"   class="input-hidden" />
        <label for="sad1">
          <img src=${cardpay3}  class="cursor-pointer" />
        </label>

        <input type="radio" value="2" name="emotion" id="happy2"   class="input-hidden" />
        <label for="happy2">
        <img src=${cardpay2}   class="cursor-pointer" />
        </label>

        <style>
          .input-hidden {
            position: absolute;
            left: -9999px;
          }
    
          input[type=radio]:checked+label>img {
            border: 1px solid #fff;
            box-shadow: 0 0 3px 3px #090;
          }
    
          /* Stuff after this is only to make things more pretty */
          input[type=radio]+label>img {
           
            transition: 500ms all;
          }
        </style>
      </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const checkboxes = document.querySelectorAll(
            "input[type=radio]:checked"
          );
          let ArrayChecked = [];
          Array.prototype.forEach.call(checkboxes, function (el) {
            ArrayChecked.push(el.value);
          });

          // return [ArrayChecked];
          const formValues = ArrayChecked[0];
          return formValues;
        },
      });

      if (x) {
        sessionStorage.setItem("card", JSON.stringify(x));
        sessionStorage.setItem("pay", JSON.stringify(value));
        navigation("/payment/print");
      }
    } catch (error) {}
  };

  const ExportListData = async () => {
    // const x = Render_Invo();
    try {
      const { value: x } = await Swal.fire({
        title: "Chọn Dạng Phiếu Để Xuất",
        width: 1200,
        html: `
        <input type="radio" value="1" name="emotion" id="happy" class="input-hidden" />
        <label for="happy">
        <img src="https://i.ibb.co/PW470y8/image.png" class="cursor-pointer" alt="image" border="0">
        </label>

        <div class="grid grid-cols-3 gap-4 p-2">
        <input type="radio" name="emotion" id="sad" value="4"    class="input-hidden" />
        <label for="sad">
          <img  src=${cardpay1} class="cursor-pointer" />
        </label>
        
        <input type="radio" name="emotion" id="sad1" value="3"   class="input-hidden" />
        <label for="sad1">
          <img src=${cardpay3}  class="cursor-pointer" />
        </label>

        <input type="radio" value="2" name="emotion" id="happy2"   class="input-hidden" />
        <label for="happy2">
        <img src=${cardpay2}   class="cursor-pointer" />
        </label>

        <style>
          .input-hidden {
            position: absolute;
            left: -9999px;
          }
    
          input[type=radio]:checked+label>img {
            border: 1px solid #fff;
            box-shadow: 0 0 3px 3px #090;
          }
    
          /* Stuff after this is only to make things more pretty */
          input[type=radio]+label>img {
           
            transition: 500ms all;
          }
        </style>
      </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const checkboxes = document.querySelectorAll(
            "input[type=radio]:checked"
          );
          let ArrayChecked = [];
          Array.prototype.forEach.call(checkboxes, function (el) {
            ArrayChecked.push(el.value);
          });

          // return [ArrayChecked];
          const formValues = ArrayChecked[0];
          return formValues;
        },
      });

      if (x) {
        sessionStorage.setItem("card", JSON.stringify(x));
        sessionStorage.setItem("pay", JSON.stringify(value));
        navigation("/payment/export");
      }
    } catch (error) {}
  };
  const ExportALlData = async () => {
    // const x = Render_Invo();
    try {
      const { value: x } = await Swal.fire({
        title: "Chọn Dạng Phiếu Để Xuất",
        width: 1200,
        html: `
        <input type="radio" value="1" name="emotion" id="happy" class="input-hidden" />
        <label for="happy">
        <img src="https://i.ibb.co/PW470y8/image.png" class="cursor-pointer" alt="image" border="0">
        </label>

        <div class="grid grid-cols-3 gap-4 p-2">
        <input type="radio" name="emotion" id="sad" value="4"    class="input-hidden" />
        <label for="sad">
          <img  src=${cardpay1} class="cursor-pointer" />
        </label>
        
        <input type="radio" name="emotion" id="sad1" value="3"   class="input-hidden" />
        <label for="sad1">
          <img src=${cardpay3}  class="cursor-pointer" />
        </label>

        <input type="radio" value="2" name="emotion" id="happy2"   class="input-hidden" />
        <label for="happy2">
        <img src=${cardpay2}   class="cursor-pointer" />
        </label>

        <style>
          .input-hidden {
            position: absolute;
            left: -9999px;
          }
    
          input[type=radio]:checked+label>img {
            border: 1px solid #fff;
            box-shadow: 0 0 3px 3px #090;
          }
    
          /* Stuff after this is only to make things more pretty */
          input[type=radio]+label>img {
           
            transition: 500ms all;
          }
        </style>
      </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const checkboxes = document.querySelectorAll(
            "input[type=radio]:checked"
          );
          let ArrayChecked = [];
          Array.prototype.forEach.call(checkboxes, function (el) {
            ArrayChecked.push(el.value);
          });

          // return [ArrayChecked];
          const formValues = ArrayChecked[0];
          return formValues;
        },
      });

      if (x) {
        sessionStorage.setItem("card", JSON.stringify(x));
        sessionStorage.setItem("pay", JSON.stringify(value));
        navigation("/payment/export");
      }
    } catch (error) {}
  };
  return (
    <div>
      <div>
        <div class=" bg-white mr-6 w-full rounded-md border-dashed border-2 border-gray-500">
          <div class=" flex w-full">
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="col-span-2 w-full">
                <div className="flex justify-start text-left px-2 w-full">
                  <div className="font-thin">
                    <p>Lưu Ý</p>
                    <p>
                      Các giá tiền điện/nước không hiện thị tức là phòng trọ
                      chưa được thêm
                    </p>
                    <p>
                      Các chỉ số điện nước không hiện thị tức là phòng trọ chưa
                      thêm hoá đơn mới nhất
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex justify-center items-center  w-full">
                <div className="flex items-center justify-center w-full">
                  <div class="flex items-center justify-center w-full mx-2">
                    <button
                      type="button"
                      onClick={ExportListData}
                      class="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-blue-200 px-1 py-0.5 "
                    >
                      Xuất hoá đơn đã chọn
                    </button>
                    <button
                      type="button"
                      onClick={ExportALlData}
                      class="w-full border text-base font-medium text-black bg-white hover:bg-blue-200 px-1 py-0.5"
                    >
                      Xuất tất cả hoá đơn
                    </button>
                    <button
                      type="button"
                      onClick={printListData}
                      class="w-full border text-base font-medium text-black bg-white hover:bg-blue-200 px-1 py-0.5"
                    >
                      In hoá đơn đã chọn
                    </button>
                    <button
                      onClick={printALlData}
                      type="button"
                      class="w-full h-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-blue-200 px-1 py-0.5"
                    >
                      In tất cả hoá đơn
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
