import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { GET_ONE_POST } from "../../API/Api/GetOnePost.api.js";
import { useState } from "react";

function ViewPostPage({ user }) {
  let { id } = useParams();

  const [data, setData] = useState();
  const [images, setImages] = useState();
  const GETAPI = async () => {
    try {
      const result = await GET_ONE_POST(id);
      // console.log(result);
      if (result.data.status == 200) {
        setData(result?.data?.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    GETAPI();
    GETAPI();
    console.log(data?.images);
  }, []);

  return (
    <div>
      <div className="w-full  mb-4 px-6">
        <Breadcrumb />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-[90%] ">
          <div>
            <div class="grid grid-cols-2 gap-4">
              <div className="border rounded-md">
                <div className="">
                  <Slide>
                    {data?.images?.map((slideImage, index) => (
                      <div key={index}>
                        <div class="bg-indigo-300 flex justify-center items-center">
                          <img
                            src={slideImage?.imgUrl}
                            class="object-cover w-full h-[500px]"
                          />
                        </div>
                      </div>
                    ))}
                  </Slide>
                </div>
              </div>

              <div className="border rounded-md text-left">
                <div className="px-4 py-2">
                  <div class="card md:flex max-w-lg">
                    <div class="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
                      <img
                        class="object-cover rounded-full"
                        src={data?.userId?.avatar}
                      />
                    </div>
                    <div class="flex-grow text-center md:text-left">
                      <p class="font-bold">
                        {data?.userId?.first_name +
                          " " +
                          data?.userId?.last_name}
                      </p>
                      <p className="text-xl text-blue-800 font-bold">
                        {data?.title}
                      </p>
                    </div>
                  </div>
                  <p>
                    <span>Giá phòng: </span>
                    <span>{data?.roomFee}</span>
                  </p>
                  <span className="whitespace-normal flex">
                    <span className="flex">
                      Địa Chỉ: <span>{data?.address + ","}</span>
                    </span>{" "}
                    <span>{" " + data?.ward + "," + data?.district}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                Tin
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
                Xem Tin
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
}
export default ViewPostPage;
