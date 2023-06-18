import React, { useEffect, useState } from "react";
import PostPage from "../Post/PostPage.jsx";
import { callAPI, callApiDistrict, callApiWard } from "../../API/Auth/API.js";
import CreatePostPage from "../Post/CreatePostPage.js";
import { NavLink } from "react-router-dom";
import { HiChevronDoubleRight } from "react-icons/hi";
import { LIST_POST } from "../../API/Api/ListPost.api.js";
function MainPage({ user }) {
  const host = "https://provinces.open-api.vn/api/";
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [page, setPage] = useState("1");
  const [fee, setFee] = useState({
    feeStart: "",
    feeEnd: "",
  });
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [value, setValue] = useState({});
  const [form, setForm] = useState({
    province: "",
    district: "",
    ward: "",
  });
  const GETAPI_LISTPOST = async () => {
    try {
      const result = await LIST_POST(page, form, fee);
      setData(result?.data);
      console.log(result);
    } catch (error) {}
  };
  useEffect(() => {
    GETAPI_LISTPOST();
  }, []);

  const nextPage = () => {
    const maxPage = Math.ceil(data?.length / 15);
    setPage(page > maxPage ? 1 : page + 1);
    // console.log(page);
    // getPagination();
  };
  const prevPage = () => {
    setPage(page <= 1 ? 1 : page - 1);
    // getPagination();
  };
  useEffect(() => {
    GETAPI_LISTPOST();
  }, [page]);

  const handleChange = (e) => {
    console.log(e.target.name === "province");

    if (e.target.name === "province") {
      setForm("");
    }
    if (e.target.name === "district") {
      setForm({
        ...form,
        ward: "",
      });
    }
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    setForm({
      ...form,
      [e.target.name]: e.target.options[e.target.selectedIndex].text,
    });

    GETAPI_LISTPOST();

    console.table(form);
  };
  const handleChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const CallAPI_PROVINCE = async () => {
    try {
      const provinces = await callAPI(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      setProvince(provinces);
      setDistrict();
    } catch (error) {}
  };
  const CallAPI_DISTRICT = async () => {
    try {
      const result = await callApiDistrict(
        host + "p/" + value?.province + "?depth=2"
      );
      setDistrict(result);
      setWard();
    } catch (error) {}
  };
  const CallAPI_WARD = async () => {
    try {
      const result = await callApiWard(
        host + "d/" + value?.district + "?depth=2"
      );
      setWard(result);
    } catch (error) {}
  };
  useEffect(() => {
    CallAPI_DISTRICT();
  }, [value.province]);
  useEffect(() => {
    CallAPI_WARD();
    // console.log(ward);
  }, [value.district]);
  useEffect(() => {
    CallAPI_PROVINCE();
  }, []);

  const GETAPI_LISTPOST2 = async () => {
    try {
      const result = await LIST_POST("1");
      setData2(result?.data);
      console.log(result);
    } catch (error) {}
  };
  useEffect(() => {
    GETAPI_LISTPOST2();
  }, []);
  return (
    <div>
      {/* <CreatePostPage /> */}
      <div className=" w-full flex justify-center items-center">
        <div className="w-[80%]  ">
          <div class="grid grid-cols-3 gap-8 ">
            {/* overflow-y-scroll h-[600px] */}
            <div class="col-span-2 ">
              <div className=" w-full border -mb-10 mt-8">
                <div className="p-2">
                  {/* <p className="text-left font-bold mb-4 mt-2">Lọc Bài Viết</p> */}
                  <div className="flex justify-center items-center  mb-2  px-2">
                    <section className="w-full mx-2">
                      <label
                        for="country"
                        class="block text-left text-md font-medium leading-6 text-gray-900"
                      >
                        Tỉnh/Thành Phố
                      </label>
                      <select
                        onChange={(e) => {
                          setValue({
                            ...value,
                            [e.target.name]: e.target.value,
                          });
                          setForm({
                            ...form,
                            [e.target.name]:
                              e.target.options[e.target.selectedIndex].text,
                          });
                          handleChange(e);
                        }}
                        name="province"
                        class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      >
                        <option selected>Chọn Thành Phố</option>
                        {province?.map((i) => {
                          return (
                            <>
                              <option value={i?.code}>{i?.name}</option>
                            </>
                          );
                        })}
                      </select>
                    </section>
                    <section className="w-full mx-2">
                      <label
                        for="country"
                        class="block text-left text-md font-medium leading-6 text-gray-900"
                      >
                        Quận/Huyện
                      </label>
                      <select
                        onChange={handleChange}
                        name="district"
                        class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      >
                        <option selected>Chọn Quận/Huyện</option>
                        {district?.map((i) => {
                          return (
                            <>
                              <option value={i?.code}>{i?.name}</option>
                            </>
                          );
                        })}
                      </select>
                    </section>
                    <section className="w-full mx-2">
                      <label
                        for="country"
                        class="block text-left text-md font-medium leading-6 text-gray-900"
                      >
                        Phường/Xã
                      </label>
                      <select
                        onChange={handleChange}
                        name="ward"
                        class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      >
                        <option selected>Chọn Phường/Xã</option>
                        {ward?.map((i) => {
                          return (
                            <>
                              <option value={i?.code}>{i?.name}</option>
                            </>
                          );
                        })}
                      </select>
                    </section>
                    <section className="w-full mx-2">
                      <div className="w-full block justify-center items-center ">
                        <button
                          className="w-full"
                          onClick={() => {
                            GETAPI_LISTPOST();
                          }}
                        >
                          <a
                            href="#_"
                            class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
                          >
                            <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                            <span class="relative group-hover:text-white">
                              Lọc bài viết
                            </span>
                          </a>
                        </button>
                        <button
                          className="w-full"
                          onClick={() => {
                            setForm("");
                            GETAPI_LISTPOST();
                            console.log(form);
                          }}
                        >
                          <a
                            href="#_"
                            class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
                          >
                            <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                            <span class="relative group-hover:text-white">
                              Xoá bộ lọc
                            </span>
                          </a>
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>{" "}
              <PostPage
                user={user}
                data={data}
                GETAPI_LISTPOST={GETAPI_LISTPOST}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            </div>
            <div class=".. ">
              <div className="w-full flex justify-center items-center mt-5">
                <div className="w-[90%]   px-2 py-2 bg">
                  <NavLink to="/post/create">
                    <a class="px-5 py-2.5 w-full relative rounded group font-medium text-white font-medium inline-block">
                      <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                      <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                      <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                      <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                      <span class="relative">Đăng tin mới</span>
                    </a>
                  </NavLink>
                </div>
              </div>
              {/* ... */}
              {/* <div className="w-full flex justify-center items-center my-4">
                <div className="w-[90%]  border rounded-md">
                  <div className="p-2">
                    <p className="text-left font-bold mb-4 mt-2">
                      Lọc Bài Viết
                    </p>
                    <div className="block justify-center mt-4 mb-2  px-2">
                      <section>
                        <label
                          for="country"
                          class="block text-left text-md font-medium leading-6 text-gray-900"
                        >
                          Tỉnh/Thành Phố
                        </label>
                        <select
                          onChange={(e) => {
                            setValue({
                              ...value,
                              [e.target.name]: e.target.value,
                            });
                            setForm({
                              ...form,
                              [e.target.name]:
                                e.target.options[e.target.selectedIndex].text,
                            });
                            handleChange(e);
                          }}
                          name="province"
                          class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        >
                          <option selected>Chọn Thành Phố</option>
                          {province?.map((i) => {
                            return (
                              <>
                                <option value={i?.code}>{i?.name}</option>
                              </>
                            );
                          })}
                        </select>
                      </section>
                      <section>
                        <label
                          for="country"
                          class="block text-left text-md font-medium leading-6 text-gray-900"
                        >
                          Quận/Huyện
                        </label>
                        <select
                          onChange={handleChange}
                          name="district"
                          class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        >
                          <option selected>Chọn Quận/Huyện</option>
                          {district?.map((i) => {
                            return (
                              <>
                                <option value={i?.code}>{i?.name}</option>
                              </>
                            );
                          })}
                        </select>
                      </section>
                      <section>
                        <label
                          for="country"
                          class="block text-left text-md font-medium leading-6 text-gray-900"
                        >
                          Phường/Xã
                        </label>
                        <select
                          onChange={handleChange}
                          name="ward"
                          class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        >
                          <option selected>Chọn Phường/Xã</option>
                          {ward?.map((i) => {
                            return (
                              <>
                                <option value={i?.code}>{i?.name}</option>
                              </>
                            );
                          })}
                        </select>
                      </section>
                      <div className="w-full flex justify-center items-center gap-4">
                        <button
                          className="w-full"
                          onClick={() => {
                            GETAPI_LISTPOST();
                          }}
                        >
                          <a
                            href="#_"
                            class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white"
                          >
                            <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                            <span class="relative">Tìm</span>
                          </a>
                        </button>
                        <button
                          className="w-full"
                          onClick={() => {
                            setForm("");
                            GETAPI_LISTPOST();
                            console.log(form);
                          }}
                        >
                          <a
                            href="#_"
                            class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white"
                          >
                            <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                            <span class="relative">Bỏ bộ lọc</span>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* ... */}
              {/* ... */}
              <div className="w-full flex justify-center items-center my-4">
                <div className="w-[90%]  border rounded-md">
                  <div className="p-2">
                    <p className="text-left font-bold mb-4 mt-2">
                      Xem theo giá
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                      <div
                        onClick={(e) => {
                          setFee({
                            feeStart: 100,
                            feeEnd: 1000000,
                          });
                          GETAPI_LISTPOST();
                        }}
                        className=" w-full text-left flex justify-start items-center cursor-pointer hover:text-blue-600 hover:underline "
                      >
                        {"> "} Dưới 1 triệu
                      </div>
                      <div
                        onClick={(e) => {
                          setFee({
                            feeStart: 1000000,
                            feeEnd: 2000000,
                          });
                          GETAPI_LISTPOST();
                        }}
                        className=" w-full text-left flex justify-start items-center cursor-pointer hover:text-blue-600 hover:underline"
                      >
                        {"> "}Từ 1 - 2 triệu
                      </div>
                      <div
                        onClick={(e) => {
                          setFee({
                            feeStart: 2000000,
                            feeEnd: 3000000,
                          });
                          GETAPI_LISTPOST();
                        }}
                        className=" w-full text-left flex justify-start items-center cursor-pointer hover:text-blue-600 hover:underline"
                      >
                        {"> "}Từ 2 - 3 triệu
                      </div>
                      <div
                        onClick={(e) => {
                          setFee({
                            feeStart: 3000000,
                            feeEnd: 5000000,
                          });
                          GETAPI_LISTPOST();
                        }}
                        className=" w-full text-left flex justify-start items-center cursor-pointer hover:text-blue-600 hover:underline"
                      >
                        {"> "}Từ 3 - 5 triệu
                      </div>
                      <div
                        onClick={(e) => {
                          setFee({
                            feeStart: 5000000,
                            feeEnd: 7000000,
                          });
                          GETAPI_LISTPOST();
                        }}
                        className="w-full text-left flex justify-start items-center cursor-pointer hover:text-blue-600 hover:underline"
                      >
                        {"> "}Từ 5 - 7 triệu
                      </div>
                      <div
                        onClick={(e) => {
                          setFee({
                            feeStart: 7000000,
                            feeEnd: 10000000,
                          });
                          GETAPI_LISTPOST();
                        }}
                        className=" w-full text-left flex justify-start items-center cursor-pointer hover:text-blue-600 hover:underline"
                      >
                        {"> "}Từ 7 - 10 triệu
                      </div>
                      <div
                        onClick={(e) => {
                          setFee({
                            feeStart: 10000000,
                            feeEnd: 15000000,
                          });
                          GETAPI_LISTPOST();
                        }}
                        className=" w-full text-left flex justify-start items-center cursor-pointer hover:text-blue-600 hover:underline"
                      >
                        {"> "}Từ 10 - 15 triệu
                      </div>
                      <div
                        onClick={(e) => {
                          setFee({
                            feeStart: "",
                            feeEnd: "",
                          });
                          GETAPI_LISTPOST();
                        }}
                        className=" w-full text-left flex justify-start items-center cursor-pointer hover:text-blue-600 hover:underline"
                      >
                        {"> "}Bỏ bộ lọc
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ... */}

              <div className="w-full flex justify-center items-center my-4">
                <div className="w-[90%]  border rounded-md">
                  <div className="p-2">
                    <p className="text-left font-bold mb-4 mt-2">
                      Tin mới đăng
                    </p>
                    <div className="">
                      <>
                        {data2?.map((i) => {
                          return (
                            <>
                              <NavLink to={`/post/view/${i?._id}`}>
                                <div class="rounded cursor-pointer my-1 ">
                                  <div class="flex justify-start border-black shadow-lg  border rounded-md">
                                    <div class="flex mx-2 my-1  ">
                                      <div class="w-[80px] h-[80px]">
                                        <img
                                          class="w-full h-full"
                                          src={i?.images[0]?.imgUrl}
                                        />
                                      </div>
                                    </div>
                                    <div class="text-left w-full">
                                      <span class="text-sm text-blue-500 font-bold whitespace-normal">
                                        {i?.title.substring(0, 40) + " ..."}
                                      </span>
                                      <p class=" text-base ">
                                        Giá: {i?.roomFee}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </NavLink>
                            </>
                          );
                        })}
                      </>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="w-full flex justify-center items-center my-4">
                <div className="w-[90%]  border rounded-md">
                  <div className="p-2 h-[900px] bg-blue-300"> quảng cáo</div>
                </div>
              </div>
              {/* ... */}
              {/*  */}
              <div className="w-full flex justify-center items-center my-4">
                <div className="w-[90%]  border rounded-md">
                  <div className="p-2 h-[900px] bg-blue-300"> quảng cáo</div>
                </div>
              </div>
              {/* ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
