import React, { useEffect, useState } from "react";
import { callAPI, callApiDistrict, callApiWard } from "../../API/Auth/API.js";
import Swal from "sweetalert2";
import removeVietnameseAndWhitespace from "../../Func/removeVN.js";
import { splitName } from "../../Func/SliceName.js";
import { DeleteFileImg, app, storage } from "../../Firebase/firebase.config.js";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { randomString } from "../../Func/RamdomString.js";
import { ToastContainer, toast } from "react-toastify";
import { CREATE_POST } from "../../API/Posts/CreatePost.api.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreatePost({ user }) {
  const host = "https://provinces.open-api.vn/api/";
  const navigation = useNavigate();

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [img, setImg] = useState([]);
  const [value, setValue] = useState({});
  const [form, setForm] = useState({
    district: "",
    ward: "",
  });
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.options[e.target.selectedIndex].text);
    setForm({
      ...form,
      [e.target.name]: e.target.options[e.target.selectedIndex].text,
    });
    console.table(form);
  };
  const handleChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.options[e.target.selectedIndex].text);

    console.table(form);
  };
  const CallAPI_PROVINCE = async () => {
    try {
      const provinces = await callAPI(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      console.log(provinces);
      //   setForm("");
      setProvince(provinces);
      //   setDistrict();

      //   CallAPI_DISTRICT();
    } catch (error) {}
  };
  const CallAPI_DISTRICT = async () => {
    try {
      const result = await callApiDistrict(
        host + "p/" + value?.province + "?depth=2"
      );
      setDistrict(result);
      setWard();
      //   CallAPI_WARD();
    } catch (error) {}
  };
  const CallAPI_WARD = async () => {
    try {
      const result = await callApiWard(
        host + "d/" + value?.district + "?depth=2"
      );

      setWard(result);
    } catch (error) {}
  };
  useEffect(() => {
    CallAPI_DISTRICT();
  }, [value.province]);
  useEffect(() => {
    CallAPI_WARD();
    // console.log(ward);
  }, [value.district]);
  useEffect(() => {
    CallAPI_PROVINCE();
  }, []);

  const uploadImage = (e) => {
    e.preventDefault();
    try {
      const imageFile = e.target.files[0];
      console.log(imageFile);
      // const fileName = new Date().getTime() + imageFile.name;
      const fileName = randomString(20);

      const storageRef = ref(
        storage,
        `SSMM/POST/${fileName.split("").join("").toUpperCase()}`
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
            // setAvatar(downloadURL);
            toast.success("Thêm ảnh thành công");

            console.log(downloadURL);
            setImg([
              ...img,
              {
                id: fileName,
                imgUrl: downloadURL,
              },
            ]);
          });
        }
      );
    } catch (error) {}
  };

  const handleDelete = (url) => {
    try {
      console.log(url);
      DeleteFileImg("POST", url);
      setImg([...img]);
      function deleteObjectById(array, id) {
        return array.filter((obj) => obj.id !== id);
      }
      let newArray = deleteObjectById(img, url);
      setImg(newArray);
    } catch (error) {}
  };
  useEffect(() => {
    console.log(img);
    setForm({
      ...form,
      images: img,
    });
  }, [img]);

  const Upload = async () => {
    try {
      console.log(form);
      const result = await CREATE_POST(user?.token, form);
      console.log(result);
      toast.success("Đăng bài thành công");
      navigation("/");
    } catch (error) {}
  };
  return (
    <div>
      <ToastContainer />
      <div className="border-none">
        <div class="grid grid-cols-2 gap-4">
          <div className=" border rounded-lg justify-center">
            <div>
              <div className="">
                <p className="text-left w-full text-xl font-bold p-2">
                  {" "}
                  Địa chỉ cho thuê
                </p>
                <div className="flex justify-center mt-4 mb-2 gap-4 px-8">
                  <section>
                    <label
                      for="country"
                      class="block text-left text-md font-medium leading-6 text-gray-900"
                    >
                      Tỉnh/Thành Phố
                    </label>
                    <select
                      onChange={handleChange}
                      name="province"
                      class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    >
                      <option selected>Chọn Thành Phố</option>
                      {province?.map((i) => {
                        return (
                          <>
                            <option value={i?.code}>{i?.name}</option>
                          </>
                        );
                      })}
                    </select>
                  </section>
                  <section>
                    <label
                      for="country"
                      class="block text-left text-md font-medium leading-6 text-gray-900"
                    >
                      Quận/Huyện
                    </label>
                    <select
                      onChange={handleChange}
                      name="district"
                      class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    >
                      <option selected>Chọn Quận/Huyện</option>
                      {district?.map((i) => {
                        return (
                          <>
                            <option value={i?.code}>{i?.name}</option>
                          </>
                        );
                      })}
                    </select>
                  </section>
                  <section>
                    <label
                      for="country"
                      class="block text-left text-md font-medium leading-6 text-gray-900"
                    >
                      Phường/Xã
                    </label>
                    <select
                      onChange={handleChange}
                      name="ward"
                      class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    >
                      <option selected>Chọn Phường/Xã</option>
                      {ward?.map((i) => {
                        return (
                          <>
                            <option value={i?.code}>{i?.name}</option>
                          </>
                        );
                      })}
                    </select>
                  </section>
                </div>
                <div className="flex justify-center items-center px-8">
                  <div className="w-full">
                    <label
                      for="country"
                      class="block text-left text-md font-medium leading-6 text-gray-900"
                    >
                      Địa chỉ cụ thể của trọ
                    </label>
                    <input
                      class="w-full appearance-none block w-full  text-black border border-blue-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      onChange={handleChangeForm}
                      name="address"
                      placeholder="Nhập Địa Chỉ Cụ Thể"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center px-8">
                  <div className="w-full">
                    <input
                      class="w-full appearance-none block bg-gray-200  text-black border  rounded py-3 px-4 mb-3 leading-tight "
                      type="text"
                      value={
                        form?.ward || form?.district || form?.province
                          ? form?.ward +
                            "," +
                            form?.district +
                            "," +
                            form?.province
                          : ""
                      }
                      placeholder="Địa chỉ cụ thể của bạn"
                      readOnly
                    />
                  </div>
                </div>
                <div className="w-full flex justify-center items-center mb-2">
                  <div
                    class="w-[90%] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                    id="dropzone"
                  >
                    <input
                      id="file"
                      // name="file-upload"
                      type="file"
                      class="sr-only"
                      // id="file-upload"
                      // type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      //   class="absolute inset-0 w-full h-full opacity-0 z-50"
                    />
                    <div class="text-center">
                      <img
                        class="mx-auto h-12 w-12"
                        src="https://www.svgrepo.com/show/357902/image-upload.svg"
                        alt=""
                      />

                      <h3 class="mt-2 text-sm font-medium text-gray-900">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer"
                        >
                          <span>Drag and drop</span>
                          <span class="text-indigo-600"> or browse</span>
                          <span>to upload</span>
                          <input
                            id="file-upload"
                            // name="file-upload"
                            type="file"
                            class="sr-only"
                            // id="file-upload"
                            // type="file"
                            name="upload-image"
                            accept="image/*"
                            onChange={uploadImage}
                          />
                        </label>
                      </h3>
                      <p class="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>

                    <img
                      src=""
                      class="mt-4 mx-auto max-h-40 hidden"
                      id="preview"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className=" border rounded-lg justify-center">
            <div className="px-6 py-2">
              <div className="w-full">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-bold ml-1 mb-2 dark:text-white text-left"
                  >
                    Tiêu đề bài viết
                  </label>
                  <div class="relative">
                    <input
                      type="text"
                      onChange={handleChangeForm}
                      name="title"
                      class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-4">
                  <div class="...">
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-bold ml-1 mb-2 dark:text-white text-left"
                      >
                        Giá Phòng
                      </label>
                      <div class="relative">
                        <input
                          type="number"
                          onChange={handleChangeForm}
                          name="roomFee"
                          class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-bold ml-1 mb-2 dark:text-white text-left"
                      >
                        Số điện thoại liên hệ
                      </label>
                      <div class="relative">
                        <input
                          type="number"
                          onChange={handleChangeForm}
                          name="phone"
                          class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="w-full px-3 mt-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                      for="grid-password"
                    >
                      Mô tả thêm
                    </label>
                    <textarea
                      rows="9"
                      onChange={handleChangeForm}
                      name="desc"
                      class="appearance-none block w-full bg-white text-black border border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="w-full text-left font-bold text-xl mt-6 mb-2">
          Hình ảnh đăng tải{" "}
        </p>
        <div className=" w-full border rounded-lg  px-7">
          <div className="flex justify-start items-center">
            <div className=" flex gap-4 my-2">
              {img?.map((i) => {
                return (
                  <>
                    <div class="rounded  overflow-hidden shadow-lg flex flex-col">
                      <div class="relative">
                        <p>
                          <img class="w-[200px] h-[200px]" src={i?.imgUrl} />
                          <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                        </p>
                        <p>
                          <div
                            onClick={(e) => handleDelete(i?.id)}
                            class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out"
                          >
                            Delete
                          </div>
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-4">
          <div className="cursor-pointer">
            <p
              onClick={(e) => Upload()}
              class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0"
              data-primary="green-400"
              data-rounded="rounded-2xl"
              data-primary-reset="{}"
            >
              Đăng bài
              <svg
                class="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
