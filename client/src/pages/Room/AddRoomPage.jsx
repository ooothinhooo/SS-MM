import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADD_ROOM } from "../../API/Motels/AddRoom.api.js";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";

function AddRoomPage() {
  const { user, isConvert } = useContext(ProductContext);

  const [num, setNum] = useState("");
  const PostAPI = async () => {
    try {
      const result = await ADD_ROOM(user?.token, user?.motelId, num);
      console.log(result);
      if (result.data.status == 200) {
        setNum("");
        toast.success(`${num} được thêm thành công`);
      }
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-20 mr-20">
        <div class="flex ">
          <div class="flex h-screen items-center justify-center bg-[#fbfbfb]">
            <div class="grid w-80 grid-rows-4 gap-1">
              <p class="font-semibold text-gray-700">💌 Nhập Tên Phòng</p>
              <input
                type="text"
                class="h-10 w-full rounded border p-2 text-sm"
                placeholder="Ex: P001"
                onChange={(e) => setNum(e.target.value)}
                value={num}
              />
              <button
                onClick={PostAPI}
                class="rounded bg-[#FD5E57] text-gray-50 hover:bg-gradient-to-r hover:from-[#FD5E57] hover:to-[#FC477E]"
              >
                Thêm Phòng
              </button>
              <a href="">
                <p class="mt-4 flex items-center text-xs text-gray-500 hover:text-gray-700">
                  Read the latest issue
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="ml-1 h-3 w-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRoomPage;
