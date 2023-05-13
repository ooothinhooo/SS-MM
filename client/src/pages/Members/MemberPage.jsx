import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddMember from "../../components/Member/AddMember.jsx";
import { LIST_MEMBER } from "../../API/Member/listMember.api.js";
import { DELETE_MEMBER } from "../../API/Member/deleteMember.api.js";

function MemberPage({ user }) {
  const navigation = useNavigate();
  const [room, setRoom] = useState();
  const [dele, setDele] = useState(Boolean(false));
  const [num, setNum] = useState("");
  const a = [1, 2, 4];
  const [isAdd, setIsAdd] = useState(Boolean(false));
  const [dataMember, setDataMember] = useState();
  const getApiMember = async () => {
    try {
      const result = await LIST_MEMBER(user?.token, user?.motelId);
      console.log("api ", result.data.data);
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
  useEffect(() => {
    getApiMember();
  }, [isAdd]);
  return (
    <>
      <div className="mt-20 mr-20">
        <>
          <div className="absolute flex z-40 items-end  bottom-6  right-6">
            <div
              onClick={(e) => setIsAdd(!isAdd)}
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <button>Thêm +</button>
            </div>
          </div>
          <div className={`${isAdd ? " " : "hidden"} h-full overflow-y-auto`}>
            {/* <AddMemberToRoom /> */}
            <AddMember user={user} />
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
                                  {/* {i?.dob} */}
                                  name
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {i?.cccd}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  <div className="flex gap-4">
                                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
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
        </>
      </div>
    </>
  );
}

export default MemberPage;
