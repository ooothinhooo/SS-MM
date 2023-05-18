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
      const result = await LIST_ROOM(user?.token, user?.Motel);
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
        console.log(user);
        const result = await ADD_ROOM(user?.token, user?.Motel, value);
        console.log(result);
        if (result.data.status == 200) {
          setNum("");
          // toast.success(`${value} được thêm thành công`);
          toast.success(`${value} được thêm thành công`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // theme: "colored",
          });
          GetAPI();
        }
      } catch (error) {}
    };
  }

  let R = new Room();
  return (
    <div className="mt-20 mr-20 w-full ">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div class="flex w-full  justify-center items-center">
        {" "}
        <div class="rounded-xl border p-2 shadow-md w-[90%] bg-white">
          <div class="flex w-full items-center justify-between  ">
            <div class="flex items-center space-x-3">
              <div class="text-lg font-bold text-slate-700">
                {user?.first_name + " " + user?.last_name}
              </div>
            </div>
            <div class="flex items-center space-x-8 text-white">
              <button
                onClick={(e) => R.addRoom()}
                class={`${
                  dele ? "hidden" : ""
                } rounded-lg py-2 border bg-blue-600 px-3  text-[13px] font-semibold`}
              >
                {/* <NavLink to={`/room/add`}>Thêm Phòng</NavLink> */}
                Thêm Phòng Trọ
              </button>
              {/* <button class="rounded-lg py-2 border bg-green-600 px-3  text-xs font-semibold">
                Sửa Thành Viên
              </button> */}
              <button
                onClick={(e) => setDele(!dele)}
                class="rounded-lg py-2 border bg-red-600 px-3  text-[13px] font-semibold"
              >
                {!dele ? <>Xoá Phòng Trọ</> : <>Quay lại trang chủ</>}
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
