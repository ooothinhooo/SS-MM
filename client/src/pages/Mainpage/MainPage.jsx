import React from "react";
import PostPage from "../Post/PostPage.jsx";
import { callAPI, callApiDistrict, callApiWard } from "../../API/Auth/API.js";
import CreatePostPage from "../Post/CreatePostPage.js";
import { NavLink } from "react-router-dom";

function MainPage({ user }) {
  const province = callAPI("https://provinces.open-api.vn/api/?depth=1");
  const host = "https://provinces.open-api.vn/api/";

  callApiDistrict(host + "p/" + "1" + "?depth=2");
  callApiWard(host + "d/" + "281" + "?depth=2");
  return (
    <div>
      {/* <CreatePostPage /> */}
      <div className=" w-full flex justify-center items-center">
        <div className="w-[80%]  ">
          <div class="grid grid-cols-3 gap-8 ">
            {/* overflow-y-scroll h-[600px] */}
            <div class="col-span-2 ">
              {" "}
              <PostPage />
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
              <div className="w-full flex justify-center items-center my-4">
                <div className="w-[90%]  border rounded-md">
                  <div className="p-2">
                    <p className="text-left font-bold mb-4 mt-2">
                      Xem theo giá
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                      <div className=" w-full text-left">
                        {" "}
                        {"> "}Dưới 1 triệu
                      </div>
                      <div className=" w-full text-left">
                        {"> "}Từ 1 - 2 triệu
                      </div>
                      <div className=" w-full text-left">
                        {"> "}Từ 2 - 3 triệu
                      </div>
                      <div className=" w-full text-left">
                        {"> "}Từ 3 - 5 triệu
                      </div>
                      <div className=" w-full text-left">
                        {"> "}Từ 5 - 7 triệu
                      </div>
                      <div className=" w-full text-left">
                        {"> "}Từ 7 - 10 triệu
                      </div>
                      <div className=" w-full text-left">
                        {"> "}Từ 10 - 15 triệu
                      </div>
                      <div className=" w-full text-left">
                        {"> "}Trên 15 triệu
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
                      Xem theo diện tích
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                      <div className=" w-full text-left">
                        <p className="hover:text-blue-600 cursor-pointer">
                          {"> "}Dưới 20 m²
                        </p>
                      </div>
                      <div className=" w-full text-left">
                        <p className="hover:text-blue-600 cursor-pointer">
                          {"> "}Từ 20 - 30m²
                        </p>
                      </div>
                      <div className=" w-full text-left">
                        <p className="hover:text-blue-600 cursor-pointer">
                          {"> "}Từ 30 - 50m²
                        </p>
                      </div>
                      <div className=" w-full text-left">
                        <p className="hover:text-blue-600 cursor-pointer">
                          {"> "}Từ 50 - 70m²
                        </p>
                      </div>
                      <div className=" w-full text-left">
                        <p className="hover:text-blue-600 cursor-pointer">
                          {"> "}Từ 70 - 90m²
                        </p>
                      </div>
                      <div className=" w-full text-left">
                        <p className="hover:text-blue-600 cursor-pointer">
                          {"> "}Trên 90m²
                        </p>
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
                    <div className="h-[100px]"></div>
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

export default MainPage;
