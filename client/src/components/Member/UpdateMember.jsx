import React, { useEffect, useState } from "react";
import Input from "../Componets/InputType/Input.jsx";
import Button from "../Componets/InputType/Button.jsx";
import { ADD_MEMBER } from "../../API/Member/addMember.api.js";
import { ToastContainer, toast } from "react-toastify";
import { EDIT_MEMBER } from "../../API/Member/editMember.api.js";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { GET_ONE_MEMBER } from "../../API/Member/getOneMember.api.js";
import { NavLink, useNavigate } from "react-router-dom";
function UpdateMember({ user, memberId }) {
  const navigation = useNavigate();

  const [data, setData] = useState({
    // fullName: dataMember?.fullName,
    // cccd: dataMember?.cccd,
    // dateRange: dataMember?.dateRange,
    // sex: dataMember?.sex,
    // phone: dataMember?.phone,
    // dob: dataMember?.dob,
    // address: dataMember?.address,
    // carNum: dataMember?.carNum,
    // dateSub: dataMember?.dateSub,
    // roomId: dataMember?.roomId,
  });
  const [room, setRoom] = useState();
  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  useEffect(() => {
    console.log(data);
    data.motelId = user?.Motel;
  }, [data]);
  const updateMember = async () => {
    try {
      const result = await EDIT_MEMBER(user?.token, memberId, data);
      console.log(result?.data?.status);
      if (result?.data?.status === 200) {
        // getApiMember();
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

        setTimeout(() => {
          navigation("/member");
        }, 1000);
        // setData({
        //   fullName: "",
        //   dob: "",
        //   cccd: "",
        //   dateRange: "",
        //   sex: "",
        //   phone: "",
        //   address: "",
        //   carNum: "",
        //   dateSub: "",
        // });
      }
    } catch (error) {}
  };

  const GetListRoomAPI = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      setRoom(result.data.data.rooms);
    } catch (error) {}
  };
  const GetInfoMemberAPI = async () => {
    try {
      const dataMember = await GET_ONE_MEMBER(user?.token, memberId);
      console.log(dataMember.data.data);
      if (dataMember.data?.status === 200) {
        setData({
          fullName: dataMember.data.data?.fullName,
          cccd: dataMember.data.data?.cccd,
          dateRange: dataMember.data.data?.dateRange,
          sex: dataMember.data.data?.sex,
          phone: dataMember.data.data?.phone,
          dob: dataMember.data.data?.dob,
          address: dataMember.data.data?.address,
          carNum: dataMember.data.data?.carNum,
          dateSub: dataMember.data.data?.dateSub,
          roomId: dataMember.data.data?.roomId?._id,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    GetListRoomAPI();
    GetInfoMemberAPI();
  }, []);
  return (
    <div>
      <ToastContainer />
      <div className="w-full shadow-xl  px-40 py-1 rounded-xl">
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
        <div className="flex justify-between w-full items-center">
          <div class=" ">
            <NavLink to={"/member"}>
              <div class="max-w-md mx-auto space-y-6 flex justify-center my-1">
                <p class="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500">
                  <strong class="font-medium">Huỷ</strong>
                  {/* <svg
                    class="ml-1 rotate-180 fill-white group-hover:fill-blue-500"
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M17.6954 12.4962L21.6468 12.1467C22.5335 12.1467 23.2525 12.8727 23.2525 13.7681C23.2525 14.6635 22.5335 15.3895 21.6468 15.3895L17.6954 15.04C16.9997 15.04 16.4357 14.4705 16.4357 13.7681C16.4357 13.0645 16.9997 12.4962 17.6954 12.4962"
                    ></path>
                    <path d="M4.42637 12.5604C4.48813 12.4981 4.71885 12.2345 4.93559 12.0157C6.19989 10.6449 9.50107 8.40347 11.228 7.71751C11.4902 7.60808 12.1532 7.37512 12.5086 7.35864C12.8477 7.35864 13.1716 7.43748 13.4804 7.59279C13.8661 7.81046 14.1738 8.15403 14.3439 8.55878C14.4522 8.83882 14.6224 9.68009 14.6224 9.69539C14.7913 10.6143 14.8834 12.1086 14.8834 13.7606C14.8834 15.3325 14.7913 16.7656 14.6527 17.6999C14.6375 17.7163 14.4674 18.76 14.2821 19.1177C13.943 19.7719 13.28 20.1766 12.5704 20.1766H12.5086C12.046 20.1613 11.0742 19.7554 11.0742 19.7413C9.43931 19.0553 6.21621 16.9221 4.92044 15.5043C4.92044 15.5043 4.55455 15.1396 4.39608 14.9125C4.14904 14.5854 4.02552 14.1806 4.02552 13.7759C4.02552 13.3241 4.16419 12.904 4.42637 12.5604"></path>
                  </svg> */}
                  <span class="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
                </p>
              </div>
            </NavLink>
          </div>
          <div onClick={(e) => updateMember()} class="">
            <p class="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500">
              <strong class="font-medium">XÁC NHẬN CẬP NHẬT </strong>
              <svg
                class="ml-1 rotate-180 fill-white group-hover:fill-blue-500"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M17.6954 12.4962L21.6468 12.1467C22.5335 12.1467 23.2525 12.8727 23.2525 13.7681C23.2525 14.6635 22.5335 15.3895 21.6468 15.3895L17.6954 15.04C16.9997 15.04 16.4357 14.4705 16.4357 13.7681C16.4357 13.0645 16.9997 12.4962 17.6954 12.4962"
                ></path>
                <path d="M4.42637 12.5604C4.48813 12.4981 4.71885 12.2345 4.93559 12.0157C6.19989 10.6449 9.50107 8.40347 11.228 7.71751C11.4902 7.60808 12.1532 7.37512 12.5086 7.35864C12.8477 7.35864 13.1716 7.43748 13.4804 7.59279C13.8661 7.81046 14.1738 8.15403 14.3439 8.55878C14.4522 8.83882 14.6224 9.68009 14.6224 9.69539C14.7913 10.6143 14.8834 12.1086 14.8834 13.7606C14.8834 15.3325 14.7913 16.7656 14.6527 17.6999C14.6375 17.7163 14.4674 18.76 14.2821 19.1177C13.943 19.7719 13.28 20.1766 12.5704 20.1766H12.5086C12.046 20.1613 11.0742 19.7554 11.0742 19.7413C9.43931 19.0553 6.21621 16.9221 4.92044 15.5043C4.92044 15.5043 4.55455 15.1396 4.39608 14.9125C4.14904 14.5854 4.02552 14.1806 4.02552 13.7759C4.02552 13.3241 4.16419 12.904 4.42637 12.5604"></path>
              </svg>
              <span class="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMember;
