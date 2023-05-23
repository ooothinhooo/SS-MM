import React from "react";
import { AiFillDelete, AiFillEdit, AiFillTags } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

function ServicePage() {
  return (
    <div>
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
      <div className="mt-20 mr-20 w-full ">
        <div>Quản lý dịch vụ</div>
        <div className="w-full flex justify-center items-center ">
          <div class="grid grid-cols-3 gap-4 w-full  ">
            {/* left */}
            <div class="w-full h-auto flex justify-center items-center  ">
              <div className=" h-auto border-2 rounded-xl w-[90%] px-4 py-2 flex ">
                <div className="flex justify-between items-center w-full">
                  <div className=" rounded-full  justify-start flex ">
                    <div className="flex justify-center items-center">
                      <p className="text-4xl border-2 justify-center items-center rounded-full p-2">
                        <AiFillTags />
                      </p>
                      <div className="justify-start text-left ml-2">
                        <p className="font-bold ">Tiền Điện</p>
                        <p className="font-thin">
                          <span>3000</span>
                          <span>VNĐ/</span>
                          <span>Kwh</span>
                        </p>
                        <p className="font-light italic text-green-400">
                          app dung
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <p className="text-4xl border-2 text-black bg-gray-100 rounded-full p-2 cursor-pointer">
                      <AiFillEdit />
                    </p>
                    <p className="text-4xl border-2 text-white bg-red-600 rounded-full p-2 cursor-pointer">
                      <RiDeleteBin5Fill />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* right */}
            <div class="col-span-2 bg-blue-400 w-full">07</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
