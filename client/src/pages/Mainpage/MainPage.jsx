import React from "react";
import PostPage from "../Post/PostPage.jsx";

function MainPage({ user }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[80%] shadow-xl ">
        <div class="grid grid-cols-3 gap-8">
          <div class="col-span-2 bg-pink-900">
            {" "}
            <PostPage />
          </div>
          <div class="bg-black">05</div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
