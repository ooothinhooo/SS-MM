import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  // GithubAuthProvider,
} from "firebase/auth";
import { app } from "../../Firebase/firebase.config.js";
import removeVietnameseAndWhitespace from "../../Func/Remove.js";
import { splitName } from "../../Func/SliceName.js";
import "flowbite";
import { LOGIN } from "../../API/Auth/Login.js";
import { REGISTER } from "../../API/Auth/Register.js";
import { Toast } from "../../Func/Toast.js";
// import { async } from "@firebase/util";
function Login() {
  const navigation = useNavigate();
  const firebaseAuth = getAuth(app);
  const [errors, setErorrs] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  // console.log(form);
  const [form2, setForm2] = useState({
    form: "",
    uid: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    first_name: "",
    last_name: "",
    isSex: "",
    phone: "",
  });

  //* func

  const loginWithGoogle = async (e) => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
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
    // console.log("Login run");
    const resultLogin = await LOGIN(form2);
    // console.log(resultLogin);
    if (resultLogin.status == 200) {
      if (resultLogin.data.status === 200 || resultLogin.data.status === 100) {
        // toast.success("Đăng nhập thành công");
        Toast.fire({
          icon: "success",
          title: "Đăng nhập thành công",
        });

        // console.log(result);
        // toast("Vui Lòng Chờ");
        localStorage.setItem("user", JSON.stringify(resultLogin.data.data));
        setTimeout(() => {
          // navigation("/");
          // window.location.href = "/";
          window.location = "/";
        }, 2000);
        return;
      }
      if (resultLogin.data.status === 201) {
        // setErorrs(resultLogin.data.data);
        // toast.error("Tên đăng nhập hoặc mật khẩu không chính xác");
        Toast.fire({
          icon: "error",
          title: "Tên đăng nhập hoặc mật khẩu không chính xác",
        });
        return;
      }

      if (resultLogin.data.status === 202) {
        // toast(resultLogin.data.message);
        // toast.error("Tên đăng nhập hoặc mật khẩu không chính xác");
        Toast.fire({
          icon: "error",
          title: "Tên đăng nhập hoặc mật khẩu không chính xác",
        });
        return;
      }
    }
    // console.warn(errors);
  };
  const Func_Register = async () => {
    const result = await REGISTER(form2);
    console.log(result);
    if (result.status == 200) {
      if (result.data.status === 200 || result.data.status === 100) {
        Func_Login();
        return;
      }
      if (result.data.status === 201) {
        return;
      }
      if (result.data.status === 202 || result.data.status === 100) {
        Func_Login();
        return;
      }
    }
  };
  // setForm data
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      form.email = form.username;
      const result = await LOGIN(form);
      // console.log(result);
      if (result.status == 200) {
        if (result.data.status == 200 || result.data.status == 100) {
          // toast.success("Đăng nhập thành công");
          Toast.fire({
            icon: "success",
            title: "Đăng nhập thành công",
          });
          // toast("Vui Lòng Chờ");
          // console.log(result);
          localStorage.setItem("user", JSON.stringify(result.data.data));

          setTimeout(() => {
            // navigation("/");
            // window.location.href = "/";
            window.location = "/";
          }, 2000);
          return;
        }
        if (result.data.status === 201) {
          setErorrs(result.data.data);
          // toast(result.data.data);
          // toast.error("Tên đăng nhập hoặc mật khẩu không chính xác");
          Toast.fire({
            icon: "error",
            title: "Tên đăng nhập hoặc mật khẩu không chính xác",
          });

          return;
        }

        if (result.data.status === 202) {
          // toast(result.data.message);
          Toast.fire({
            icon: "error",
            title: "Tên đăng nhập hoặc mật khẩu không chính xác",
          });
          // toast.error("Tên đăng nhập hoặc mật khẩu không chính xác");

          return;
        }
      }
    } catch (error) {}
  };
  return (
    <>
      <ToastContainer />

      <div className="relative flex bg-white opacity-100 justify-center h-full items-center  overflow-hidden">
        <img
          src={"https://wallpaperaccess.com/full/1236480.jpg"}
          className="absolute w-full h-full z-0 bg-cover bg-center bg-no-repeat opacity-60 scale-125 "
        />
        <div className="w-full m-auto  rounded-xs   lg:max-w-4xl">
          <div class="grid grid-flow-row-dense grid-cols-3  ">
            <div class="col-span-2  w-full z-10">
              <div className="relative flex flex-col justify-center  overflow-hidden">
                <div className="w-full h-full bg-cover bg-center bg-no-repeat p-6 m-auto bg-blue-400/30 rounded-md shadow-xl lg:max-w-xl ">
                  <h1 className="text-3xl font-semibold text-center text-black uppercase">
                    Đăng Nhập
                  </h1>
                  <div className="mt-6">
                    <div className="mb-2">
                      <label
                        for="email"
                        className="block text-sm font-semibold text-gray-800 text-left"
                      >
                        Tên tài khoản
                      </label>
                      <input
                        type="text"
                        id="username"
                        onChange={handleChange}
                        name="username"
                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        for="password"
                        className="block text-sm font-semibold text-gray-800 text-left"
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={handleChange}
                        name="password"
                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {errors?.email && (
                        <>
                          <small id="emailHelp" class="form-text text-danger">
                            {errors.email.msg}
                          </small>
                        </>
                      )}
                    </div>
                    <a
                      href="#"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Quên mật khẩu
                    </a>
                    <div className="mt-6">
                      <button
                        onClick={handleSubmit}
                        id="register_Submit"
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 ">Hoặc</div>
                  </div>
                  {/* <div className="flex mt-4 gap-x-2">
                    <button
                      onClick={loginWithGoogle}
                      type="button"
                      className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-5 h-5 fill-current"
                      >
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-5 h-5 fill-current"
                      >
                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={loginWithFacebook}
                      className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                    >
                      <svg
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M512,257.555c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" />
                      </svg>
                    </button>
                  </div> */}
                  <div class="btn-wrapper mt-4 text-center">
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
                  <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Bạn chưa có tài khoản
                    <NavLink
                      to="/register"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Đăng Ký Ngay
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
            <div className=" w-full z-50  -ml-4 shadow-md">
              <div className="relative flex flex-col justify-center h-full overflow-hidden">
                <div className="w-full h-full m-auto flex justify-center items-center  p-6 m-auto  bg-blue-600/40 rounded-md shadow-xl lg:max-w-xl">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className=" h-full w-full flex text-center flex-col space-y-5 items-center justify-center ">
                      <div className="text-3xl font-sans font-bold">
                        <p>Chào!</p>
                      </div>

                      <div className="text-slate-400">
                        <p>
                          Điền thông tin và
                          <br />
                          Bắt đầu cuộc hành trình với Chúng tôi
                        </p>
                      </div>

                      <div>
                        <NavLink
                          to="/register"
                          className="bg-blue-600 text-white font-bold py-2 px-10 rounded-full"
                        >
                          Đăng Ký Ngay
                        </NavLink>
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

export default Login;
