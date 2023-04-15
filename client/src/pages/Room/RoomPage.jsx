import React, { useEffect, useState } from "react";
import BoxRoom from "../../components/Room/BoxRoom.jsx";
import { NavLink } from "react-router-dom";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";

function RoomPage({ user }) {
  const [room, setRoom] = useState();
  const GetAPI = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.motelId);

      setRoom(result.data.data.rooms);
    } catch (error) {}
  };
  useEffect(() => {
    GetAPI();
  }, []);
  return (
    <div className="mt-20 mr-20">
      <div class="flex ">
        {" "}
        <div class="rounded-xl border p-2 shadow-md w-full bg-white">
          <div class="flex w-full items-center justify-between  ">
            <div class="flex items-center space-x-3">
              <div class="text-lg font-bold text-slate-700">
                {user?.first_name + " " + user?.last_name}
              </div>
            </div>
            <div class="flex items-center space-x-8 text-white">
              <button class="rounded-lg py-2 border bg-blue-600 px-3  text-xs font-semibold">
                <NavLink to={`/room/add`}>Thêm Phòng</NavLink>
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
