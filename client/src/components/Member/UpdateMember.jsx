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
import { ADD_MEMBER_TOROOM } from "../../API/Room/addMemberToRoom.api.js";
import { Toast } from "../../Func/Toast.js";

function UpdateMember({ user, memberId }) {
  const navigation = useNavigate();
  var a = [];

  const [data, setData] = useState({
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
      data.roomId = a[0];
      console.log(a[0]);
      const result = await EDIT_MEMBER(user?.token, memberId, data);
      console.log(result?.data?.status);
      if (result?.data?.status === 200) {
        // getApiMember();
        // console.log(data);
        Toast.fire({
          icon: "success",
          title: "Cập Nhật Thành Viên thành công",
        });
        // toast.success("Cập Nhật Thành Viên thành công", {
        //   position: "top-right",
        //   autoClose: 1500,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
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
        });
        a = [];

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

  const addMemberToRoom = async (roomId) => {
    try {
      const result = await ADD_MEMBER_TOROOM(user?.token, roomId, memberId);
      console.log(result);
      if (result?.data?.status === 200) {
        // getApiMember();
        GetInfoMemberAPI();
        console.log(data);
        Toast.fire({
          icon: "success",
          title: "Cập Nhật Thành Phòng Thành Công",
        });
        // toast.success("Cập Nhật Phòng thành công", {
        //   position: "top-right",
        //   autoClose: 1500,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    } catch (error) {}
  };

  const GetListRoomAPI = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      const array = result.data.data.sort((a, b) =>
        String(a.roomCode) > String(b.roomCode) ? 1 : -1
      );
      setRoom(array);
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
          roomId: dataMember.data.data?.roomId,
          idPhoto1: dataMember.data.data?.idPhoto1,
          idPhoto2: dataMember.data.data?.idPhoto2,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    GetListRoomAPI();
    GetInfoMemberAPI();
  }, []);

  const uploadImage = (e, id) => {
    e.preventDefault();
    try {
      const imageFile = e.target.files[0];
      // console.log(imageFile);
      // const fileName = new Date().getTime() + imageFile.name;
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
            // setAvatar(downloadURL);

            if (id == "idPhoto1") {
              data.idPhoto1 = downloadURL;

              toast.success("Ảnh CCCD Mặt Trước Được Thêm");
            } else {
              data.idPhoto2 = downloadURL;

              toast.success("Ảnh CCCD Mặt Sau Được Thêm");
              // toast.success("Thêm ảnh thành công");
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
    <input  
    ${data?.roomId?._id == i?._id ? "checked" : ""}
    
    type="radio"  name="fav_language" value=${
      i?._id
    } name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="bordered-checkbox-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${
      i?.roomCode
    }</label>
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
          // console.log(values);
          const Nocheckboxes = document.querySelectorAll("input[type=radio]");
          let ArrayNoChecked = [];
          Array.prototype.forEach.call(Nocheckboxes, function (el) {
            if (!el.checked) {
              ArrayNoChecked.push(el.value);
            }
          });
          console.log(ArrayChecked);
          console.log(ArrayNoChecked);
          return [ArrayChecked, ArrayNoChecked];
        },
      });

      if (formValues) {
        const ArrayChecked = formValues[0];
        formValues[1].pop();
        const ArrayNoChecked = formValues[1];

        addMemberToRoom(ArrayChecked[0]);
      }
    } catch (error) {}
  };

  return (
    <div className="w-full flex justify-center items-center  ">
      <div class="w-[80%] ">
        <div className="w-full flex justify-center items-center mb-4 ">
          <p className="text-xl font-bold uppercase">
            cập nhật THÔNG TIN KHÁCH THUÊ
          </p>
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
              value={data?.address}
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
          <div

          // onClick={(e) => setIsAdd(!isAdd)}
          >
            <NavLink to="/member">
              <a class="relative rounded px-5 py-2.5 overflow-hidden group  relative hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-400 text-black hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ease-out duration-300">
                <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-gray-200 opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative">Quay Lại</span>
              </a>
            </NavLink>
          </div>
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
              <div
                // onClick={(e) => addMember()}
                onClick={() => updateMember()}
              >
                <a
                  href="#_"
                  class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                >
                  <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span class="relative">Cập nhật</span>
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
  );
  // return (
  //   <div>
  //     <ToastContainer />
  //     <div className="w-full shadow-xl  px-40 py-1 rounded-xl">
  //       <div class="w-full ">
  //         <div class="flex flex-wrap -mx-3 mb-6">
  //           <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
  //             <Input
  //               name="fullName"
  //               type="text"
  //               placeholder="Nhập Họ và Tên"
  //               labelText="Họ & Tên"
  //               value={data.fullName}
  //               handleInputState={handleInputState}
  //             />
  //           </div>
  //           <div class="w-full md:w-1/2 px-3">
  //             <Input
  //               name="dob"
  //               type="date"
  //               placeholder="dd-mm-yyyy"
  //               min="1997-01-01"
  //               max="2030-12-31"
  //               // placeholder="Ngày Sinh"
  //               labelText="Ngày Sinh"
  //               value={data.dob}
  //               handleInputState={handleInputState}
  //             />
  //           </div>
  //         </div>
  //         <div class="flex flex-wrap -mx-3 mb-6">
  //           <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
  //             <Input
  //               name="cccd"
  //               type="number"
  //               placeholder="Nhập CCCD"
  //               labelText="CCCD/CMND"
  //               value={data.cccd}
  //               handleInputState={handleInputState}
  //             />
  //           </div>
  //           <div class="w-full md:w-1/2 px-3">
  //             <Input
  //               name="dateRange"
  //               type="date"
  //               placeholder="dd-mm-yyyy"
  //               min="1997-01-01"
  //               max="2030-12-31"
  //               // placeholder="Ngày Cấp"
  //               labelText="Ngày Cấp"
  //               value={data.dateRange}
  //               handleInputState={handleInputState}
  //             />
  //           </div>
  //         </div>
  //         <div class="flex flex-wrap -mx-3 mb-6">
  //           <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 items-center">
  //             <label
  //               class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  //               for="grid-first-name"
  //             >
  //               Giới tính
  //             </label>
  //             <select
  //               class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  //               data-te-select-init
  //               name="sex"
  //               onChange={handleChange}
  //               value={data.sex}
  //             >
  //               <option value="">Choose</option>
  //               <option value="1">Nam</option>
  //               <option value="0">Nữ</option>
  //             </select>
  //             {/* <label data-te-select-label-ref>Example label</label> */}
  //           </div>
  //           <div class="w-full md:w-1/2 px-3">
  //             <Input
  //               name="phone"
  //               type="tel"
  //               id="phone"
  //               placeholder="Số điện thoại"
  //               labelText="Số điện thoại"
  //               value={data.phone}
  //               handleInputState={handleInputState}
  //             />
  //           </div>
  //         </div>
  //         <div class="flex flex-wrap -mx-3 mb-6">
  //           <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
  //             <Input
  //               name="address"
  //               type="text"
  //               placeholder="Địa chỉ"
  //               labelText="Địa chỉ"
  //               value={data.address}
  //               handleInputState={handleInputState}
  //             />
  //           </div>
  //           <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 items-center">
  //             <label
  //               class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  //               for="grid-first-name"
  //             >
  //               Chọn Phòng
  //             </label>
  //             <select
  //               class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  //               data-te-select-init
  //               name="roomId"
  //               onChange={handleChange}
  //               value={data.roomId}
  //             >
  //               <option value="">Choose</option>

  //               {room?.map((r) => {
  //                 return (
  //                   <>
  //                     <option className="uppercase" value={r?._id}>
  //                       {r?.roomCode}
  //                     </option>
  //                   </>
  //                 );
  //               })}
  //             </select>
  //             {/* <label data-te-select-label-ref>Example label</label> */}
  //           </div>
  //         </div>
  //         <div class="flex flex-wrap -mx-3 mb-6">
  //           <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
  //             <Input
  //               name="carNum"
  //               type="text"
  //               placeholder="Biển số xe"
  //               labelText="Biển số xe"
  //               value={data.carNum}
  //               handleInputState={handleInputState}
  //             />
  //           </div>
  //           <div class="w-full md:w-1/2 px-3">
  //             <Input
  //               name="dateSub"
  //               type="date"
  //               placeholder="dd-mm-yyyy"
  //               min="1997-01-01"
  //               // max="2030-12-31"
  //               // placeholder="Ngày ĐKTT"
  //               labelText="Ngày ĐKTT"
  //               value={data.dateSub}
  //               handleInputState={handleInputState}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex justify-between w-full items-center">
  //         <div class=" ">
  //           <NavLink to={"/member"}>
  //             <div class="max-w-md mx-auto space-y-6 flex justify-center my-1">
  //               <p class="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500">
  //                 <strong class="font-medium">Huỷ</strong>
  //                 {/* <svg
  //                   class="ml-1 rotate-180 fill-white group-hover:fill-blue-500"
  //                   width="27"
  //                   height="27"
  //                   viewBox="0 0 27 27"
  //                   fill="none"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <path
  //                     opacity="0.4"
  //                     d="M17.6954 12.4962L21.6468 12.1467C22.5335 12.1467 23.2525 12.8727 23.2525 13.7681C23.2525 14.6635 22.5335 15.3895 21.6468 15.3895L17.6954 15.04C16.9997 15.04 16.4357 14.4705 16.4357 13.7681C16.4357 13.0645 16.9997 12.4962 17.6954 12.4962"
  //                   ></path>
  //                   <path d="M4.42637 12.5604C4.48813 12.4981 4.71885 12.2345 4.93559 12.0157C6.19989 10.6449 9.50107 8.40347 11.228 7.71751C11.4902 7.60808 12.1532 7.37512 12.5086 7.35864C12.8477 7.35864 13.1716 7.43748 13.4804 7.59279C13.8661 7.81046 14.1738 8.15403 14.3439 8.55878C14.4522 8.83882 14.6224 9.68009 14.6224 9.69539C14.7913 10.6143 14.8834 12.1086 14.8834 13.7606C14.8834 15.3325 14.7913 16.7656 14.6527 17.6999C14.6375 17.7163 14.4674 18.76 14.2821 19.1177C13.943 19.7719 13.28 20.1766 12.5704 20.1766H12.5086C12.046 20.1613 11.0742 19.7554 11.0742 19.7413C9.43931 19.0553 6.21621 16.9221 4.92044 15.5043C4.92044 15.5043 4.55455 15.1396 4.39608 14.9125C4.14904 14.5854 4.02552 14.1806 4.02552 13.7759C4.02552 13.3241 4.16419 12.904 4.42637 12.5604"></path>
  //                 </svg> */}
  //                 <span class="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
  //               </p>
  //             </div>
  //           </NavLink>
  //         </div>
  //         <div onClick={(e) => updateMember()} class="">
  //           <p class="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500">
  //             <strong class="font-medium">XÁC NHẬN CẬP NHẬT </strong>
  //             <svg
  //               class="ml-1 rotate-180 fill-white group-hover:fill-blue-500"
  //               width="27"
  //               height="27"
  //               viewBox="0 0 27 27"
  //               fill="none"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 opacity="0.4"
  //                 d="M17.6954 12.4962L21.6468 12.1467C22.5335 12.1467 23.2525 12.8727 23.2525 13.7681C23.2525 14.6635 22.5335 15.3895 21.6468 15.3895L17.6954 15.04C16.9997 15.04 16.4357 14.4705 16.4357 13.7681C16.4357 13.0645 16.9997 12.4962 17.6954 12.4962"
  //               ></path>
  //               <path d="M4.42637 12.5604C4.48813 12.4981 4.71885 12.2345 4.93559 12.0157C6.19989 10.6449 9.50107 8.40347 11.228 7.71751C11.4902 7.60808 12.1532 7.37512 12.5086 7.35864C12.8477 7.35864 13.1716 7.43748 13.4804 7.59279C13.8661 7.81046 14.1738 8.15403 14.3439 8.55878C14.4522 8.83882 14.6224 9.68009 14.6224 9.69539C14.7913 10.6143 14.8834 12.1086 14.8834 13.7606C14.8834 15.3325 14.7913 16.7656 14.6527 17.6999C14.6375 17.7163 14.4674 18.76 14.2821 19.1177C13.943 19.7719 13.28 20.1766 12.5704 20.1766H12.5086C12.046 20.1613 11.0742 19.7554 11.0742 19.7413C9.43931 19.0553 6.21621 16.9221 4.92044 15.5043C4.92044 15.5043 4.55455 15.1396 4.39608 14.9125C4.14904 14.5854 4.02552 14.1806 4.02552 13.7759C4.02552 13.3241 4.16419 12.904 4.42637 12.5604"></path>
  //             </svg>
  //             <span class="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default UpdateMember;
