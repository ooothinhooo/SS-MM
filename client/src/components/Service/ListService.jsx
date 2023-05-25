import React from "react";
import { AiFillEdit, AiFillTags } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { CREATE_SERVICE } from "../../API/Service/createService.api.js";
import { DELETE_SERVICE } from "../../API/Service/deleteService.api.js";

function ListService({ user, Service, GETAPI_MOTELS }) {
  console.log(Service);
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
      </div> `,
        focusConfirm: false,

        preConfirm: () => {
          return [
            document.getElementById("name").value,
            document.getElementById("value").value,
            document.getElementById("unit").value,
          ];
        },
      });
      if (formService) {
        // R.PostAPI_addRoom(formValues,formService)
        console.log(JSON.stringify(formService));
        CreateService(formService);
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
      {Service?.map((item) => {
        return (
          <>
            <div class="w-full h-auto flex justify-center items-center my-2  ">
              <div className=" h-auto border-2 rounded-xl w-[98%] px-4 py-2 flex ">
                <div className="flex justify-between items-center w-full">
                  <div className=" rounded-full  justify-start flex ">
                    <div className="flex justify-center items-center">
                      <p className="text-4xl border-2 justify-center items-center rounded-full p-2">
                        <AiFillTags />
                      </p>
                      <div className="justify-start text-left ml-2">
                        <p className="font-bold ">{item?.name}</p>
                        <p className="font-thin">
                          <span>{item?.value}</span>
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
                    <p className="text-4xl border-2 text-black bg-gray-100 rounded-full p-2 cursor-pointer">
                      <AiFillEdit />
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
