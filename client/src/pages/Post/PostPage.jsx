import React, { useEffect, useState } from "react";
import BoxPost from "../../components/Post/BoxPost.jsx";
import { LIST_POST } from "../../API/Api/ListPost.api.js";

function PostPage() {
  const arr = [1, 1, 1, 1, 1, 1];
  const [data, setData] = useState();
  const [page, setPage] = useState("1");

  const GETAPI_LISTPOST = async () => {
    try {
      const result = await LIST_POST(page);
      setData(result?.data);
      console.log(result.data);
    } catch (error) {}
  };
  useEffect(() => {
    GETAPI_LISTPOST();
  }, []);
  return (
    <div>
      {/* xl:grid-cols-3 */}
      <ul class="grid grid-cols-1  gap-y-2 gap-x-6 items-start justify-start text-left p-8">
        {data.map((i) => {
          return <BoxPost value={i} />;
        })}
      </ul>
    </div>
  );
}

export default PostPage;
