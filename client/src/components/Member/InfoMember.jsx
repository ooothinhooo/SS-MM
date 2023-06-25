import React, { useEffect, useState } from "react";
import Input from "../Componets/InputType/Input.jsx";
import Button from "../Componets/InputType/Button.jsx";
import { ADD_MEMBER } from "../../API/Member/addMember.api.js";
import { ToastContainer, toast } from "react-toastify";
import { EDIT_MEMBER } from "../../API/Member/editMember.api.js";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { GET_ONE_MEMBER } from "../../API/Member/getOneMember.api.js";
import { NavLink, useNavigate } from "react-router-dom";
import { storage } from "../../Firebase/firebase.config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { randomString } from "../../Func/RamdomString.js";
import Swal from "sweetalert2";

function InfoMember({ user, memberId }) {
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
  const GetInfoMemberAPI = async () => {
    try {
      const dataMember = await GET_ONE_MEMBER(user?.token, memberId);
      console.log("view", dataMember.data.data);
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
          roomId: dataMember.data.data?.roomId,
          idPhoto1: dataMember.data.data?.idPhoto1,
          idPhoto2: dataMember.data.data?.idPhoto2,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    // GetListRoomAPI();
    GetInfoMemberAPI();
  }, []);

  const Image = (img) => {
    Swal.fire({
      imageUrl: img,
      imageHeight: 400,
      width: 800,
      height: 600,
      imageAlt: "A tall image",
    });
  };
  return (
    <div>
      <nav
        class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NavLink to={"/room"}>
              <a
                href="#"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                {/* <svg
                  aria-hidden="true"
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg> */}
                Quản Lý Trọ
              </a>
            </NavLink>
          </li>
          <li>
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
              <NavLink to="/member">
                <a class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                  Danh sách khách thuê
                </a>
              </NavLink>
            </div>
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
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                Thông tin khách thuê
              </span>
            </div>
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
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {data?.fullName}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="w-full flex justify-center items-center">
        <div className="w-[90%]">
          <div class=" flex items-center justify-center px-4">
            <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
              <div class="p-4 border-b text-left">
                <h2 class="text-2xl ">THÔNG TIN KHÁCH THUÊ</h2>
                <p class="text-xl text-gray-500"> {data?.fullName}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <div class="grid grid-cols-3 gap-4 hover:bg-gray-50   p-4 border-b">
                    <p class="text-gray-600">CCCD/CMND</p>
                    <p className="col-span-2"> {data?.cccd}</p>
                  </div>
                  <div class="grid grid-cols-3 gap-4 hover:bg-gray-50   p-4 border-b">
                    <p class="text-gray-600">Ngày Cấp</p>
                    <p className="col-span-2"> {data?.dateRange}</p>
                  </div>
                  <div class="grid grid-cols-3 gap-4 hover:bg-gray-50   p-4 border-b">
                    <p class="text-gray-600">Địa chỉ</p>
                    <p className="col-span-2"> {data?.address}</p>
                  </div>
                  <div class="grid grid-cols-3 gap-4 hover:bg-gray-50   p-4 border-b">
                    <p class="text-gray-600">Phòng</p>
                    <p className="col-span-2"> {data?.roomId?.roomCode}</p>
                  </div>
                </div>

                <div className="text-left">
                  <div class="grid grid-cols-3 gap-4 hover:bg-gray-50   p-4 border-b">
                    <p class="text-gray-600">Ngày Sinh</p>
                    <p className="col-span-2"> {data?.dob}</p>
                  </div>
                  <div class="grid grid-cols-3 gap-4 hover:bg-gray-50   p-4 border-b">
                    <p class="text-gray-600">Số điện thoại</p>
                    <p className="col-span-2"> {data?.phone}</p>
                  </div>
                  <div class="grid grid-cols-3 gap-4 hover:bg-gray-50   p-4 border-b">
                    <p class="text-gray-600">Giới Tính</p>
                    <p className="col-span-2">
                      {" "}
                      {data?.sex == "1" ? "Nam" : "Nữ"}
                    </p>
                  </div>
                  <div class="grid grid-cols-3 gap-4 hover:bg-gray-50   p-4 border-b">
                    <p class="text-gray-600">Biển số xe</p>
                    <p className="col-span-2"> {data?.carNum}</p>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
                  <p class="text-gray-600">Ảnh CCCD/CMND</p>
                  <div class="space-y-2">
                    <div class="border-2 flex items-center p-2 rounded justify-between space-x-2">
                      <div class="space-x-2 truncate">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="fill-current inline text-gray-500"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z" />
                        </svg>
                        <span>Ảnh mặt trước CCCD/CMND</span>
                      </div>
                      <a
                        onClick={(e) => Image(data?.idPhoto1)}
                        class="text-purple-700 hover:underline cursor-pointer "
                      >
                        Xem ảnh
                      </a>
                    </div>

                    <div class="border-2 flex items-center p-2 rounded justify-between space-x-2">
                      <div class="space-x-2 truncate cursor-pointer ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="fill-current inline text-gray-500"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z" />
                        </svg>
                        <span>Ảnh mặt sau CCCD/CMND</span>
                      </div>
                      <a
                        onClick={(e) => Image(data?.idPhoto2)}
                        class="text-purple-700 hover:underline cursor-pointer "
                      >
                        Xem ảnh
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoMember;
