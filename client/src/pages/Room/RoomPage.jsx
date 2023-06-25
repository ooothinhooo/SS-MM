import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BoxRoom from "../../components/Room/BoxRoom.jsx";
import { NavLink } from "react-router-dom";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { ADD_ROOM } from "../../API/Motels/AddRoom.api.js";
import ListRoom from "../../components/Room/ListRoom.jsx";
import { NumericFormat } from "react-number-format";
import { CREATE_ROOM } from "../../API/Motels/CreateRoom.api.js";

function RoomPage({ user }) {
  const [room, setRoom] = useState();
  const [isdele, setIsdele] = useState(Boolean(false));
  const [ismember, setIsmember] = useState(Boolean(false));
  const [num, setNum] = useState("");

  const GetAPI = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      const array = result.data.data.sort((a, b) =>
        String(a.roomCode) > String(b.roomCode) ? 1 : -1
      );
      setRoom(array);
    } catch (error) {}
  };
  useEffect(() => {
    GetAPI();
  }, []);

  class OneRoom {
    addRoom = () => {
      // try {
      //   Swal.fire({
      //     title: "Thêm Phòng",
      //     input: "text",
      //     inputLabel: "Nhập Tên Phòng Của Bạn",
      //     inputPlaceholder: "Ex: P01",
      //     inputAttributes: {
      //       maxlength: 10,
      //       autocapitalize: "off",
      //       autocorrect: "off",
      //       "aria-label": "Type your message here",
      //     },
      //     showCancelButton: true,
      //     confirmButtonText: "Thêm",
      //     cancelButtonText: "Huỷ",
      //     // showLoaderOnConfirm: true,
      //     preConfirm: (num) => {},
      //     // allowOutsideClick: () => !Swal.isLoading(),
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       console.log(result.value);
      //       var R = new Room();
      //       R.PostAPI_addRoom(result.value);
      //     }
      //   });
      // } catch (error) {}
      // updateBill();
      OR.RenderAddRoom();
    };
    RenderAddRoom = async () => {
      try {
        const { value: formValues } = await Swal.fire({
          title: `THÊM PHÒNG`,
          html: `
            <div class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Tên Phòng *
                </label>
                <input 
                class="appearance-none uppercase block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                type="text" 
                id="roomCode"
                placeholder="Tên Phòng" 
                />
            </div>
            <div class="w-full md:w-1/2 px-3">
           
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Chọn Loại Phòng</label>
          <select 
          id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Chọn Loại Phòng</option>
          <option value="Phòng Có Gác">Phòng Có Gác</option>
          <option value="Phòng Gác + Máy Lạnh">Phòng Gác + Máy Lạnh</option>
          <option value="Phòng Có Đủ Tiện Nghi">Phòng Có Đủ Tiện Nghi</option>
          <option value="Phòng Không Gác">Phòng Không Gác</option>
          <option value="Phòng Không Gác + Tiện Nghi">Phòng Không Gác + Tiện Nghi</option>
         
      </select>
            </div>
        </div>
    </div>
    <div class="w-full max-w-lg">
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Tiền Phòng*
       </label>
       <input
           class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
           type="number" 
           id="roomFee"
       placeholder="Tiền phòng" 
       />
          
        </div>
        <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Tiền cọc *
            </label>
            <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="number" 
          id="deposit"
          placeholder="Tiền cọc" 
        </div>
    </div>
    </div> `,
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById("roomCode").value.toUpperCase(),
              document.getElementById("category").value,
              document.getElementById("roomFee").value,
              document.getElementById("deposit").value,
            ];
          },
        });

        if (formValues) {
          OR.PostAPI_addRoom(formValues);
          // Swal.fire(JSON.stringify(formValues));
          // var obj = {
          //   month: month,
          //   oldEle: formValues[0],
          //   newEle: formValues[1],
          //   oldWater: formValues[2],
          //   newWater: formValues[3],
          // };
          // POSTAPI(obj);
          /*
 const { value: formService } = await Swal.fire({
            title: `THÊM DỊCH VỤ CHO PHÒNG`,
            html: `
              <div class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                      GIÁ ĐIỆN *
                  </label>
                  <input 
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                  type="text" 
                  id="electricityPrice"
                  placeholder="Tên Phòng" 
                  />
              </div>
              <div class="w-full md:w-1/2 px-3">
             
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Đơn vị</label>
            <select 
            id="eleUnit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a service</option>
            <option value="Người">Người</option>
            <option value="KWH">KWH</option>
            <option value="Phòng">Phòng</option>
            <option value="Miễm Phí">Miễn Phí</option>
        </select>
              </div>
          </div>
      </div>
      <div class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
          Giá Nước*
         </label>
         <input
             class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
             type="number" 
             id="waterPrice"
         placeholder="Giá Nước" 
         />
            
          </div>
          <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Đơn Vị</label>
          <select 
          id="waterUnit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose a service</option>
          <option value="Người">Người</option>
          <option value="Khối">Khối</option>
          <option value="Phòng">Phòng</option>
          <option value="Miễm Phí">Miễn Phí</option>
      </select>
          </div>
      </div>
      </div> `,
            focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById("electricityPrice").value,
                document.getElementById("eleUnit").value,
                document.getElementById("waterPrice").value,
                document.getElementById("waterUnit").value,
              ];
            },
          });
          if (formValues && formService) {
  
            R.PostAPI_addRoom(formValues,formService)
          }
        */
        }
      } catch (error) {}
    };
    PostAPI_addRoom = async (formValues) => {
      try {
        console.log(user);
        const result = await ADD_ROOM(
          user?.token,
          user?.Motel,
          formValues[0],
          formValues[1],
          formValues[2],
          formValues[3]
        );
        console.log(result);
        if (result.data.status == 200) {
          setNum("");
          // toast.success(`${value} được thêm thành công`);
          toast.success(`${formValues[0]} được thêm thành công`, {
            position: "top-right",
            autoClose: 200,
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
  const [form, setForm] = useState();

  class ManyRoom {
    RenderAddRoom = async () => {
      try {
        const { value: formValues } = await Swal.fire({
          title: `THÊM NHIỀU PHÒNG`,
          html: `
            <div class="w-full max-w-lg">
            <div class="flex justify-center items-center -mx-3 mb-6">
            <div class="w-full  px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                   Kí Hiệu Phòng
                </label>
                <input 
                class="appearance-none uppercase block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                type="text" 
                id="kihieu"
                placeholder="Kí Hiệu Phòng" 
                />
            </div>
            <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
               Từ Phòng
            </label>
            <input 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
            type="number" 
            id="start"
            placeholder="Số phòng bắt đầu" 
            />
        </div>
            <div class="w-full  px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Đến Phòng
                </label>
                <input 
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                type="number" 
                id="end"
                placeholder="Số phòng kết thúc" 
                />
            </div>
            </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Tiền Phòng*
           </label>
           <input
               class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               type="number" 
               id="roomFee"
           placeholder="Tiền phòng" 
           />
            </div>
            <div class="w-full md:w-1/2 px-3">
           
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Chọn Loại Phòng</label>
          <select 
          id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Chọn Loại Phòng</option>
          <option value="Phòng Có Gác">Phòng Có Gác</option>
          <option value="Phòng Gác + Máy Lạnh">Phòng Gác + Máy Lạnh</option>
          <option value="Phòng Có Đủ Tiện Nghi">Phòng Có Đủ Tiện Nghi</option>
          <option value="Phòng Không Gác">Phòng Không Gác</option>
          <option value="Phòng Không Gác + Tiện Nghi">Phòng Không Gác + Tiện Nghi</option>
         
      </select>
            </div>
        </div>
    </div>
    <div class="w-full max-w-lg">
    <div class="flex flex-wrap -mx-3 mb-6">
      
        
    </div>
    </div> `,
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById("start").value,
              document.getElementById("end").value,
              document.getElementById("category").value,
              document.getElementById("roomFee").value,
              document.getElementById("kihieu").value,
            ];
          },
        });

        if (formValues) {
          // OR.PostAPI_addRoom(formValues);
          if (formValues[0] >= 1 && formValues[1] >= formValues[0]) {
            var obj = {
              start: formValues[0],
              end: formValues[1],
              category: formValues[2],
              roomFee: formValues[3],
              kihieu: formValues[4],
            };
            console.log(obj);
            MR.addRoom(obj);
          } else {
            Swal.fire("Lỗi", "Số phòng bắt đầu phải nhỏ hơn phòng kết thúc");
          }
        }
      } catch (error) {}
    };

    addRoom = async (obj) => {
      try {
        const ArrayRoom = [];
        for (let i = obj?.start; i <= obj?.end; i++) {
          ArrayRoom.push({
            roomCode: `${obj?.kihieu.toUpperCase()}${i}`,
            roomFee: `${obj?.roomFee}`,
            deposit: "0",
            category: `${obj?.category}`,
          });
        }
        console.log(ArrayRoom);

        setForm({
          room: ArrayRoom,
          token: user?.token,
          motelId: user?.Motel,
        });
        // MR.POSTAPI_CREATEROOM(ArrayRoom);

        let x = "";
        const x1 = ArrayRoom.map((i) => {
          x += `[ Phòng ${i.roomCode} ]`;
        });
        const html = `
      
          ${x}
        `;
        const { value: text } = await Swal.fire({
          input: "textarea",
          inputLabel: "Danh Sách Phòng Sẽ Tạo",
          inputPlaceholder: "Type your message here...",
          inputAttributes: {
            "aria-label": "Type your message here",
          },
          inputValue: html,
          showCancelButton: true,
        });

        if (text) {
          console.log(text);
          MR.POSTAPI_CREATEROOM(ArrayRoom);
        }
      } catch (error) {}
    };

    POSTAPI_CREATEROOM = async (room) => {
      try {
        if (room) {
          console.log(room);
          const result = await CREATE_ROOM(user?.token, user?.Motel, room);
          // console.log(JSON.stringify(result?.config?.data));
          console.log(result.data.status);
          console.log(result);
          if (result.data.status == 200) {
            setForm({});
            GetAPI();
            // toast.success(`${value} được thêm thành công`);
            toast.success(`Thêm Phòng thành công`, {
              position: "top-right",
              autoClose: 200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // theme: "colored",
            });
            // ArrayRoom = [];
          }
        }
      } catch (error) {}
    };
  }
  let MR = new ManyRoom();
  let OR = new OneRoom();
  return (
    <div className=" w-full ">
      <ToastContainer />

      <div class="flex w-full  justify-center items-center">
        <div class="rounded-md  p-2 w-[98%] ">
          <div class="flex w-full items-center justify-between  ">
            <div class="flex items-center space-x-3">
              <div class="text-lg font-bold text-slate-700">
                {user?.first_name + " " + user?.last_name}
              </div>
            </div>
            <div class="flex items-center space-x-8 text-black">
              <div class="inline-flex items-center rounded-md shadow-sm">
                <button 
                 onClick={(e) => OR.addRoom()}
                class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z"
                        fill="currentColor"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span class="hidden md:inline-block">Thêm Phòng</span>
                </button>
                <button 
                  onClick={(e) => MR.RenderAddRoom()}
                class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border-y rounded-r-lg border-r border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 5H14V7H2V5Z" fill="currentColor" />
                      <path d="M2 9H14V11H2V9Z" fill="currentColor" />
                      <path d="M10 13H2V15H10V13Z" fill="currentColor" />
                      <path
                        d="M16 9H18V13H22V15H18V19H16V15H12V13H16V9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span class="hidden md:inline-block">Thêm Phòng Nhanh</span>
                </button>
                

               
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <BoxRoom data={room} user={user} dele={dele} /> */}
      <ListRoom data={room} user={user} GetAPI={GetAPI} />
    </div>
  );
}

export default RoomPage;


//  <div class="flex w-full  justify-center items-center">
//         <div class="rounded-xl border p-2 shadow-md w-[90%] bg-white">
//           <div class="flex w-full items-center justify-between  ">
//             <div class="flex items-center space-x-3">
//               <div class="text-lg font-bold text-slate-700">
//                 {user?.first_name + " " + user?.last_name}
//               </div>
//             </div>
//             <div class="flex items-center space-x-8 text-white">
//               <button
//                 onClick={(e) => MR.RenderAddRoom()}
//                 class={`${
//                   dele ? "hidden" : ""
//                 } rounded-lg py-2 border bg-blue-600 px-3  text-[13px] font-semibold`}
//               >
//                 {/* <NavLink to={`/room/add`}>Thêm Phòng</NavLink> */}
//       //           Thêm Nhiều Phòng Trọ
//       //         </button>
//       //         <button
      //           onClick={(e) => OR.addRoom()}
      //           class={`${
      //             dele ? "hidden" : ""
      //           } rounded-lg py-2 border bg-blue-600 px-3  text-[13px] font-semibold`}
      //         >
      //           {/* <NavLink to={`/room/add`}>Thêm Phòng</NavLink> */}
      //           Thêm Phòng Trọ
      //         </button>
      //         {/* <button class="rounded-lg py-2 border bg-green-600 px-3  text-xs font-semibold">
      //           Sửa Thành Viên
      //         </button> */}
      //       </div>
      //     </div>
      //   </div>
      // </div>
