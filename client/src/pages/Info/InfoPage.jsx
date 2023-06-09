import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FIND_USER } from "../../API/User/FindUser.api.js";
import BoxPost from "../../components/Post/BoxPost.jsx";

function InfoPage({ user }) {
  let { id } = useParams();
  const [tab, setTab] = useState(true);
  const [data, setData] = useState();
  const GET_FIND_USER = async () => {
    try {
      const result = await FIND_USER(user?.token, id);
      console.log(result.data.data);
      setData(result?.data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    GET_FIND_USER();
  }, []);
  return (
    <div className="w-full flex justify-center items-center">
      <div class="w-[90%]">
        <div class="container mx-auto py-8">
          <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div class="col-span-4 sm:col-span-3">
              <div class="bg-white shadow rounded-lg p-6">
                <div class="flex flex-col items-center">
                  <img
                    src={data?.avatar}
                    class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  <h1 class="text-xl font-bold">
                    {data?.first_name + " " + data?.last_name}
                  </h1>
                  <p class="text-gray-600">{data?.email}</p>
                  <div class="mt-6 flex flex-wrap gap-4 justify-center">
                    <NavLink to={`/u/edit/${id}`}>
                      <a class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Cập nhật tài khoản
                      </a>
                    </NavLink>
                    {/* <a
                      href="#"
                      class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    >
                      
                    </a> */}
                  </div>
                </div>
                <p class="my-6 border-t border-gray-300"></p>
                <div class="flex flex-col">
                  <span class="text-gray-600 uppercase font-bold tracking-wider mb-2">
                    Skills
                  </span>
                  <ul>
                    <li class="mb-2">JavaScript</li>
                    <li class="mb-2">React</li>
                    <li class="mb-2">Node.js</li>
                    <li class="mb-2">HTML/CSS</li>
                    <li class="mb-2">Tailwind Css</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-span-4 sm:col-span-9">
              <div class="w-full  mx-auto">
                <div class="flex border-b border-gray-300">
                  <button
                    class="w-1/2 border mx-1 py-4 text-center font-medium text-gray-700 bg-gray-100 rounded-tl-lg focus:outline-none active:bg-gray-200"
                    onClick={(e) => setTab(!tab)}
                  >
                    Bài viết đã đăng
                  </button>
                  <button
                    class="w-1/2 border mx-1 py-4 text-center font-medium text-gray-700 bg-gray-100 rounded-tr-lg focus:outline-none"
                    onClick={(e) => setTab(!tab)}
                  >
                    Bài viết đã lưu
                  </button>
                </div>
                <div id="tab1" class={`tabcontent p-4 ${tab ? "" : "hidden"}`}>
                  <h2 class="text-lg font-bold text-gray-800 text-left">
                    Bài viết đã đăng
                  </h2>
                  <p class="mt-2 text-gray-700">
                    <ul class="grid grid-cols-1  gap-y-2 gap-x-6 items-start justify-start text-left p-8">
                      {data?.Posts?.map((value) => {
                        return (
                          <BoxPost
                            user={user}
                            value={value}
                            // GETAPI_LISTPOST={GETAPI_LISTPOST}
                          />
                        );
                      })}
                    </ul>
                  </p>
                </div>
                <div id="tab2" class={`tabcontent p-4 ${!tab ? "" : "hidden"}`}>
                  <h2 class="text-lg font-bold text-gray-800 text-left">
                    Bài viết đã lưu
                  </h2>
                  <p class="mt-2 text-gray-700">
                    <ul class="grid grid-cols-1  gap-y-2 gap-x-6 items-start justify-start text-left p-8">
                      {data?.SavePost?.map((value) => {
                        return (
                          <BoxPost
                            user={user}
                            value={value}
                            // GETAPI_LISTPOST={GETAPI_LISTPOST}
                          />
                        );
                      })}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
