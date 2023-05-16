import React, { useEffect, useState } from "react";
import Input from "../Componets/InputType/Input.jsx";
import Button from "../Componets/InputType/Button.jsx";
import { ADD_MEMBER } from "../../API/Member/addMember.api.js";
import { ToastContainer, toast } from "react-toastify";
import { EDIT_MEMBER } from "../../API/Member/editMember.api.js";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
function UpdateMember({ user, dataMember, getApiMember }) {
  const [data, setData] = useState({});
  const [room, setRoom] = useState();

  console.log(dataMember);

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  useEffect(() => {
    // console.table(data);
    data.motelId = user?.motelId;
  }, [data]);
  const updateMember = async () => {
    try {
      console.log("updateMember");

      const result = await EDIT_MEMBER(user?.token, dataMember?._id, data);
      console.log(result?.data?.status);
      if (result?.data?.status === 200) {
        getApiMember();
        toast.success("Cập Nhật Thành Viên thành công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setData({
          fullName: "",
          dob: "",
          cccd: "",
          dateRange: "",
          sex: "",
          phone: "",
          address: "",
          carNum: "",
          dateSub: "",
        });
      }
    } catch (error) {}
  };

  const GetListRoomAPI = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.motelId);
      setRoom(result.data.data.rooms);
    } catch (error) {}
  };
  useEffect(() => {
    GetListRoomAPI();
  }, []);
  return (
    <div>
      <ToastContainer />
      <div className="w-full shadow-xl  px-40 py-2 rounded-xl">
        <div class="w-full ">
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
                type="date"
                placeholder="dd-mm-yyyy"
                min="1997-01-01"
                max="2030-12-31"
                // placeholder="Ngày Sinh"
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
                type="date"
                placeholder="dd-mm-yyyy"
                min="1997-01-01"
                max="2030-12-31"
                // placeholder="Ngày Cấp"
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
                name="sex"
                onChange={handleChange}
                value={data.sex}
              >
                <option value="">Choose</option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>
              {/* <label data-te-select-label-ref>Example label</label> */}
            </div>
            <div class="w-full md:w-1/2 px-3">
              <Input
                name="phone"
                type="tel"
                id="phone"
                placeholder="Số điện thoại"
                labelText="Số điện thoại"
                value={data.phone}
                handleInputState={handleInputState}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                name="address"
                type="text"
                placeholder="Địa chỉ"
                labelText="Địa chỉ"
                value={data.address}
                handleInputState={handleInputState}
              />
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 items-center">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Chọn Phòng
              </label>
              <select
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                data-te-select-init
                name="roomId"
                onChange={handleChange}
                value={data.roomId}
              >
                <option value="">Choose</option>

                {room?.map((r) => {
                  return (
                    <>
                      <option className="uppercase" value={r?._id}>
                        {r?.roomCode}
                      </option>
                    </>
                  );
                })}
              </select>
              {/* <label data-te-select-label-ref>Example label</label> */}
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                name="carNum"
                type="text"
                placeholder="Biển số xe"
                labelText="Biển số xe"
                value={data.carNum}
                handleInputState={handleInputState}
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <Input
                name="dateSub"
                type="date"
                placeholder="dd-mm-yyyy"
                min="1997-01-01"
                // max="2030-12-31"
                // placeholder="Ngày ĐKTT"
                labelText="Ngày ĐKTT"
                value={data.dateSub}
                handleInputState={handleInputState}
              />
            </div>
          </div>
        </div>
        <div onClick={(e) => updateMember()}>
          {/* xác nhận them */}
          <Button title={"Xác Nhận Thêm"} />
        </div>
      </div>
    </div>
  );
}

export default UpdateMember;
