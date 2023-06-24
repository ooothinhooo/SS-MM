import React, { useEffect, useState } from "react";
import AddMemberToRoom from "./AddMemberToRoom.jsx";
import Button from "../Componets/InputType/Button.jsx";
import { LIST_MEMBER_ONROOM } from "../../API/Member/listMemberOnRoom.api.js";
import { useParams } from "react-router-dom";
import { REMOVE_MEMBER_OUTROOM } from "../../API/Room/removeMemberOutRoom.api.js";
import { ToastContainer, toast } from "react-toastify";
import { Toast } from "../../Func/Toast.js";

function Member({ data, user }) {
  const a = [1, 2, 4];
  let { id } = useParams();
  const [isAdd, setIsAdd] = useState(Boolean(false));
  const [member, setMember] = useState(data?.member);
  // motelId
  // token

  const getMember = async () => {
    try {
      const result = await LIST_MEMBER_ONROOM(user?.token, id);
      setMember(result?.data?.data?.member);
    } catch (error) {}
  };

  const removeMember = async (_id) => {
    try {
      const result = await REMOVE_MEMBER_OUTROOM(user?.token, id, _id);
      getMember();
      if (result?.data?.status === 200)
        Toast.fire({
          icon: "success",
          title: "Xoá thành công",
        });
    } catch (error) {}
  };
  useEffect(() => {
    getMember();
  }, [isAdd]);
  return (
    <>
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

      <div className="w-full flex justify-center items-center  ">
        <div
          className={` ${
            !isAdd
              ? "mt-28 bottom-0 justify-center items-center w-[90%] mr-10 "
              : "top-0 left-0"
          } absolute flex z-40 items-end  `}
        >
          <div
            onClick={(e) => setIsAdd(!isAdd)}
            class={`w-full bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4  inline-flex items-center ${
              isAdd ? "rounded-full shadow-lg" : "rounded"
            }`}
          >
            <div className="w-full">
              {isAdd ? (
                <>
                  <button>X</button>
                </>
              ) : (
                <>
                  <button>Thêm Thành Viên Vào Phòng +</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`${isAdd ? " " : "hidden"}  overflow-y-auto shadow-xl`}>
        <AddMemberToRoom user={user} roomId={id} isAdd={isAdd} />
      </div>
      <div className={`${!isAdd ? " " : "hidden"}`}>
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
                        Ngày cấp
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
                        Số xe
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Ngày ĐKTT
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Hành Động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {member?.map((i, index) => {
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
                              {i?.sex == 0 ? <>Nữ</> : <>Nam</>}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {i?.cccd}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {i?.dateRange}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {i?.phone}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {i?.carNum}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {i?.dateSub}
                            </td>{" "}
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div className="flex gap-2">
                                <div onClick={(e) => removeMember(i?._id)}>
                                  <Button title={"X"} />
                                </div>

                                {/* <Button title={"Sửa"} /> */}
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
    </>
  );
}

export default Member;
