import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
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
import { splitName } from "../../Func/SliceName.js";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { randomString } from "../../Func/RamdomString.js";
import { LOGIN } from "../../API/Auth/Login.js";
import { REGISTER } from "../../API/Auth/Register.js";

function SignUp() {
  const navigation = useNavigate();
  const firebaseAuth = getAuth(app);
  const [layout, setLayout] = useState(Boolean(true));
  const [errors, setErorrs] = useState(null);
  const [avatar, setAvatar] = useState();
  const [form2, setForm2] = useState({
    form: "",
    uid: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    avatar: "",
    first_name: "",
    last_name: "",
    isSex: "",
    phone: "",
  });

  // setForm data
  const loginWithGoogle = async (e) => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;
    // console.log(refreshToken);
    // console.log(providerData);
    const username = removeVietnameseAndWhitespace(
      user?.displayName.toLocaleLowerCase()
    );
    const { firstName, lastName } = splitName(user?.displayName);

    form2.form = "google";
    form2.uid = user?.uid;
    form2.username = user?.uid;
    form2.email = user?.email;
    form2.password = user?.uid;
    form2.avatar = user?.photoURL;
    form2.first_name = firstName;
    form2.last_name = lastName;
    form2.isSex = 3;
    form2.phone = user?.uid;

    Func_Register();
  };

  const loginWithFacebook = async (e) => {
    const provider = new FacebookAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const username = removeVietnameseAndWhitespace(
      user?.displayName.toLocaleLowerCase()
    );
    const { firstName, lastName } = splitName(user?.displayName);

    // const { refreshToken, providerData } = user;
    // console.log(refreshToken);
    // console.log(providerData);
    // setForm2
    // console.log(user);
    form2.form = "facebook";
    form2.uid = user?.uid;
    form2.username = username;
    form2.email = user?.email;
    form2.password = username;
    form2.avatar = user?.photoURL;
    form2.first_name = firstName;
    form2.last_name = lastName;
    form2.isSex = 3;
    form2.phone = user?.uid;
    // console.table(form2);
    Func_Register();
  };

  const Func_Login = async () => {
    const resultLogin = await LOGIN(form2);
    // console.log(resultLogin);
    if (resultLogin.status == 200) {
      if (resultLogin.data.status === 200) {
        toast.success("Đăng nhập thành công");
        localStorage.setItem("user", JSON.stringify(resultLogin.data.data));
        setTimeout(() => {
          window.location = "/";
        }, 2000);
        return;
      }
      if (resultLogin.data.status === 201) {
        toast.error("Đăng nhập thất bại");
        return;
      }

      if (resultLogin.data.status === 202) {
        toast.error("Đăng nhập thất bại");

        return;
      }
    }
    // console.warn(errors);
  };
  const Func_Register = async () => {
    const result = await REGISTER(form2);
    if (result.status == 200) {
      if (result.data.status === 200) {
        // console.log(result.data);
        // localStorage.setItem("user", JSON.stringify(result.data.data));
        // toast("Register Successfully");
        let timerInterval;
        Swal.fire({
          title: "Đăng Ký Tài Khoản Thành Công",
          html: "Cập nhật dữ liệu <b></b> %",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        setTimeout(() => {
          Func_Login();
        }, 1000);
        return;
      }
      if (result.data.status === 201) {
        // setErorrs(result.data.data);
        // console.log("201", result.data.data);
        toast.error("Đăng ký tài khoản thất bại");
        return;
      }
      if (result.data.status === 202) {
        Func_Login();
        return;
      }
    }
  };

  // setForm data
  const handleChange = (e) => {
    setForm2({ ...form2, [e.target.name]: e.target.value });
  };

  const isFormEmpty = () => {
    return Object.values(form2).some((x) => x === "" || x === null);
  };
  // submit btn register
  const handleSubmit = async (e) => {
    try {
      // const result = await re(form);
      form2.form = "LRO";
      form2.avatar = avatar;
      form2.uid = hex16(form2.username);
      console.table(form2);
      if (!isFormEmpty()) {
        if (form2.password === form2.passwordConfirmation) {
          if (form2.phone.length == 10) {
            SignUp();
          } else {
            toast.error("Số điện thoại không hợp lệ");
          }
        } else {
          toast.error("Mật Khẩu Không Khớp");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bạn đã quên điền gì đó!!",
        });
      }
    } catch (error) {}
  };

  const SignUp = async (e) => {
    try {
      const result = await REGISTER(form2);
      if (result.status == 200) {
        if (result.data.status === 200) {
          toast.success("Đăng Ký Tài Khoản Thành Công");

          setTimeout(() => {
            navigation("/login");
          }, 2000);
          return;
        }
        if (result.data.status === 201) {
          setErorrs(result.data.data);
          toast.error("Đăng ký tài khoản thất bại");
          return;
        }

        if (result.data.status === 202) {
          toast.error("Đăng ký tài khoản thất bại");

          return;
        }
      }
    } catch (error) {}
  };

  const hex16 = (text) => {
    let hex = "";
    for (let i = 0; i < text.length; i++) {
      let unicode = text.charCodeAt(i).toString(16);
      hex += unicode;
    }
    return hex;
  };
  useEffect(() => {
    // console.table(form2);
  }, [form2]);

  const uploadImage = (e) => {
    e.preventDefault();
    try {
      const imageFile = e.target.files[0];
      // console.log(imageFile);
      // const fileName = new Date().getTime() + imageFile.name;
      const fileName = randomString(15);

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
            toast.success("Thêm ảnh đại diện thành công");

            // console.log(downloadURL);
          });
        }
      );
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <div class="relative h-screen flex items-center justify-center bg-center bg-white py-12 px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover">
        {/* <div class="absolute  bg-black opacity-60 inset-0 z-0"></div> */}
        <img
          src={
            "https://t4.ftcdn.net/jpg/03/83/39/01/360_F_383390104_aTxmmJEIcGe4bPfYjR8lZLcPx5Duc0Y2.jpg"
          }
          className="absolute w-full h-full z-0 bg-cover bg-center bg-no-repeat opacity-60  scale-125"
        />
        {layout ? (
          <>
            <div
              class={`max-w-3xl w-full space-y-8 p-10 bg-blue-200 rounded-xl shadow-lg z-10`}
            >
              <div class="grid  gap-8 grid-cols-1">
                <div class="flex flex-col ">
                  <div class="flex flex-col sm:flex-row items-center">
                    <h2 class="font-semibold text-lg mr-auto">
                      Đăng Ký Tài Khoản
                    </h2>
                    {/* <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div> */}
                    <h2
                      onClick={(e) => setLayout(!layout)}
                      className="bg-green-400 text-white py-1 px-2 rounded-md cursor-pointer"
                    >
                      Tiếp tục
                    </h2>
                  </div>
                  <div class="">
                    <div class="form">
                      <div class="md:space-y-2 mb-3">
                        <label class="text-xs font-semibold text-gray-600 py-2">
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
                          <label class="cursor-pointer ">
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
                      <div class="md:flex flex-row md:space-x-4 w-full text-xs">
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
                            onChange={handleChange}
                            value={form2.first_name}
                            id="first_name"
                          />
                          <p class="text-red text-xs hidden">
                            Please fill out this field.
                          </p>
                        </div>
                        <div class="mb-3 space-y-2 w-full text-xs">
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
                            onChange={handleChange}
                            value={form2.last_name}
                          />
                          <p class="text-red text-xs hidden">
                            Please fill out this field.
                          </p>
                        </div>
                      </div>
                      {/*  */}

                      {/*  */}
                      <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
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
                            onChange={handleChange}
                            value={form2.phone}
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
                            value={form2.isSex}
                            onChange={handleChange}
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
                    </div>
                  </div>
                </div>
              </div>
              <div class="rounded-t mb-0 px-6 ">
                <div class="text-center mb-3">
                  <h6 class="text-blueGray-500 text-sm font-bold">
                    Đăng Nhập Với
                  </h6>
                </div>
                <div class="btn-wrapper text-center">
                  <button
                    onClick={loginWithFacebook}
                    class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <svg
                      viewBox="0 0 512 512"
                      className="w-5 h-5 mr-1 text-blue-600 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M512,257.555c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" />
                    </svg>
                    Facebook
                  </button>
                  <button
                    onClick={loginWithGoogle}
                    class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      class="w-5 mr-1"
                      src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                    />
                    Google{" "}
                  </button>
                </div>
                <div class="border-b-1 border-blueGray-300"> </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              class={` max-w-3xl w-full space-y-8 p-10 bg-blue-200 rounded-xl shadow-lg z-10`}
            >
              <div class="flex flex-col sm:flex-row items-center">
                <h2 class="font-semibold text-lg mr-auto">Đăng Ký Tài Khoản</h2>
                {/* <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div> */}
                <h2
                  onClick={(e) => setLayout(!layout)}
                  className="bg-green-400 text-white py-1 px-2 rounded-md cursor-pointer"
                >
                  Quay lại
                </h2>
              </div>
              <div class="mb-1 space-y-1 w-full text-xs">
                <div class="w-full flex flex-col mb-1">
                  <label class="font-semibold text-gray-600 py-2">
                    Tên Tài Khoản <abbr title="required">*</abbr>
                  </label>
                  <input
                    class="placeholder:font-thin placeholder:italic placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    type="text"
                    name="username"
                    id="username"
                    value={form2.username}
                    onChange={handleChange}
                    placeholder="Tên tài khoản ít nhất 6 ký tự và phải là duy nhất"
                  />
                </div>
              </div>
              <div class="mb-1 space-y-1 w-full text-xs">
                <label class=" font-semibold text-gray-600 py-1">
                  Email <abbr title="required">*</abbr>
                </label>
                <div class="flex flex-wrap items-stretch w-full mb-2 relative">
                  <div class="flex">
                    <span class="flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={form2.email}
                    class="placeholder:font-thin placeholder:italic placeholder:text-sm  flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                    placeholder="Nhập email của bạn"
                  />
                </div>
              </div>
              <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                <div class="w-full flex flex-col mb-3">
                  <label class="font-semibold text-gray-600 py-2">
                    Mật Khẩu <abbr title="required">*</abbr>
                  </label>
                  <input
                    placeholder="Mật khẩu ít nhất 6 ký tự"
                    class="placeholder:font-thin placeholder:italic placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    type="password"
                    value={form2.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div class="w-full flex flex-col mb-3">
                  <label class="font-semibold text-gray-600 py-2">
                    Nhập lại mật khẩu <abbr title="required">*</abbr>
                  </label>
                  <input
                    placeholder="Nhập lại mật khẩu của bạn"
                    class="placeholder:font-thin placeholder:italic placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    type="password"
                    name="passwordConfirmation"
                    value={form2.passwordConfirmation}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                {/* <button
                onClick={set}
                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                  Xoá
                </button> */}
                <button
                  onClick={handleSubmit}
                  class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                >
                  Đăng Ký
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SignUp;
