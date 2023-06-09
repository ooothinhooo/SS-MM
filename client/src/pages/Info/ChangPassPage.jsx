import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CHANGE_PASS } from "../../API/User/ChangPass.api.js";

function ChangPassPage({ user }) {
  const navigation = useNavigate();

  const [isMenu, setIsMenu] = useState(1);
  const [eye, setEye] = useState(false);
  const [isOldPass, setOldIsPass] = useState();
  const [isPass, setIsPass] = useState();
  const [isConfirmPass, setIsConfirmPass] = useState();
  const [Form, setForm] = useState({
    oldPassword: "",
    password: "",
  });
  const handleChange = async (e) => {
    console.log("change");

    if (isConfirmPass == isPass) {
      const result = await CHANGE_PASS(
        user?.token,
        Form?.oldPassword,
        Form?.password
      );
      console.log(result);
      if (result.data.status == 200) {
        let timerInterval;
        Swal.fire({
          title: "Thay đổi mật khẩu thành công",
          html: "I will close in <b></b> milliseconds.",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
            //
          },

          willClose: () => {
            clearInterval(timerInterval);
            // window.location.href = ;
            navigation(`/u/${user?.userId}`);
            setIsPass("");
            setIsConfirmPass("");
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      } else if (result.data.status == 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${result.data.message}`,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mật Khẩu Không Khớp",
      });
    }
  };

  useEffect(() => {
    setForm({
      oldPassword: isOldPass,
      password: isConfirmPass,
    });
    // console.log(Form);
  }, [isPass, isConfirmPass, isOldPass]);
  return (
    <>
      {/* <!-- component --> */}
      <div className="w-full flex justify-center items-center">
        <div className="w-[90%]">
          <div>
            <Breadcrumb />
          </div>
          <div>
            <div class="container mx-auto">
              <div class="flex justify-center px-6 my-12">
                <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div class="w-full h-auto  hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
                      alt=""
                    />
                  </div>

                  <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 class="pt-4 text-2xl text-left">Thay đổi mật khẩu</h3>
                    <div class="px-8 pt-6 pb-8 mb-4 bg-white rounded text-left">
                      {/* <div class="mb-4 md:flex md:justify-between">
                        <div class="mb-4 md:mr-2 md:mb-0">
                          <label
                            class="block mb-2 text-sm font-bold text-gray-700"
                            for="firstName"
                          >
                            First Name
                          </label>
                          <input
                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                        </div>
                        <div class="md:ml-2">
                          <label
                            class="block mb-2 text-sm font-bold text-gray-700"
                            for="lastName"
                          >
                            Last Name
                          </label>
                          <input
                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                      </div> */}
                      <div class="mb-4">
                        <label class="block mb-2 text-sm font-bold text-gray-700">
                          Mật khẩu hiện tại
                        </label>
                        <input
                          class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="oldpass"
                          type="password"
                          value={isOldPass}
                          onChange={(e) => setOldIsPass(e.target.value)}
                          placeholder="Nhập mật khẩu hiện tại"
                        />
                      </div>
                      <div class="mb-4 gap-4 flex justify-center">
                        <div class="w-full">
                          <label class="block mb-2 text-sm font-bold text-gray-700">
                            Mật khẩu mới
                          </label>
                          <input
                            class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={isPass}
                            onChange={(e) => setIsPass(e.target.value)}
                            placeholder="Nhập mật khẩu mới"
                          />
                          <p class="text-xs italic text-red-500">
                            Please choose a password.
                          </p>
                        </div>
                        <div class="w-full">
                          <label
                            class="block mb-2 text-sm font-bold text-gray-700"
                            for="c_password"
                          >
                            Nhập lại mật khẩu
                          </label>
                          <input
                            class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="c_password"
                            type="password"
                            value={isConfirmPass}
                            onChange={(e) => setIsConfirmPass(e.target.value)}
                            placeholder="Nhập lại mật khẩu"
                          />
                        </div>
                      </div>
                      <div class="mb-6 text-center">
                        <button
                          onClick={(e) => handleChange()}
                          class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          type="button"
                        >
                          Cập nhật thay đổi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                Thay đổi mật khẩu
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
}

export default ChangPassPage;
