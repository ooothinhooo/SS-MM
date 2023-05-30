import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillTags, AiOutlineUserAdd } from "react-icons/ai";
import { MdAddToQueue } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { CREATE_SERVICE } from "../../API/Service/createService.api.js";
import { DELETE_SERVICE } from "../../API/Service/deleteService.api.js";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import ServicePage from "../../pages/Service/ServicePage.jsx";
import { ADD_SERVICE_TOROOM } from "../../API/Service/addService.api.js";
import { UPDATE_SERVICE } from "../../API/Service/updateService.api.js";
import { NumericFormat } from "react-number-format";

function ListService({ user, Service, GETAPI_MOTELS }) {
  const [room, setRoom] = useState();
  const [serviceID, setServiceID] = useState();
  const [serviceId, setServiceId] = useState();
  const GETAPI_ROOM = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      console.log(result.data.data);
      const array = result.data.data.sort((a, b) =>
        String(a.roomCode) > String(b.roomCode) ? 1 : -1
      );
      setRoom(array);
      // setRoom(result.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    GETAPI_ROOM();
  }, []);
  const Render_CreateService = async () => {
    try {
      const { value: formService } = await Swal.fire({
        title: `THÊM DỊCH VỤ CHO PHÒNG`,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        html: `
              <div class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full  px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                      Thêm tên dịch vụ
                  </label>
                  <input 
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                  type="text" 
                  id="name"
                  placeholder="Tên Phòng" 
                  />
              </div>
       
          </div>
      </div>
      <div class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Giá Dịch Vụ
         </label>
         <input
             class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
             type="number" 
             id="value"
         placeholder="Giá Dịch Vụ" 
         />
            
          </div>
          <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Đơn Vị Tính</label>
          <select 
          id="unit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose a service</option>
          <option value="Trên Người">Trên Người</option>
          <option value="Kwh">Kwh</option>
          <option value="Khối">Khối</option>
          <option value="Phòng">Phòng</option>
          <option value="Miễm Phí">Miễn Phí</option>
      </select>
          </div>
      </div>
      </div> 
      


      `,
        focusConfirm: false,

        preConfirm: () => {
          return [
            document.getElementById("name").value,
            document.getElementById("value").value,
            document.getElementById("unit").value,
            // document.getElementById("dropzone-file").value,
          ];
        },
      });
      if (formService) {
        // R.PostAPI_addRoom(formValues,formService)
        console.log(JSON.stringify(formService));
        // CreateService(formService);
      }
    } catch (error) {}
  };
  const CreateService = async (form) => {
    try {
      const result = await CREATE_SERVICE(
        user?.token,
        user?.Motel,
        form[0],
        form[1],
        form[2]
      );
      console.log(result);
      if (result?.data?.status == 200) {
        toast.success(`Dịch vụ ${form[0]} được thêm thành công`, {
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
        GETAPI_MOTELS();
      }
    } catch (error) {}
  };

  const Render_DeleteService = async (id, name) => {
    try {
      if (name == "Tiền Điện" || name == "Tiền Nước") {
        Swal.fire({
          icon: "error",
          title: "KHÔNG THỂ XOÁ",
          text: "ĐÂY LÀ DỊCH VỤ MẶT ĐỊNH CHỈ CÓ THỂ SỬA KHÔNG THỂ XOÁ",
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: `Bạn Muốn Xoá Dịch Vụ ${name}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            DeleteService(id);
          }
        });
      }
    } catch (error) {}
  };
  const DeleteService = async (id) => {
    try {
      const result = await DELETE_SERVICE(user?.token, user?.Motel, id);
      console.log(result);
      GETAPI_MOTELS();
      if (result?.data.status == 200)
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {}
  };

  const Render_UpdateService = async (id, data) => {
    try {
      console.log(data.name);
      const check = data.name === "Tiền Điện" || data.name === "Tiền Nước";
      console.log(check);
      const htnl = check
        ? `
         <p
         class="appearance-none block w-full bg-gray-100 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
         
         >
         ${data.name}
         </p>`
        : ` <input
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      type="text"
      id="name"
      value=${data.name}

    />`;
      const { value: formService } = await Swal.fire({
        title: `CẬP NHẬT DỊCH VỤ ${data.name} CHO PHÒNG`,
        showCancelButton: true,
        cancelButtonColor: "#d33",

        html: `
              <div class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full  px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                      Tên dịch vụ
                  </label>
                 ${htnl}
              </div>
       
          </div>
      </div>
      <div class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Giá Dịch Vụ
         </label>
         <input
             class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
             type="number" 
             id="value"
             value=${data?.value}
         placeholder="Giá Dịch Vụ" 
         />
            
          </div>
          <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Đơn Vị Tính</label>
          <select 
          id="unit"   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option  value=${data?.unit} >${data.unit}</option>
          <option value="Trên Người">Trên Người</option>
          <option value="Kwh">Kwh</option>
          <option value="Khối">Khối</option>
          <option value="Phòng">Phòng</option>
          <option value="Miễm Phí">Miễn Phí</option>
      </select>
          </div>
      </div>
      </div> `,
        focusConfirm: false,

        preConfirm: () => {
          const name = check
            ? data?.name
            : document.getElementById("name").value;
          return [
            name,
            document.getElementById("value").value,
            document.getElementById("unit").value,
          ];
        },
      });
      if (formService) {
        // R.PostAPI_addRoom(formValues,formService)
        console.log(JSON.stringify(formService));
        // CreateService(formService);
        var obj = {
          name: formService[0],
          value: formService[1],
          unit: formService[2],
        };
        UpdateService(id, obj);
      }
    } catch (error) {}
  };

  const UpdateService = async (id, data) => {
    try {
      const result = await UPDATE_SERVICE(user?.token, user?.Motel, id, data);
      console.log(result);
      GETAPI_MOTELS();
      GETAPI_ROOM();
    } catch (error) {}
  };

  const Render_AddRoomUseService = async (serviceId, name) => {
    try {
      let html = "";
      const x = room.map((i) => {
        html += `
        
        <div class="flex items-center   pl-4 border border-gray-200 rounded dark:border-gray-700">
    <input ${
      i?.services.map((x) => x._id).includes(serviceId) ? "checked" : ""
    } type="checkbox" value=${
          i?._id
        } name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="bordered-checkbox-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${
      i?.roomCode
    }</label>
</div>
        `;
      });
      const { value: formValues } = await Swal.fire({
        title: "Multiple inputs",
        width: 1200,
        html: `
        <div class="grid grid-cols-8 gap-4 p-2">  
       
        ${html}

      </div>
         `,
        focusConfirm: false,
        preConfirm: () => {
          const checkboxes = document.querySelectorAll(
            "input[type=checkbox]:checked"
          );
          let ArrayChecked = [];
          Array.prototype.forEach.call(checkboxes, function (el) {
            ArrayChecked.push(el.value);
          });
          // console.log(values);
          const Nocheckboxes = document.querySelectorAll(
            "input[type=checkbox]"
          );
          let ArrayNoChecked = [];
          Array.prototype.forEach.call(Nocheckboxes, function (el) {
            if (!el.checked) {
              ArrayNoChecked.push(el.value);
            }
          });
          console.log(ArrayChecked);
          console.log(ArrayNoChecked);
          return [
            // document.getElementById("swal-input1").value,
            // document.getElementById("swal-input2").value,
            serviceId,
            ArrayChecked,
            ArrayNoChecked,
          ];
        },
      });

      if (formValues) {
        // Swal.fire(JSON.stringify(formValues));

        const serviceId = formValues[0];
        const ArrayChecked = formValues[1];
        formValues[2].pop();
        const ArrayNoChecked = formValues[2];

        console.log(serviceId, ArrayChecked, ArrayNoChecked);
        AddRoomUseService(serviceId, ArrayChecked, ArrayNoChecked);
      }
    } catch (error) {}
  };

  const AddRoomUseService = async (serviceId, ArrayChecked, ArrayNoChecked) => {
    try {
      console.log(serviceId, ArrayChecked, ArrayNoChecked);
      const result = await ADD_SERVICE_TOROOM(
        user?.token,
        serviceId,
        ArrayChecked,
        ArrayNoChecked
      );
      console.log(result);
      toast.success("Thay đổi thành công");
      GETAPI_MOTELS();
      GETAPI_ROOM();
    } catch (error) {}
  };
  return (
    <div className="w-full">
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
      <div class="w-full h-auto flex justify-center items-center my-4  ">
        <div className="w-[90%]  ">
          <p
            onClick={(e) => Render_CreateService()}
            class="box-border relative z-30 inline-flex items-center justify-center w-full px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
          >
            <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span class="relative z-20 flex items-center text-sm">
              <svg
                class="relative w-5 h-5 mr-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              THÊM DỊCH VỤ MỚI
            </span>
          </p>
        </div>
      </div>
      {Service?.map((item, index) => {
        return (
          <>
            <div class="w-full h-auto flex justify-center items-center my-2  ">
              <div className=" h-auto border-2 rounded-xl w-[98%] min-w-570 px-4 py-2 flex ">
                <div className="flex justify-between items-center w-full">
                  <div className=" rounded-full  justify-start flex ">
                    <div className="flex justify-center items-center">
                      <p className="text-4xl border-2 justify-center items-center rounded-full p-2">
                        <AiFillTags />
                      </p>
                      <div className="justify-start text-left ml-2">
                        <p className="font-bold ">{item?.name}</p>
                        <p className="font-thin">
                          <span>
                            <NumericFormat
                              value={item?.value}
                              thousandSeparator
                              displayType="text"
                            />{" "}
                          </span>
                          <span className="italic text-sm">VNĐ</span>
                          <span>/{item?.unit}</span>
                        </p>
                        <p className="font-light italic text-green-400 text-sm">
                          <span>
                            {" "}
                            {item?.RoomUse?.length != 0 ? (
                              <>
                                Đang áp dụng cho {item?.RoomUse?.length} phòng
                              </>
                            ) : (
                              <>Chưa áp dụng cho phòng</>
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <p
                      onClick={(e) =>
                        Render_UpdateService(item?._id, Service[index])
                      }
                      className="text-4xl border-2 text-black bg-gray-100 rounded-full p-2 cursor-pointer"
                    >
                      <AiFillEdit />
                    </p>
                    <p
                      onClick={(e) =>
                        Render_AddRoomUseService(item?._id, item?.name)
                      }
                      className="text-4xl border-2 text-black bg-blue-300 rounded-full p-2 cursor-pointer"
                    >
                      <MdAddToQueue />
                    </p>
                    <p
                      onClick={(e) =>
                        Render_DeleteService(item?._id, item?.name)
                      }
                      className="text-4xl border-2 text-white bg-red-600 rounded-full p-2 cursor-pointer"
                    >
                      <RiDeleteBin5Fill />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default ListService;
