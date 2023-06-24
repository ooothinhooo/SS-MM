import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import { GrEdit } from "react-icons/gr";
import { BsImage } from "react-icons/bs";
import { RiDeleteBin2Line, RiRobotFill } from "react-icons/ri";
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
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { GET_ONE_MEMBER } from "../../API/Member/getOneMember.api.js";
import { ADD_MEMBER_TOROOM } from "../../API/Room/addMemberToRoom.api.js";
import { Toast } from "../../Func/Toast.js";
function MemberPage({ user }) {
  const navigation = useNavigate();
  const [member, setMember] = useState();
  const [dele, setDele] = useState(Boolean(false));
  const [num, setNum] = useState("");
  const [isAdd, setIsAdd] = useState(Boolean(false));
  const [isUp, setIsUp] = useState(Boolean(false));
  const [dataMember, setDataMember] = useState();
  const [room, setRoom] = useState();
  const [data, setData] = useState({
    fullName: "",
    dob: "",
    cccd: "",
    dateRange: "",
    sex: "",
    phone: "",
    address: "",
    carNum: "",
    idPhoto1: "",
    idPhoto2: "",
    roomId: "",
  });
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

  const GetListRoomAPI = async () => {
    try {
      const result = await LIST_ROOM(user?.token, user?.Motel);
      const array = result.data.data.sort((a, b) =>
        String(a.roomCode) > String(b.roomCode) ? 1 : -1
      );
      setRoom(array);
    } catch (error) {}
  };
  const GetInfoMemberAPI = async (memberId) => {
    try {
      const dataMember = await GET_ONE_MEMBER(user?.token, memberId);
      // console.log(dataMember.data.data);
      if (dataMember.data?.status === 200) {
        Render_AddRoomUseService(dataMember.data.data?.roomId?._id, memberId);
      }
    } catch (error) {}
  };

  const Render_AddRoomUseService = async (roomId, memberId) => {
    try {
      let html = "";
      const x = room.map((i) => {
        html += `
        
        <div class="flex items-center   pl-4 border border-gray-200 rounded dark:border-gray-700">
    <input  
    ${roomId == i?._id ? "checked" : ""}
    
    type="radio"  name="fav_language" value=${
      i?._id
    } name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="bordered-checkbox-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${
      i?.roomCode
    }</label>
</div>
        `;
      });
      const { value: formValues } = await Swal.fire({
        title: "Chọn Phòng Cho Khách Thuê",
        width: 1200,
        html: `
        <div class="grid grid-cols-8 gap-4 p-2">  
    
        ${html}

      </div>
         `,
        focusConfirm: false,
        preConfirm: () => {
          const checkboxes = document.querySelectorAll(
            "input[type=radio]:checked"
          );
          let ArrayChecked = [];
          Array.prototype.forEach.call(checkboxes, function (el) {
            ArrayChecked.push(el.value);
          });
          // console.log(values);
          // const Nocheckboxes = document.querySelectorAll("input[type=radio]");
          // let ArrayNoChecked = [];
          // Array.prototype.forEach.call(Nocheckboxes, function (el) {
          //   if (!el.checked) {
          //     ArrayNoChecked.push(el.value);
          //   }
          // });
          // console.log(ArrayChecked);
          // console.log(ArrayNoChecked);

          return [ArrayChecked];
        },
      });

      if (formValues) {
        const ArrayChecked = formValues[0];
        // formValues[1].pop();
        // const ArrayNoChecked = formValues[1];

        addMemberToRoom(ArrayChecked[0], memberId);
      }
    } catch (error) {}
  };
  const addMemberToRoom = async (roomId, memberId) => {
    try {
      const result = await ADD_MEMBER_TOROOM(user?.token, roomId, memberId);
      console.log(result);
      if (result?.data?.status === 200) {
        getApiMember();
        // GetInfoMemberAPI();
        console.log(data);
        Toast.fire({
          icon: "success",
          title: "Thêm vào phòng thành công",
        });
        // toast.success("Cập Nhật Phòng thành công", {
        //   position: "top-right",
        //   autoClose: 1500,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    } catch (error) {}
  };
  useEffect(() => {});

  useEffect(() => {
    getApiMember();
    GetListRoomAPI();
  }, []);

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
                                  <div className="flex gap-2 justify-center items-center">
                                    <NavLink to={`/member/view/${i?._id}`}>
                                      <button class="bg-transparent text-black hover:bg-blue-500  font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                        <i>
                                          <Tooltip style="light" content="Xem">
                                            <AiFillEye />
                                          </Tooltip>
                                        </i>
                                      </button>
                                    </NavLink>
                                    <button
                                      onClick={(e) => GetInfoMemberAPI(i?._id)}
                                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                                    >
                                      <i>
                                        {/* <GrEdit /> */}
                                        <Tooltip
                                          style="light"
                                          content="Thêm vào phòng"
                                        >
                                          <RiRobotFill />
                                        </Tooltip>
                                      </i>
                                    </button>
                                    <NavLink to={`/member/${i?._id}`}>
                                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                        <i>
                                          <Tooltip
                                            style="light"
                                            content="Cập nhật"
                                          >
                                            <GrEdit />
                                          </Tooltip>
                                        </i>
                                      </button>
                                    </NavLink>
                                    <button
                                      onClick={(e) => deteleMemberAPI(i?._id)}
                                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                                    >
                                      <i>
                                        {/* <GrEdit /> */}
                                        <Tooltip style="light" content="Xoá">
                                          <RiDeleteBin2Line />
                                        </Tooltip>
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
