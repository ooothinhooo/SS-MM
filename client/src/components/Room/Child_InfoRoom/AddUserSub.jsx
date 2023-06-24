// import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Button from "../../Componets/InputType/Button.jsx";

import { ADD_MEMBER_TOROOM } from "../../../API/Room/addMemberToRoom.api.js";
import { ToastContainer, toast } from "react-toastify";
import { LIST_MEMBER_NO_ROOM } from "../../../API/Member/listMemberNoRoom.api.js";
import { USERS_SUB_TOROOM } from "../../../API/Room/userSubToRoom.api.js";
import ViewRoomPage from "../../../pages/Room/ViewRoomPage.jsx";
import { LIST_MEMBER } from "../../../API/Member/listMember.api.js";
import { LIST_MEMBER_ONROOM } from "../../../API/Member/listMemberOnRoom.api.js";
import { Toast } from "../../../Func/Toast.js";

function AddUserSub({ user, roomId, isAdd, getAPI_Room }) {
  const [dataMember, setDataMember] = useState();

  const getApiMember = async () => {
    try {
      const result = await LIST_MEMBER_ONROOM(user?.token, roomId);
      setDataMember(result?.data?.data?.member);
      console.log("api2 ", result?.data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getApiMember();
  }, [isAdd]);

  const addUserSub = async (_id) => {
    try {
      const result = await USERS_SUB_TOROOM(user?.token, roomId, _id);
      // console.log(result);
      Toast.fire({
        icon: "success",
        title: "Thêm thành công",
      });

      getApiMember();
      getAPI_Room();
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
                        <tr class="bg-gray-100 border-b">
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
                            <div onClick={(e) => addUserSub(i?._id)}>
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

export default AddUserSub;
