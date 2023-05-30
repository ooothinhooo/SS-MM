import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddMember from "../../components/Member/AddMember.jsx";
import { LIST_MEMBER } from "../../API/Member/listMember.api.js";
import { DELETE_MEMBER } from "../../API/Member/deleteMember.api.js";
import UpdateMember from "../../components/Member/UpdateMember.jsx";
import Swal from "sweetalert2";
import { storage } from "../../Firebase/firebase.config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { randomString } from "../../Func/RamdomString.js";
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
  }, [isAdd]);

  class Member {
    Render_AddMember = async () => {
      try {
        const { value: formService } = await Swal.fire({
          title: `THÊM THÀNH VIÊN `,
          showCancelButton: true,
          width: 1000,
          cancelButtonColor: "#d33",
          html: `

          <div class="w-full ">
          <div class="grid grid-cols-3 gap-4">
            <div class="w-full  px-3">
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name "> Họ và Tên </label>
              <input class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
               type="text" id="fullName" placeholder="Họ và Tên" />
            </div>
            <div class="w-full  px-3">
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name "> Ngày Sinh </label>
              <input class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              type="date" id="dob" placeholder="dd-mm-yyyy" />
            </div>
            <div class="w-full  px-3">
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name "> Số điện thoại </label>
              <input class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              type="number" id="phone" placeholder="Số điện thoại" />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="w-full  px-3">
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name "> CCCD/CMND </label>
              <input class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              type="number" id="cccd" placeholder="" />
            </div>
            <div class="w-full  px-3">
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name "> Ngày Cấp </label>
              <input class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              type="date" id="dateRange" placeholder="dd-mm-yyyy" />
            </div>
            <div class="w-full  px-3">
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Giới tính</label>
              <select 
              id="sex" 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Chọn</option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="w-full  px-3">
              <div class=" w-full">
                
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name "> Ảnh mặt trước CMND/CCCD </label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                id="idPhoto1" type="file" multiple>

              </div>
            </div>
            <div class="w-full  px-3">
              <div class=" w-full">
              
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name "> Ảnh mặt sau CMND/CCCD </label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="idPhoto2" type="file" multiple>

              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 py-4">
            <div class="w-full  ">
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name "> Biển số xe </label>
              <input class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              type="text" id="carNum" placeholder="" />
            </div>
            <div class="w-full  col-span-2">
              <label class="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name "> Địa chỉ </label>
              <input class="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              type="text" id="address" placeholder="" />
            </div>
          </div>
        </div>

          `,
          focusConfirm: false,

          preConfirm: () => {
            return [
              document.getElementById("fullName").value,
              document.getElementById("dob").value,
              document.getElementById("phone").value,
              document.getElementById("cccd").value,
              document.getElementById("dateRange").value,
              document.getElementById("sex").value,
              document.getElementById("idPhoto1").value,
              document.getElementById("idPhoto2").value,
              document.getElementById("carNum").value,
              document.getElementById("address").value,

              // document.getElementById("dropzone-file").value,
            ];
          },
        });
        if (formService) {
          var obj = {
            fullName: "",
            dob: "",
            phone: "",
            cccd: "",
            dateRange: "",
            sex: "",
            idPhoto1: "",
            idPhoto2: "",
            carNum: "",
            address: "",
          };
          // R.PostAPI_addRoom(formValues,formService)
          Swal.fire(JSON.stringify(formService));
          console.log(formService);
          // CreateService(formService);
          // document.getElementById("idPhoto1").value,   [6]
          // document.getElementById("idPhoto2").value,   [7]
          // e.preventDefault();
          M.UPLOAD_IMG_ADDMEMBER(formService[6]);
          M.UPLOAD_IMG_ADDMEMBER(formService[7]);
        }
      } catch (error) {}
    };

    UPLOAD_IMG_ADDMEMBER = async (img) => {
      try {
        const imageFile = img;
        // console.log(imageFile);
        // const fileName = new Date().getTime() + imageFile.name;
        const fileName = randomString(15);

        const storageRef = ref(
          storage,
          `SSMM/MEMBER/${fileName.split("").join("").toUpperCase()}`
        );
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // toast.success("Thêm ảnh đại diện thành công");
              IDPHOTO.push(downloadURL);
              console.log(IDPHOTO);
            });
          }
        );
      } catch (error) {}
    };

    POSTAPI_AddMember = () => {
      try {
      } catch (error) {}
    };
  }

  const M = new Member();
  return (
    <>
      <div className="mt-20 mr-20 w-full">
        <div
          className={`${
            isAdd ? " " : "hidden"
          } overflow-y-auto w-full h-full -mt-4  `}
        >
          {/* <AddMemberToRoom /> */}
          <AddMember user={user} isAdd={isAdd} setIsAdd={setIsAdd} />
        </div>
        <div className={`${isUp || isAdd ? "hidden" : ""}`}>
          <div className="w-full flex justify-center items-center ">
            <div className="w-[80%] flex z-40 shadow-xl justify-between items-center rounded-lg py-1 px-4">
              <p className="text-lg text-blue-700 font-medium flex justify-start">
                Danh Sách Thành Viên Nhà Trọ
              </p>
              <div
                onClick={(e) => setIsAdd(!isAdd)}
                // onClick={(e) => M.Render_AddMember()}
                class="bg-blue-300 hover:bg-blue-400 flex justify-end text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <button>Thêm Thành Viên Mới +</button>
              </div>
            </div>
          </div>

          <div className={`${!isAdd || !isUp ? " " : "hidden"}`}>
            <div class="w-full flex flex-col">
              <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <thead class="bg-white border-b  text-left">
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
                              <tr class="bg-gray-100 border-b ">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {index}
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
                                <td class="text-sm text-gray-900 text-center  font-light px-6 py-4 whitespace-nowrap">
                                  {i?.roomId?.roomCode ? (
                                    <>{i?.roomId?.roomCode}</>
                                  ) : (
                                    <>[ ]</>
                                  )}
                                </td>
                                <td class="text-sm text-gray-900 text-center font-light px-6 py-4 whitespace-nowrap">
                                  <div className="flex gap-4">
                                    <NavLink to={`/member/${i?._id}`}>
                                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        Sửa
                                      </button>
                                    </NavLink>
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
