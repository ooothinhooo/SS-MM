import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { BsImage } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import AddMember from "../../components/Member/AddMember.jsx";
import { LIST_MEMBER } from "../../API/Member/listMember.api.js";
import { DELETE_MEMBER } from "../../API/Member/deleteMember.api.js";
import UpdateMember from "../../components/Member/UpdateMember.jsx";
import Swal from "sweetalert2";
import { storage } from "../../Firebase/firebase.config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { randomString } from "../../Func/RamdomString.js";
import { AiFillEye } from "react-icons/ai";
function MemberPage({ user }) {
  const navigation = useNavigate();
  const [member, setMember] = useState();
  const [dele, setDele] = useState(Boolean(false));
  const [num, setNum] = useState("");
  const [isAdd, setIsAdd] = useState(Boolean(false));
  const [isUp, setIsUp] = useState(Boolean(false));
  const [dataMember, setDataMember] = useState();
  let IDPHOTO = [];
  const getApiMember = async () => {
    try {
      const result = await LIST_MEMBER(user?.token, user?.Motel);
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
  }, []);

  const ViewIdPhoto = async (id1, id2) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "CCCD/CMND",
        width: 800,
        html: `
  <section class="py-8 px-4">
  <div class="flex flex-wrap -mx-4">
    <div class="md:w-1/2 px-4 mb-8 md:mb-0"><img class="rounded shadow-md" src=${id1} alt=""></div>
    <div class="md:w-1/2 px-4 mb-8 md:mb-0"><img class="rounded shadow-md" src=${id1} alt=""></div>
  </div>
</section>
  `,
        focusConfirm: false,
        preConfirm: () => {
          return [];
        },
      });

      if (formValues) {
        // Swal.fire(JSON.stringify(formValues))
      }
    } catch (error) {}
  };
  return (
    <>
      <div className=" w-full">
        <div className={` w-full `}>
          <div className="w-full flex justify-center items-center ">
            <div className="w-[90%] flex z-40 border justify-between items-center rounded-lg py-1 px-4">
              <p className="text-lg text-blue-700 font-medium flex justify-start">
                Danh Sách Thành Viên Nhà Trọ
              </p>
              <NavLink to="/member/add">
                <div
                  // onClick={(e) => setIsAdd(!isAdd)}
                  // onClick={(e) => M.Render_AddMember()}
                  class="bg-blue-300 hover:bg-blue-400 flex justify-end text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <button>Thêm Thành Viên Mới +</button>
                </div>
              </NavLink>
            </div>
          </div>

          <div className={` w-full flex justify-center items-center`}>
            <div class="w-full flex justify-center items-center">
              <div class="w-full ">
                <div class="w-full py-2 inline-block w-full ">
                  <div class="overflow-y-scroll h-[550px] w-full justify-center items-center">
                    <table class="w-full">
                      <thead class="bg-white border-b  text-left w-full">
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
                            SĐT
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                          >
                            Phòng
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                          >
                            Hành Động
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataMember?.map((i, index) => {
                          return (
                            <>
                              <tr class="border-b hover:bg-gray-200 ">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td class="text-sm text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
                                  {i?.fullName}
                                </td>
                                <td class="text-sm text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
                                  {i?.dob}
                                </td>
                                <td class="text-sm text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
                                  {i?.sex == 0 ? <>Nữ</> : <>Nam</>}
                                </td>
                                <td class="text-sm text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
                                  {i?.cccd}
                                </td>

                                <td class="text-sm text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
                                  {i?.phone}
                                </td>
                                <td class="text-sm text-gray-900 text-center  font-light px-6 py-4 whitespace-nowrap">
                                  {i?.roomId?.roomCode ? (
                                    <>{i?.roomId?.roomCode}</>
                                  ) : (
                                    <>[ ]</>
                                  )}
                                </td>
                                <td class="text-sm text-gray-900 text-center font-light px-6 py-1 whitespace-nowrap">
                                  <div className="flex gap-4 justify-center items-center">
                                    <NavLink to={`/member/view/${i?._id}`}>
                                      <button class="bg-transparent text-black hover:bg-blue-500  font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                        <i>
                                          <AiFillEye />
                                        </i>
                                      </button>
                                    </NavLink>
                                    <NavLink to={`/member/${i?._id}`}>
                                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                        <i>
                                          <GrEdit />
                                        </i>
                                      </button>
                                    </NavLink>
                                    <button
                                      onClick={(e) => deteleMemberAPI(i?._id)}
                                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                                    >
                                      <i>
                                        {/* <GrEdit /> */}
                                        <RiDeleteBin2Line />
                                      </i>
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
