import React, { useEffect, useState } from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { callAPI } from "../../API/Auth/API.js";
import CreatePost from "../../components/Post/CreatePost.jsx";
import { NavLink } from "react-router-dom";

function CreatePostPage({ user }) {
  //   useEffect(() => {}, []);
  return (
    <div className=" bg-white w-full h-screen flex justify-center items-start">
      <div className="w-[90%] ">
        <Breadcrumbx />
        <div className="w-full   rounded-lg my-6">
          <CreatePost user={user} />
        </div>
      </div>
    </div>
  );
}

function Breadcrumbx() {
  return (
    <>
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-900"
      >
        <Breadcrumb.Item href="#" icon={HiHome}>
          <p>Trang chủ</p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Quản lý tin</Breadcrumb.Item>
        <Breadcrumb.Item>Đăng tin</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
export default CreatePostPage;
