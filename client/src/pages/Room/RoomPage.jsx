import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BoxRoom from "../../components/Room/BoxRoom.jsx";
import { NavLink } from "react-router-dom";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { ADD_ROOM } from "../../API/Motels/AddRoom.api.js";

function RoomPage({ user }) {
  const [room, setRoom] = useState();
  const [dele, setDele] = useState(Boolean(false));
  const [num, setNum] = useState("");

  const GetAPI = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.motelId);
      setRoom(result.data.data.rooms);
    } catch (error) {}
  };
  useEffect(() => {
    GetAPI();
  }, []);

  class Room {
    addRoom = () => {
      try {
        Swal.fire({
          title: "Thêm Phòng",
          input: "text",
          inputLabel: "Nhập Tên Phòng Của Bạn",
          inputPlaceholder: "Ex: P01",
          inputAttributes: {
            maxlength: 10,
            autocapitalize: "off",
            autocorrect: "off",
            "aria-label": "Type your message here",
          },
          showCancelButton: true,
          confirmButtonText: "Thêm",
          cancelButtonText: "Huỷ",
          // showLoaderOnConfirm: true,
          preConfirm: (num) => {},
          // allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(result.value);
            var R = new Room();
            R.PostAPI_addRoom(result.value);
          }
        });
      } catch (error) {}
    };

    PostAPI_addRoom = async (value) => {
      try {
        const result = await ADD_ROOM(user?.token, user?.motelId, value);
        console.log(result);
        if (result.data.status == 200) {
          setNum("");
          toast.success(`${value} được thêm thành công`);
          GetAPI();
        }
      } catch (error) {}
    };
  }

  let R = new Room();
  return (
    <div className="mt-20 mr-20">
      <ToastContainer />

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
              <button
                onClick={(e) => R.addRoom()}
                class="rounded-lg py-2 border bg-blue-600 px-3  text-xs font-semibold"
              >
                {/* <NavLink to={`/room/add`}>Thêm Phòng</NavLink> */}
                Thêm Thành Viên
              </button>
              <button class="rounded-lg py-2 border bg-green-600 px-3  text-xs font-semibold">
                Sửa Thành Viên
              </button>
              <button
                onClick={(e) => setDele(!dele)}
                class="rounded-lg py-2 border bg-red-600 px-3  text-xs font-semibold"
              >
                Xoá Phòng
              </button>
            </div>
          </div>
        </div>
      </div>
      <BoxRoom data={room} user={user} dele={dele} />
    </div>
  );
}

export default RoomPage;
