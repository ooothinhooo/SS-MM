import React, { useEffect, useState } from "react";
import Input from "../Componets/InputType/Input.jsx";

function AddMember() {
  const [data, setData] = useState({});
  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    console.table(data);
  }, [data]);
  return (
    <div>
      <div>
        <div class="w-full max-w-4xl">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                name="fullName"
                type="text"
                placeholder="Nhập Họ và Tên"
                labelText="Họ & Tên"
                value={data.fullName}
                handleInputState={handleInputState}
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <Input
                name="dob"
                type="text"
                placeholder="Ngày Sinh"
                labelText="Ngày Sinh"
                value={data.dob}
                handleInputState={handleInputState}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                name="cccd"
                type="number"
                placeholder="Nhập CCCD"
                labelText="CCCD/CMND"
                value={data.cccd}
                handleInputState={handleInputState}
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <Input
                name="dateRange"
                type="text"
                placeholder="Ngày Cấp"
                labelText="Ngày Cấp"
                value={data.dateRange}
                handleInputState={handleInputState}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 items-center">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Giới tính
              </label>
              <select
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                data-te-select-init
              >
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>
              {/* <label data-te-select-label-ref>Example label</label> */}
            </div>
            <div class="w-full md:w-1/2 px-3">
              <Input
                name="phone"
                type="number"
                placeholder="Số điện thoại"
                labelText="Số điện thoại"
                value={data.phone}
                handleInputState={handleInputState}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <Input
                name="address"
                type="text"
                placeholder="Địa chỉ"
                labelText="Địa chỉ"
                value={data.address}
                handleInputState={handleInputState}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                name="numCar"
                type="text"
                placeholder="Biển số xe"
                labelText="Biển số xe"
                value={data.numCar}
                handleInputState={handleInputState}
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <Input
                name="dateSub"
                type="text"
                placeholder="Ngày ĐKTT"
                labelText="Ngày ĐKTT"
                value={data.dateSub}
                handleInputState={handleInputState}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMember;
