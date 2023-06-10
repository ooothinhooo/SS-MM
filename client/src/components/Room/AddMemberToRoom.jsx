// import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Button from "../Componets/InputType/Button.jsx";

import { ADD_MEMBER_TOROOM } from "../../API/Room/addMemberToRoom.api.js";
import { ToastContainer, toast } from "react-toastify";
import { LIST_MEMBER_NO_ROOM } from "../../API/Member/listMemberNoRoom.api.js";

function AddMemberToRoom({ user, roomId, isAdd }) {
  const [dataMember, setDataMember] = useState();

  const getApiMember = async () => {
    try {
      const result = await LIST_MEMBER_NO_ROOM(user?.token, user?.Motel);
      setDataMember(result?.data?.data);
      console.log("api2 ", result?.data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getApiMember();
  }, [isAdd]);
  const addMemberToRoom = async (_id) => {
    try {
      const result = await ADD_MEMBER_TOROOM(user?.token, roomId, _id);
      console.log(result);
      // toast.success("Thêm thành công");
      toast.success("🦄 Thêm thành công", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // theme: "colored",
      });
      getApiMember();
    } catch (error) {}
  };
  return (
    <div className=" z-10 w-full h-full overflow-scroll  ">
      <ToastContainer />

      <div class="w-full flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Họ & Tên
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Ngày sinh
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Giới Tính
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      CMND/ CCCD
                    </th>

                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Điện thoại
                    </th>

                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Thêm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataMember?.map((i, index) => {
                    return (
                      <>
                        <tr class="bg-gray-100 border-b text-left">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {i?.fullName}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {i?.dob}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {i?.fullName}
                          </td>

                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {i?.cccd}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {i?.phone}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div onClick={(e) => addMemberToRoom(i?._id)}>
                              <Button title="Thêm" />
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <div className="w-full h-10"></div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberToRoom;
