import axios from "axios";
import React, { useEffect, useState } from "react";
import { GET_USER } from "../../API/User/GetUser.js";
import { useNavigate } from "react-router-dom";
import { REGISTER_MOTEL } from "../../API/Motels/RegisterMotel.js";
import { ToastContainer, toast } from "react-toastify";
import { Toast } from "../../Func/Toast.js";

function MotelPage({ user, props }) {
  const navigation = useNavigate();
  const [motelName, setmotelName] = useState();
  const [phone, setPhone] = useState();
  //   console.log(user);
  const [data, setData] = useState();
  const CallAPI = async () => {
    try {
      const result = await GET_USER(user.token);
      console.log(result.data.data);
      setData(result.data.data);
      if (!data?.Motel) {
        localStorage.setItem("isConvert", JSON.stringify(data?.Motel));
      } else {
        navigation("/room");
      }
    } catch (error) {}
  };
  const handlerSubmit = async () => {
    try {
      console.log(user);
      const result = await REGISTER_MOTEL(user?.token, motelName, phone);
      // CallAPI();
      console.log(result?.data.data);
      if (result) {
        // localStorage.setItem("user", JSON.stringify(result?.data.data));
        // props.setUser(JSON.stringify(result?.data.data));
        // window.location.reload();
        localStorage.setItem("user", JSON.stringify(result.data.data));
        // Toast.success("Đăng ký thành công");
        Toast.fire({
          icon: "success",
          title: "Đăng ký thành công",
        });

        setTimeout(() => {
          window.location = "/room";
        }, 2000);
      } else {
      }
    } catch (error) {}
  };
  // useEffect(() => {
  //   CallAPI();
  // }, [data]);
  return (
    <div>
      {/* <ToastContainer /> */}

      <div className="">
        {!data?.Motel ? (
          <>
            <section class=" bg-cover h-full  w-full flex justify-center items-center">
              <div class="flex h-full w-[90%] border rounded-md items-center justify-center container mx-auto px-8">
                <div class="py-16">
                  <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div class="hidden lg:block lg:w-1/2 bg-cover">
                      <img
                        className="h-full"
                        src="https://quanlytro.me/images/banner_ipad_flatform.webp"
                      />
                      {/* style="background-image:url('0')" */}
                    </div>
                    <div class="w-full p-8 lg:w-1/2">
                      <h2 class="text-2xl font-semibold text-gray-700 text-center">
                        Chào {user?.first_name + " " + user?.last_name}
                      </h2>
                      <p class="text-xl text-red-600 text-center uppercase">
                        <marquee>
                          {" "}
                          Đăng ký để có thể quản lý trọ của bạn{" "}
                        </marquee>
                      </p>

                      <div class="mt-4 flex items-center justify-between">
                        <span class="border-b w-1/5 lg:w-1/4"></span>
                        <a
                          href="#"
                          class="text-xs text-center text-gray-500 uppercase"
                        >
                          Nhập thông tin bên dưới
                        </a>
                        <span class="border-b w-1/5 lg:w-1/4"></span>
                      </div>
                      <div class="mt-4">
                        <label class="block text-left text-gray-700 text-sm font-bold mb-2">
                          Nhập tên trọ của bạn
                        </label>
                        <input
                          class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          type="text"
                          value={motelName}
                          onChange={(e) => setmotelName(e.target.value)}
                        />
                      </div>
                      <div class="mt-4">
                        <div class="flex justify-between">
                          <label class="block text-gray-700 text-sm font-bold mb-2">
                            Nhập số điện thoại trọ của bạn
                          </label>
                        </div>
                        <input
                          class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          type="number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div class="mt-8">
                        <button
                          onClick={handlerSubmit}
                          class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                        >
                          Đăng ký
                        </button>
                      </div>
                      {/* <div class="mt-4 flex items-center justify-between">
                        <span class="border-b w-1/5 md:w-1/4"></span>
                        <a class="text-xs text-gray-500 uppercase">
                          or sign up
                        </a>
                        <span class="border-b w-1/5 md:w-1/4"></span>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* <div class=" text-center">
                  <h1 class="mt-10 text-2xl sm:text-5xl capitalize tracking-widest text-black lg:text-5xl">
                    Đăng Ký Quản Lý Trọ Của Bạn
                  </h1>

                  <p class="mt-6 lg:text-lg text-white">
                    Nhập Tên Trọ Của Bạn Vào Đây
                  </p>

                  <div class="mt-4 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
                    <input
                      id="email"
                      type="text"
                      class="rounded-md border border-transparent  border px-4 py-2 text-black placeholder-black backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 sm:mx-2"
                      placeholder="Nhập Tên Trọ"
                      value={motelName}
                      onChange={(e) => setmotelName(e.target.value)}
                    />
                    <input
                      id="phone"
                      type="number"
                      class="rounded-md border border-transparent border px-4 py-2 text-black placeholder-black backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 sm:mx-2"
                      placeholder="Nhập số điện thoại liên hệ"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <button
                      onClick={handlerSubmit}
                      class="transform rounded-md bg-blue-700 px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none sm:mx-2"
                    >
                      Đăng Ký
                    </button>
                  </div>
                </div> */}
              </div>
            </section>
          </>
        ) : (
          <>Da la chu ro</>
        )}
      </div>
    </div>
  );
}

export default MotelPage;
