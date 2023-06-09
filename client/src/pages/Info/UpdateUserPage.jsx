import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FIND_USER } from "../../API/User/FindUser.api.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { app, storage } from "../../Firebase/firebase.config.js";

import Swal from "sweetalert2";
import removeVietnameseAndWhitespace from "../../Func/removeVN.js";
import extractString from "../../Func/Remove.js";
import { splitName } from "../../Func/SliceName.js";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { randomString } from "../../Func/RamdomString.js";
import { LOGIN } from "../../API/Auth/Login.js";
import { REGISTER } from "../../API/Auth/Register.js";
import { UPDATE_USER } from "../../API/User/UpdateUser.api.js";
function UpdateUserPage({ user, setUser }) {
  const navigation = useNavigate();

  let { id } = useParams();
  const [tab, setTab] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [first_name, setFirstName] = useState(dataUser?.first_name);
  const [last_name, setLastName] = useState(dataUser?.last_name);
  const [email, setEmail] = useState(dataUser?.email);
  const [phone, setPhone] = useState(dataUser?.phone);
  const [avatar, setAvatar] = useState(dataUser?.avatar);
  const [isSex, setIsSex] = useState(dataUser?.isSex);
  const [data, setData] = useState();
  const [Form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    avatar: "",
    isSex: "",
  });
  const GET_FIND_USER = async () => {
    try {
      const result = await FIND_USER(user?.token, id);
      console.log(result.data.data);
      // setData(result?.data?.data);
      setDataUser(result.data.data);
      var re = result.data.data;
      setFirstName(re?.first_name);
      setLastName(re?.last_name);
      setEmail(re?.email);
      setPhone(re?.phone);
      setAvatar(re?.avatar);
      setIsSex(re?.isSex);
    } catch (error) {}
  };

  const uploadImage = (e) => {
    e.preventDefault();
    try {
      const imageFile = e.target.files[0];
      // console.log(imageFile);
      // const fileName = new Date().getTime() + imageFile.name;

      const fileName = data ? extractString(user?.avatar) : user?.userId;

      const storageRef = ref(
        storage,
        `SSMM/AVATAR/${fileName.split("").join("").toUpperCase()}`
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
            setAvatar(downloadURL);
            // console.log(downloadURL);
          });
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    GET_FIND_USER();
  }, []);
  const isFormEmpty = () => {
    return Object.values(Form).some((x) => x === "" || x === null);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (Form.phone.length == 10) {
        if (!isFormEmpty()) {
          // console.log(Form);
          const result = await UPDATE_USER(user?.token, Form);
          console.log(result);
          if (result.status == 200) {
            if (result.data.status == 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `Xác Nhận Cập Nhật Thông Tin`,
                showConfirmButton: false,
                timer: 1500,
              });
              // localStorage.clear();
              // window.location = "/login";
              // navigation("/login");
              setUser({
                ...user,
                avatar: avatar,
                first_name: first_name,
                last_name: last_name,
              });
              // const navigation = useNavigate();

              navigation("/");
            }
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: result.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Vui Lòng Điền Đủ Thông tin",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Số điện thoại không hợp lệ",
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    // console.table(dataUser);
    setForm({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      avatar: avatar,
      isSex: isSex,
    });
    console.table(Form);
  }, [dataUser, first_name, last_name, email, phone, avatar, isSex]);
  return (
    <>
      <ToastContainer />
      <div className="w-full">
        <div className="mx-8">
          <Breadcrumb />
        </div>
        <div className="w-full   flex justify-center items-center drop-shadow-lg ">
          {/*  */}
          <div className="w-[90%] flex justify-center items-center">
            <div
              class={`max-w-3xl mt-6 w-full space-y-8 p-10 bg-blue-200 rounded-xl shadow-lg z-10`}
            >
              <div class="grid  gap-8 grid-cols-1">
                <div class="flex flex-col ">
                  <div class="flex flex-col sm:flex-row items-center">
                    <h2 class="font-semibold text-lg mr-auto">
                      Cập nhật tài khoản
                    </h2>
                    {/* <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div> */}
                  </div>
                  <div class="">
                    <div class="form">
                      <div class="md:space-y-2 mb-3 text-left">
                        <label class="text-xs font-semibold text-gray-600 py-2  text-left">
                          Chọn Ảnh Đại Diện
                        </label>
                        <div class="flex items-center ">
                          <div class="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
                            <img
                              class="w-12 h-12 mr-4 object-cover"
                              src={
                                avatar
                                  ? avatar
                                  : "http://0.gravatar.com/avatar/c55152277c080827c89d0e57dca207f0?s=320&d=http%3A%2F%2F0.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D320"
                              }
                              alt="Avatar"
                            />
                          </div>
                          <label class="cursor-pointer  ">
                            <span class="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                              Chọn Ảnh Đại Diện
                            </span>
                            <input
                              id="file-upload"
                              type="file"
                              name="upload-image"
                              accept="image/*"
                              onChange={uploadImage}
                              class="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <div class="md:flex flex-row md:space-x-4 w-full text-xs text-left">
                        <div class="mb-3 space-y-2 w-full text-xs">
                          <label class="font-semibold text-gray-600 py-2">
                            Họ <abbr title="required">*</abbr>
                          </label>
                          <input
                            placeholder="VD: Trần"
                            class="placeholder:font-thin placeholder:italic placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                            required="required"
                            type="text"
                            name="first_name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            // onChange={handleChange}
                            // value={form2.first_name}
                            id="first_name"
                          />
                          <p class="text-red text-xs hidden">
                            Please fill out this field.
                          </p>
                        </div>
                        <div class="mb-3 space-y-2 w-full text-xs text-left">
                          <label class="font-semibold text-gray-600 py-2">
                            Tên <abbr title="required">*</abbr>
                          </label>
                          <input
                            placeholder="Vd: Văn Thịnh"
                            class="placeholder:font-thin placeholder:italic placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                            required="required"
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            // onChange={handleChange}
                            // value={form2.last_name}
                          />
                          <p class="text-red text-xs hidden">
                            Please fill out this field.
                          </p>
                        </div>
                      </div>
                      {/*  */}

                      {/*  */}
                      <div class="md:flex md:flex-row md:space-x-4 w-full text-xs text-left">
                        <div class="w-full flex flex-col mb-3">
                          <label class="font-semibold text-gray-600 py-2">
                            Số điện thoại <abbr title="required">*</abbr>
                          </label>
                          <input
                            placeholder=""
                            maxLength={5}
                            class="placeholder:font-thin placeholder:italic placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                            type="number"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            // onChange={handleChange}
                            // value={form2.phone}
                          />
                        </div>
                        <div class="w-full flex flex-col mb-3">
                          <label class="font-semibold text-gray-600 py-2">
                            Giới Tính<abbr title="required">*</abbr>
                          </label>
                          <select
                            class="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                            required="required"
                            name="isSex"
                            value={isSex}
                            onChange={(e) => setIsSex(e.target.value)}
                            // value={form2.isSex}
                            // onChange={handleChange}
                            id="integration_city_id"
                          >
                            <option value="">Chọn </option>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="3">Khác</option>
                          </select>
                          <p
                            class="text-sm text-red-500 hidden mt-3"
                            id="error"
                          >
                            Please fill out this field.
                          </p>
                        </div>
                      </div>
                      <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                        {/* <button
                onClick={set}
                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                  Xoá
                </button> */}
                        <button
                          onClick={handleUpdate}
                          // class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                        >
                          <a
                            href="#_"
                            class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
                          >
                            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                              <svg
                                class="w-5 h-5 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                ></path>
                              </svg>
                            </span>
                            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                              <svg
                                class="w-5 h-5 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                ></path>
                              </svg>
                            </span>
                            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                              Cập nhật
                            </span>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}

function Breadcrumb() {
  return (
    <>
      <nav
        class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NavLink to="/">
              <a class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Trang chủ
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
              <a
                href="#"
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Cài đặt
              </a>
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
                Cập nhập tài khoản
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
}

export default UpdateUserPage;
