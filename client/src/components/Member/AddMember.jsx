import React, { useEffect, useState } from "react";
import Input from "../Componets/InputType/Input.jsx";
import Button from "../Componets/InputType/Button.jsx";
import { ADD_MEMBER } from "../../API/Member/addMember.api.js";
import { ToastContainer, toast } from "react-toastify";
import { storage } from "../../Firebase/firebase.config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { randomString } from "../../Func/RamdomString.js";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
function AddMember({ user }) {
  const [roomId, setRoomId] = useState("");
  const [data, setData] = useState({
    // fullName: "",
    // dob: "",
    // cccd: "",
    // dateRange: "",
    // sex: "",
    // phone: "",
    // address: "",
    // carNum: "",
    // idPhoto1: "",
    // idPhoto2: "",
    // roomId: "",
  });

  var a = [];

  const [room, setRoom] = useState();
  const GetListRoomAPI = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      const array = result.data.data.sort((a, b) =>
        String(a.roomCode) > String(b.roomCode) ? 1 : -1
      );
      setRoom(array);
    } catch (error) {}
  };
  useEffect(() => {
    GetListRoomAPI();
  }, []);
  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  useEffect(() => {
    console.table(data);
    data.motelId = user?.Motel;
  }, [data]);

  function isObjectEmptyExceptA(obj) {
    for (let key in obj) {
      if (key !== "carNum" && key !== "roomId" && obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  const addMember = async () => {
    try {
      if (true) {
        const result = await ADD_MEMBER(user?.token, data);
        console.log(result);
        if (result?.data?.status === 200) {
          toast.success("Thêm thành viên thành công", {
            position: "top-right",
            autoClose: 500,
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
            idPhoto1: "",
            idPhoto2: "",
            roomId: "",
          });
          a = [];
        }
      } else {
        toast.error("Thông tin chưa điền đủ", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {}
  };

  const uploadImage = (e, id) => {
    e.preventDefault();
    try {
      const imageFile = e.target.files[0];
      const fileName = randomString(15);
      const storageRef = ref(
        storage,
        `SSMM/MEMBER/${fileName.split("").join("").toUpperCase()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (id == "idPhoto1") {
              data.idPhoto1 = downloadURL;
            } else {
              data.idPhoto2 = downloadURL;
            }
          });
        }
      );
    } catch (error) {}
  };

  const Render_AddRoomUseService = async () => {
    try {
      let html = "";
      const x = room.map((i) => {
        html += `
      <div class="flex items-center   pl-4 border border-gray-200 rounded dark:border-gray-700">
        <input  type="radio"  name="fav_language" value=${i?._id} name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="bordered-checkbox-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${i?.roomCode}</label>
      </div>
        `;
      });
      const { value: formValues } = await Swal.fire({
        title: "Chọn Phòng Cho Khách Thuê",
        width: 1200,
        html: `
        <div class="grid grid-cols-8 gap-4 p-2">  
        ${html}
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
          const Nocheckboxes = document.querySelectorAll("input[type=radio]");
          let ArrayNoChecked = [];
          Array.prototype.forEach.call(Nocheckboxes, function (el) {
            if (!el.checked) {
              ArrayNoChecked.push(el.value);
            }
          });
          return [ArrayChecked, ArrayNoChecked];
        },
      });

      if (formValues) {
        const ArrayChecked = formValues[0];
        formValues[1].pop();
        const ArrayNoChecked = formValues[1];
        a.push(ArrayChecked[0]);
        setData({
          ...data,
          roomId: ArrayChecked[0],
        });
      }
    } catch (error) {}
  };

  return (
    <div>
      <ToastContainer />
      <div className="w-full h-full  flex justify-center items-center py-2  ">
        <div class="w-[90%] h-full  ">
          <div className="w-full  h-full flex justify-center items-center mb-4">
            <p className="text-xl font-bold">THÊM THÔNG TIN KHÁCH THUÊ</p>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="w-full  px-3">
              <label
                class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name "
              >
                {" "}
                Họ và Tên{" "}
              </label>
              <input
                class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="fullName"
                placeholder="Họ và Tên"
                name="fullName"
                onChange={handleChange}
                value={data.fullName}
              />
            </div>
            <div class="w-full  px-3">
              <label
                class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name "
              >
                {" "}
                Ngày Sinh{" "}
              </label>
              <input
                class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="date"
                id="dob"
                placeholder="dd-mm-yyyy"
                name="dob"
                onChange={handleChange}
                value={data.dob}
              />
            </div>
            <div class="w-full  px-3">
              <label
                class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name "
              >
                {" "}
                Số điện thoại{" "}
              </label>
              <input
                class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
                id="phone"
                placeholder="Số điện thoại"
                name="phone"
                onChange={handleChange}
                value={data.phone}
              />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="w-full  px-3">
              <label
                class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name "
              >
                {" "}
                CCCD/CMND{" "}
              </label>
              <input
                class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
                id="cccd"
                placeholder=""
                name="cccd"
                onChange={handleChange}
                value={data.cccd}
              />
            </div>
            <div class="w-full  px-3">
              <label
                class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name "
              >
                {" "}
                Ngày Cấp{" "}
              </label>
              <input
                class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="date"
                id="dateRange"
                placeholder="dd-mm-yyyy"
                name="dateRange"
                onChange={handleChange}
                value={data.dateRange}
              />
            </div>
            <div class="w-full  px-3">
              <label
                class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Giới tính
              </label>
              <select
                id="sex"
                name="sex"
                onChange={handleChange}
                value={data.sex}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Chọn</option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="w-full  px-3">
              <div class="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                <div class="m-4">
                  <label
                    class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name "
                  >
                    {" "}
                    Ảnh mặt trước CMND/CCCD{" "}
                  </label>
                  <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      {data?.idPhoto1 ? (
                        <>
                          <div
                            class={`flex flex-col items-center justify-center`}
                          >
                            <img
                              className="w-full h-32"
                              src={`${data?.idPhoto1}`}
                              alt=""
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            class={`
                         
                        flex flex-col items-center justify-center pt-7`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              Attach a file
                            </p>
                          </div>
                        </>
                      )}

                      <input
                        id="idPhoto1"
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        onChange={(e) => uploadImage(e, "idPhoto1")}
                        class="opacity-0"
                      />
                    </label>
                  </div>
                </div>
                <div class="flex justify-center p-1"></div>
              </div>
            </div>
            <div class="w-full  px-3">
              <div class="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                <div class="m-4">
                  <label
                    class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name "
                  >
                    {" "}
                    Ảnh mặt sau CMND/CCCD{" "}
                  </label>
                  <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      {data?.idPhoto2 ? (
                        <>
                          <div
                            class={`flex flex-col items-center justify-center`}
                          >
                            <img
                              className="w-full h-32"
                              src={`${data?.idPhoto2}`}
                              alt=""
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            class={`
                         
                        flex flex-col items-center justify-center pt-7`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              Attach a file
                            </p>
                          </div>
                        </>
                      )}
                      <input
                        id="idPhoto1"
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        onChange={(e) => uploadImage(e, "idPhoto2")}
                        class="opacity-0"
                      />
                    </label>
                  </div>
                </div>
                <div class="flex justify-center p-1"></div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4 py-4">
            <div class="w-full  ">
              <label
                class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name "
              >
                {" "}
                Biển số xe{" "}
              </label>
              <input
                class="appearance-none uppercase block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="carNum"
                placeholder="83C1-55366"
                name="carNum"
                onChange={handleChange}
                // carNum: "",
                value={data?.carNum}
              />
            </div>

            <div class="w-full  col-span-2">
              <label
                class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name "
              >
                {" "}
                Địa chỉ{" "}
              </label>
              <input
                class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="address"
                placeholder=""
                name="address"
                onChange={handleChange}
                value={data.address}
              />
            </div>
            <div onClick={(e) => Render_AddRoomUseService()} class="w-full  ">
              <label
                class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name "
              >
                Chọn Phòng
              </label>
              <a
                href="#_"
                class="w-full rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white"
              >
                <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                <span class="relative">Chọn Phòng</span>
              </a>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <NavLink to="/member">
              <div>
                <a
                  href="#_"
                  class="relative rounded px-5 py-2.5 overflow-hidden group  relative hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-400 text-black hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ease-out duration-300"
                >
                  <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-gray-200 opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span class="relative">Quay Lại</span>
                </a>
              </div>
            </NavLink>
            <div>
              <div className="w-full flex justify-between gap-4">
                <div>
                  <a
                    href="#_"
                    class="relative rounded px-5 py-2.5 overflow-hidden group bg-red-500 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
                  >
                    <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span class="relative">Xoá</span>
                  </a>
                </div>
                <div onClick={(e) => addMember()}>
                  <a
                    href="#_"
                    class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                  >
                    <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span class="relative">Thêm Khách Thuê</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="w-full ">
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
             
                labelText="Ngày ĐKTT"
                value={data.dateSub}
                handleInputState={handleInputState}
              />
            </div>
          </div>
        </div>
        <div onClick={(e) => addMember()}>
       
          <Button title={"Xác Nhận Thêm"} />
        </div> */}
      </div>
    </div>
  );
}

export default AddMember;
