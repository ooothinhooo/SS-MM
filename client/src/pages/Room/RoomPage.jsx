import React, { useState } from "react";
import BoxRoom from "../../components/Room/BoxRoom.jsx";

function RoomPage({ user }) {
  const [room, setRoom] = useState([1, 2]);
  return (
    <div className="mt-20 mr-20">
      <div class="flex ">
        {" "}
        <div class="rounded-xl border p-2 shadow-md w-full bg-white">
          <div class="flex w-full items-center justify-between  ">
            <div class="flex items-center space-x-3">
              <div class="text-lg font-bold text-slate-700">Joe Smith</div>
            </div>
            <div class="flex items-center space-x-8 text-white">
              <button class="rounded-lg py-2 border bg-blue-600 px-3  text-xs font-semibold">
                Thêm Phòng
              </button>
              <button class="rounded-lg py-2 border bg-green-600 px-3  text-xs font-semibold">
                Sửa Phòng
              </button>
              <button class="rounded-lg py-2 border bg-red-600 px-3  text-xs font-semibold">
                Xoá Phòng
              </button>
            </div>
          </div>
        </div>
      </div>
      <BoxRoom data={room} user={user} />
    </div>
  );
}

export default RoomPage;
