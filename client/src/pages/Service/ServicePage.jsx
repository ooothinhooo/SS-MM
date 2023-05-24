import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillTags } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import ListService from "../../components/Service/ListService.jsx";
import { GET_LIST_SERVICE } from "../../API/Service/getListService.api.js";
import BillPage from "../Billing/BillPage.jsx";
import TableService from "../../components/Service/TableService.jsx";

function ServicePage({ user }) {
  const [Service, setService] = useState();
  const GETAPI_MOTELS = async () => {
    try {
      const result = await GET_LIST_SERVICE(user?.token, user?.Motel);
      setService(result?.data?.data.services);
      console.log(result?.data?.data.services);
    } catch (error) {}
  };

  useEffect(() => {
    GETAPI_MOTELS();
  }, []);
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
      <div className="mt-20 mr-20 w-full w-full">
        <div className="w-full flex justify-center items-center ">
          <div class="grid grid-cols-3 gap-4 w-full  ">
            {/* left */}
            <div className="w-full">
              <div className="text-left mx-6">
                <span className="text-left text-3xl font-bold text-blue-800 uppercase ">
                  Quản lý dịch vụ
                </span>
              </div>
              <ListService
                user={user}
                Service={Service}
                GETAPI_MOTELS={GETAPI_MOTELS}
              />
            </div>

            {/* right */}
            <div class="col-span-2  w-full">
              <div className="w-full">
                <div className="text-left mx-6">
                  <span className="text-left text-3xl font-bold text-blue-800 uppercase ">
                    Quản lý dịch vụ
                  </span>
                </div>
                <TableService user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
