import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddMember from "../../components/Member/AddMember.jsx";
import { LIST_MEMBER } from "../../API/Member/listMember.api.js";
import { DELETE_MEMBER } from "../../API/Member/deleteMember.api.js";
import UpdateMember from "../../components/Member/UpdateMember.jsx";

function MemberPage({ user }) {
  const navigation = useNavigate();
  const [member, setMember] = useState();
  const [dele, setDele] = useState(Boolean(false));
  const [num, setNum] = useState("");
  const [isAdd, setIsAdd] = useState(Boolean(false));
  const [isUp, setIsUp] = useState(Boolean(false));
  const [dataMember, setDataMember] = useState();
  const getApiMember = async () => {
    try {
      const result = await LIST_MEMBER(user?.token, user?.motelId);
      setDataMember(result?.data?.data);
    } catch (error) {}
  };
  const deteleMemberAPI = async (_id) => {
    try {
      const result = await DELETE_MEMBER(user?.token, _id);
      console.log(result);
      getApiMember();
    } catch (error) {}
  };
  const updateMember = (data) => {
    setIsUp(!isUp);
    setMember(data);
  };
  useEffect(() => {
    getApiMember();
  }, [isAdd]);
  return (
    <>
      <div className="mt-20 mr-20 w-full">
        <>
          <div
            className={`flex justify-start ml-5 mt-10 ${
              isUp ? " " : "hidden"
            } `}
          >
            <button
              onClick={(e) => setIsUp(!isUp)}
              className="bg-blue-200 rounded-lg shadow-md p-2"
            >
              Quay Lại
            </button>
          </div>
          <div className={`${isUp ? " " : "hidden"} h-full overflow-y-auto`}>
            {/* <AddMemberToRoom /> */}
            <UpdateMember
              user={user}
              dataMember={member}
              getApiMember={getApiMember}
            />
          </div>
        </>
        <div className={`${isUp ? "hidden" : ""}`}>
          <div className="w-full flex justify-center items-center ">
            <div className="w-[80%] flex z-40 shadow-xl justify-between     items-center rounded-lg p-1">
              <p className="text-lg text-blue-700 font-medium flex justify-start">
                Danh Sách Thành Viên Nhà Trọ
              </p>
              <div
                onClick={(e) => setIsAdd(!isAdd)}
                class="bg-blue-300 hover:bg-blue-400 flex justify-end text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <button>Thêm Thành Viên Mới +</button>
              </div>
            </div>
          </div>
          <div className={`${isAdd ? " " : "hidden"} h-full overflow-y-auto`}>
            {/* <AddMemberToRoom /> */}
            <AddMember user={user} />
          </div>

          <div className={`${!isAdd || !isUp ? " " : "hidden"}`}>
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
                            Phòng
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
                        {dataMember?.map((i, index) => {
                          return (
                            <>
                              <tr class="bg-gray-100 border-b">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {index}
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
                                  {i?.roomId?.roomCode ? (
                                    <>{i?.roomId?.roomCode}</>
                                  ) : (
                                    <>[ ]</>
                                  )}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  <div className="flex gap-4">
                                    <button
                                      onClick={(e) =>
                                        updateMember(dataMember[index])
                                      }
                                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={(e) => deteleMemberAPI(i?._id)}
                                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                    >
                                      Xoá
                                    </button>
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
        </div>
      </div>
    </>
  );
}

export default MemberPage;
