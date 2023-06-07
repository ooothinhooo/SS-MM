import React from "react";
import AddArticle from "../../components/Comment/AddArticle.jsx";
import Articles from "../../components/Comment/Articles.jsx";

function CommentsPage({ user, colDB }) {
  return (
    <div>
      <div className=" mt-2  w-[98%] items-center justify-start text-left">
        <span className="text-gray-400">
          Bạn Đang Ở Mục Bình Luận Cho Bài viết
          {/* <span className="text-blue-300">{data?.title}</span> */}
        </span>
        <AddArticle colDB={colDB} />
        <div className="h-full">
          <Articles colDB={colDB} />
        </div>
      </div>
    </div>
  );
}

export default CommentsPage;
